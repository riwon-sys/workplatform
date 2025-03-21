package work.model.dto.report;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ApprovalDto {
    private int apno;
    private String apdate;
    private Boolean apstate;
    private String apsignature;
    private int mno;
    private int rpno;
    private String mname;
    private String mrank;
    private String rank;
    private List<ApprovalDto> aplist;

    private MultipartFile uploadFile;
}
