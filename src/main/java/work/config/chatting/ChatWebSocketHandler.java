package work.config.chatting;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.model.dto.ChattingDto;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    // 채팅방 별로 WebSocketSession을 저장하는 Map (Key: roomId, Value: 해당 방의 세션 목록)
    private static final Map<String, Set<WebSocketSession>> rooms = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println(" 사용자 연결 , ID: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws IOException {
        String payload = msg.getPayload(); // 클라이언트가 보낸 JSON 문자열
        System.out.println("받은 메시지: " + payload);

        // JSON 데이터를 파싱하여 ChatMessage 객체로 변환
        ChattingDto chattingDto = parseMessage( payload );
        String rid = chattingDto.getRid(); // 채팅방 ID 가져오기

        // 해당 채팅방이 존재하지 않으면 새로 생성
        rooms.putIfAbsent( rid, new HashSet<>() );

        // 해당 채팅방의 사용자 목록에 현재 사용자의 WebSocketSession 추가
        rooms.get( rid ).add( session );

        // 같은 채팅방에 있는 모든 사용자에게 메시지 전송
        roomMessage( rid, chattingDto );
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("사용자 연결 종료: " + session.getId());

        // 모든 채팅방에서 해당 사용자의 WebSocketSession 제거
        rooms.values().forEach(sessions -> sessions.remove(session));
    }


    //특정 채팅방(roomId)에 있는 모든 사용자에게 메시지를 전송하는 메소드
    private void roomMessage(String rid, ChattingDto msg) throws IOException {
        Set<WebSocketSession> sessions = rooms.get(rid); // 채팅방에 있는 모든 세션 가져오기
        if (sessions != null) {
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) { // 연결이 열려 있는 경우에만 메시지 전송
                    session.sendMessage(new TextMessage( msg.toJson() ));
                }
            }
        }
    }

    private ChattingDto parseMessage(String payload) {
        // 여기서는 예제 데이터 반환 (실제로는 JSON을 파싱해야 함)
        return new ChattingDto();
    }
}
