package work.config.chat;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.config.Browser.BrowserSokcet;
import work.log.LogClass;
import work.log.LogReader;
import work.model.dto.ChattingDto;
import work.model.dto.MessageDto.MessageDto;
import work.model.mapper.room.MessageMapper;
import work.model.mapper.room.RoomMapper;

import java.io.IOException;
import java.util.*;

// 채팅방별 메세지 전송관리
@Component
@RequiredArgsConstructor
public class ChatSocket extends TextWebSocketHandler {


    private final MessageMapper messageMapper;


    private final RoomMapper roomMapper;

    private final LogClass logClass = new LogClass();

    private  final LogReader logReader = new LogReader();


    private final BrowserSokcet browserSokcet;
    // 브라우저 접속 소켓
    private  final  Set<WebSocketSession> totalClients = new HashSet<>();


    // 채팅방 번호(rno)를 키로 하고, 해당 채팅방에 접속한 WebSocket 세션(Set)을 값으로 가지는 맵
    // set 으로 클라이언트의 중복 접속 방지
    private final Map<Integer, Set<WebSocketSession>> chatRooms = new HashMap<>();

    // JSON 변환을 위한 ObjectMapper 객체 생성
    private final ObjectMapper mapper = new ObjectMapper();
    // 브라우저 접속 시 전체 소켓 연결을 위한 메서드
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("WebSocket 연결 : " + session.getId()); // 연결된 세션의 ID 출력

        // 전체 소켓 접속 처리 (totalClients에 세션 추가)
        totalClients.add(session);
        System.out.println("전체 클라이언트 접속됨, 총 접속자 수: " + totalClients.size());

