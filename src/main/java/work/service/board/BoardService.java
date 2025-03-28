package work.service.board;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.dto.board.BoardDto;
import work.model.dto.board.CommentDto;
import work.model.mapper.board.BoardMapper;
import work.model.mapper.board.CommentMapper;
import work.model.mapper.board.LikeMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    // 서비스와 매퍼 연결
    private final BoardMapper boardMapper;
    private final CommentMapper commentMapper;
    private final LikeMapper likeMapper;

    //[1]전체조회
    public PageInfo<BoardDto> allView(int page,int pageSize){
        System.out.println("BoardService.allView with paging");

        //페이지헬퍼로 페이징 처리 적용
        PageHelper.startPage(page,pageSize);
        //페이징이 적용된 게시물 목록 조회
        List<BoardDto> list =boardMapper.allView();
         list.forEach(b->{
             //게시물 하나씩 댓글 수 구하기
             int reuslt =commentMapper.ccount(b.getPid());
             b.setCcount(reuslt);

             //게시물 하나씩 좋아요 수 구하기
             int likeCount = likeMapper.lcount(b.getPid());
             b.setLcount(likeCount);
         });

         //pageInfo 객체 생성
        PageInfo<BoardDto>pageInfo = new PageInfo<>(list);
        System.out.println("page = " + page + ", pageSize = " + pageSize);
        System.out.println("BoardService.allView");
        return pageInfo;






    }
//    // 2. 회원별 보고서 조회( 페이징 적용 )
//    public PageInfo<ReportDto> findByMno(int page, int pageSize){
//        System.out.println("ReportService.findByMno with paging");
//
//
//        // PageHelper로 페이징 처리 적용
//        PageHelper.startPage( page, pageSize );
//        List<ReportDto> pagingResult = reportMapper.findByMno( );
//
//
//        // PageInfo의 pageSize가 정상적인지 확인
//        PageInfo<ReportDto> pageInfo = new PageInfo<>(pagingResult);
//        System.out.println("pageInfo = " + pageInfo);
//        System.out.println("PageHelper 적용 후 pageSize: " + pageInfo.getPageSize());
//
//        return pageInfo;
//    } // f end




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

        int likeCount = likeMapper.lcount(boardDto.getPid());
        boardDto.setLcount(likeCount);

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
