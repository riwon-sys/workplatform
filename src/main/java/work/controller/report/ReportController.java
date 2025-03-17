package work.controller.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.model.dto.report.ReportDto;
import work.service.report.ReportService;

import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin( "http://localhost:5173" )
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // 1. 보고서 등록
    @PostMapping
    public boolean write(@RequestBody ReportDto reportDto){
        System.out.println("ReportController.write");

        int mno = 100004;
        reportDto.setMno(mno);
        System.out.println("reportDto = " + reportDto);
        return reportService.write(reportDto);
    } // f end

    // 2. 회원별 보고서 조회
    @GetMapping
    public List<ReportDto> findByMno(){
        int mno = 100004;
        System.out.println("ReportController.findAll");
        return reportService.findByMno(mno);
    } // f end

    // 3. 보고서 상세 조회
    @GetMapping("/view")
    public ReportDto findByRpno(@RequestParam int rpno){
        System.out.println("ReportController.findAll");
        System.out.println("rpno = " + rpno);
        return reportService.findByRpno(rpno);
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
