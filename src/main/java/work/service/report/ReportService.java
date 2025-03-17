package work.service.report;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import work.model.dto.member.MemberUtils;
import work.model.dto.report.ReportDto;
import work.model.mapper.report.ReportMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportMapper reportMapper;

    // 1. 보고서 등록
    public boolean write(ReportDto reportDto){
        System.out.println("ReportController.write");
        System.out.println("reportDto = " + reportDto);
        return reportMapper.write(reportDto);
    } // f end

    // 2. 회원별 보고서 조회( 페이징 적용 )
    public PageInfo<ReportDto> findByMno(int mno, int page, int pageSize){
        System.out.println("ReportService.findByMno with paging");

        // PageHelper로 페이징 처리 적용
        PageHelper.startPage(page, pageSize);
        List<ReportDto> pagingResult = reportMapper.findByMno(mno);
        // 회원번호 앞자리 부서
        for (ReportDto report : pagingResult) {
            String part = MemberUtils.getDepartmentFromMno(report.getMno());
            report.setMdepartment(part);
        }

        return new PageInfo<>(pagingResult);
    } // f end

//    public List<ReportDto> findByMno(int mno){
//        System.out.println("ReportController.findAll");
//        return reportMapper.findByMno(mno);
//    } // f end

    // 3. 보고서 상세 조회
    public ReportDto findByRpno(int rpno){
        System.out.println("ReportController.findAll");
        System.out.println("rpno = " + rpno);
        return reportMapper.findByRpno(rpno);
    } // f end

    // 4. 보고서 수정
    public boolean update(ReportDto reportDto){
        System.out.println("ReportController.update");
        System.out.println("reportDto = " + reportDto);
        return reportMapper.update(reportDto);
    } // f end

    // 5. 보고서 삭제
    public boolean delete(int rpno){
        System.out.println("ReportController.delete");
        System.out.println("rpno = " + rpno);
        return reportMapper.delete(rpno);
    } // f end

}
