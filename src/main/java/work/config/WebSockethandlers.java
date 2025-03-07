package work.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import work.controller.ChatSocket;

@Configuration
@EnableWebSocket
public class WebSocketHandlers implements WebSocketConfigurer {

    private final ChatSocket chatSocket;

    @Autowired
    public WebSocketHandlers( ChatSocket chatSocket ) {
        this.chatSocket = chatSocket;
    } // f end

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry ){
        registry.addHandler( chatSocket, "/chatConnect");
    } // f end

}
