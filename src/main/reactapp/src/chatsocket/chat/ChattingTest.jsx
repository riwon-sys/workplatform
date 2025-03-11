import React, { useState, useEffect, useRef } from 'react';

const mno = "100001";
const ChatApp = () => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientSocket, setClientSocket] = useState(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false);

  // WebSocket 연결 설정
  const createSocketConnection = (roomId) => {
    const socket = new WebSocket('ws://localhost:8080/chatConnect');

    socket.onopen = () => {
      console.log('WebSocket 연결 성공');
      setIsSocketOpen(true);

      // 기존 채팅 요청을 서버로 전송
      const requestMessage = {
        rno: roomId, // 채팅방 번호
        mstype: 3, // 기존 채팅 요청 타입
      };
      socket.send(JSON.stringify(requestMessage)); // 서버로 기존 채팅 요청
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log('서버로부터 받은 메시지:', receivedMessage);
      
      // 받은 메시지를 화면에 출력
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket 오류 발생:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket 연결 종료', event);
      setIsSocketOpen(false);
      setMessages([]); // 소켓 종료 시 기존 메시지 비우기
    };

    return socket;
  };

  const handleRoomSelect = (roomId) => {
    if (clientSocket) {
      clientSocket.close(); // 기존 WebSocket 연결 종료
    }

    setSelectedRoomId(roomId);
    console.log(`선택된 채팅방 ID: ${roomId}`);
    
    // 새 WebSocket 연결 생성
    const socket = createSocketConnection(roomId);
    setClientSocket(socket);
    setMessages([]); // 새 채팅방을 선택하면 메시지 초기화
  };

  const sendMessage = () => {
    if (clientSocket && isSocketOpen && selectedRoomId) {
      const messageData = {
        rno: selectedRoomId,
        msg: message,
        mstype: 0, // 텍스트 메시지
        mname: 'test',
        mno: mno,
      };

      clientSocket.send(JSON.stringify(messageData)); // 서버로 메시지 전송
      console.log('메시지 전송:', message);

      // 보낸 메시지 바로 화면에 추가
      const sentMessage = {
        mname: 'test',
        msg: message, // 메시지 내용은 msg로 설정
      };

      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setMessage(''); // 입력창 비우기
    } else {
      console.log('WebSocket이 연결되지 않았거나 채팅방이 선택되지 않았습니다.');
    }
  };

  return (
    <div>
      <h2>채팅방 선택</h2>
      <div>
        <button onClick={() => handleRoomSelect(1)}>채팅방 1</button>
        <button onClick={() => handleRoomSelect(2)}>채팅방 2</button>
        <button onClick={() => handleRoomSelect(3)}>채팅방 3</button>
        <button onClick={() => handleRoomSelect(4)}>채팅방 4</button>
        <button onClick={() => handleRoomSelect(5)}>채팅방 5</button>
      </div>

      {selectedRoomId && (
        <div>
          <h3>선택된 채팅방: {`채팅방 ${selectedRoomId}`}</h3>
          {/* 메시지 출력 영역 */}
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.mname}: {msg.msg} {/* msg.msg로 수정 */}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // 메시지 상태 업데이트
            />
            <button onClick={sendMessage}>등록</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;

