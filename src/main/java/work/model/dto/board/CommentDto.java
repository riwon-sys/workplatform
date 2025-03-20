package work.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private int cid;        // 댓글 고유번호
    private String content; // 댓글 내용
    private String reg_date; // 댓글 작성일
    private int pid;          //게시글 번호
    private int mno;          // 회원 번호


//
//    create table comment(
//            cid int unsigned auto_increment,
//            content varchar(200) not null,
//    reg_date datetime default current_timestamp,
//    pid int unsigned,
//    mno int unsigned,
//    primary key (cid),
//    foreign key(pid) references board(pid)
//    on update cascade
//    on delete cascade,
//    foreign key(mno) references Member(mno)
//    on update cascade
//    on delete cascade




}
