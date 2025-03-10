package work.config.chatting;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import work.model.dto.ChattingDto;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class WebSocket extends TextWebSocketHandler {
    // Set : 순서 x, 중복 x
    private static final Map< String, Set<WebSocketSession> > rooms = new HashMap<>();

    @Override
    public void afterConnectionEstablished( WebSocketSession session ){
        System.out.println("채팅방 입장");
    } // f end

    @Override
    public void handlerTextMessage( WebSocketSession session, TextMessage msg ) throws IOException{
        String payload = msg.getPayload();
        System.out.println("session = " + session + ", 받은 메세지 = " + msg);

        ChattingDto chattingDto = parseMsg(payload);
        String rid =

        rooms.putIfAbsent( rid, new HashSet<>() );



    } // f end

    @Override
    public afterConnectionClosed(WebSocketSession session, ChattingDto){
        System.out.println( "연결 종료" + session.getId() );

        rooms.values().forEach( sessions -> session.remove(session) );
    } // f end

    private ChattingDto parseMsg( String payload ){
        return new ChattingDto();
    } // f end


}
