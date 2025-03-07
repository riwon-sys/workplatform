package work.model.dto;

import lombok.*;

import java.util.Date;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ChatMessageDto {
    private String chatUrl;
    private String mname;
    private String message;
    private Date insertDate;
    private MessageType type;
}
