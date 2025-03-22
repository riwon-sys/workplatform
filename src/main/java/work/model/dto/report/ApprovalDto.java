package work.model.dto.report;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class ApprovalDto {
    private int apno;
    private Timestamp apdate;
    private Boolean apstate;
    private String apsignature;
    private Integer mno;
    private int rpno;
    private String mname;
    private String mrank;
    private String rank;
    private String jsonaplist;
    private List<ApprovalDto> aplist;

    private MultipartFile uploadFile;
}
