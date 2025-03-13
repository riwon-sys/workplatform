package work.service.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import work.model.dto.member.MemberDto;
import work.model.mapper.member.MemberMapper;

@Service
public class MemberService {
    @Autowired MemberMapper memberMapper;
    // [1] 사원 등록
    public boolean signUP( MemberDto memberDto ){

        return memberMapper.signUP(memberDto);

    }
    // [2] 사원 로그인
    public boolean login(MemberDto memberDto ){

        return true;

    }

}
