package work.model.mapper.report;

import jakarta.transaction.Transactional;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import work.model.dto.report.ApprovalDto;

@Mapper
public interface ApprovalMapper {
    @Insert( "INSERT INTO Approval( mno, rpno ) VALUES ( #{mno}, #{rpno} )")
    boolean write(ApprovalDto approvalDto);
}
