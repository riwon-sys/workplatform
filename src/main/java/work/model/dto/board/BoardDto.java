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
    private int category_id;   //카테고리 번호
    private String category_name; // 카테고리 이름
    private int ccount;  //댓글 개수
    private int lcount; //좋아요 개수

//    @Builder.Default
    private int mno;

    //+댓글 리스트 : 하나의 게시물의 여러개 댓글을 담는다.
    private List<CommentDto> commentList;



}
