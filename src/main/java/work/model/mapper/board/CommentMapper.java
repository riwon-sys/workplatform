package work.model.mapper.board;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import work.model.dto.board.CommentDto;

@Mapper
public interface CommentMapper {

    //[1]댓글등록
    @Insert("insert into commentsample( pid,content,mno)"+
    "values(#{pid},#{content},#{mno})")
    public boolean CommentCreate(CommentDto commentDto);

    //[2]댓글 수정
    @Update("update comment set " +
            "reg_date = now()," +
            "content = #{content} " +
            "where cid = #{cid} " )
    public boolean CommentUpdate(CommentDto commentDto);


    //[3]댓글 삭제

    @Delete("Delete from comment where cid = #{cid} and mno = #{mno}")
    public boolean CommentDelete(@Param("cid") int cid, @Param("mno") int mno);


    /// { "cid": 3, "content": "수정된, 댓글 내용입니다.", "mno": 100001 }
}
