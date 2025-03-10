package work.config.chatting;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.model.dto.ChattingDto;
import work.model.dto.MessageDto.MessageDto;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    private static final Map< String, Set<WebSocketSession> > chatRooms = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session){
        System.out.println("사용자 ID : " + session.getId() );
    } // f end

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws IOException {
        String payload = msg.getPayload();
        System.out.println("session = " + session + ", 받은 메세지 = " + msg);

//        MessageDto msgDto = p;
    } // f end

    private void boradcastMsg( String rid, ChattingDto chattingDto )throws IOException{
        Set<WebSocketSession> sessions = rooms.get(rid);
        if( sessions != null ){
            for( WebSocketSession session : sessions ){
                if( session.isOpen() ){ // 연결돼 있는 경우에만 메세지 전송
                    session.sendMessage( new TextMessage( chattingDto.toJson() ));
                }
            }
        }
    } // f end

    private ChattingDto parseMsg( String payload ){
        return new ChattingDto();
    } // f end

}
