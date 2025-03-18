package work.service.report;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import work.model.dto.report.ApprovalDto;
import work.model.mapper.report.ApprovalMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalService {

    private final ApprovalMapper approvalMapper;

    @Transactional
    public boolean write(List<ApprovalDto> approvalList){
        System.out.println("ApprovalService.write");
        System.out.println("approvalList = " + approvalList);

        for(ApprovalDto approvalDto : approvalList){
            List<Boolean> results = new ArrayList<>();
            boolean result = approvalMapper.write(approvalDto);
            if( !result ){
                throw new RuntimeException("Approval write failed for approvalDto: " + approvalDto);
            } // if end
        } // for end
        return true;
    } // f end

}
