package work.service.room;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.dto.ChattingDto;
import work.model.dto.MessageDto.MessageDto;
import work.model.dto.member.MemberDto;
import work.model.dto.room.RoomDto;
import work.model.mapper.room.RoomMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomMapper roomMapper;

    // [1] 채팅방 등록 (채팅방에 참여할 인원수(mnoList length 에 따라 메소드 나누기)
    public boolean write(RoomDto roomDto, int loginMno){

        // 채팅방 타입 지정
        int type = roomDto.getMnoList().size() > 1 ? 1 : 0;

        String rtype = Integer.toString(type);

        roomDto.setRtype(rtype);

        // 채팅방 생성
        // 나중에 만든 회원번호로 참여자 테이블에 추가하기
        boolean roomCreate = roomMapper.write(roomDto, loginMno);
        if(!roomCreate){
            return false;
        }

        // rno 저장 후 참여자테이블 insert
        int rno = roomDto.getRno();

        // 현재 로그인된 회원번호 참여자 리스트 추가
        // roomDto.getMnoList().add(loginMno);

        for(int mno : roomDto.getMnoList()){
            roomMapper.participantWrite(mno, rno);
        }

        return true;

    }

    // [2] 회원별 채팅방 전체 조회
    public List<RoomDto> find(int loginMno){

        return  roomMapper.find(loginMno);

    }

    // [3] 채팅방 상세 조회
    public List<MessageDto> findAll(int rno){

        return roomMapper.findAll(rno);

    }

    // [4] 채팅방 수정
    public boolean update (RoomDto roomDto){

        return  roomMapper.update(roomDto);

    }

    // [5] 채팅방 삭제
    public boolean delete(int rno){

        return roomMapper.delete(rno);

    }

    // [6] 기존 채팅방에 회원추가
    public List<String> addMember(RoomDto roomDto){
        boolean state = false;
        List<String> mnameList = new ArrayList<>();

        for(int mno : roomDto.getMnoList()){
            state = roomMapper.participantWrite(mno, roomDto.getRno());
        }

        if(state == true) {
            for (int mno : roomDto.getMnoList()) {
                  String mname = roomMapper.findMname(mno);
                  mnameList.add(mname);
           }
        }
        return mnameList;

    }

    // [8] 채팅방 정보 조회
    public RoomDto findRoomInfo (int rno){
        System.out.println("RoomService.findRoomInfo");
        System.out.println("rno = " + rno);

        RoomDto result = roomMapper.findRoomInfo(rno);
        System.out.println("result = " + result);

        return result;
    }
}
