package work.model.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberDto {
    private int mno;
    private  String mpwd;
    private  String mname;
    private  String mphone;
    private  String memail;
    private  int mtype;
    private  String mrank;
    private  String mprofile;
}
