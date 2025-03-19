package work.model.mapper.member;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;
import work.model.dto.member.MemberDto;

import java.util.List;

@Mapper
public interface MemberMapper {

    // [1] 사원 등록
    @Insert("insert into member( mno,mname,mphone,memail,mrank,mprofile )" + "values( #{mno} , #{mname} , #{mphone},#{memail} , #{mrank} , #{mprofile} )")
    public boolean signUp(MemberDto memberDto);

    // [2] 사원 로그인
    // @Insert("insert into member(mno,mpwd)" + "values( #{mno} , #{mpwd} )")
    // public boolean onLogIn(MemberDto memberDto);

    // 변경된 세션 처리된 [2] 사원 로그인
    // 로그인 세션 처리 기능 추가 -> 입력받은 자료를 확인 및 검증할 때는 SELECT 사용
    @Select("select mno,mname,mphone,memail,mtype,mrank,mprofile from member where mno=#{mno} and mpwd=#{mpwd}")
    public MemberDto onLogIn( MemberDto memberDto ); // MemberDto : select 결과가 있으면 memberDto, 없으면 null


        // [3] 사원 로그아웃
    @Delete("delete from member where mno = #{mno}")
    public boolean logOut(int mno);

    // [4] 사원 전체 조회
    @SelectProvider( type = SqlBuilder.class, method = "buildGetUserByMrank" )
    public List<MemberDto> getAllMembers(@Param("mrank") String mrank, @Param("mno") Integer mno);

    class SqlBuilder{
        public static String buildGetUserByMrank( final String mrank, final Integer mno){
            return new SQL(){{
                SELECT("*");
                FROM("member");
                if ( mrank != null ){
                    WHERE("mrank = #{mrank}");
                }
                if( mno != null ){
                    WHERE("mno LIKE '" + (mno / 100000) + "%'");
                }
                ORDER_BY("mno ASC");
            }}.toString();
        }
    }

}
