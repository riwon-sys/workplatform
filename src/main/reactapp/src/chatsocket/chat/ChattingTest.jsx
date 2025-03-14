import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Checkbox from '@mui/material/Checkbox';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Input } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%', // 높이 설정 추가

}));

const mno = "100001";
export default function ChatTeset() {
  const [rooms, setRooms] = useState([{ rno: "", rname: "", mnoList: [] }]);
  const [members, setMembers] = useState([]); // 전체 회원 목록
  const [mnoList, setMnoList] = useState([]); // 선택된 회원 번호 목록
  const [selectedRoomId, setSelectedRoomId] = useState(null); // 클라이언트가 선택한 방번호
  const [message, setMessage] = useState(''); // 클라이언트가 입력한 메세지
  const [messages, setMessages] = useState([]); // 클라이언트가 선택한 채팅방의 메세지 목록
  const [clientSocket, setClientSocket] = useState(null); // WebSocket 연결
  const [isSocketOpen, setIsSocketOpen] = useState(false); // WebSocket 채팅
  const [addMembers, setAddMembers] = useState({ mnoList: [], rno: "" }) // 채팅방에 추가할 회원번호 목록과 방번호
  const [mNameList, setMnameList] = useState([]) // 채팅방에 추가된 회원의 이름 목록



  // 브라우저 입장 시 접속되는 소켓
  // WebSocket 연결 함수
  const [totalSocket, setTotalSocket] = useState(null);
  useEffect(() => {
    connectTotalWebSocket(); // 처음에는 연결 시도
    return () => {
      if (totalSocket) {
        totalSocket.close(); // 컴포넌트 언마운트 시 연결 종료
      }
    };
  }, []);


  // WebSocket 연결 함수
  const connectTotalWebSocket = () => {
    // WebSocket이 이미 연결된 상태라면 다시 연결하지 않음
    if (totalSocket && totalSocket.readyState === WebSocket.OPEN) {
      console.log('이미 WebSocket 연결됨');
      return;  // 이미 연결된 경우 다시 연결하지 않음
    }

    const totalConnect = new WebSocket('ws://localhost:8080/totalConnect');

    // WebSocket이 열린 후
    totalConnect.onopen = () => {
      console.log('전체 소켓 연결됨');
      const initMessage = { type: 'join', message: '클라이언트가 연결됨' };
      totalConnect.send(JSON.stringify(initMessage));  // 서버에 초기 메시지 전송

    };

    totalConnect.onmessage = (e) => {
      console.log(e.data)
    
      if(e.data == 5){
        findAllRoom()
      }

    }
    // WebSocket 오류 발생 시
    totalConnect.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    // WebSocket 연결이 종료될 때
    totalConnect.onclose = (event) => {
      console.log('WebSocket 연결 종료', event);
      if (event.code !== 1000) {  // 정상적으로 종료되지 않은 경우
        console.log('WebSocket 연결이 비정상적으로 종료됨');
      }
    };

    setTotalSocket(totalConnect);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 WebSocket 연결을 한 번만 시도
    connectTotalWebSocket();

    return () => {
      // 컴포넌트가 언마운트될 때 WebSocket 종료
      if (totalSocket) {
        totalSocket.close();
      }
    };
  }, []);  // 빈 배열을 전달하여 한 번만 실행

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
  useEffect(() => { findAllRoom() }, []);

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
  /*
     // 채팅방이 새로 생성되면, 소켓에 리렌더링을 요청하는 함수
     useEffect(() => {
      if (totalSocket && rooms.length > 0) {
        // 채팅방 목록이 업데이트되면 전체 소켓에 리렌더링을 알리기 위해 메시지 보내기
        totalSocket.send(JSON.stringify({ action: 'refreshRooms', rooms }));
      }
    }, [rooms, totalSocket]); // rooms가 업데이트될 때마다 실행됨
  */

  // 컴포넌트 마운트 시 전체 회원 불러오기
  useEffect(() => { findAllMember() }, []);

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
   // setMnoList([])

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
        const mappingobj ={
          rname : rname,
          mstype : 5
        }
        totalSocket.send(JSON.stringify(mappingobj))
        
      }

    } catch (e) {
      console.log("채팅방 생성 오류 : ", e);
    }

    setMnoList([])
  };

  // 채팅방 접속 WebSocket
  const connectChatRoomSocket = (roomId) => {
    const socket = new WebSocket('ws://localhost:8080/chatConnect');

    socket.onopen = () => {
      console.log('채팅방 소켓 연결 성공');
      setIsSocketOpen(true);
      const joinMessage = {
        rno: roomId,
        mstype: 3,
      };
      socket.send(JSON.stringify(joinMessage));
    };

    socket.onerror = (error) => {
      console.error('채팅방 소켓 오류 발생:', error);
    };

    socket.onclose = (event) => {
      console.log('채팅방 소켓 연결 종료', event);
      setIsSocketOpen(false);
    };

    setClientSocket(socket);
  };

  // 채팅방 선택
  const handleRoomSelect = (roomId) => {
    if (clientSocket) {
      clientSocket.close(); // 기존 소켓 종료
    }
    setSelectedRoomId(roomId);
    connectChatRoomSocket(roomId); // 새로운 소켓 연결
    setMessages([]); // 메시지 초기화
  };

  // 메세지 서버로 전달
  const sendMessage = () => {

    // 만약 소켓이 연결된 상태이고 방번호가 존재한다면
    if (clientSocket && isSocketOpen && selectedRoomId) {

      if (clientSocket.readyState == WebSocket.OPEN) {
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
        console.log('WebSocket 연결이 완료되지 않았습니다. 연결을 기다립니다...');

        // WebSocket 연결이 완료될 때까지 일정 간격으로 확인
        const interval = setInterval(() => {
          if (clientSocket.readyState === WebSocket.OPEN) {
            clearInterval(interval);  // 연결되면 인터벌을 종료
            clientSocket.send(JSON.stringify(messageData));  // 메시지 전송
            setMessage('');  // 메시지 입력창 초기화
          }
        }, 100);  // 100ms마다 연결 상태 확인
      }
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
  }, [clientSocket, isSocketOpen, selectedRoomId]);

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
          setFileObject("")
        }

      } catch (error) {
        console.error("파일 업로드 실패:", error);
      }
    }
  }



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
    try {
      const response = await axios.delete(`http://localhost:8080/chatingroom?rno=${rno}`)

      if (response.data == true) {
        alert("삭제성공")
        findAllRoom()
      }
    } catch (e) {

    }
  }

  const mySpaceRef = useRef(null);

  useEffect(() => {
    // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
    if (mySpaceRef.current) {
      mySpaceRef.current.scrollTop = mySpaceRef.current.scrollHeight;
    }
  }, [messages]); // messages가 변경될 때마다 실행됨

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid size={2.5} sx={{ height: '100%' }}>
          <Item >
            <div style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "3%",
              height: "4.3%"
            }}>
              <h3 style={{ fontSize: "180%" }}>채팅방 선택</h3> {/* 나중에 로그인된 회원정보 출력으로 바꾸기 */}
            </div>
            <hr></hr>

            <div style={{margin : " 0 auto", overflow: "scroll", overflowX: 'hidden', height: '94.8%' }}>
              <div style={{ width : "100%",display: "flex", justifyContent: "center", alignItems: "center" }}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                  {rooms.map((room, index) => (
                    <div>
                      <ListItem style={{width : "100%"}}>
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          key={index} onClick={() => handleRoomSelect(room.rno)}
                          primary={`${room.rname} | ${room.rno} 방`} secondary={`${room.rdate}`} />
                      </ListItem>

                      <hr style={{ border: "1px solid #bdbdbd", width : "100%" }} />
                    </div>
                  ))}
                </List>
              </div>
            </div>

          </Item>
        </Grid>


        <Grid size={6} sx={{ height: '100%' }}>
          <Item>
            {selectedRoomId && (
              <div style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "5%",
                height: "4.3%"
              }}>
                {/* 채팅방 정보 */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center",marginBottom: "1.5%", textAlign: "center"}}>
                  <h3 style={{ fontSize: "180%" }}>{`채팅방 ${selectedRoomId}`}</h3>

                  {/* 기존 채팅방에 회원추가 */}
                  <Button
                    type="button"
                    onClick={() => addMember(selectedRoomId)}
                    component="label"
                    variant="contained"
                    color='info'
                    sx={{ height: "30%", marginLeft: "10%" }}
                  >
                    회원추가
                  </Button>

                  {/* 채팅방 삭제 */}
                  <Button
                    type="button"
                    onClick={() => deleteRoom(selectedRoomId)}
                    component="label"
                    variant="contained"
                    color='info'
                    sx={{ height: "30%", marginLeft: "5%" }}
                  >
                    채팅방 삭제
                  </Button>
                </div>
                <hr />

                {/* 메시지 영역 */}
                <div id="space" ref={mySpaceRef} style={{ overflow: "scroll", overflowX: 'hidden', height: '2000%' }}>
                  {messages.map((msg, index) => (
                    <div key={index} style={{ display: 'flex', marginTop: '15px' }}>
                      {msg.msg ? (
                        
                          <Card sx={{ minWidth: 100 }} style={{ marginLeft : "5%",width: '450px', textAlign: "start" }}>
                            <CardContent>
                              <Typography variant="body2">
                                <h3 style={{ color: "black" }}>{msg.mname}</h3>
                                <br />
                                {msg.msg}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small">채팅 삭제</Button>
                            </CardActions>
                          </Card>
                        ) : (
                          <Card sx={{ minWidth: 100 }} style={{marginLeft : "5%", width: '300px', textAlign: "start" }}>
                            <CardContent>
                              <Typography variant="body2">
                                <h3 style={{ color: "black" }}>{msg.mname}</h3>
                                <br />
                                {msg.fname}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small">채팅 삭제</Button>
                              <Button
                                href={`http://localhost:8080/msg/download?file=${encodeURIComponent(msg.fname)}`}
                                download={msg.fname}
                              >
                                다운로드
                              </Button>
                            </CardActions>
                          </Card>
                      )}
                    </div>
                  ))}
                </div>
                
                <div style={{marginBottom : "7%"}}>
                
                {/* 메시지 입력칸과  등록 버튼 */}
                <div style={{ display: 'flex',  marginLeft : "3%" }}>
                  <Input
                    type="text"
                    placeholder="메시지를 입력하세요."
                    value={message}
                    variant="outlined"
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: "60%", marginRight: "10px"}}
                  />
                  <Button onClick={sendMessage} variant="contained" color='info'
                  style={{width : "10%", height : "5%", marginTop : "5%", marginLeft : "2.5%"}}>
                    등록
                  </Button>

                  {/* 파일 첨부 버튼 */}
                <Button
                  type='button'
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleFileInputClick}
                  color='info'
                  style={{width : "13%", height : "5%", marginTop : "5%", marginLeft : "2.5%"}}
                >
                  첨부
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                {/* 선택된 파일이 있으면 전송 버튼 활성화 */}
                {fileObject && (
                  <Button
                    type='button'
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={sendFile}
                    color='info'
                    style={{width : "13%", height : "5%", marginTop : "5%" , marginLeft : "2.5%"}}
                  >
                    전송
                  </Button>
                )}

                </div>
              </div>
              </div>
            )}
            
          </Item>
        </Grid>


        <Grid size={3.5} sx={{ height: '100%' }}>
          <Item >
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "3%",
              height: "3.5%"
            }}>

              <h2 style={{ fontSize: "180%" }}>채팅방 생성</h2>
              <Button type='button' onClick={creatR} variant="contained"
                style={{ marginLeft: "10%" }}>
                채팅방 생성
              </Button>
            </div>
            <hr></hr>

            <div style={{ overflow: "scroll", overflowX: 'hidden', height: '800px', height: '94.8%' }}>

              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {members.map((m) => (
                  // map 함수 내에서 return을 직접 사용하기 전에 괄호로 묶어야 합니다.
                  <ListItem key={m.mno} alignItems="flex-start">
                    <ListItemAvatar>
                      {/* Avatar를 회원의 이미지로 동적으로 설정 */}
                      <Avatar alt={m.mname} src={m.avatarUrl || '/static/images/avatar/1.jpg'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${m.mname} (${m.mno})`} // 회원명과 회원번호
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline' }}
                          >
                            {m.mname} {/* 회원명 */}
                          </Typography>
                          {" - "}
                          {m.mrank} {/* 회원 직급 */}

                          <input type='checkbox'
                            value={m.mno}
                            checked={mnoList.includes(m.mno)} 
                            onChange={() => handleCheckboxChange(m.mno)} />
                        </React.Fragment>
                      }
                    />
                    <Divider variant="inset" component="li" />
                  </ListItem>
                ))}
              </List>
            </div>

          </Item>
        </Grid>
      </Grid>
    </Box>


  );
};

