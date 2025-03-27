package work.service.report;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.model.dto.member.MemberUtils;
import work.model.dto.report.ApprovalDto;
import work.model.dto.report.ReportDto;
import work.model.mapper.report.ApprovalMapper;
import work.model.mapper.report.ReportMapper;
import work.service.message.FileService;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalService {

    private final ReportMapper reportMapper;
    private final ApprovalMapper approvalMapper;
    private final FileService fileService;

    // 1. 결재자 목록 등록
    @Transactional
    public boolean write(ApprovalDto approvalDto, int loginMno) {
        System.out.println("ApprovalService.write");
        System.out.println("approvalDto = " + approvalDto);

        try {
            List<ApprovalDto> approvalList = approvalDto.getAplist();

            for ( int i = 0; i < approvalList.size(); i++ ) {
                ApprovalDto approvalListDto = approvalList.get(i);

                // 결재자의 mno가 없으면 continue
                if( approvalListDto.getMno() == null ){ continue; }

                // 결재자의 loginMno와 일치할 때 파일 업로드
                if ( approvalListDto.getMno() == loginMno ) {
                    // 파일 업로드 처리
                    if ( approvalDto.getUploadFile() != null ) {
                        System.out.println( "파일 업로드 시작" );
                        String fileName = fileService.fileUpload( approvalDto.getUploadFile() );
                        System.out.println("fileName = " + fileName);

                        if ( fileName == null || fileName.isEmpty() ) {
                            throw new RuntimeException("파일 업로드 실패: 파일명이 없습니다.");
                        }

                        approvalListDto.setApsignature(fileName);
                    }

                    // 현재 결재자의 결재 상태 변경
                    approvalListDto.setApstate( true );
                    // 현재 결재자의 결재 날짜 등록
                    approvalListDto.setApdate( Timestamp.valueOf( LocalDateTime.now() ) );

                    // 다음 결재자 승인 대기 상태 설정
                    if ( i + 1 < approvalList.size() ) {
                        approvalList.get(i + 1).setApdate( Timestamp.valueOf( LocalDateTime.now() ) );
                    }
                }

                // DB 저장 (결과 확인)
                System.out.println( approvalDto.getRpno());
                boolean result = approvalMapper.write( approvalListDto );
                if ( !result ) {
                    throw new RuntimeException( "DB 저장 실패: 결재자 ID = " + approvalListDto.getMno() );
                }

            }
        } catch (Exception e) {
            System.err.println( e );
            throw e;  // @Transactional이 롤백 처리할 수 있도록 예외를 다시 던짐
        }

        return true;
    }

    // 2. 결재 전체 목록 조회
    public List<ApprovalDto> findApproval(int loginMno, Integer rpno){
        System.out.println("ApprovalService.findByMno");
        System.out.println("loginMno = " + loginMno + ", rpno = " + rpno);
        return approvalMapper.findApproval(loginMno, rpno);
    }
    // 3. 결재 목록 조회
    public PageInfo<ReportDto> findByMno(int loginMno, Integer apstate, int page, int pageSize ){
        System.out.println("ApprovalMapper.findByMno");
        System.out.println("loginMno = " + loginMno + ", apstate = " + apstate);

        // PageHelper로 페이징 처리 적용
        PageHelper.startPage( page, pageSize );
        List<ReportDto> pagingResult = approvalMapper.findByMno( loginMno, apstate );

        // 부서명 설정 로직 적용
        for (ReportDto report : pagingResult) {
            String part = MemberUtils.getDepartmentFromMno(report.getMno());
            report.setMdepartment(part);
        } // for end

        // PageInfo의 pageSize가 정상적인지 확인
        PageInfo<ReportDto> pageInfo = new PageInfo<>(pagingResult);
        System.out.println("pageInfo = " + pageInfo);
        System.out.println("PageHelper 적용 후 pageSize: " + pageInfo.getPageSize());

        return pageInfo;
    } // f end

    // 4. 보고서 결재( 상태 변경 )
    @Transactional
    public boolean onApproval( ApprovalDto approvalDto, int loginMno ){
        System.out.println("ApprovalService.onApproval");
        System.out.println("approvalDto = " + approvalDto);

        try {
            List<ApprovalDto> approvalList = approvalDto.getAplist();

            for ( int i = 0; i < approvalList.size(); i++ ) {
                ApprovalDto approvalListDto = approvalList.get(i);

                // 결재자의 mno가 없으면 continue
                if( approvalListDto.getMno() == null ){ continue; }

                // 결재자의 loginMno와 일치할 때 파일 업로드
                if ( approvalListDto.getMno() == loginMno ) {
                    // 파일 업로드 처리
                    if ( approvalDto.getUploadFile() != null ) {
                        System.out.println( "파일 업로드 시작" );
                        String fileName = fileService.fileUpload( approvalDto.getUploadFile() );
                        System.out.println("fileName = " + fileName);

                        if ( fileName == null || fileName.isEmpty() ) {
                            throw new RuntimeException("파일 업로드 실패: 파일명이 없습니다.");
                        }
                        approvalListDto.setApsignature( fileName );
                    } // if end
                    // 현재 결재자의 결재 상태 변경
                    approvalListDto.setApstate( true );
                } // if end

                // 현재 결재자의 결재 날짜 등록
                approvalListDto.setApdate( Timestamp.valueOf( LocalDateTime.now() ) );

                // DB 저장 (결과 확인)
                boolean result = approvalMapper.onApproval( approvalListDto );
                if ( !result ) {
                    throw new RuntimeException( "DB 저장 실패: 결재자 ID = " + approvalListDto.getMno() );
                }

            } // for end
        } catch (Exception e) {
            System.err.println( e );
            throw e;  // @Transactional이 롤백 처리할 수 있도록 예외를 다시 던짐
        }

        return true;

    } // f end

    // 7. 한주동안 결재받지 못한 보고서 삭제
    // 매주 월요일 자정에 삭제
    @Scheduled( cron = "0 0 0 * * 4")
    @Transactional( rollbackFor = Exception.class )
    public void deleteUnapprove() throws Exception {
        System.out.println("MemberService.deleteUnapprove");

        // 삭제할 보고서 번호 리스트 가져오기
        List<Integer> deleteList = approvalMapper.getNotApproveRpno();
        System.out.println("deleteList = " + deleteList);

        System.out.println(">> 보고서 삭제");
        deleteList.stream()
                .forEach( (rpno) -> {
                    delete_report(rpno);
                    delete_Approval(rpno);
                } );

    } // f end

    // 보고서 삭제
    private void delete_report( int rpno ){
        reportMapper.delete_Report( rpno );
    } // f end

    // 결재목록 삭제
    private void delete_Approval( int rpno ){
        approvalMapper.delete_Approval( rpno );
    } // f end

}
