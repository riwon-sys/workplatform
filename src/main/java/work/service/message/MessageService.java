package work.service.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.model.dto.ChattingDto;
import work.model.mapper.room.MessageMapper;

@Service
public class MessageService {
    @Autowired
    private MessageMapper messageMapper;

    public boolean writeFile(ChattingDto chattingDto){
        return messageMapper.writeFile(chattingDto);
    }
}
