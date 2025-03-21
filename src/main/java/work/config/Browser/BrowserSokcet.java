package work.config.Browser;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.log.LogReader;
import work.model.dto.ChattingDto;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class BrowserSokcet extends TextWebSocketHandler {

    // 브라우저 접속 소켓
    private final Set<WebSocketSession> browserClients = new HashSet<>();

    private final LogReader logReader = new LogReader();
    ChattingDto logList = logReader.readLastLog();
    // 브라우저 소켓 접속
    @Override
    public  void  afterConnectionEstablished(WebSocketSession session) throws Exception{
        browserClients.add(session);
        System.out.println("브라우저 소켓 연결 성공");

    }

    // 브라우저 소켓 접속 종료
    @Override
    public void  afterConnectionClosed(WebSocketSession session, CloseStatus status) throws  Exception{
        browserClients.remove(session);
        System.out.println("브라우저 소켓 연결 종료");
    }

//    // 로그를 클라이언트에게 전송하는 메소드
//    private void sendLogsToClient(WebSocketSession session) throws IOException {
//        try {
//            List<ChattingDto> logList = logReader.readLastLog(); // 마지막 로그 읽기
//            for (String log : logList) {
//                session.sendMessage(new TextMessage(log));  // 로그 메시지 보내기
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    ObjectMapper mapper = new ObjectMapper();
    // 클라이언트 소켓으로 로그를 보내는 메소드
    public void broadcastToBrowser() {
        // 모든 클라이언트 소켓에 로그 메시지 전송
        for (WebSocketSession client : browserClients) {
            try {
                // 마지막 로그 한 줄을 ChattingDto로 가져옴
                ChattingDto log = logReader.readLastLog();

                if (log != null) {
                    // ObjectMapper를 사용하여 ChattingDto 객체를 JSON 문자열로 변환
                    ObjectMapper mapper = new ObjectMapper();
                    String jsonLog = mapper.writeValueAsString(log);

                    // 변환된 JSON 문자열을 클라이언트에 전송
                    client.sendMessage(new TextMessage(jsonLog));
                    System.out.println("로그보내기 성공********");
                } else {
                    System.out.println("마지막 로그가 없습니다.");
                }
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("로그 보내기 실패");
            }
        }
    }



}
