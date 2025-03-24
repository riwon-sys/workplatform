package work.model.mapper.report;

import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;
import work.model.dto.report.ApprovalDto;
import work.model.dto.report.ReportDto;

import java.util.List;

@Mapper
public interface ApprovalMapper {
    // 1. 결재자 목록 등록
    @Insert( "INSERT INTO Approval( mno, rpno, apdate, apstate, apsignature ) VALUES ( #{mno}, #{rpno}, #{apdate}, #{apstate}, #{apsignature} )")
    public boolean write(ApprovalDto approvalDto);

    // 2. 결재 전체 목록 조회
    @SelectProvider( type = SqlBuilder.class, method = "buildGetApproval" )
    public List<ApprovalDto> findApproval( int loginMno, @Param("rpno") Integer rpno );

    // 3. 결재 목록 조회
    @SelectProvider( type = SqlBuilder.class, method = "buildGetList" )
    public List<ReportDto> findByMno( int loginMno, Integer apstate );

    class SqlBuilder{
        public static String buildGetApproval( final int loginMno, final Integer rpno ){
            return new SQL(){{
                SELECT("m.mno, m.mname, m.mrank, ap.*");
                FROM("approval ap");
                INNER_JOIN("member m ON ap.mno = m.mno");
                if( rpno != null ){
                    WHERE("rpno = #{rpno}");
                }else{
                    WHERE("mno = #{loginMno}");
                }
                ORDER_BY("m.mno DESC, apdate ASC");
            }}.toString();
        } // f end

        public static String buildGetList( final int loginMno, final Integer apstate ){
            return new SQL(){{
                SELECT("m.mno, m.mname, m.mrank, ap.apno, rp.*");
                FROM("approval ap");
                INNER_JOIN("member m ON ap.mno = m.mno");
                INNER_JOIN("report rp ON ap.rpno = rp.rpno");
                WHERE("m.mno = #{loginMno}");
                if( apstate != null ){
                    WHERE("apstate = #{apstate}");
                }
                WHERE("apdate is not null");
                ORDER_BY("rp.rpno DESC");
            }}.toString();
        } // f end
    }

    // 4. 보고서 결재( 상태 변경 )
    @Update( "UPDATE approval SET apstate = #{apstate}, apdate = #{apdate}, apsignature = #{apsignature} WHERE apno = #{apno}" )
    public boolean onApproval( ApprovalDto approvalDto );

}
