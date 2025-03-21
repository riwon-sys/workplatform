package work.log;

import aj.org.objectweb.asm.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import work.model.dto.ChattingDto;
import work.model.dto.room.RoomDto;

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

    // 마지막 로그 한 줄만 읽어서 ChattingDto로 변환 후 반환
    public static ChattingDto readLastLog() {
        // 현재 프로젝트 경로
        String baseDir = System.getProperty("user.dir");

        // 로그 파일 경로
        File logFile = new File(baseDir + "/logs/app.log");

        // BufferedReader 클래스 : 파일을 한 줄씩 읽기 위해 사용
        try (BufferedReader br = new BufferedReader(new FileReader(logFile))) {
            String line;
            String lastLine = null;

            // 파일의 모든 줄을 읽으면서 마지막 줄만 저장
            while ((line = br.readLine()) != null) {
                lastLine = line;
            }

            // 마지막 줄이 존재하면 그것을 ChattingDto로 변환하여 반환
            if (lastLine != null) {
                return parseLogToChattingDto(lastLine); // 마지막 줄을 ChattingDto로 변환
            }

        } catch (IOException e) {
            e.printStackTrace(); // 예외 발생 시 스택 트레이스 출력
        }

        return null; // 로그가 없다면 null 반환
    }

    // 로그 한 줄을 ChattingDto로 변환하는 메소드
    private static ChattingDto parseLogToChattingDto(String log) {
        ChattingDto chattingDto = new ChattingDto();

        // 정규 표현식으로 로그 데이터를 파싱
        String[] parts = log.replace("ChattingDto(", "").replace(")", "").split(", ");

        for (String part : parts) {
            String[] keyValue = part.split("=");

            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();

                switch (key) {
                    case "mstype":
                        chattingDto.setMstype(Integer.parseInt(value));
                        break;
                    case "rno":
                        chattingDto.setRno(Integer.parseInt(value));
                        break;
//                    case "msDate":
//                        chattingDto.setMsDate(value.equals("null") ? null : value);
//                        break;
                    case "loginMno":
                        chattingDto.setLoginMno(Integer.parseInt(value));
                        break;
                    case "mname":
                        chattingDto.setMname(value);
                        break;
//                    case "mscontent":
//                        chattingDto.setMscontent(value.equals("null") ? null : value);
//                        break;
                    case "mno":
                        chattingDto.setMno(Integer.parseInt(value));
                        break;
                    case "msg":
                        chattingDto.setMsg(value);
                        break;
//                    case "msno":
//                        chattingDto.setMsno(Integer.parseInt(value));
//                        break;
                    case "fno":
                        chattingDto.setFno(Integer.parseInt(value));
                        break;
                    case "fname":
                        chattingDto.setFname(value.equals("null") ? null : value);
                        break;
                    case "flocation":
                        chattingDto.setFlocation(value);
                        break;
//                    case "fdate":
//                        chattingDto.setFdate(value.equals("null") ? null : value);
//                        break;
//                    case "type":
//                        chattingDto.setType(value.equals("null") ? null : value);
//                        break;
//                    case "message":
//                        chattingDto.setMessage(value.equals("null") ? null : value);
//                        break;
//                    case "action":
//                        chattingDto.setAction(value.equals("null") ? null : value);
//                        break;
                    default:
                        break;
                }
            }
        }

        return chattingDto;
    }
}
