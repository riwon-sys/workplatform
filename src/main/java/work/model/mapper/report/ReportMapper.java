package work.model.mapper.report;

import org.apache.ibatis.annotations.*;
import work.model.dto.report.ReportDto;

import java.util.List;

@Mapper
public interface ReportMapper {
    @Insert( "INSERT INTO report( rpname, rpam, rppm, rpamnote, " +
            "rppmnote, rpunprocessed, rpsignificant, rpexpected, mno )" +
            "VALUES ( #{rpname}, #{rpam}, #{rppm}, #{rpamnote}, #{rppmnote}, " +
            "#{rpunprocessed}, #{rpsignificant}, #{rpexpected}, #{mno} )" )
    boolean write(ReportDto reportDto);
    @Select( "SELECT * FROM report WHERE mno = #{mno} && rpstate = true" )
    List<ReportDto> findByMno( int mno );
    @Select( "SELECT * FROM report WHERE rpno = #{rpno} && rpstate = true" )
    ReportDto findByRpno( int rpno );
    @Update( "UPDATE report SET rpname = #{rpname}, rpam = #{rpam}, rppm = #{rppm}, " +
            "rpamnote = #{rpamnote}, rppmnote = #{rppmnote} " +
            "rpunprocessed = #{rpunprocessed}, rpsignificant = #{rpsignificant}, " +
            "rpexpected = #{rpexpected}, rpdate =now() WHERE rpno = #{rpno} ")
    boolean update(ReportDto reportDto);
    @Delete( "UPDATE report SET rpstate = false WHERE rpno = #{rpno}" )
    boolean delete(int rpno);
}
