package work.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class TotalSocketMapping implements WebSocketConfigurer {

    @Autowired
    private  TotalSocket totalSocket;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(totalSocket, "/totalConnect")
               .setAllowedOriginPatterns("*");

        System.out.println("전체 소켓 접속");
    }
}
