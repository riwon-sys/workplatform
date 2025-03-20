package work.controller.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import work.model.dto.board.CommentDto;
import work.service.board.CommentService;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/work/reply")
@RequiredArgsConstructor
public class CommentController {
    //서비스 사용 하기위한 객체 주입
    private final CommentService commentService;

    //[1]댓글 등록
    @PostMapping("")
    public boolean CommentCreate(@RequestBody CommentDto commentDto){
        System.out.println("commentDto = " + commentDto);
        return commentService.CommentCreate(commentDto);

    }

    //[2]댓글 수정
    @PutMapping("")
    public boolean CommentUpdate(@RequestBody CommentDto commentDto){
        System.out.println("commentDto = " + commentDto);
        return commentService.CommentUpdate(commentDto);
    }

    //[3]댓글 삭제
    @DeleteMapping("")
    public boolean CommentDelete(@RequestParam int cid,@RequestParam int mno){
        System.out.println("CommentController.CommentDelete");
        System.out.println("cid = " + cid + ", mno = " + mno);
        return commentService.CommentDelete(cid,mno);
    }




}
