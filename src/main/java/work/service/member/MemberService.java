package work.service.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import work.model.dto.member.MemberDto;
import work.model.mapper.member.MemberMapper;

import java.util.List;

@Service
public class MemberService {
    @Autowired MemberMapper memberMapper;
    // [1] 사원 등록
    public boolean signUp( MemberDto memberDto ){
        System.out.println("memberDto = " + memberDto);
        return memberMapper.signUp(memberDto);

    }
    // [2] 사원 로그인
    public boolean onLogIn(MemberDto memberDto ){
        return memberMapper.onLogIn(memberDto);

    }

    // [3] 사원 로그아웃
    public void offLogOut(){
        System.out.println("MemberService.offLogOut: 로그아웃 처리됨");
    }

    // [4] 사원 전체 조회
    public List<MemberDto> getAllMembers(){
        System.out.println("MemberService.getAllMembers");
        return null;
    }



}
