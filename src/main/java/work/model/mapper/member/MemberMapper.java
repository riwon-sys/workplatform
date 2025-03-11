package work.model.mapper.member;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import work.model.dto.member.MemberDto;

@Mapper
public interface MemberMapper {

    // [1] 사원 등록
    @Insert("insert into member( mmo,mname,mphone,memail,mrank )" + "values( #{mno} , #{mname} , #{mphone},#{memail} , #{mrank})")
    public boolean signUP(MemberDto memberDto);
}
