package work.model.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ChattingDto {
    private String rid;
    private String mname;
    private String mscontent;
    private int rno;
    private String msDate;
    private int mstype;
    // 0 : 메세지 1 : 파일

    public String toJson() throws Exception{
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    } // f end
}
