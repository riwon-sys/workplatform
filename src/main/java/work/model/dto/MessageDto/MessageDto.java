package work.model.dto.MessageDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MessageDto {

    private int msno;
    private String msg;
    private String msdate;
    private  String pdate;
    private int rno;
    private  String rname;
    private  String rtype;
    private  String mname;
    private  int fno;
    private  String fname;
    private  String flocation;
    private   String fdate;

}
