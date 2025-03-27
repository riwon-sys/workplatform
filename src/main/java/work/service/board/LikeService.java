package work.service.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import work.model.mapper.board.LikeMapper;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeMapper likeMapper;


    //[2]좋아요 추가/취소
    @GetMapping("")
    public boolean likeUpdate( int pid ,  int mno){

        // 1.  pid 와 mno가 조회
        Object view = likeMapper.likeView(pid, mno);
        // 2. 존재하면 삭제
        if(view != null){
            likeMapper.likeDelete(pid,mno);
            return false;
        }
        // 3. 존재하지 않으면 추가
        else {
            likeMapper.likeAdd(pid,mno);
            return true;
        }
    }



}
