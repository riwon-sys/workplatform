package work.model.mapper.room;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import work.model.dto.ChattingDto;

@Mapper
public interface MessageMapper {

    // 메세지 등록
    @Insert("""
            insert into message (mscontent, msdate, pno)
                    select #{mscontent}, NOW(), p.pno
                    from paritcipant p
                    join member m on m.mno = p.mno
                    where p.mno = #{loginMno} and p.rno = #{rno}
            """)
    void writeMessage(ChattingDto chattingDto);

    // 파일등록
    @Insert("""
            insert into fileshare (fname, flocation, pno)
            	select "파일 등록 테스트" , "파일 등록 테스트" , p.pno
                from paritcipant p
                join member m on m.mno = p.mno
                where p.mno = "100001" and p.rno = 1;
            """)
    void writeFile(ChattingDto chattingDto);

}
