package work.controller.member;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.model.dto.member.MemberDto;
import work.service.member.MemberService;

import java.util.List;

@RestController
@RequestMapping("/workplatform")
public class MemberController {

@Autowired private MemberService memberService; // service 메소드를 사용하기 위한 객체 주입
    // [1] 사원 등록 // http://localhost:8080/workplatform/signup
    @PostMapping("/signup")
        public boolean signUp(@RequestBody MemberDto memberDto){
        // {"mno":"700055","mname": "한웅재", "mphone": "010-1234-5678", "memail": "financeteam_sawon@example.com", "mrank": "사원" }

        System.out.println("MemberController.signUp");
        System.out.println("memberDto = " + memberDto);

         return memberService.signUp(memberDto);  //    return true; // 성공시 true, 실패시 false
        }

    // [2] 사원 로그인 // http://localhost:8080/workplatform/login
    @PostMapping("/login")
        public boolean onLogIn(@RequestBody MemberDto memberDto){
        // {"mno": "700055", "mpwd": "1234"}

        System.out.println("MemberController.onLogIn");
        System.out.println("memberDto = " + memberDto);

        return memberService.onLogIn(memberDto); // 성공시 true, 실패시 false
    }

    // [3] 사원 로그아웃 // http://localhost:8080/workplatform/logout
    @DeleteMapping("/logout")
    public void offLogOut() {
        // {x}
        memberService.offLogOut();
        System.out.println("MemberController.offLogOut: 로그아웃 요청 완료");
    }

    // [4] 사원 전체 조회 // http://localhost:8080/workplatform/allmembers
    @GetMapping("/allmembers")
    public List<MemberDto> getAllMembers(){

       /*
       [
        {"mno": "700055,"mname": "한웅재","mphone": "010-9999-0000","memail": "financeteam_sawon@example.com","mrank": "사원","mprofile": "default.jpg","mtype": 0},
        {"mno": "300022,"mname": "서진석","mphone": "010-6555-6555","memail": "salesteam_sawon@example.com","mrank": "사원","mprofile": "default.jpg","mtype": 2},
        {"mno": "300023,"mname": "김현수","mphone": "010-7666-7666","memail": "salesteam_sawon@example.com","mrank": "사원","mprofile": "default.jpg","mtype": 3},
        ]
       */

        System.out.println("MemberController.getAllMembers");
        return null;
    }

    // [5] 사원 수정  // http://localhost:8080/workplatform/update
    @PutMapping("/update")
    public void updateMember(@RequestBody MemberDto memberDto){

        System.out.println("MemberController.updateMember");

    }

}
