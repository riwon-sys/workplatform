package work.controller.room;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.model.dto.ChattingDto;
import work.model.dto.MessageDto.MessageDto;
import work.model.dto.member.MemberDto;
import work.model.dto.member.MemberUtils;
import work.model.dto.room.RoomDto;
import work.model.mapper.room.RoomMapper;
import work.service.room.RoomService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chattingroom")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    private final HttpSession httpSession;

    private  final MemberUtils memberUtils;
    // 테스트 용
    @Autowired
    private RoomMapper roomMapper;
    // 테스트 샘플
    int sample = 100001;
    // [1] 채팅방 등록
    @PostMapping
    public boolean write(@RequestBody RoomDto roomDto) {
        System.out.println("RoomController.write");
        System.out.println("roomDto = " + roomDto.getMnoList());
        // 세션에서 로그인된 회원번호 가져오기
        Integer loginMno = (Integer) httpSession.getAttribute("mno");

        return roomService.write(roomDto, sample); // sample 나중에 mno 로 바꾸기

    }

    // [2] 회원별 채팅방 전체 조회
    @GetMapping
    public List<RoomDto> find() {
        // 세션에서 로그인된 회원번호 가져오기
        Integer loginMno = (Integer) httpSession.getAttribute("mno");

        List<RoomDto> result = roomService.find(sample);

        // rno 중북 제거 후 return
        Set<Integer> uniqueRnos = new HashSet<>();

        // 중복 제거한 List 를 저장할 변수 선언
        List<RoomDto> uniqueRooms = new ArrayList<>();

        for (RoomDto room : result) {
            // uniqueRnos 에 rno 가 없으면
            // 리스트.contains() : List 내 요소 존재 여부 확인
            if (!uniqueRnos.contains(room.getRno())) {
                uniqueRnos.add(room.getRno()); // uniqueRnos 에 추가
                uniqueRooms.add(room); // uniqueRooms 에 추가
            }
        }

        // 필터링된 고유한 채팅방만 리턴
        return uniqueRooms;
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

    // [5] 채팅방 나가기
    @DeleteMapping
    public boolean delete(@RequestParam("rno") int rno) {

        // 나중에 본인 생성한 채팅방인지 유효성 검사 추가하기
        return roomService.delete(rno, sample); // 나중에 로그인된 세션 mno 로 바꾸기
    }

    // [6] 기존 채팅방에 회원 추가
    @PostMapping("/addmember")
    public List<String> addMember(@RequestBody RoomDto roomDto){

        System.out.println("RoomController.addMember");
        System.out.println("roomDto = " + roomDto.getRno());
        List<String> result = roomService.addMember(roomDto);

        System.out.println("result = " + result);
        return  result;
    }

    // [7] 채팅방 나가기

    // [8] 채팅방 정보 조회
    @GetMapping("/findroominfo")
    public RoomDto findRoomInfo(@RequestParam int rno){
        System.out.println("RoomController.findRoomInfo");
        System.out.println("rno = " + rno);

        return  roomService.findRoomInfo(rno);
    }

    // 테스트를 위한 회원 전체 출력
    @GetMapping("/member")
    public List<MemberDto> findMember(){

        List<MemberDto> result = roomMapper.findMember();

        // 각 회원의 mno에 대해 부서 정보를 가져와 department에 설정
        for (MemberDto member : result) {
            // getDepartmentFromMno() 메소드를 호출하여 부서명을 설정
            String department = memberUtils.getDepartmentFromMno(member.getMno());
            member.setDepartment(department); // MemberDto에 부서 정보 설정
        }


        // 결과 반환
        return result;
    }

    // 이미 참여중인 회원조회
    @GetMapping("/participation")
    public List<MemberDto> findParticipation(@RequestParam int rno){
        System.out.println("RoomController.findParticipation");
        System.out.println("rno = " + rno);

        return roomService.findParticipation(rno);
    }
}