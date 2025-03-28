package work.controller.board;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import work.service.board.LikeService;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/work/board/like")
@RequiredArgsConstructor

public class LikeController {

    //서비스 사용하기 위해 객체주입
    private final LikeService likeService;




    //[2]좋아요 추가/취소
    @GetMapping("")
    public boolean likeUpdate(@RequestParam int pid , @RequestParam int mno){
         return likeService.likeUpdate( pid , mno );

    }



}
