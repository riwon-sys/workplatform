package work.controller.report;

import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import work.model.dto.member.MemberUtils;
import work.model.dto.report.ReportDto;
import work.service.report.ReportService;

import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin( "http://localhost:5173" )
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    // 1. 보고서 등록
    @PostMapping
    public boolean write(@RequestBody ReportDto reportDto){
        System.out.println("ReportController.write");
        // 세션 대용
        int mno = 100007;
        reportDto.setMno(mno);
        System.out.println("reportDto = " + reportDto);
        return reportService.write(reportDto);
    } // f end

    // 2. 회원별 보고서 조회( 페이징 처리 추가 )
    @GetMapping
    public PageInfo<ReportDto> findByMno( @RequestParam(defaultValue = "1") int page,
                                      @RequestParam(defaultValue = "10") int pageSize){
        int mno = 100007;
        System.out.println("ReportController.findAll");

        return reportService.findByMno(mno, page, pageSize);
    } // f end

    // 3. 보고서 상세 조회
    @GetMapping("/view")
    public ReportDto findByRpno(@RequestParam int rpno){
        System.out.println("ReportController.findAll");
        System.out.println("rpno = " + rpno);

        ReportDto result = reportService.findByRpno(rpno);
        String part = MemberUtils.getDepartmentFromMno(result.getMno());
        result.setMdepartment( part );
        System.out.println(result);
        return result;
    } // f end

    // 4. 보고서 수정
    @PutMapping
    public boolean update(@RequestParam int rpno, @RequestBody ReportDto reportDto){
        System.out.println("ReportController.update");

        reportDto.setRpno(rpno);
        System.out.println("reportDto = " + reportDto);
        return reportService.update(reportDto);
    } // f end

    // 5. 보고서 삭제
    @PutMapping("/delete")
    public boolean delete(@RequestParam int rpno){
        System.out.println("ReportController.delete");
        System.out.println("rpno = " + rpno);
        return reportService.delete(rpno);
    } // f end

}
