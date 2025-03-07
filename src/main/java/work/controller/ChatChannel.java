package work.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;
import work.model.dto.ChatMessageDto;
import work.model.dto.MessageType;

import java.util.HashMap;
import java.util.Map;

@Getter @Setter
public class ChatChannel {
    private String url;
    private Map<WebSocketSession, String> sessions = new HashMap<>();

    public static ChatChannel create( String url ) {
        ChatChannel channel = new ChatChannel();
        channel.url = url;

        return channel;
    } // f end

    public void handleMessage( WebSocketSession session, ChatMessageDto chatMsg ) throws Exception {
        if(chatMsg.getType() == MessageType.OPEN) {
            sessions.put(session, chatMsg.getMname());
            chatMsg.setMessage(chatMsg.getMname() + "님이 입장하셨습니다.");
        }else if(chatMsg.getType() == MessageType.CLOSE) {
            sessions.remove(session);
            chatMsg.setMessage(chatMsg.getMname() + "님이 퇴장하셨습니다.");
        }else{
            chatMsg.setMessage(chatMsg.getMessage());
        }
        send(chatMsg);
    } // f end

    private void send( ChatMessageDto chatMsg ) throws Exception {

    } // f end

}
