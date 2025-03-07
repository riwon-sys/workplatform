package work.model.dto.room;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomDto {
    private  int rno ;
    private String rname;
    private  String rtype;
    private  String rdate;
    private  String rlastdate;
    private  boolean rstate;
    private int mno;

    private String madeMname;
    private  String[] MnameList;
    private List<Integer> mnoList;
}
