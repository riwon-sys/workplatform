package work.service.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.dto.ChattingDto;
import work.model.dto.MessageDto.MessageDto;
import work.model.dto.room.RoomDto;
import work.model.mapper.room.RoomMapper;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    RoomMapper roomMapper;

    // [1] 채팅방 등록 (채팅방에 참여할 인원수(mnoList length 에 따라 메소드 나누기)
    public boolean write(RoomDto roomDto, int loginMno){

        // 채팅방 타입 지정
        int type = roomDto.getMnoList().size() > 1 ? 1 : 0;

        String rtype = Integer.toString(type);

        roomDto.setRtype(rtype);

        // 채팅방 생성
        boolean roomCreate = roomMapper.write(roomDto, loginMno);
        if(!roomCreate){
            return false;
        }

        // rno 저장 후 참여자테이블 insert
        int rno = roomDto.getRno();


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
    public boolean addMember(RoomDto roomDto){

        for(int mno : roomDto.getMnoList()){
            roomMapper.participantWrite(mno, roomDto.getRno());
        }

        return true;

    }
}
