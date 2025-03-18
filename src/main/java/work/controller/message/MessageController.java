package work.controller.message;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
import work.service.message.FileService;
import work.service.message.MessageService;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/msg")
@RequiredArgsConstructor
public class MessageController {

    private  final  MessageService messageService;

    private  final FileService fileService;

    // 파일을 저장할 폴더 경로 지정
    String baseDir = System.getProperty("user.dir");

    // 업로드할 경로 지정
    String uploadPath = baseDir + "build/resources/static/file/";

    // 파일 업로드
    @PostMapping("/file/upload")
    public String fileUpload(MultipartFile file) {
        System.out.println("file = " + file);
        System.out.println("MessageController.writeFile");

        String result =  fileService.fileUpload(file);
        System.out.println("파일업로드 확인 : " + result);

        return result;
    }


    @GetMapping("/file/download")
    public void fileDownload(@RequestParam("file") String fileName, HttpServletResponse resp) {
        System.out.println("MessageController.fileDownload");
        System.out.println("fileName = " + fileName + ", resp = " + resp);

        fileService.fileDownload(fileName, resp);
    }


}
