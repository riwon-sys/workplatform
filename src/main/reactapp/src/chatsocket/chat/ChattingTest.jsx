import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';

const mno = "100001";

const ChatApp = () => {
  const [rooms, setRooms] = useState([{ rno: "", rname: "", mnoList: [] }]);
  const [members, setMembers] = useState([]); // 전체 회원 목록
  const [mnoList, setMnoList] = useState([]); // 선택된 회원 번호 목록
  const [selectedRoomId, setSelectedRoomId] = useState(null); // 클라이언트가 선택한 방번호
  const [message, setMessage] = useState(''); // 클라이언트가 입력한 메세지
  const [messages, setMessages] = useState([]); // 클라이언트가 선택한 채팅방의 메세지 목록
  const [clientSocket, setClientSocket] = useState(null); // WebSocket 연결
  const [isSocketOpen, setIsSocketOpen] = useState(false); // WebSocket 채팅
  const [addMembers, setAddMembers] = useState({mnoList :[], rno : ""}) // 채팅방에 추가할 회원번호 목록과 방번호
  const [mNameList, setMnameList] = useState([]) // 채팅방에 추가된 회원의 이름 목록
  // 파일 서버로 전달
  const [chattingDto, setChattingDto] = useState({
    mstype: 1,       // 메시지 타입 (1: 파일)
    rno: selectedRoomId,
    mname: "test", // 보내는 사람의 이름
    fname: "파일 전송 중", // 메시지 내용
    mno: mno,        // 회원 번호
    msg: "",         // 텍스트 메시지 내용
    flocation: ""    // 파일 경로
  });
  const fileInputRef = useRef(null);

  const [fileObject, setFileObject] = useState();
  // 컴포넌트 마운트 시 현재 로그인된 회원번호가 가입된 채팅방 불러오기
  useEffect(() => {findAllRoom()}, []);

  // 서버에서 채팅방 목록 response 받기
  const findAllRoom = async () => {
    try {
      const response = await axios.get("http://localhost:8080/chatingroom");
      
      // 해당 사용자가 참여 중인 채팅 목록이 존재 시
      if (response.data) {
        setRooms(response.data);
      }
    } catch (e) {
      console.log("채팅방 조회 오류 : ", e);
    }
  };

  // 컴포넌트 마운트 시 전체 회원 불러오기
  useEffect(() => {findAllMember()}, []);

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

  // 채팅방 생성 시 참여할 회원 번호 체크박스 여러개 선택 처리
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
    // 생성할 채팅방 이름 입력받기
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
    // 웹소켓 연결
    const socket = new WebSocket('ws://localhost:8080/chatConnect'); 

    // 웹 소켓 연결 성공 시
    socket.onopen = () => {
      console.log('WebSocket 연결 성공');
      setIsSocketOpen(true); // 웹 소켓 연결 상태 업데이트

      // 보낼 채팅 객체
      const requestMessage = {
        rno: roomId,
        mstype: 3,
      };

      // 파싱 후 서버로 연결 요청
      socket.send(JSON.stringify(requestMessage));
      
    };

    // 웹 소켓 연결 오류 시
    socket.onerror = (error) => {
      console.error('WebSocket 오류 발생:', error);
    };

    // 웹 소켓 연결 종료 시
    socket.onclose = (event) => {
      console.log('WebSocket 연결 종료', event);
      setIsSocketOpen(false); // 웹 소켓 연결 상태 업데이트
    };

    // 생성된 소켓 반환
    return socket;

  };

  // 채팅방 선택 
  const handleRoomSelect = (roomId) => {
    // 만약 기존 소켓이 존재 시
    if (clientSocket) {
      clientSocket.close(); // 해당 소켓 연결 종료
    }

    // 선택된 채팅방 번호 업데이트
    setSelectedRoomId(roomId);

    // 새로운 소켓에 연결
    const socket = createSocketConnection(roomId);

    // 웹소켓 객체에 상태 저장
    setClientSocket(socket);

    // 메세지 초기화
    setMessages([]);
  };


  // 메세지 서버로 전달
 const sendMessage = () => {

  // 만약 소켓이 연결된 상태이고 방번호가 존재한다면
  if (clientSocket && isSocketOpen && selectedRoomId) {
    // 서버로 보낼 메세지 객체
    const messageData = {
      rno: selectedRoomId,
      msg: message,
      mstype: 0,
      mname: 'test',
      mno: mno,
    };
    console.log(messageData)
    // 소켓으로 서버에 전달

    clientSocket.send(JSON.stringify(messageData)); // 메시지 보내기

    // 보내는 메시지 화면에 출력
    /*const setMessage = {
      mname: 'test',
      msg: message,
      fname : chattingDto.fname,
      flocation : chattingDto.flocation,
      isSent: true,  
    };
*/
    
    setMessage(''); // 메시지 입력창 초기화
  } else {
    console.log('WebSocket이 연결되지 않았거나 채팅방이 선택되지 않았습니다.');
  }
};
 // 파일 선택 버튼 클릭 시 input을 트리거하는 함수
 const handleFileInputClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

