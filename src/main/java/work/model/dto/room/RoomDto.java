package work.model.dto.room;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class RoomDto {
    private int rno ;
    private String rid;
    private String rname;
    private String rtype;
    private String rdate;
    private String rlastdate;
    private boolean rstate;
    private int mno;

    private String madeMname;
    private String[] MnameList;
    private List<Integer> mnoList;

    public static RoomDto create(String name){
        RoomDto roomDto = new RoomDto();
        roomDto.rid = UUID.randomUUID().toString();
        roomDto.rname = name;
        return roomDto;
    }
}
