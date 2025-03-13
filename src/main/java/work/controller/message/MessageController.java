package work.controller.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.model.dto.ChattingDto;
import work.service.message.MessageService;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
@RestController
@RequestMapping("/msg")
@CrossOrigin("http://localhost:5173")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<ChattingDto> writeFile(@RequestParam("file") MultipartFile file) {
        try {
            // 실제 업로드할 디렉토리 설정
            String uploadDir = "C:\\Users\\tj-bu-702-18\\IdeaProjects\\workplatform\\img\\";  // 절대 경로로 수정 (운영 환경에 맞게 설정)
            File directory = new File(uploadDir);

            // 디렉토리가 없으면 생성
            if (!directory.exists()) {
                directory.mkdirs();  // 디렉토리 생성
            }

            // 파일 이름 설정
            String fileName = file.getOriginalFilename();
            File uploadedFile = new File(uploadDir + fileName);
            System.out.println(fileName);
            // 파일을 지정된 경로에 저장
            file.transferTo(uploadedFile);
            if (uploadedFile.exists()) {
                System.out.println("파일이 저장되었습니다: " + uploadedFile.getAbsolutePath());  // 디버깅용
            } else {
                System.out.println("파일 저장 실패: " + uploadedFile.getAbsolutePath());  // 디버깅용
            }

            // 저장된 파일 경로 반환
            String filePath = uploadedFile.getAbsolutePath();

            // ChattingDto에 파일 경로 설정
            ChattingDto responseDto = new ChattingDto();
            responseDto.setMstype(1);  // 파일 메시지 타입
            responseDto.setFlocation(filePath);  // 파일 경로
            responseDto.setFname(fileName); // 파일 이름 설정


            // 정상적으로 처리된 경우
            return ResponseEntity.ok(responseDto);

        } catch (Exception e) {
            // 예외가 발생한 경우 500 상태 코드와 함께 오류 메시지 반환
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ChattingDto());
        }
    }


    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam("file") String fileName) {
        try {
            Path filePath = Paths.get("C:\\Users\\tj-bu-702-18\\IdeaProjects\\workplatform\\img\\").resolve(fileName);
            File file = filePath.toFile(); // File 객체 생성

            if (!file.exists()) {
                throw new FileNotFoundException("File not found " + fileName);
            }

            Resource resource = new FileSystemResource(file);  // FileSystemResource 사용

            // HTTP 헤더 설정 (파일 다운로드 설정)
            String contentType = "application/octet-stream";
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
