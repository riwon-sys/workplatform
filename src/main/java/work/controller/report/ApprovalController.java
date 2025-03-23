package work.controller.report;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageInfo;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import work.model.dto.member.MemberDto;
import work.model.dto.member.MemberUtils;
import work.model.dto.report.ApprovalDto;
import work.model.dto.report.ReportDto;
import work.service.report.ApprovalService;

import java.util.List;

@RestController
@RequestMapping("/api/approval")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    // 1. 결재자 목록 등록
    @PostMapping
    public boolean write( ApprovalDto approvalDto, HttpServletRequest req ){
        System.out.println("ApprovalController.write");
        System.out.println("approvalDto = " + approvalDto);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonaplist = approvalDto.getJsonaplist();

        // loginMno 가져오기
        if( MemberUtils.getLoginInfo(req) == null  ){
            System.out.println("로그인 정보가 없음");
            return false;
        } // if end

        MemberDto memberDto = MemberUtils.getLoginInfo(req);
        int loginMno = memberDto.getMno();
        System.out.println("loginMno = " + loginMno);

        // aplist 객체로 변환
        try{
            List<ApprovalDto> aplist = objectMapper.readValue(jsonaplist, new TypeReference<List<ApprovalDto>>() {});
            approvalDto.setAplist( aplist );
        }catch ( Exception e ){ System.out.println( e ); }

        return approvalService.write(approvalDto, loginMno);
    } // f end

    // 2. 결재 전체 목록 조회
    @GetMapping
    public List<ApprovalDto> findApproval( @RequestParam Integer rpno,
                                          HttpServletRequest req ){
        System.out.println("ApprovalController.findAll");

        // loginMno 가져오기
        if( MemberUtils.getLoginInfo(req) == null  ){
            System.out.println("로그인 정보가 없음");
            return null;
        } // if end

        MemberDto memberDto = MemberUtils.getLoginInfo(req);
        int loginMno = memberDto.getMno();

        System.out.println("loginMno = " + loginMno + ", rpno = " + rpno);
        return approvalService.findApproval(loginMno, rpno);
    } // f end

    // 3. 결재 목록 조회
    @GetMapping("/list")
                                                // required = false : queryString 이 필수가 아님
    public PageInfo<ReportDto> findByMno( @RequestParam(defaultValue = "1") int page,
                                          @RequestParam(defaultValue = "10") int pageSize,
                                          @RequestParam(required = false) Integer apstate,
                                          HttpServletRequest req ){
        System.out.println("ApprovalController.findByMno");
        System.out.println("page = " + page + ", pageSize = " + pageSize + ", apstate = " + apstate + ", req = " + req);

        // loginMno 가져오기
        if( MemberUtils.getLoginInfo(req) == null  ){
            System.out.println("로그인 정보가 없음");
            return null;
        } // if end

        MemberDto memberDto = MemberUtils.getLoginInfo(req);
        int loginMno = memberDto.getMno();
        System.out.println("loginMno = " + loginMno);

        return approvalService.findByMno( loginMno, apstate, page, pageSize );
    } // f end

    // 4. 보고서 결재( 상태 변경 )
    @PutMapping
    public boolean onApproval( ApprovalDto approvalDto,
                               HttpServletRequest req ){
        System.out.println("ApprovalController.onApproval");
        System.out.println("approvalDto = " + approvalDto + ", req = " + req);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonaplist = approvalDto.getJsonaplist();

        System.out.println("jsonaplist = " + jsonaplist);

        // loginMno 가져오기
        if( MemberUtils.getLoginInfo(req) == null  ){
            System.out.println("로그인 정보가 없음");
            return false;
        } // if end

        MemberDto memberDto = MemberUtils.getLoginInfo(req);
        int loginMno = memberDto.getMno();
        System.out.println("loginMno = " + loginMno);

        // aplist 객체로 변환
        try{
            List<ApprovalDto> aplist = objectMapper.readValue(jsonaplist, new TypeReference<List<ApprovalDto>>() {});
            approvalDto.setAplist( aplist );
        }catch ( Exception e ){ System.out.println( e ); }

        return approvalService.onApproval( approvalDto, loginMno );
    } // f end


}
