package work.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import work.model.dto.member.MemberDto;
import work.model.dto.member.MemberUtils;
import work.model.mapper.member.MemberMapper;
import work.service.message.FileService;

import java.util.List;

@RequiredArgsConstructor
@Service

public class MemberService {

    private final MemberMapper memberMapper;
    private final FileService fileService; // 파일 서비스 (업로드,다운로드,파일삭제) 기능 포함
    // [1] 사원 등록
    public boolean signUp( MemberDto memberDto ){
        System.out.println("MemberService.signUp");
        System.out.println("memberDto = " + memberDto);
        try{
            // (1) 첨부파일 존재 여부
            if(memberDto.getUploadFile()==null){
            } // 업로드가 X
            else{ // 업로드 O
                // (2) 파일 서비스 내에 업로드 함수를 이용하여 첨부파일 업로드하고 파일명 받기.
                String filename = fileService.fileUpload(memberDto.getUploadFile());
                // (3) 업로드된 파일명을 dto 저장
                memberDto.setMprofile(filename);
            }
        boolean result=memberMapper.signUp(memberDto);
            System.out.println("result = " + result);
            return result;
        } catch (Exception e) {
            System.out.println(e); return false; }
    }

    // [2] 사원 로그인
    // 로그인 세션 처리 기능 추가
    public MemberDto onLogIn(MemberDto memberDto ){
        System.out.println("MemberService.onLogIn");
        System.out.println("memberDto = " + memberDto);
        // return false;
        MemberDto result = memberMapper.onLogIn(memberDto);

        String part = MemberUtils.getDepartmentFromMno( result.getMno() );
        result.setDepartment( part );

        System.out.println(result);
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

        List<MemberDto> result = memberMapper.getAllMembers(mrank, mno);
        for( MemberDto memberDto : result ){
            String part = MemberUtils.getDepartmentFromMno( memberDto.getMno() );
            memberDto.setDepartment( part );
        } // f end

        return result;
    }



}
