package work.model.mapper.report;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ApprovalMapper {
    @Insert( "INSERT INTO Approval( apstate, mno, rpno ) VALUES ( #{apstate}, #{mno}, #{rpno} )")
    boolean write(ApprovalMapper approvalMapper);
}
