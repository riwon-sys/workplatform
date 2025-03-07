package work.config;

import io.micrometer.observation.annotation.Observed;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static  final Logger logger = LoggerFactory.getLogger(ChatWebSocketHandler.class);

    private Map<String, WebSocketSession> sessioinMap = new ConcurrentHashMap<>();

    // 메세지 받기
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();

        // DB 에 보내는 거 추가
    }

    // 클라이언트와 연결 시
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String mno = getUserIdFromSession(session);
        sessioinMap.put(mno, session);

        logger.info("connected " + mno);
    }

    // 메세지 처리
    private void processMsg(WebSocketSession session, String msg){

        String mno = getUserIdFromSession(session);

        // DB 로 보내는 거 추가

        for (Map.Entry<String, WebSocketSession> entry : sessioinMap.entrySet()) {
            WebSocketSession wsSession = entry.getValue();
            if (wsSession.isOpen() && !wsSession.getId().equals(session.getId())) {
                try {
                    wsSession.sendMessage(new TextMessage(msg));
                } catch (IOException e) {
                    System.out.println("error : " + e.getMessage());
                }
            }
        }
    }

}


