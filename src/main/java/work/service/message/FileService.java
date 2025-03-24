package work.service.message;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.UUID;

@Service
public class FileService {

    // 파일을 저장할 폴더 경로 지정
    String baseDir = System.getProperty("user.dir");

    // 업로드할 경로 지정
    String uploadPath = baseDir + "/build/resources/main/static/file/";

    // 파일 업로드
    public String fileUpload(MultipartFile multipartFile) {
        // 실제 업로드할 디렉토리 설정
        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + "_" + multipartFile.getOriginalFilename();
        System.out.println( fileName );
        String filePath = uploadPath + fileName;

        File directory = new File(uploadPath);

        // 디렉토리가 없으면 생성
        if (!directory.exists()) {
            directory.mkdirs();  // 디렉토리 생성
        }

        File directory2 = new File(filePath);

        try {
            multipartFile.transferTo(directory2);
        } catch (IOException e) {
            System.out.println(e);

            return null;
        }

        return fileName;

    }

    // 업로드된 파일 다운로드
    public  void fileDownload(String fileName, HttpServletResponse resp) {
        String downloadPath = uploadPath + fileName;

        File file = new File(downloadPath);
        if(!file.exists()){
            return;
        }

        try{
            FileInputStream fin = new FileInputStream(downloadPath);

            long fileSize = file.length();
            byte[] bytes = new byte[(int)fileSize];

            fin.read(bytes);

            fin.close();

            String oldFilename = URLEncoder.encode(fileName.split("_")[1], "UTF-8");
            resp.setHeader("Content-Disposition", "attachment;filename=" + oldFilename);

            ServletOutputStream fout = resp.getOutputStream();

            fout.write(bytes);

            fout.close();


        }catch (Exception e){
            System.out.println(e);
        }
    }
}
