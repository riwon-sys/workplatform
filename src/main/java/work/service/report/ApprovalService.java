package work.service.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import work.model.dto.report.ApprovalDto;
import work.model.mapper.report.ApprovalMapper;

@Service
public class ApprovalService {

    private final ApprovalMapper approvalMapper;

    @Autowired
    public ApprovalService(ApprovalMapper approvalMapper) {
        this.approvalMapper = approvalMapper;
    } // f end

    public boolean write(ApprovalDto approvalDto){
        System.out.println("ApprovalService.write");
        System.out.println("approvalDto = " + approvalDto);
        return approvalMapper.write(approvalMapper);
    } // f end

}
