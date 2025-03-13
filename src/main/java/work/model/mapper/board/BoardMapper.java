package work.model.mapper.board;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.UpdateProvider;
import work.model.dto.board.BoardDto;

import java.util.List;

@Mapper
public interface BoardMapper {
    //1[게시물 전체조회]
    @Select("select * from board")
    public List<BoardDto>allView();

    //2[게시물등록]
    @Insert("insert into productsample( pid,title,content,views,mno ) " +
            " values ( #{ pid } , #{ title } , #{ content } , #{ views },#{ mno } )")
    public boolean boardCreate( BoardDto boardCreate );

    //3[게시물 상세조회]
    @Select("select * from board where pid =#{pid}")
    public BoardDto boardView(int pid);

    //[4 게시물 수정]
    @Update("UPDATE board SET " +
            "title = #{title}, " +
            "content = #{content} " +

            "WHERE pid = #{pid}")
//@UpdateProvider(type = BoardProvider.class,method = "boardUpdateSql")
    public boolean boardUpdate(BoardDto boardDto);
// "<if test='mno > 0'>, mno = #{mno}</if> " +  // 동적 SQL을 위한 부분



    //[5]게시물 삭제

    @Delete("delete from board where pid=#{pid}")
    public boolean boardDelete(int pid);
}
