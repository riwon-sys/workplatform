package work.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


// @Configuration // 스프링 컨테이너에 빈 등록
// @EnableWebSocket // 웹소켓 매핑
/*public class WebSocketHandlers implements WebSocketConfigurer {

    private final ChatSocket chatSocket;

    @Autowired
    public WebSocketHandlers(ChatSocket chatSocket ) {
        this.chatSocket = chatSocket;
    } // f end

    @Override // 웹소켓 매핑 등록
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry ){

        // 웹소켓으로 요청된 url 을 핸들러 할 곳 지정
        registry.addHandler( chatSocket, "/chatConnect").setAllowedOrigins("*");
    } // f end

}
*/