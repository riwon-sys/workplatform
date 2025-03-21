package work.config.Browser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class BrowserSocketMapping implements WebSocketConfigurer {

    @Autowired
    private BrowserSokcet browserSokcet;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(browserSokcet, "/browserConnect")
           .setAllowedOrigins("*");

        System.out.println("브라우저 소켓 연결");
    }
}
