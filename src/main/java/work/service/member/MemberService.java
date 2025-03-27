package work.service.member;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import work.model.dto.member.MemberDto;
import work.model.dto.member.MemberUtils;
import work.model.mapper.member.MemberMapper;
import work.service.message.FileService;

import java.util.List;
import java.util.Map;

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
            // (4) 비크립트 라이브러리 사용 | rw 25-03-21
                // (4-(1)) 비크립트 객체 생성 , new BCryptoPasswordEncoer();
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                // (4-(2)) 비밀번호 암호화 ( 자료에 encode )
            String hashedPassword = passwordEncoder.encode( "1234" );
            System.out.println( "hashedPassword = " + hashedPassword );
                // (4-(3)) dto 에 encode 된 비밀번호 저장
            memberDto.setMpwd( hashedPassword );




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
        // MemberDto result = memberMapper.onLogIn(memberDto);


        // (1) 암호화된 진짜 비밀번호는 DB존재
        // (2) 로그인에서 입력받은 아이디의 암호화 비밀번호 갖고오기
        String password = memberMapper.findPassword (memberDto.getMno() );
        if( password == null ) return null;
        // (3) 로그인에서 입력받은 비밀번호와 암호화된 비밀번호 검증하기
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // 1. 비크립트 객체 생성
        boolean result = passwordEncoder.matches( memberDto.getMpwd(), password ); // 2. 로그인에 입력받은 자료와 db에 가져온 해시 값 검증
        if( result == false ) return null;

        // (4) 로그인에서 입력한 아이디와 비밀번호가 모두 일치하면 회원정보 가져오기

        MemberDto result2 = memberMapper.onLogIn( memberDto );
        String part = MemberUtils.getDepartmentFromMno( result2.getMno() );
        result2.setDepartment( part );
        return result2;

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
    // [5] 사원 수정 | rw 25-03-26 생성
    public boolean updateMember(MemberDto memberDto) {
        System.out.println("MemberService.updateMember");

        // 1. 현재 비밀번호 조회
        String currentEncryptedPwd = memberMapper.getCurrentPassword(memberDto.getMno());

        // 2. 기존 비밀번호 비교
        if (!BCrypt.checkpw(memberDto.getMoldPwd(), currentEncryptedPwd)) {
            throw new RuntimeException("기존 비밀번호가 일치하지 않습니다.");
        }

        // 3. 새 비밀번호 암호화
        String newEncryptedPwd = BCrypt.hashpw(memberDto.getMpwd(), BCrypt.gensalt());
        memberDto.setMpwd(newEncryptedPwd);

        // 4. moldPwd도 암호화 상태로 저장
        String encryptedOldPwd = BCrypt.hashpw(memberDto.getMoldPwd(), BCrypt.gensalt());
        memberDto.setMoldPwd(encryptedOldPwd);

        // 5. 연락처 중복 검사
        int count = memberMapper.checkPhoneDuplicate(memberDto.getMphone(), memberDto.getMno());
        if (count > 0) {
            throw new RuntimeException("이미 사용 중인 전화번호입니다.");
        }

        // 6. 최종 수정 실행
        return memberMapper.updateMember(memberDto);
    }

    // [6] 부서별 조회
    // 매월 1일 자정에 실행
    @Scheduled( cron = "0 0 0 1 */1 *" )
    @Transactional( rollbackFor = Exception.class )
    public List<MemberDto> memberByPart() {
        System.out.println("MemberService.memberByPart");
        List<MemberDto> partList = memberMapper.memberByPart();
        for( MemberDto memberDto : partList ){
            int partNum = memberDto.getPartnum();
            String part = MemberUtils.getDepartmentFromMno( partNum * 100000 );
            memberDto.setDepartment( part );
        } // for end

        System.out.println(partList.toString());
        return partList;
    } // f end

    // [7] 직급별 조회
    // 매월 1일 자정에 실행
    @Scheduled( cron = "0 0 0 1 */1 *" )
    @Transactional( rollbackFor = Exception.class )
    public List<MemberDto> memberByRank() {
        System.out.println("MemberService.memberByRank");
        List<MemberDto> divList = memberMapper.memberByPart();

        System.out.println(divList);
        return divList;
    } // f end

}
