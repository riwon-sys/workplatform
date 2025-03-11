import React, { useState, useEffect } from 'react';
import axios from 'axios';

const mno = "100001";

const ChatApp = () => {
  const [rooms, setRooms] = useState([{ rno: "", rname: "", mnoList: [] }]);
  const [members, setMembers] = useState([]); // 회원 목록
  const [mnoList, setMnoList] = useState([]); // 선택된 회원 번호 목록
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientSocket, setClientSocket] = useState(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [addMembers, setAddMembers] = useState({mnoList :[], rno : ""})
  // 채팅방 불러오기
  useEffect(() => {findAllRoom()}, []);

  const findAllRoom = async () => {
    try {
      const response = await axios.get("http://localhost:8080/chatingroom");
      if (response.data) {
        setRooms(response.data);
      }
    } catch (e) {
      console.log("채팅방 조회 오류 : ", e);
    }
  };

  // 회원 불러오기
  useEffect(() => {
    findAllMember();
  }, []);

  const findAllMember = async () => {
    try {
      const response = await axios.get("http://localhost:8080/chatingroom/member");
      if (response.data) {
        setMembers(response.data);
      }
    } catch (e) {
      console.log("회원 조회 오류 : ", e);
    }
  };

  // 회원 번호 체크박스 여러개 선택 처리
  const handleCheckboxChange = (mno) => {

    setMnoList((prevMnoList) => {
      if (prevMnoList.includes(mno)) {
        return prevMnoList.filter(item => item !== mno); // 이미 선택된 번호는 삭제
      } else {
        return [...prevMnoList, mno]; // 새로 선택된 번호는 추가
      }
    });
  };

  // 채팅방 생성
  const creatR = async () => {
    const rname = prompt("채팅방 이름")
    const obj = {
      rname: rname,
      mnoList: mnoList,
    };
    console.log("채팅방에 참여할 mno" + mnoList)
    try {
      const response = await axios.post("http://localhost:8080/chatingroom", obj);
      if (response.data === true) {
        alert("채팅방 등록 성공");
        findAllRoom()
      }
    } catch (e) {
      console.log("채팅방 생성 오류 : ", e);
    }
  };

  // WebSocket 연결 설정
  const createSocketConnection = (roomId) => {
    const socket = new WebSocket('ws://localhost:8080/chatConnect');

    socket.onopen = () => {
      console.log('WebSocket 연결 성공');
      setIsSocketOpen(true);

      const requestMessage = {
        rno: roomId,
        mstype: 3,
      };
      socket.send(JSON.stringify(requestMessage));
      
    };

    socket.onerror = (error) => {
      console.error('WebSocket 오류 발생:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket 연결 종료', event);
      setIsSocketOpen(false);
    };

    return socket;
  };

  const handleRoomSelect = (roomId) => {
    if (clientSocket) {
      clientSocket.close();
    }

    setSelectedRoomId(roomId);
    const socket = createSocketConnection(roomId);
    setClientSocket(socket);
    setMessages([]);
  };

 const sendMessage = () => {
  if (clientSocket && isSocketOpen && selectedRoomId) {
    // 서버로 보낼 메세지 객체
    const messageData = {
      rno: selectedRoomId,
      msg: message,
      mstype: 0,
      mname: 'test',
      mno: mno,
    };

    // 소켓으로 서버에 전달
    clientSocket.send(JSON.stringify(messageData)); // 메시지 보내기

    // 보내는 메시지 화면에 출력
    const sentMessage = {
      mname: 'test',
      msg: message,
      isSent: true,  // 보낸 메시지에는 isSent 플래그 추가
    };

    
    setMessage(''); // 메시지 입력창 초기화
  } else {
    console.log('WebSocket이 연결되지 않았거나 채팅방이 선택되지 않았습니다.');
  }
};

// 소켓으로 받은 메세지 처리
useEffect(() => {
  if (clientSocket && selectedRoomId) { // 만약 소켓이 열려있고 채팅방이 선택됐으면
    clientSocket.onmessage = (event) => { // 해당 소켓이 메세질 받으면 실행
      console.log(event.data);
      const receivedMessage = JSON.parse(event.data); // 서버가 준 메세지 파싱

      // 수신 메세지타입이 보낸상태가 아니면 화면에 추가
      if (!receivedMessage.isSent) { 
        setMessages((prevMessages) => { // 메세지 리스트 업데이트
          
          return [...prevMessages, receivedMessage];
          
          
        });
      }
    };

    return () => {
      clientSocket.close(); // 컴포넌트 언마운트 되면 소켓 종료
    };
  }
}, [clientSocket, selectedRoomId]); // cilentSocket 이나 채팅방 새로 선택 시마다 리렌더링

// 기존 채팅방에 회원추가
const addMember = async () => {
  const count = Number(prompt("추가할 회원 수"))
  
  for(let i = 0 ; i < count ; i++){
    const mno = prompt("추가할 회원번호")

    setAddMembers(mno)
  }
  try{
    const response = await axios.post("http://localhost:8080/chatingroom")
  }catch(e){
    console.log("회원 추가 오류 : ", e)
  }
}

  return (
    <div>
      <h2>채팅방 선택</h2>
      <div>
        {rooms.map((room, index) => (
          <button key={index} onClick={() => handleRoomSelect(room.rno)}>
            {room.rname}번 방
          </button>
        ))}
      </div>

      {selectedRoomId && (
        <div>
          <div>
            <h3>선택된 채팅방: {`채팅방 ${selectedRoomId}`}</h3>
            {/* 기존 채팅방에 회원추가*/}
            <button type='button' onClick={addMember}> 회원추가 </button>
          </div>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.msg ? `${msg.mname}: ${msg.msg}` : `${msg.mname}: ${msg.fname}`}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>등록</button>
        </div>
      )}

      <h2>채팅방 생성</h2>
      <table>
        <thead>
          <tr>
            <th>회원번호</th>
            <th>회원이름</th>
            <th>회원직급</th>
            <th>
              <button type='button' onClick={creatR}>채팅방 생성</button>
      
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.mno}>
              <td>
                <input
                  type="checkbox"
                  value={m.mno}
                  onChange={() => handleCheckboxChange(m.mno)}
                />
                {m.mno}
              </td>
              <td>{m.mname}</td>
              <td>{m.mrank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChatApp;
