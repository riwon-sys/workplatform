package work.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

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
    private int category;   //카테고리
    private String category_name;

//    @Builder.Default
    private int mno;

    //+댓글 리스트 : 하나의 게시물의 여러개 댓글을 담는다.
    private List<CommentDto> commentList;



}