// 파일 선택 후 상태 업데이트
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFileObject(file); // 선택된 파일을 상태로 업데이트
  }
};

useEffect(() => {
  if (chattingDto.flocation) {
    // chattingDto.flocation 값이 변경되면 WebSocket을 통해 전송
    if (clientSocket && isSocketOpen && selectedRoomId) {
      const messageData = {
        rno: selectedRoomId,
        msg: chattingDto.msg, // 텍스트 메시지 내용
        mstype: chattingDto.mstype, // 메시지 타입 (파일일 때 1)
        mname: chattingDto.mname,
        mno: chattingDto.mno,
        fname: chattingDto.fname, // 파일 이름
        flocation: chattingDto.flocation // 파일 경로
      };

      clientSocket.send(JSON.stringify(messageData)); // 소켓으로 메시지 전송
      console.log("파일 메시지 전송:", messageData); // 디버깅용 로그
    }
  }
}, [ clientSocket, isSocketOpen, selectedRoomId]);

const sendFile = async () => {
  if (clientSocket && fileObject && selectedRoomId && mno) {
    // FormData로 파일 준비
    const formData = new FormData();
    formData.append("file", fileObject);
    formData.append("rno", selectedRoomId);
    formData.append("mstype", 1); // 파일 메시지 타입
    formData.append("mno", mno);

    try {
      // 파일 서버에 업로드
      const response = await axios.post('http://localhost:8080/msg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      // 파일 업로드 성공
      console.log("파일 업로드 성공:", response.data);
      

      // 서버에서 응답 받은 파일 경로를 상태 업데이트
      setChattingDto((prevDto) => ({
        ...prevDto,
        flocation: response.data.flocation, // 서버로부터 받은 파일 경로
        fname: response.data.fname // 서버로부터 받은 파일명
      }));

      // 상태 업데이트 후 WebSocket으로 메시지 전송
      if (clientSocket && isSocketOpen && selectedRoomId) {
        const messageData = {
          rno: selectedRoomId,
          msg: "", // 텍스트는 비워두고, 파일로 전송
          mstype: 1, // 파일 메시지 타입
          mname: "test", // 메시지 작성자 (예시로 'test')
          mno: mno,
          flocation: response.data.flocation,
          fname: response.data.fname
        };

        console.log("파일 메시지 전송:", messageData);
        clientSocket.send(JSON.stringify(messageData)); // 소켓으로 메시지 전송
      }
      
    } catch (error) {
      console.error("파일 업로드 실패:", error);
    }
    }
  }

/*

라이브러리 깔기
    const onCapture = () => {
      // html2canvas에서 html에서 캡처를 할 tag를 매개변수로 넣어주면 canvas를 담아 Promise 객체를 반환
      // 캔버스를 이미지 형태로 리턴하여 id가 imageWrapper인 tag를 감싸게 된다.
      html2canvas(document.getElementById('imageWrapper') as HttpEle).then(
        (canvas) => {
          onSaveAs(canvas.toDataURL('image/png'), 'karina.png');
        }
      );
    };
    // a 태그를 돔에 삽입하고 매개변수인 uri에 canvas를 집어넣어 canvas 자체를 다운로드(캡처)받는다.
    const onSaveAs = (uri: String, filename: String) => {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = uri;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    };
  
*/
// 소켓으로 받은 메세지 처리
useEffect(() => {
  if (clientSocket && selectedRoomId) { // 만약 소켓이 열려있고 채팅방이 선택됐으면
    clientSocket.onmessage = (event) => { // 해당 소켓이 메세지를 받으면 실행
      console.log(event.data);
      const receivedMessage = JSON.parse(event.data); // 서버가 준 메세지 파싱

      // 수신 메세지타입이 보낸상태가 아니면 화면에 추가
      if (!receivedMessage.isSent) { 
        setMessages((prevMessages) => { // 메세지 리스트 업데이트
          
          // 이전메세지와 새 메세지 합치기
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
const addMember = async (rno) => {
  // 추가할 회원수
  const count = Number(prompt("추가할 회원 수"));
  console.log(count);

  let newMnoList = [...addMembers.mnoList]; // 기존 mnoList 복사

  // 추가할 회원번호를 여러 번 입력받아서 newMnoList에 추가
  for (let i = 0; i < count; i++) {
    const mno = prompt("추가할 회원번호");
    newMnoList.push(mno); // newMnoList에 mno 추가
  }

  // 상태 업데이트 (newMnoList 사용)
  setAddMembers((prevState) => ({
    ...prevState,
    mnoList: newMnoList, // 새로 추가된 mnoList 상태 업데이트
  }));

  try {
    const obj = {
      rno: rno,
      mnoList: newMnoList,
    };

    // 서버로 채팅방에 추가할 회원번호 보내고 회원이름 반환받기
    const response = await axios.post("http://localhost:8080/chatingroom/addmember", obj);
    console.log(response.data);
    
    if (response.data != null) {
      alert("추가성공");
      setMnameList(response.data); // 추가된 회원명 목록으로 상태 업데이트
    }
  } catch (e) {
    console.log("회원 추가 오류 : ", e);
  }
};

// 채팅방 삭제
const deleteRoom = async (rno) => {
  try{
    const response = await axios.delete(`http://localhost:8080/chatingroom?rno=${rno}`)
    
    if(response.data == true){
      alert("삭제성공")
      findAllRoom()
    }
  }catch(e){

  }
}
  return (
    <div>
      <h2>채팅방 선택</h2>
      <div>
        {rooms.map((room, index) => (
          <button key={index} onClick={() => handleRoomSelect(room.rno)}>
            {room.rname} | {room.rno} 방
          </button>
        ))}
      </div>

      {selectedRoomId && (
        <div>
          <div>
            <h3>선택된 채팅방: {`채팅방 ${selectedRoomId}`}</h3>
            
          </div>
          <div>
          {messages.map((msg, index) => (
            <div key={index}>
              {/* 텍스트 메시지일 경우 */}
              {msg.msg ? (
                `${msg.mname}: ${msg.msg}`
              ) : (
                // 파일 메시지일 경우 다운로드 링크 표시
                <>
                  {msg.mname}:{" "}
                  {msg.fname}
                  <div id="imageWrapper">
                    <img src={Karina} id="img_prev" width="640" height="640" alt="karina" />
                    <h3>Something Inspirational</h3>
                  </div>
                  <button onClick={onCapture}>이미지 다운로드</button>
                </>
              )}
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
          {/* 파일 첨부 버튼 */}
      <button type="button" onClick={handleFileInputClick}>
        파일첨부
      </button>

          <input 
            type="file"
            ref={fileInputRef} 
            style={{ display: 'none' }}  // 파일 input 숨기기
            onChange={handleFileChange} // 파일 선택 시 상태 업데이트
          />

          {/* 선택된 파일이 있으면 sendFile 버튼 활성화 */}
          {fileObject && (
            <button type="button" onClick={sendFile}>
              파일 전송
            </button>
          )}
          <br/>
          {/* 기존 채팅방에 회원추가*/}
          <button type="button" onClick={() => addMember(selectedRoomId)}> 회원추가 </button>

          {/* 채팅방 삭제 */}
          <button type="button" onClick={() => deleteRoom(selectedRoomId)}> 채팅방 삭제 </button>

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
