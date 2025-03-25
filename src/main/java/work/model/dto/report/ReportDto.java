package work.model.dto.report;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ReportDto {
    private int rpno;
    private String rpname;
    private String rpam;
    private String rppm;
    private String rpamnote;
    private String rppmnote;
    private String rpunprocessed;
    private String rpsignificant;
    private String rpexpected;
    private String rpdate;

    private int mno;
    private String mname;
    private String mdepartment;
    private String mrank;

    private int apno;
    private int apstate;

    private List<Integer> mnoList ;

}
