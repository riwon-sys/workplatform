package work.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final ChatSocket chatSocket;

    @Autowired
    public WebSocketConfig(ChatSocket chatSocket) {
        this.chatSocket = chatSocket;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // /chatConnect URL로 WebSocket을 처리하는 핸들러를 등록
        registry.addHandler(chatSocket, "/chatConnect").setAllowedOrigins("*");
    }
}



