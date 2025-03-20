package work.controller.member;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.model.dto.member.MemberDto;
import work.service.member.MemberService;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/workplatform")
public class MemberController {

  private final  MemberService memberService; // service 메소드를 사용하기 위한 객체 주입
    // [1] 사원 등록 // http://localhost:8080/workplatform/signup
    @PostMapping("/signup")
        // public boolean signUp(@RequestBody MemberDto memberDto){
        // {"mno":"700055","mname": "한웅재", "mphone": "010-1234-5678", "memail": "financeteam_sawon@example.com", "mrank": "사원" }
        public boolean signUp(MemberDto memberDto){ // multipart/form-data 사용; @RequestBody 생략
        System.out.println("MemberController.signUp");
        System.out.println("memberDto = " + memberDto);
        
        // return memberService.signUp(memberDto);  //    return true; // 성공시 true, 실패시 false
        boolean result = memberService.signUp(memberDto);
        System.out.println("result = " + result);
        return result; // 성공시 true, 실패시 false
        
        }

    // [2] 사원 로그인 // http://localhost:8080/workplatform/login
    // 로그인 세션 처리 기능 추가
    @PostMapping("/login")
        public boolean onLogIn(@RequestBody MemberDto memberDto , HttpServletRequest req){
        // {"mno": "700055", "mpwd": "1234"}

        System.out.println("MemberController.onLogIn");
        System.out.println("memberDto = " + memberDto);
        MemberDto result = memberService.onLogIn(memberDto); // 성공시 MemberDto, 실패시 null
        if( result ==null){return false;} // 로그인 서비스 결과가 null 이면 로그인 실패
        else{ // 서비스 결과가 null 이 아니면 로그인 성공 => 세션에 로그인 성공한 결과를 MemberDto 를 저장
            HttpSession session = req.getSession(); // 세션을 호출
            session.setAttribute("memberDto" , result); // 세션 객체 내 새로운 속성 추가 로그인 성공한 결과를 meberDto 라는 이름으로 저장
            session.setMaxInactiveInterval(60*10); // 세션 유지 시간(초) 60x10 은 10분
            return true; // 로그인 성공
        } // e e
    } // f e

    // [3] 사원 로그아웃 // http://localhost:8080/workplatform/logout
    // 로그아웃 세션 처리 삭제 기능 추가
    // @DeleteMapping("/logout")

   /* public void offLogOut() {
        // {x}
        memberService.offLogOut();
        System.out.println("MemberController.offLogOut: 로그아웃 요청 완료");
    }
   */
    @GetMapping("/logout")
    public boolean offLogOut(HttpServletRequest request){
        HttpSession session = request.getSession(); // 1. 세션 호출
        if( session == null ) return false;
        // session.invalidate(); // 2. 세션 내 전체 속성 초기화 한다.
        session.removeAttribute("memberDto"); // 3. 세션 내 특정 속성만 초기화 한다.

        return true; // 로그아웃 성공
    }
    // [3-2] 사원 로그인 상태 확인 및 내정보 보기(마이페이지 기능) http://localhost:8080/workplatform/myinfo
    @GetMapping("/myinfo")
    public MemberDto myInfo( HttpServletRequest request ){
        HttpSession session = request.getSession(); // 1. 세션 호출
        if( session == null ) return null; // 2. 만약에 세션이 존재하지 않으면 null 반환
        Object object = session.getAttribute("memberDto"); // 3.로그인 성공시 저장한 loginDto 의 로그인정보를 꺼낸다.
        MemberDto memberDto = (MemberDto)object; // 세션에 저장된 자료들을 모두 Object 타입 이므로 타입 변환 한다.
        return memberDto; // 5. 로그인된 정보 반환
    }

    // [4] 사원 전체 조회 // http://localhost:8080/workplatform/allmembers
    // 쿼리스트링 없이 호출시 : SELECT * FROM member
    // 쿼리스트링 넣고 호출시 : SELECT * FROM member WHERE mrank = #{mrank} and mno = '#{mno}/100000%'
    @GetMapping("/allmembers")
    public List<MemberDto> getAllMembers(@RequestParam(required = false) String mrank,
                                         @RequestParam(required = false) Integer mno){

       /*
       [
        {"mno": "700055,"mname": "한웅재","mphone": "010-9999-0000","memail": "financeteam_sawon@example.com","mrank": "사원","mprofile": "default.jpg","mtype": 0},
        {"mno": "300022,"mname": "서진석","mphone": "010-6555-6555","memail": "salesteam_sawon@example.com","mrank": "사원","mprofile": "default.jpg","mtype": 2},
        {"mno": "300023,"mname": "김현수","mphone": "010-7666-7666","memail": "salesteam_sawon@example.com","mrank": "사원","mprofile": "default.jpg","mtype": 3},
        ]
       */

        System.out.println("MemberController.getAllMembers");
        System.out.println("mrank = " + mrank + ", mno = " + mno);
        return memberService.getAllMembers(mrank, mno);
    }

    // [5] 사원 수정  // http://localhost:8080/workplatform/update
    @PutMapping("/update")
    public void updateMember(@RequestBody MemberDto memberDto){

        System.out.println("MemberController.updateMember");

    }




}