        // 클라이언트가 로그인 했을 때 처리하는 로직
        HttpSession httpSession = (HttpSession) session.getAttributes().get("httpSession");
        if (httpSession != null) {
            String loginMno = (String) httpSession.getAttribute("loginMno");
            if (loginMno != null) {
                session.getAttributes().put("loginMno", loginMno);
                System.out.println("로그인된 회원번호 : " + loginMno);
            }
        }
    }


    // 채팅방에 클라이언트 추가하고 채팅 불러오기
    public  List<MessageDto>  addClient (int rno , WebSocketSession session) {

        // 채팅방에 클라이언트 세션 추가
        chatRooms.putIfAbsent(rno, new HashSet<>());
        chatRooms.get(rno).add(session);

        System.out.println(rno + "채팅방에  클라이언트 추가");

        // 기존 채팅 불러오기
        List<MessageDto> msgList = roomMapper.findAll(rno); // 나중에 limit  지정하기

        // 중복된 msno를 제거하기 위해 Set을 사용하여 중복을 제거
        Set<Integer> seenMsno = new HashSet<>();
        List<MessageDto> uniqueMessages = new ArrayList<>();

        for (MessageDto message : msgList) {
            if (!seenMsno.contains(message.getMsno())) {
                uniqueMessages.add(message);
                seenMsno.add(message.getMsno());
            }
        }

        System.out.println(msgList);
        return  msgList;
    }

    // 클라이언트가 메시지를 보낼 때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            // 메시지를 ChattingDto로 변환
            ChattingDto chattingDto = mapper.readValue(message.getPayload(), ChattingDto.class);

            int rno = chattingDto.getRno(); // 메시지가 전송된 채팅방 번호
        if(chattingDto.getMnameList() != null) {
            if (chattingDto.getMnameList().size() > 0) {
                for (int i = 0; i < chattingDto.getMnameList().size(); i++) {
                    System.out.println("새로 추가된 회원" + chattingDto.getMnameList().get(i));
                }
            }
        }
            switch (chattingDto.getMstype()) {
                case 3: // 기존 채팅 기록 요청
                    List<MessageDto> msgList = addClient(rno, session);
                    for (MessageDto msg : msgList) {
                        String jsonMsg = mapper.writeValueAsString(msg);
                        session.sendMessage(new TextMessage(jsonMsg));
                    }
                    break;

                case 2: // 채팅방 입장
                    ChattingDto joinMessage = new ChattingDto();
                    joinMessage.setMstype(2);  // 입장 메시지 타입
                    joinMessage.setMscontent(chattingDto.getMname() + "님이 채팅방에 입장했습니다.");
                    joinMessage.setRno(rno);
                    joinMessage.setMname("System");  // 시스템 메시지로 처리
                    broadcastMessage(rno, joinMessage);
                    break;

                case 0: // 일반 텍스트 메시지
                    broadcastMessage(rno, chattingDto);
                    boolean result = messageMapper.writeMessage(chattingDto); // 컨트롤러로 연결해야됨
                    // 로그처리
                    logClass.logMsg(chattingDto);
                    // 브라우저 소켓에 로그 전송
                    browserSokcet.broadcastToBrowser();

                    break;

                case 1: // 파일 메시지
                    broadcastMessage(rno, chattingDto);
                    boolean fileResult = messageMapper.writeFile(chattingDto);
                    // 로그처리
                    logClass.logMsg(chattingDto);
                    // 브라우저 소켓에 로그 전송
                    browserSokcet.broadcastToBrowser();
                    break;

                case 4: // 새로 참여한 사람 알림
                    String mname = roomMapper.findMname(chattingDto.getMno());
                    broadcastMessage(rno, chattingDto);
                    break;
                default:
                    System.out.println("알 수 없는 메시지 타입: " + chattingDto.getMstype());
                    break;
            }

            // 로그 출력
            LogReader.readLastLog();

        } catch (IOException e) {
            // JSON 파싱 실패시 예외 처리
            System.err.println("Error parsing message: " + e.getMessage());
            e.printStackTrace(); // 예외 콘솔에 출력
            // 클라이언트에게 오류 메시지 전송
            session.sendMessage(new TextMessage("Error: Invalid message format."));
        } catch (Exception e) {
            // 예외 처리
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            session.sendMessage(new TextMessage("An unexpected error occurred. Please try again later."));
        }
    }


    // WebSocket 연결이 종료될 때 실행되는 메서드
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        totalClients.remove(session);
        // 클라이언트가 연결 종료 시 해당 세션 제거
        chatRooms.forEach((rno, sessions) -> {
            Iterator<WebSocketSession> iterator = sessions.iterator();
            while (iterator.hasNext()) {
                WebSocketSession wsSession = iterator.next();
                if (wsSession.equals(session)) {
                    iterator.remove(); // 안전하게 세션 제거
                    System.out.println(session.getId() + "가 " + rno + "에서 나감");
                }
            }

            // 존재하는 세션이 없을 때
            if (sessions.isEmpty()) {
                chatRooms.remove(rno);
                System.out.println("채팅방 없음");
            }
        });
    }


    // 특정 rno에 접속한 클라이언트들에게 메시지를 전송
   private void broadcastMessage(int rno, ChattingDto message) throws Exception {

       // 채팅방에 연결된 클라이언트 세션들 가져오기
       Set<WebSocketSession> sessions = chatRooms.get(rno);

       if (sessions != null && !sessions.isEmpty()) {
           String jsonMessage = mapper.writeValueAsString(message);

           // 각 세션에 메시지 전송
           for (WebSocketSession session : sessions) {
               if (session.isOpen()) {  // 세션이 열린 경우에만 메시지 전송
                   try {
                       session.sendMessage(new TextMessage(jsonMessage));
                       System.out.println("메시지 전송 성공: " + session.getId());
                   } catch (IOException e) {
                       System.err.println("메시지 전송 실패: " + session.getId());
                       e.printStackTrace();
                   }
               } else {
                   // 세션이 닫혀있다면 해당 세션을 목록에서 제거
                   chatRooms.get(rno).remove(session);
                   System.out.println("세션이 닫혔으므로 목록에서 제거됨: " + session.getId());
               }
           }

           // mstype이 4인 경우, 새로 추가된 회원 정보를 모든 클라이언트에 전달
           if (message.getMstype() == 4) {
               String jsonMsg = mapper.writeValueAsString(message);
               for (WebSocketSession session : sessions) {
                   if (session.isOpen()) {
                       try {
                           session.sendMessage(new TextMessage(jsonMsg));
                       } catch (IOException e) {
                           System.err.println("새 회원 메시지 전송 실패: " + session.getId());
                           e.printStackTrace();
                       }
                   }
               }
           }

       } else {
           System.out.println("해당 채팅방에 세션이 없습니다. rno: " + rno); // 세션이 없을 경우


       }
   }}