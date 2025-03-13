package work.controller.member;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.model.dto.member.MemberDto;
import work.service.member.MemberService;

@RestController
@RequestMapping("/workplatform")
public class MemberController {

@Autowired private MemberService memberService;
    // [1] 사원 등록 // http://localhost:8080/workplatform/signup
    @PostMapping("/signup")
        public boolean signUp(@RequestBody MemberDto memberDto){
        // {"mno":"700055","mname": "한웅재", "mphone": "010-9999-0000", "memail": "financeteam_sawon@example.com", "mrank": "사원" }

        System.out.println("MemberController.signUP");
        System.out.println("memberDto = " + memberDto);
        //    return true; // 성공시 true, 실패시 false
         return memberService.signUP(memberDto);
        }

    // [2] 사원 로그인 // http://localhost:8080/workplatform/login
    @PostMapping("/login")
        public boolean logIn(@RequestBody MemberDto memberDto){
        // {"mno": "700055", "mpwd": "1234"}

        System.out.println("MemberController.logIn");
        System.out.println("memberDto = " + memberDto);
        return true; // 성공시 true, 실패시 false
    }
}
