package work.controller.report;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    public boolean write(@RequestBody List<ApprovalDto> approvalList){
        System.out.println("ApprovalController.write");
        System.out.println("approvalList = " + approvalList);
        return approvalService.write(approvalList);
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
