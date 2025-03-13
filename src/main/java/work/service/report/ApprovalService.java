package work.service.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.mapper.report.ApprovalMapper;

@Service
public class ApprovalService {

    private final ApprovalMapper approvalMapper;

    @Autowired
    public ApprovalService(ApprovalMapper approvalMapper) {
        this.approvalMapper = approvalMapper;
    } // f end

    public boolean write(ApprovalMapper approvalMapper){
        System.out.println("ApprovalService.wrtie");
        System.out.println("approvalMapper = " + approvalMapper);
        return approvalMapper.write(approvalMapper);
    } // f end


}
