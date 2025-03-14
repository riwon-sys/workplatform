package work.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.model.dto.ChattingDto;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class TotalSocket extends TextWebSocketHandler {

    // 브라우저 접속 소켓
    private final Set<WebSocketSession> totalClients = new HashSet<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        totalClients.add(session);
        System.out.println("Total client connected : " + totalClients.size());
        System.out.println("전체소켓 연결 성공");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            // 클라이언트에서 보낸 메세지 ChattingDto 로 파싱
            ChattingDto chattingDto = objectMapper.readValue(message.getPayload(), ChattingDto.class);

            System.out.println("전체소켓 타입" + chattingDto.getMstype());
            // 메시지 타입이 5일 경우 처리 로직
            if(chattingDto.getMstype() == 5){
                // 예시: 특정 메시지를 모든 클라이언트에게 방송
                broadcastToClients("5");
            }
        } catch (IOException e) {
            System.out.println("Error: " + e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        totalClients.remove(session);
        System.out.println("Total client disconnected : " + totalClients.size());
    }

    // 클라이언트로 리렌더링 요청 보내기
    private void broadcastToClients(String messageContent) {
        System.out.println("보낼 메세지" + messageContent);
        System.out.println("메세지를 보낼 소켓" + totalClients.toString());
        if (totalClients != null) {
            for (WebSocketSession s : totalClients) {
                try {
                    s.sendMessage(new TextMessage(messageContent));
                } catch (IOException e) {
                    System.out.println("Error sending message: " + e);
                }
            }
        }
    }
}