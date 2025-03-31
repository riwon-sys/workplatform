package work.log;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import work.model.dto.ChattingDto;

@Slf4j // lombok 에서 제공하는 로거 인스턴스 자동 생성 어노테이션
@Component
public class LogClass {
    public void logMethod (){
        log.info(" log info "); // log.info : 로그 기록
    }

    // 메세지 입력 시 입력 정보를 가져와서 로그 처리
    public static  void logMsg(ChattingDto chattingDto){
        System.out.println("로그처리");

        if(chattingDto.getMstype() == 0 || chattingDto.getMstype() == 1) {

            switch (chattingDto.getMstype()) {
                case 0:
                    System.out.println(chattingDto);
                    log.info("일반메세지 : " + chattingDto.toString().replace("\n", "\\n"));
                    System.out.println("메세지 로그 처리됨");
                    break;
                case 1:
                    System.out.println(chattingDto);
                    log.info("파일메세지 : " + chattingDto);
                    System.out.println("파일 로그 처리됨");
                    break;

                default:
                    break;
            }
        }

    }
}
