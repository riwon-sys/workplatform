package work.model.dto;

import lombok.*;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ChattingDto {
    private int mstype;
    private int rno;
    private String msDate;
    private int loginMno;
    private String mname;
    private String mscontent;
    private  int mno;

    // 새로 추가된 msg 필드
    private String msg;
    // 0 : 메세지 1 : 파일
    private int msno;
    private String msdate;
    private  String pdate;
    private  String rname;
    private  String rtype;

    private  int fno;
    private  String fname;
    private  String flocation;
    private   String fdate;
}
