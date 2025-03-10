package work.config;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.model.dto.ChattingDto;
import work.model.dto.MessageDto.MessageDto;
import work.model.mapper.room.MessageMapper;
import work.model.mapper.room.RoomMapper;

import java.io.IOException;
import java.util.*;

// 채팅방별 메세지 전송관리
@Component
public class ChatSocket extends TextWebSocketHandler {

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private RoomMapper roomMapper;

    // 채팅방 번호(rno)를 키로 하고, 해당 채팅방에 접속한 WebSocket 세션(Set)을 값으로 가지는 맵
        // set 으로 클라이언트의 중복 접속 방지
    private final Map<Integer, Set<WebSocketSession>> chatRooms = new HashMap<>();

    // JSON 변환을 위한 ObjectMapper 객체 생성
    private final ObjectMapper mapper = new ObjectMapper();


    // 채팅방에 클라이언트 추가하고 채팅 불러오기
    public  void  addClient (int rno , WebSocketSession session){

        // 채팅방에 클라이언트 세션 추가
        chatRooms.putIfAbsent(rno, new HashSet<>());
        chatRooms.get(rno).add(session);

        System.out.println(rno + "채팅방에  클라이언트 추가" );

        // 기존 채팅 불러오기
        List<MessageDto> msgList = roomMapper.findAll(rno); // 나중에 limit  지정하기

        // 클라이언트에게 반환
        for(MessageDto msg : msgList){
            try {
                String jsonMsg = mapper.writeValueAsString(msg);
                session.sendMessage(new TextMessage(jsonMsg));
            }catch (IOException e){
                System.out.println(e);
            }
        }
    }

    // 클라이언트 소켓 접속 성공 시
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("WebSocket 연결 :  " + session.getId()); // 연결된 세션의 ID 출력

        // WebSocketSession에서 HttpSession 가져오기
        HttpSession httpSession = (HttpSession) session.getAttributes().get("httpSession");

        if (httpSession != null) {
            // HttpSession에서 로그인된 회원번호 가져오기
            String loginMno = (String) httpSession.getAttribute("loginMno");

            if (loginMno != null) { // loginMno 가 존재하면

                // WebSocketSession 에 로그인된 회원번호 저장
                session.getAttributes().put("loginMno", loginMno);

                System.out.println("로그인된 회원번호 : " + loginMno);  // 회원번호 출력

                // HttpSession 에서 rno 가져오기
                String rnoString = (String) session.getAttributes().get("rno");
                int rno = Integer.parseInt(rnoString);

                // 접속한 클라이언트의 세션 추가 후 기존 채팅 불러오기
                addClient(rno, session);

            }
        }


    }


    // 클라이언트가 메시지를 보낼 때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // JSON 형식의 메시지를 ChattingDto 객체로 변환
        ChattingDto chattingDto = mapper.readValue(message.getPayload(), ChattingDto.class);

        int rno = chattingDto.getRno(); // 메시지가 전송된 채팅방 번호

        // 메시지 타입이 2 (채팅방 입장)인 경우
        if (chattingDto.getMstype() == 2) {  // 2: 채팅방 입장
            System.out.println(chattingDto.getMname() + "님 " + rno + "에 입장");

            // 입장 메시지 전송 (다른 클라이언트들에게 입장 알리기)
            ChattingDto joinMessage = new ChattingDto();
            joinMessage.setMstype(2);  // 입장 메시지 타입
            joinMessage.setMscontent(chattingDto.getMname() + "님이 채팅방에 입장했습니다.");
            joinMessage.setRno(rno);
            joinMessage.setMname("System");  // 시스템 메시지로 처리
            broadcastMessage(rno, joinMessage); // 현재 같은 채팅방에 있는 클라이언트에게 메세지 전송
        }

        if(chattingDto.getMstype() == 0) { // 클라이언트가 보낸 메세지가 텍스트일 경우
            broadcastMessage(rno, chattingDto); // 현재 같은 채팅방에 있는 클라이언트에게 메세지 전송
            messageMapper.writeMessage(chattingDto);
        }else if(chattingDto.getMstype() == 1){ // 클라이언트가 보낸 메세지가 파일일 경우
            broadcastMessage(rno, chattingDto); // 현재 같은 채팅방에 있는 클라이언트에게 메세지 전송
            messageMapper.writeFile(chattingDto);
        }

    }

    // WebSocket 연결이 종료될 때 실행되는 메서드
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 클라이언트가 연결 종료 시 해당 세션 제거
        chatRooms.forEach((rno, sessions) -> {
            if (sessions.remove(session)) { // 세션을 제거한 경우
                System.out.println(session.getId() + "가 " + rno + "에서 나감");

                // 존재하는 세션이 없을 때
                if(sessions.isEmpty()){
                    chatRooms.remove(rno);
                    System.out.println("채팅방 없음");
                }
            }
        });
    }

    // 특정 rno에 접속한 클라이언트들에게 메시지를 전송
    private void broadcastMessage(int rno, ChattingDto message) throws Exception {
        // 해당 rno(채팅방 번호)에 속한 세션 목록을 가져옴
        Set<WebSocketSession> sessions = chatRooms.get(rno);
        if (sessions != null) { // 채팅방이 존재하는 경우
            // ChattingDto 객체를 JSON 문자열로 변환
            String jsonMessage = mapper.writeValueAsString(message);
            System.out.println("메세지 보냄" + jsonMessage);
            // 채팅방에 속한 모든 사용자에게 메시지 전송
            for (WebSocketSession session : sessions) {
                session.sendMessage(new TextMessage(jsonMessage));
            }
        }
    }
}
