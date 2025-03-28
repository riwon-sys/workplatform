package work.controller.board;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import work.model.dto.board.BoardDto;
import work.model.dto.member.MemberDto;
import work.model.dto.member.MemberUtils;
import work.model.dto.report.ReportDto;
import work.model.mapper.board.BoardMapper;
import work.service.board.BoardService;

import java.util.List;

@CrossOrigin("http://localhost:5173")//리액트 포트 도메인 허용
@RestController
@RequestMapping("/work/board")
@RequiredArgsConstructor
public class BoardController {
    //서비스 사용하기 위한 객체주입gg
   private final BoardService boardService;

    //[1]게시물 전체 조회
    @GetMapping("")
    public PageInfo<BoardDto>allView(@RequestParam(defaultValue = "1")int page,@RequestParam(defaultValue ="10")int pageSize){
        System.out.println("BoardController.allView");
        System.out.println("page = " + page + ", pageSize = " + pageSize);
        return boardService.allView(page,pageSize);

    }



    //[2]게시물 등록
    @PostMapping("")
    public boolean boardCreate(@RequestBody BoardDto boardDto){
        System.out.println("BoardController.boardCreate");
        return boardService.boardCreate(boardDto);

    }

    //[3]게시물 상세조회

    @GetMapping("/view")
    public BoardDto boardView(@RequestParam int pid){
        System.out.println("BoardController.boardView");
        System.out.println("pid = " + pid);
        return boardService.boardView(pid);
    }


    //[4]게시물 수정
    @PutMapping("")
    public boolean boardUpdate(@RequestBody BoardDto boardDto){
        System.out.println("BoardController.boardUpdate");

        return boardService.boardUpdate(boardDto);

    }

    //[5]게시물 삭제
    @DeleteMapping("")
    public boolean boardDelete(@RequestParam int pid , @RequestParam int mno){
        System.out.println("BoardController.boardDelete");
        System.out.println("BoardController.boardDelete");
        return boardService.boardDelete(pid,mno);
    }



}//c end
