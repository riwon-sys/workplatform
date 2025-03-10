package work.config.chatting;

import org.springframework.stereotype.Repository;
import work.model.dto.room.RoomDto;

import java.util.*;

@Repository
public class ChatRepository {
    private final Map<String, RoomDto> rooms = new LinkedHashMap<>();

    public List<RoomDto> findAllRooms(){
        return new ArrayList<>( rooms.values() );
    } // f end

    public RoomDto findByRid( String rId ){
        return rooms.get( rId );
    } // f end

    public RoomDto createRoom( String name ){
        RoomDto roomDto = RoomDto.create(name);
        rooms.put( roomDto. , roomDto);
    } // f end

}
