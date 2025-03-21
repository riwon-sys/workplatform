package work.log;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class LogReader {

    // 로그 기록 출력 메소드
    public static List<String> readLastLog() {
        // 현재 프로젝트 경로
        String baseDir = System.getProperty("user.dir");

        // 로그 파일 경로
        File logFile = new File(baseDir + "/logs/app.log"); // 로그 파일 경로



        List<String> logList = new ArrayList<>(); // 로그를 저장할 List 선언

        // BufferedReader 클래스 : 파일을 한 줄씩 읽어옴
        // (new FileReader(logFile) : 로그파일을 읽기 위한 파일 리더 생성
        try (BufferedReader br = new BufferedReader(new FileReader(logFile))) {
            String line; // 로그 파일을 읽어온 결과를 저장할 변수 선언

            // 로그 파일을 한줄 씩 읽어서 변수에 저장
            while ((line = br.readLine()) != null) {
                logList.add(line); // 로그를 List에 추가
                // System.out.println("로그 출력: " + line);
            }
        } catch (IOException e) {
            e.printStackTrace(); // 예외 발생 시 스택 트레이스 출력
        }

        return logList;
    }
}