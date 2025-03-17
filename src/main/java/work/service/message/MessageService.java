package work.service.message;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.dto.ChattingDto;
import work.model.mapper.room.MessageMapper;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final  MessageMapper messageMapper;

    public boolean writeFile(ChattingDto chattingDto){
        return messageMapper.writeFile(chattingDto);
    }
}
