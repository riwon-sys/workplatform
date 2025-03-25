package work.service.board;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.dto.board.BoardDto;
import work.model.dto.board.CommentDto;
import work.model.mapper.board.BoardMapper;
import work.model.mapper.board.CommentMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    // 서비스와 매퍼 연결
    private final BoardMapper boardMapper;
    private final CommentMapper commentMapper;

    //[1]전체조회
    public List<BoardDto>allView(){
        System.out.println("BoardService.allView");
        return boardMapper.allView();
    }


    //[2]게시물 등록
    public boolean boardCreate(BoardDto boardDto){
        return boardMapper.boardCreate(boardDto);
    }

    //[3]게시물 상세조회
    public BoardDto boardView(int pid){
        System.out.println("BoardService.boardView");
        System.out.println("pid = " + pid);

        //1.pid 에 해당하는 게시물 조회
        BoardDto boardDto = boardMapper.boardView(pid);
        //2.조회한 게시물의 댓글 리스트 조회
        List<CommentDto> commentDto = commentMapper.CommentFindAll(pid);
        //3.조회된 댓글 리스트를 게시물 dto에 담기
        boardDto.setCommentList(commentDto);
        return boardDto;
    }

    //[4]게시물 수정
    public boolean boardUpdate(BoardDto boardDto){
        System.out.println("BoardService.boardUpdate");
        System.out.println("boardDto = " + boardDto);

//        //mno 가 제공되지 않는 경우 기존 값 유지;
//        if(boardDto.getMno()<= 0){
//            BoardDto existingBoard = boardMapper.boardView(boardDto.getPid());
//            if(existingBoard !=null){
//                boardDto.setMno(existingBoard.getMno());
//            }else {
//                return false;
//            }
//        }

        return boardMapper.boardUpdate(boardDto);
    }



    //[5]게시물 삭제
    public boolean boardDelete(int pid , int mno){
        System.out.println("BoardService.boardDelete");
        System.out.println("pid = " + pid + ", mno = " + mno);
        return boardMapper.boardDelete(pid,mno);
    }
}
