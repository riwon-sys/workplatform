package work.model.mapper.board;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.UpdateProvider;
import work.model.dto.board.BoardDto;

import java.util.List;

@Mapper
public interface BoardMapper {
    //1[게시물 전체조회]
    @Select("select * from board b inner join category c on b.category_id=c.category_id order by b.pid DESC")
    public List<BoardDto>allView();

    //2[게시물등록]
    @Insert("insert into board( title,content,mno,category_id ) " +
            " values ( #{ title } , #{ content },#{ mno },#{ category_id } )")
    public boolean boardCreate( BoardDto boardCreate );

    //3[게시물 상세조회]
    @Select("select * from board b inner join category c on b.category_id=c.category_id where b.pid =#{pid}")
    public BoardDto boardView(int pid);

    //[4 게시물 수정]
    @Update("UPDATE board SET " +
            "title = #{title}, " +
            "content = #{content}, " +
            "category_id =#{category_id} " +

            "WHERE mno = #{mno} and pid =#{pid}")
//@UpdateProvider(type = BoardProvider.class,method = "boardUpdateSql")
    public boolean boardUpdate(BoardDto boardDto);
// "<if test='mno > 0'>, mno = #{mno}</if> " +  // 동적 SQL을 위한 부분



    //[5]게시물 삭제

    @Delete("delete from board where pid=#{pid} and mno=#{mno}")
    public boolean boardDelete(@Param("pid") int pid , @Param("mno")int mno);
}
