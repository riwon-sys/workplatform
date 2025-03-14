package work.model.mapper.member;

import lombok.Setter;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import work.model.dto.member.MemberDto;

@Mapper
public interface MemberMapper {

    // [1] 사원 등록
    @Insert("insert into member( mno,mname,mphone,memail,mrank )" + "values( #{mno} , #{mname} , #{mphone},#{memail} , #{mrank})")
    public boolean signUp(MemberDto memberDto);

    // [2] 사원 로그인
    @Insert("insert into member(mno,mpwd)" + "values( #{mno} , #{mpwd} )")
    public boolean onLogIn(MemberDto memberDto);

    // [3] 사원 로그아웃
    @Delete("delete from member where mno = #{mno}")
    public boolean logOut(int mno);

    // [4] 사원 전체 조회
    @Select("select * from member")
    public MemberDto[] getAllMembers();

}
