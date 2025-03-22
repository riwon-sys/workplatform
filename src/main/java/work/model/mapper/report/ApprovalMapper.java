package work.model.mapper.report;

import jakarta.transaction.Transactional;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.jdbc.SQL;
import work.model.dto.report.ApprovalDto;

import java.util.List;

@Mapper
public interface ApprovalMapper {
    // 1. 결재자 목록 등록
    @Insert( "INSERT INTO Approval( mno, rpno, apdate, apstate, apsignature ) VALUES ( #{mno}, #{rpno}, #{apdate}, #{apstate}, #{apsignature} )")
    boolean write(ApprovalDto approvalDto);

    // 2. 승인 전체 목록 조회
    @SelectProvider( type = SqlBuilder.class, method = "buildGetApproval" )
    List<ApprovalDto> findApproval(@Param("mno") Integer mno, @Param("rpno") Integer rpno );

    class SqlBuilder{
        public static String buildGetApproval( final Integer mno, final Integer rpno ){
            return new SQL(){{
                SELECT("m.mno, m.mname, m.mrank, ap.*");
                FROM("approval ap");
                INNER_JOIN("member m ON ap.mno = m.mno");
                if( rpno != null ){
                    WHERE("rpno = #{rpno}");
                }else{
                    WHERE("mno = #{mno}");
                }
                ORDER_BY("m.mno DESC, apdate ASC");
            }}.toString();
        }
    }

}
