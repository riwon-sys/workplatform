package work.config.report;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.model.dto.ChattingDto;
import work.model.dto.report.ReportDto;
import work.model.mapper.report.ApprovalMapper;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class ReportSocket extends TextWebSocketHandler {

    private final ObjectMapper mapper = new ObjectMapper();
    // 보고서 접속 소켓
    private final Set<WebSocketSession> reportClients = new HashSet<>();

    private final ApprovalMapper approvalMapper;
    // 보고서소켓 접속

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        reportClients.add(session);
        System.out.println("Report Client Connected : " + reportClients.size());
        System.out.println("보고서소켓 연결 성공");
    }

    //

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        try{
            ReportDto reportDto = mapper.readValue(message.getPayload(), ReportDto.class);

            if(reportDto != null){
                broadcastToClients(reportDto);
            }

        }catch (Exception e){
            System.out.println(e);
        }


    }

    // 소켓 연결 종료

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        reportClients.remove(session);
        System.out.println("Report Client 연결종료 : " + reportClients.size());
    }

    // 소켓에 메시지 보내기
    private void broadcastToClients(ReportDto reportDto) {

        if (reportClients != null && !reportClients.isEmpty()) {
            try {
                // List<ReportDto>를 하나의 JSON 배열로 변환
                String jsonResult = mapper.writeValueAsString(reportDto);

                // 모든 클라이언트에게 한 번에 메시지 전송
                for (WebSocketSession session : reportClients) {
                    try {
                        session.sendMessage(new TextMessage(jsonResult));
                    } catch (IOException e) {
                        System.out.println("메시지 전송 실패: " + e.getMessage());
                    }
                }
            } catch (IOException e) {
                System.out.println("JSON 직렬화 오류: " + e.getMessage());
            }
        } else {
            System.out.println("전송할 클라이언트가 없습니다.");
        }
    }

}
