package work.service.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import work.model.dto.report.ReportDto;
import work.model.mapper.report.ReportMapper;

import java.util.List;

@Service
public class ReportService {

    private final ReportMapper reportMapper;

    @Autowired
    public ReportService(ReportMapper reportMapper) {
        this.reportMapper = reportMapper;
    } // f end

    // 1. 보고서 등록
    @PostMapping
    public boolean write(ReportDto reportDto){
        System.out.println("ReportController.write");
        System.out.println("reportDto = " + reportDto);
        return reportMapper.write(reportDto);
    } // f end

    // 2. 회원별 보고서 조회
    @GetMapping
    public List<ReportDto> findByMno(int mno){
        System.out.println("ReportController.findAll");
        return reportMapper.findByMno(mno);
    } // f end

    // 3. 보고서 상세 조회
    @GetMapping("/view")
    public ReportDto findByRpno(int rpno){
        System.out.println("ReportController.findAll");
        System.out.println("rpno = " + rpno);
        return reportMapper.findByRpno(rpno);
    } // f end

    // 4. 보고서 수정
    @PutMapping
    public boolean update(ReportDto reportDto){
        System.out.println("ReportController.update");
        System.out.println("reportDto = " + reportDto);
        return reportMapper.update(reportDto);
    } // f end

    // 5. 보고서 삭제
    @DeleteMapping
    public boolean delete(int rpno){
        System.out.println("ReportController.delete");
        System.out.println("rpno = " + rpno);
        return reportMapper.delete(rpno);
    } // f end

}
