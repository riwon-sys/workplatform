package work.service.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.dto.board.BoardDto;
import work.model.mapper.board.BoardMapper;

import java.util.List;

@Service
public class BoardService {
    // 서비스와 매퍼 연결
    @Autowired private BoardMapper boardMapper;

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
        return boardMapper.boardView(pid);
    }

    //[4]게시물 수정
    public boolean boardUpdate(BoardDto boardDto){
        System.out.println("BoardService.boardUpdate");
        System.out.println("boardDto = " + boardDto);

//        //mno 가 제공되지 않는 경우 기존 값 윶;
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
    public boolean boardDelete(int pid){
        System.out.println("BoardService.boardDelete");
        System.out.println("pid = " + pid);
        return boardMapper.boardDelete(pid);
    }
}
