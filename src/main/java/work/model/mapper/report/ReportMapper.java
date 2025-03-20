package work.model.mapper.report;

import org.apache.ibatis.annotations.*;
import work.model.dto.report.ReportDto;

import java.util.List;

@Mapper
public interface ReportMapper {
    // 1. 보고서 등록
    @Insert( "INSERT INTO report( rpname, rpam, rppm, rpamnote, " +
            "rppmnote, rpunprocessed, rpsignificant, rpexpected, mno )" +
            "VALUES ( #{rpname}, #{rpam}, #{rppm}, #{rpamnote}, #{rppmnote}, " +
            "#{rpunprocessed}, #{rpsignificant}, #{rpexpected}, #{mno} )" )
    boolean write(ReportDto reportDto);

    // 2. 회원별 보고서 조회( 페이징 적용 )
    @Select( "SELECT m.mname, rp.* FROM report rp INNER JOIN member m on rp.mno = m.mno " +
            "WHERE rp.mno = #{mno} && rpstate = true ORDER BY rpno DESC" )
    List<ReportDto> findByMno(int mno);

    // 3. 보고서 상세 조회
    @Select( "SELECT m.mname, m.mrank, rp.* FROM report rp INNER JOIN member m on rp.mno = m.mno " +
            "WHERE rpno = #{rpno} && rpstate = true" )
    ReportDto findByRpno( int rpno );

    // 4. 보고서 수정
    @Update( "UPDATE report SET rpname = CONCAT(#{rpname}, '( 수정됨 )'), rpam = #{rpam}, rppm = #{rppm}, " +
            "rpamnote = #{rpamnote}, rppmnote = #{rppmnote}, " +
            "rpunprocessed = #{rpunprocessed}, rpsignificant = #{rpsignificant}, " +
            "rpexpected = #{rpexpected}, rpdate = now() WHERE rpno = #{rpno} ")
    boolean update(ReportDto reportDto);

    // 5. 보고서 삭제
    @Delete( "UPDATE report SET rpstate = false WHERE rpno = #{rpno}" )
    boolean delete(int rpno);

    // 6. 보고서 번호
    @Select( "SELECT LAST_INSERT_rpno() FROM report" )
    int lastRpno();

}
