package work.controller.report;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.model.dto.member.MemberDto;
import work.model.dto.member.MemberUtils;
import work.model.dto.report.ApprovalDto;
import work.service.report.ApprovalService;

import java.util.List;

@RestController
@RequestMapping("/api/approval")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    // 1. 결재자 목록 등록
    @PostMapping
    public boolean write(ApprovalDto approvalDto, HttpServletRequest req){
        System.out.println("ApprovalController.write");
        System.out.println("approvalDto = " + approvalDto);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonaplist = approvalDto.getJsonaplist();

        // loginMno 가져오기
        int loginMno;
        if( MemberUtils.getLoginInfo(req) == null  ){
            System.out.println("로그인 정보가 없음");
            return false;
        } // if end

        MemberDto memberDto = MemberUtils.getLoginInfo(req);
        loginMno = memberDto.getMno();
        System.out.println("loginMno = " + loginMno);

        // aplist 객체로 변환
        try{
            List<ApprovalDto> aplist = objectMapper.readValue(jsonaplist, new TypeReference<List<ApprovalDto>>() {});
            approvalDto.setAplist( aplist );
        }catch ( Exception e ){ System.out.println( e ); }

        return approvalService.write(approvalDto, loginMno);
    } // f end

    // 2. 승인 전체 목록 조회
    @GetMapping
    public List<ApprovalDto> findApproval(@RequestParam Integer rpno){
        System.out.println("ApprovalController.findAll");
        int mno = 100007;
        System.out.println("mno = " + mno + ", rpno = " + rpno);
        return approvalService.findApproval(mno, rpno);
    } // f end


}
