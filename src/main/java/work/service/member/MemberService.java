package work.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import work.model.dto.member.MemberDto;
import work.model.mapper.member.MemberMapper;

import java.util.List;

@RequiredArgsConstructor
@Service

public class MemberService {

    private final MemberMapper memberMapper;
    // [1] 사원 등록
    public boolean signUp( MemberDto memberDto ){
        System.out.println("memberDto = " + memberDto);
        return memberMapper.signUp(memberDto);

    }
    // [2] 사원 로그인
    // 로그인 세션 처리 기능 추가
    public MemberDto onLogIn(MemberDto memberDto ){
        System.out.println("MemberService.onLogIn");
        System.out.println("memberDto = " + memberDto);
        // return false;
        MemberDto result = memberMapper.onLogIn(memberDto);
        return result;

    }

    // [3] 사원 로그아웃
    public void offLogOut(){
        System.out.println("MemberService.offLogOut: 로그아웃 처리됨");
    }

    // [4] 사원 전체 조회
    public List<MemberDto> getAllMembers(String mrank, Integer mno){
        System.out.println("MemberService.getAllMembers");
        System.out.println("mrank = " + mrank + ", mno = " + mno);
        return memberMapper.getAllMembers(mrank, mno);
    }



}
