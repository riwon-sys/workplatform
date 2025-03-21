package work.service.report;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;
import work.model.dto.report.ApprovalDto;
import work.model.mapper.report.ApprovalMapper;
import work.service.message.FileService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalService {

    private final ApprovalMapper approvalMapper;
    private final FileService fileService;

    // 1. 결재자 목록 등록
    @Transactional
    public boolean write(ApprovalDto approvalDto, int mno){
        System.out.println("ApprovalService.write");
        System.out.println("approvalDto = " + approvalDto);

        try {
            // 결재자 목록 가져오기
            List<ApprovalDto> approvalList = approvalDto.getAplist();

            // 각 결재자에 대해 처리
            for (int i = 0; i < approvalList.size(); i++) {
                ApprovalDto approvalListDto = approvalList.get(i);

                // 결재자의 mno가 일치하는 경우에만 처리
                if ( approvalListDto.getMno() == mno ) {

                    if( approvalListDto.getUploadFile() != null ){
                        String fileName = fileService.fileUpload( approvalListDto.getUploadFile() );
                        approvalListDto.setApsignature(fileName);

                        // 현재 결재자의 rpstate를 true로 설정 (승인 상태로 변경)
                        approvalListDto.setApstate(true);

                        // 다음 결재자가 있으면, 그 결재자의 rpstate를 true로 설정
                        if ( i + 1 < approvalList.size() ) {
                            ApprovalDto nextApprovalDto = approvalList.get(i + 1);
                            nextApprovalDto.setApstate(true);  // 다음 결재자 승인 대기 상태로 설정
                        } // if end
                    } // if end
                } // if end

                // 결재자 정보 저장 (DB에 저장)
                boolean result = approvalMapper.write(approvalListDto);
                if ( !result ) {
                    throw new RuntimeException("Approval write failed for approvalDto: " + approvalDto);
                } // if end
            }
        } catch (Exception e) {
            // 예외 처리: 오류 발생 시 로그를 남기고 false 반환
            System.out.println("Error occurred during approval write: " + e.getMessage());
            return false;
        }

        return true;  // 처리 성공
    } // f end

    // 2. 결재 목록 조회
    public List<ApprovalDto> findApproval(Integer mno, Integer rpno){
        System.out.println("ApprovalService.findByMno");
        System.out.println("mno = " + mno + ", rpno = " + rpno);
        return approvalMapper.findApproval(mno, rpno);
    }

}
