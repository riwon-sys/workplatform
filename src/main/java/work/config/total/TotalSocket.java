package work.config.total;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.log.LogClass;
import work.log.LogReader;
import work.model.dto.ChattingDto;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class TotalSocket extends TextWebSocketHandler {

    private  final LogClass logClass = new LogClass();


    // 채팅 브라우저 접속 소켓
    private final Set<WebSocketSession> totalClients = new HashSet<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        totalClients.add(session);
        System.out.println("Total client connected : " + totalClients.size());
        System.out.println("전체 채팅 소켓 연결 성공");
        LogReader.readLastLog();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        try {
            // 클라이언트에서 보낸 메세지 ChattingDto 로 파싱
            ChattingDto chattingDto = objectMapper.readValue(message.getPayload(), ChattingDto.class);

            logClass.logMethod();
            System.out.println("전체 채팅 소켓 타입" + chattingDto.getMstype());
            // 메시지 타입이 5일 경우 (채팅방이 새로 생성됐을 때)
            if(chattingDto.getMstype() == 5){
                broadcastToClients("5");
            }
        } catch (IOException e) {
            System.out.println("Error: " + e);
        }
    }

    // 소켓 연결 종료
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        totalClients.remove(session);
        System.out.println("Total client 연결종료 : " + totalClients.size());
    }

    // 클라이언트로 리렌더링 요청 보내기
    private void broadcastToClients(String messageContent) {
        System.out.println("보낼 메세지" + messageContent);
        System.out.println("메세지를 보낼 소켓" + totalClients.toString());
        // 현재 소켓에 접속된 모든 소켓에 5 보내기(리렌더링 요청)
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