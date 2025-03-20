package work.service.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import work.model.dto.board.CommentDto;
import work.model.mapper.board.CommentMapper;

@Service
@RequiredArgsConstructor
public class CommentService {
    //서비스와 매퍼 연결
    private final CommentMapper commentMapper;



    //[1]댓글등록

    public boolean CommentCreate(CommentDto commentDto){return commentMapper.CommentCreate(commentDto);}


    //[2]댓글 수정

    public boolean CommentUpdate(CommentDto commentDto){
        System.out.println("commentDto = " + commentDto);
        System.out.println("CommentService.CommentUpdate");
        return commentMapper.CommentUpdate(commentDto);
    }


    //[3]댓글 삭제

    public boolean CommentDelete(int cid,int mno){
        System.out.println("cid = " + cid + ", mno = " + mno);
        System.out.println("CommentService.CommentDelete");
        return commentMapper.CommentDelete(cid,mno);
    }
}
