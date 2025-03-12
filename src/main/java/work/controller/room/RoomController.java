package work.controller.room;

import jakarta.servlet.http.HttpSession;
import org.apache.catalina.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.model.dto.ChattingDto;
import work.model.dto.MessageDto.MessageDto;
import work.model.dto.member.MemberDto;
import work.model.dto.room.RoomDto;
import work.model.mapper.room.RoomMapper;
import work.service.room.RoomService;

import java.util.List;

@RestController
@RequestMapping("/chatingroom")
@CrossOrigin("http://localhost:5173")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private HttpSession httpSession;


    // 테스트 용
    @Autowired
    private RoomMapper roomMapper;
    // 테스트 샘플
    int sample = 100001;
    // [1] 채팅방 등록
    @PostMapping
    public boolean write(@RequestBody RoomDto roomDto) {
        System.out.println("RoomController.write");
        System.out.println("roomDto = " + roomDto);
        // 세션에서 로그인된 회원번호 가져오기
        Integer loginMno = (Integer) httpSession.getAttribute("mno");

        return roomService.write(roomDto, sample); // sample 나중에 mno 로 바꾸기

    }

    // [2] 회원별 채팅방 전체 조회
    @GetMapping
    public List<RoomDto> find() {
        // 세션에서 로그인된 회원번호 가져오기
        Integer loginMno = (Integer) httpSession.getAttribute("mno");

        return roomService.find(sample); // sample 나중에 mno 로 바꾸기
    }

    // [3] 채팅방 상세 조회
    @GetMapping("/view")
    public List<MessageDto> findAll(@RequestParam int rno) {

        return roomService.findAll(rno);
    }

    // [4] 채팅방 수정
    @PutMapping
    public boolean update(@RequestBody RoomDto roomDto) {

        return roomService.update(roomDto);
    }

    // [5] 채팅방 삭제
    @DeleteMapping
    public boolean delete(@RequestParam("rno") int rno) {

        // 나중에 본인 생성한 채팅방인지 유효성 검사 추가하기
        return roomService.delete(rno);
    }

    // [6] 기존 채팅방에 회원 추가
    @PostMapping("/addmember")
    public List<String> addMember(@RequestBody RoomDto roomDto){
        List<String> result = roomService.addMember(roomDto);

        return  result;
    }

    // [7]

    // 테스트를 위한 회원 전체 출력
    @GetMapping("/member")
    public List<MemberDto> findMember(){
        return roomMapper.findMember();
    }
}
