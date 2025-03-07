package work.model.dto;

import lombok.*;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ChattingDto {
    private int rno;
    private String mname;
    private String mscontent;
    private String msDate;
    private int mstype;
    // 0 : 메세지 1 : 파일
}
