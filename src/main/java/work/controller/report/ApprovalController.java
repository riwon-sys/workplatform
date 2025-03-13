package work.controller.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.model.dto.report.ApprovalDto;
import work.service.report.ApprovalService;

import java.util.List;

@RestController
@RequestMapping("/Approval")
public class ApprovalController {

    private final ApprovalService approvalService;

    @Autowired
    public ApprovalController(ApprovalService approvalService) {
        this.approvalService = approvalService;
    } // f end

//    // 1. 승인 테이블 등록
//    @PostMapping
//    public boolean write(@RequestBody ApprovalDto approvalDto){
//        System.out.println("ApprovalController.write");
//        System.out.println("approvalDto = " + approvalDto);
//        return approvalService.write(approvalDto);
//    } // f end
//
//    // 2. 승인 전체 목록 조회
//    @GetMapping
//    public List<ApprovalDto> findAll(){
//        System.out.println("ApprovalController.findAll");
//        return approvalService.findAll();
//    } // f end


}
