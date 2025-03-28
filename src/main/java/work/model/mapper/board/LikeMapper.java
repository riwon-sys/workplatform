package work.model.mapper.board;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LikeMapper {

    // 1.조회
    @Select("SELECT * FROM board_like WHERE pid = #{pid} AND mno = #{mno}")
    Object likeView(int pid , int  mno);
    // 2. 삭제
    @Select("delete from board_like where pid = #{pid} and mno = #{mno}")
    Object likeDelete(int pid , int mno);
    // 3. 추가
    @Insert("insert into board_like( pid , mno ) values( #{pid} ,  #{mno} ) ")
    int likeAdd(int pid , int mno);

    //4. pid에 해당하는 좋아요수 카운트
    @Select("select count(*) from board_like where pid = #{pid}")
    public int lcount(@Param("pid")int pid);

}