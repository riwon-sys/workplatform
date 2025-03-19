package work.model.dto.report;

import lombok.*;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ApprovalDto {
    private int apno;
    private String apdate;
    private int State;
    private String apsignature;
    private int mno;
    private int rpno;
    private String mname;
    private String mrank;
}
