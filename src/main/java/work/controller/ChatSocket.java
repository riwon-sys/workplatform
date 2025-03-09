package work.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Vector;
/*
@Component
public class ChatSocket extends TextWebSocketHandler {

    // 접속 성공한 session들을 모아두기( 접속명단 )
    private List<WebSocketSession> chatList = new Vector<>();

    // 클라이언트의 소켓이 접속 성공일 때( session : 접속한 클라이언트의 소켓 정보 )
    @Override
    public void afterConnectionEstablished( WebSocketSession session ) throws Exception {
        // 접속한 세션정보를 리스트에 담기
        chatList.add(session);
        System.out.println("session = " + session);
    } // f end

    // 클라이언트로부터 메세지를 받았을 때( session : 메세지를 보낸 클라이언트의 소켓, message : 클라이언트가 바디은 메세지 )
    @Override
    protected void handleTextMessage( WebSocketSession session, TextMessage message ) throws Exception {
        System.out.println("session = " + session + ", message = " + message);
        System.out.println("message =" + message.getPayload() );
        // 접속명단의 클라이언트 소켓 : 접속명단
        for( WebSocketSession chatSocket : chatList ){
            chatSocket.sendMessage( message );
        } // for end
    } // f end

    // 클라이언트 소켓과 접속 종료되었을 때( session : 접속이 종료된 클라이언트 소켓 정보 )
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status ) throws Exception {
         chatList.remove( session );
    } // f end

}
*/