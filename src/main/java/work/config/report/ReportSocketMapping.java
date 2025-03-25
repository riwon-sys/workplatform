package work.config.report;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class ReportSocketMapping  implements WebSocketConfigurer {

    private  final ReportSocket reportSocket;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(reportSocket, "/reportConnect")
           .setAllowedOrigins("*");

        System.out.println("보고서 소켓 접속");
    }
}
