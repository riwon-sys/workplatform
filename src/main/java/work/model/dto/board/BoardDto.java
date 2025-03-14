package work.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {

    private int pid;
    private String title;
    private String content;
    private int views;

//    @Builder.Default
    private int mno;



}
