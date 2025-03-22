package work.service.report;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;
import work.model.dto.member.MemberDto;
import work.model.dto.member.MemberUtils;
import work.model.dto.report.ApprovalDto;
import work.model.mapper.report.ApprovalMapper;
import work.service.message.FileService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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
                    approvalListDto.setApdate(Timestamp.valueOf(LocalDateTime.now()));
                }

                // DB 저장 (결과 확인)
                boolean result = approvalMapper.write( approvalListDto );
                if ( !result ) {
                    throw new RuntimeException( "DB 저장 실패: 결재자 ID = " + approvalListDto.getMno() );
                }

//                // 다음 결재자 승인 대기 상태 설정
//                if ( i + 1 < approvalList.size() ) {
//                    approvalList.get(i + 1).setApstate( true );
//                }

            }
        } catch (Exception e) {
            System.err.println( e );
            throw e;  // @Transactional이 롤백 처리할 수 있도록 예외를 다시 던짐
        }

        return true;
    }

    // 2. 결재 목록 조회
    public List<ApprovalDto> findApproval(Integer mno, Integer rpno){
        System.out.println("ApprovalService.findByMno");
        System.out.println("mno = " + mno + ", rpno = " + rpno);
        return approvalMapper.findApproval(mno, rpno);
    }

}
