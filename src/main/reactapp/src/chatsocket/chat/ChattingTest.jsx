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

import { Card, CardContent, CardActions, ListItemButton, ListItemIcon, ListSubheader, Collapse, Divider, Typography, Input } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorder from '@mui/icons-material/StarBorder';

import { useSelector } from 'react-redux';
import log from "../../work/member/reduxs/logSlice"

import LogoutIcon from '@mui/icons-material/Logout';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%', // 높이 설정 추가

}));


export default function ChatTeset() {
  // 리덕스
  const loginInfo = useSelector((state) => state.user.userInfo);
  //  console.log("로그인된 정보 : ", loginInfo)

  const [rooms, setRooms] = useState([{ rno: "", rname: "", mnoList: [] }]); // 채팅방 목록
  const [members, setMembers] = useState([]); // 전체 회원 목록
  const [mnoList, setMnoList] = useState([]); // 선택된 회원 번호 목록
  const [selectedRoomId, setSelectedRoomId] = useState(null); // 클라이언트가 선택한 방번호
  const [message, setMessage] = useState(''); // 클라이언트가 입력한 메세지
  const [messages, setMessages] = useState([]); // 클라이언트가 선택한 채팅방의 기존 메세지 목록
  const [clientSocket, setClientSocket] = useState(null); // WebSocket 연결
  const [isSocketOpen, setIsSocketOpen] = useState(false); // WebSocket 연결 상태 확인
  const [addMembers, setAddMembers] = useState({ mnoList: [], rno: "" }) // 채팅방에 추가할 회원번호 목록과 방번호
  const [mNameList, setMnameList] = useState([]) // 채팅방에 추가된 회원의 이름 목록

  // 현재 PC의 시간 가져오기
  const now = new Date();

  // 원하는 형식으로 현재 시간 포맷팅 (예: yyyy-MM-dd HH:mm:ss)
  const nowTime = now.getFullYear() + '-' +
    (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
    now.getDate().toString().padStart(2, '0') + ' ' +
    now.getHours().toString().padStart(2, '0') + ':' +
    now.getMinutes().toString().padStart(2, '0') + ':' +
    now.getSeconds().toString().padStart(2, '0');

  // 출력된 시간
  console.log(nowTime);


  // [1-1] 브라우저 입장 시 접속되는 연결되는 소켓
  const [totalSocket, setTotalSocket] = useState(null);
  useEffect(() => {
    connectTotalWebSocket(); // 소켓 연결 시도
    return () => {
      if (totalSocket) {
        totalSocket.close(); // 컴포넌트 언마운트 시 연결 종료
      }
    };
  }, []);


  // [1-2] WebSocket 연결 함수
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

    // 서버로부터 5를 반환받으면(채팅방이 새로 생성되면)
    totalConnect.onmessage = (e) => {
      console.log(e.data)

      if (e.data == 5) {
        findAllRoom() // 소켓에 연결된 세션들의 채팅방 목록 갱신
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

    // 소켓 연결 설정
    setTotalSocket(totalConnect);
  };

  // [1-3] 컴포넌트 마운트 시 소켓 연결
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

  // [2-1] 파일 메세지 
  // 파일 객체
  const [fileObject, setFileObject] = useState();
  const [chattingDto, setChattingDto] = useState({

    mstype: 1,       // 메시지 타입 (1: 파일)
    rno: selectedRoomId,
    mname: loginInfo.mname, // 보내는 사람의 이름 (나중에 서버에서 현재 로그인된 mno 의 이름으로 반환받기)
    fname: "파일 전송 중", // 메시지 내용
    mno: loginInfo.mno,        // 회원 번호 (나중에 서버에서 현재 로그인된 mno 로 받아오기)
    msg: "",         // 텍스트 메시지 내용
    flocation: ""    // 파일 경로
  });
  const fileInputRef = useRef(null); // 파일 선택 input 참조



  // [2-2] 파일 선택 버튼 클릭 시 input을 트리거
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // [2-3] 파일 선택 후 상태 업데이트
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileObject(file); // 선택된 파일을 상태로 업데이트
    }
  };
  // [2-4] 파일타입 메세지 전송 상태 처리 (소켓)
  useEffect(() => {
    if (chattingDto.flocation) {
      // chattingDto.flocation 값이 변경되면 WebSocket을 통해 전송
      if (clientSocket && isSocketOpen && selectedRoomId) {
        const messageData = {
          rno: selectedRoomId,
          msg: chattingDto.msg, // 텍스트 메시지 내용
          mstype: chattingDto.mstype, // 메시지 타입 (파일일 때 1)
          mname: chattingDto.mname,
          mno: loginInfo.mno,
          fname: chattingDto.fname, // 파일 이름
          flocation: chattingDto.flocation, // 파일 경로
          mprofile: loginInfo.mprofile,
          showdate: nowTime
        };

        clientSocket.send(JSON.stringify(messageData)); // 소켓으로 메시지 전송
        console.log("파일 메시지 전송:", messageData); // 디버깅용 로그
        console.log("파일 소켓으로 send1")
      }
    }
  }, [clientSocket, isSocketOpen, selectedRoomId]);

  // [2-5] 파일 메세지 서버로 전송 (multipart/form-data 타입으로)
  const sendFile = async () => {
    if (clientSocket && fileObject && selectedRoomId && loginInfo.mno) {
      // FormData로 파일 준비
      const formData = new FormData();
      formData.append("file", fileObject);
      formData.append("rno", selectedRoomId);
      formData.append("mstype", 1); // 파일 메시지 타입
      formData.append("mno", loginInfo.mno);
      formData.append("mprofile", loginInfo.mprofile)
      formData.append("showdate", nowTime)

      console.log(formData);

      try {
        // 파일 서버에 업로드
        const response = await axios.post('http://localhost:8080/api/msg/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        // 파일 업로드 성공
        console.log("파일 업로드 성공:", response.data);

        // 서버에서 응답 받은 파일 경로와 파일명
        const { flocation, fname } = response.data;

        console.log(fname)
        console.log(response.data) //////////////
        // 파일 정보를 messages에 바로 추가
        const newMessage = {
          rno: selectedRoomId,
          msg: "", // 텍스트 메시지 비워두기
          mstype: 1, // 파일 메시지 타입
          mname: loginInfo.mname, // 메시지 작성자 (예시)
          mno: loginInfo.mno,
          flocation: response.data, // 서버로부터 받은 파일 경로
          fname, // 서버로부터 받은 파일명
          mprofile: loginInfo.mprofile, ////////////////////////
          showdate: nowTime
        };
        console.log(newMessage)

        // 메시지 목록에 파일 메시지 추가
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // 상태 업데이트 후 WebSocket으로 메시지 전송
        if (clientSocket && isSocketOpen && selectedRoomId) {
          console.log("파일 메시지 전송:", newMessage);
          clientSocket.send(JSON.stringify(newMessage)); // 소켓으로 메시지 전송
          console.log("파일 소켓으로 send2")
          setFileObject(null); // 파일 객체 초기화
        }

      } catch (error) {
        console.error("파일 업로드 실패:", error);
      }
    }
  }


  // [3-1] 컴포넌트 마운트 시 현재 로그인된 회원번호가 가입된 채팅방 불러오기
  useEffect(() => { findAllRoom() }, []);

  // [3-2] 서버에서 채팅방 목록 response 받기
  const findAllRoom = async () => {
    try {
      const response = await axios.get("http://localhost:8080/chattingroom", { withCredentials: true });

      // 해당 사용자가 참여 중인 채팅 목록이 존재 시
      if (response.data) {
        setRooms(response.data); // Rooms 상태 변수에 저장
      }
    } catch (e) {
      console.log("채팅방 조회 오류 : ", e);
    }
  };


  // [4-1] 컴포넌트 마운트 시 전체 회원 불러오기
  useEffect(() => { findAllMember() }, []);

  // [4-2] 서버에서 전체 회원목록 받아오기
  const findAllMember = async () => {
    try {
      const response = await axios.get("http://localhost:8080/chattingroom/member", { withCredentials: true });

      if (response.data) {
        setMembers(response.data); // Members 상태 변수에 저장
      }
    } catch (e) {
      console.log("회원 조회 오류 : ", e);
    }
  };

  // [5-1] 채팅방 생성 시 참여할 회원 번호 체크박스 여러개 선택 처리
  const handleCheckboxChange = (mno) => {

    setMnoList((prevMnoList) => {
      if (prevMnoList.includes(mno)) {
        return prevMnoList.filter(item => item !== mno); // 이미 선택된 번호는 삭제
      } else {
        return [...prevMnoList, mno]; // 새로 선택된 번호는 추가
      }
    });

  };

  // const handleCheckboxChange = (mno, loginMno) => {
  //   setMnoList((prevMnoList) => {
  //     // loginMno는 항상 리스트에 포함되게 처리
  //     const updatedMnoList = [...prevMnoList, loginMno];

  //     if (updatedMnoList.includes(mno)) {
  //       // 이미 선택된 번호는 삭제
  //       return updatedMnoList.filter(item => item !== mno);
  //     } else {
  //       // 새로 선택된 번호는 추가
  //       return [...updatedMnoList, mno];
  //     }
  //   });
  // };



  // [5-2] 채팅방 생성
  const creatR = async () => {
    let rname = null;
    setSelectedRoomId(""); // 기존 roomId 초기화
    console.log("방번호제거완료")
    await findAllRoom()

    console.log("방목록 리렌더링 완료")

    if (mnoList.length === 0) {
      alert("채팅방에 참여할 회원을 선택하세요.")
    }

    // rname과 mnoList가 있을 경우에만 채팅방 생성
    if (mnoList.length > 0) {
      console.log("mnolist 있음")
      rname = prompt("채팅방 이름");

      if (rname === "") {
        alert("채팅방 이름을 입력하세요.")
        return;
      }

      const obj = {
        rname: rname,
        mnoList: mnoList,
      };

      console.log("채팅방에 참여할 mno: ", mnoList);

      try {
        // 새로운 채팅방 생성 요청
        const response = await axios.post("http://localhost:8080/chattingroom", obj, { withCredentials: true });

        if (response.data === true) {
          alert("채팅방 등록 성공");
          findAllRoom(); // 채팅방 목록 갱신

          const mappingobj = {
            rname: rname,
            mstype: 5, // 채팅방 생성타입을 서버로 보내기
          };

          // 채팅방 생성 메시지를 소켓으로 전송
          totalSocket.send(JSON.stringify(mappingobj)); // JSON으로 파싱 후 서버로 전송
        }
      } catch (e) {
        console.log("채팅방 생성 오류: ", e);
      }

      // 채팅방 생성 후, mnoList 초기화
      setMnoList([]); // 회원선택 초기화
    }
  };

  // [6-1] 채팅방 접속 WebSocket

  const connectChatRoomSocket = (roomId) => {
    const socket = new WebSocket('ws://localhost:8080/chatConnect');

    socket.onopen = () => {
      console.log('채팅방 소켓 연결 성공');
      setIsSocketOpen(true); // 소켓 상태 업데이트
      const joinMessage = {
        rno: roomId,
        mstype: 3, // 채팅방 접속 타입을 서버로 보내기
      };
      socket.send(JSON.stringify(joinMessage));
    };

    // 소켓 오류 시
    socket.onerror = (error) => {
      console.error('채팅방 소켓 오류 발생:', error);
    };

    // 소켓 연결 종료 시
    socket.onclose = (event) => {
      console.log('채팅방 소켓 연결 종료', event);
      setIsSocketOpen(false);
      setMessages([]) ///////////////////
    };

    // 소켓 상태 업데이트
    setClientSocket(socket);
  };

  // [6-2] 채팅방 선택
  const handleRoomSelect = (roomId) => {
    if (clientSocket) {
      clientSocket.close(); // 기존 소켓 종료
      console.log("채팅방 소켓 종료")
      setMnameList([])
      console.log("추가회원리스트 null")
    }
    setSelectedRoomId(roomId);
    connectChatRoomSocket(roomId); // 새로운 소켓 연결
    setMessages([]); // 메시지 초기화
  };

  console.log(selectedRoomId)

  // [6-3] 채팅방 정보 서버로부터 받기
  const [roomInfo, setRoomInfo] = useState({
    rno: "", rid: "", rname: ""
    , rdate: "", rlastdate: ""
  })
  const findRoomInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chattingroom/findroominfo?rno=${selectedRoomId}`)
      console.log(response.data)
      setRoomInfo(response.data)
      console.log(roomInfo)

    } catch (e) {
      console.log("채팅방 상세 정보 오류", e)
    }
  }

  useEffect(() => {
    if (selectedRoomId) {  // selectedRoomId가 null이 아닌 경우에만 실행
      findRoomInfo();
    }
  }, [selectedRoomId])

  console.log(roomInfo)
  console.log(selectedRoomId)

  // [7-1] 메세지 서버로 전달
  const sendMessage = () => {

    // 만약 소켓이 연결된 상태이고 방번호가 존재한다면
    if (clientSocket && isSocketOpen && selectedRoomId) {

      if (clientSocket.readyState == WebSocket.OPEN) {
        // 서버로 보낼 메세지 객체
        const messageData = {
          rno: selectedRoomId,
          msg: message,
          mstype: 0, // 일반 메세지 타입 서버로 전송
          mname: loginInfo.mname, // 나중에 세션에 저장된 로그인된 회원으로 변경
          mno: loginInfo.mno, // 나중에 세션에 저장된 로그인된 회원으로 변경
          mprofile: loginInfo.mprofile,
          showdate: nowTime
        };

        console.log(messageData)

        // 소켓으로 서버에 전달
        clientSocket.send(JSON.stringify(messageData)); // 메시지 보내기
        console.log("메세지 소켓으로 send1")
        setMessage(''); // 메시지 입력창 초기화
        // setMessages([])////

      } else {
        console.log('WebSocket 연결이 완료되지 않았습니다. 연결을 기다립니다...');

        // WebSocket 연결이 완료될 때까지 일정 간격으로 확인
        const interval = setInterval(() => {
          if (clientSocket.readyState === WebSocket.OPEN) {
            clearInterval(interval);  // 연결되면 인터벌을 종료
            //clientSocket.send(JSON.stringify(messageData));  // 메시지 전송
            console.log("메세지 소켓으로 send 2")
            setMessage('');  // 메시지 입력창 초기화
          }
        }, 100);  // 100ms마다 연결 상태 확인
      }
    } else {
      console.log('WebSocket이 연결되지 않았거나 채팅방이 선택되지 않았습니다.');
    }
  };


  const addMessageIfNew = (newMessage) => {
    // 이미 동일한 파일 메시지가 존재하는지 확인
    const messageExists = messages.some((msg) => msg.flocation === newMessage.flocation && msg.fname === newMessage.fname);

    if (!messageExists) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } else {
      console.log("중복된 파일 메시지. 추가하지 않음.");
    }
  };

  // useEffect(() => {
  //   if (clientSocket && selectedRoomId) { // 만약 소켓이 열려있고 채팅방이 선택됐으면
  //     const handleMessage = (event) => { // 메세지를 받으면 실행
  //       console.log(event.data);

  //       let receivedMessage;
  //       try {
  //         receivedMessage = JSON.parse(event.data); // 서버가 준 메세지 파싱
  //       } catch (error) {
  //         console.error('Invalid message received:', event.data);
  //         return;
  //       }

  //       // 이미 같은 파일 메시지가 messages에 존재하는지 확인
  //       const messageExists = messages.some((msg) => msg.flocation === receivedMessage.flocation);

  //       // 메세지 출력
  //       if (receivedMessage.mstype !== 4 && (receivedMessage.mstype === null || !receivedMessage.isSent)) {
  //         console.log("실행됨");
  //         if (receivedMessage.mstype === undefined) {
  //           console.log("undefined 실행");
  //           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  //         } else if (receivedMessage.mstype === 1 && !messageExists) {
  //           console.log("파일실행");
  //           addMessageIfNew(receivedMessage);
  //         } else if (receivedMessage.mstype === 0) {
  //           console.log("메세지 실행");
  //           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  //         }
  //       }

  //       // 기존 채팅방에 회원이 새로 추가돼서 서버소켓이 mstype 4를 반환했을 때
  //       if (receivedMessage.mstype === 4 || receivedMessage.mnameList) {
  //         console.log("444444");
  //         console.log(receivedMessage.mnameList);
  //         setMnameList(receivedMessage.mnameList);
  //         console.log(mNameList);
  //       }
  //     };

  //     // 소켓 이벤트 핸들러 설정 (한 번만 설정)
  //     clientSocket.onmessage = handleMessage;

  //     // 컴포넌트가 언마운트되거나 clientSocket이 변경될 때 핸들러 제거
  //     return () => {
  //       clientSocket.onmessage = null;
  //     };
  //   }
  // }, [clientSocket, selectedRoomId, messages]); // clientSocket, selectedRoomId, messages 변경 시 실행


  // [7-2] 소켓으로 받은 메세지 처리
  useEffect(() => {


    if (clientSocket && selectedRoomId) { // 만약 소켓이 열려있고 채팅방이 선택됐으면
      clientSocket.onmessage = (event) => { // 해당 소켓이 메세지를 받으면 실행
        console.log(event.data);
        const receivedMessage = JSON.parse(event.data); // 서버가 준 메세지 파싱



        // 이미 같은 파일 메시지가 messages에 존재하는지 확인
        const messageExists = messages.some((msg) => msg.flocation === receivedMessage.flocation);

        // 메세지 출력
        if (receivedMessage.mstype !== 4 && (receivedMessage.mstype === null || !receivedMessage.isSent)) {
          console.log("실행됨");
          if (receivedMessage.mstype === undefined) {
            console.log("undefinde 실행")
            setMessages((prevMessages) => { // 메세지 리스트 업데이트
              return [...prevMessages, receivedMessage];
            });
          }
          if (receivedMessage.mstype === 1 && !messageExists) {

            console.log("파일실행")
            addMessageIfNew(receivedMessage)
          }

          if (receivedMessage.mstype === 0) {
            console.log("메세지 실행")
            setMessages((prevMessages) => { // 메세지 리스트 업데이트
              return [...prevMessages, receivedMessage];
            });
          }
        }

        // 소켓 이벤트 핸들러 설정 (한 번만 설정)
        if (!clientSocket._onMessageSet) {
          // clientSocket.onmessage = handleMessage;
          clientSocket._onMessageSet = true;
        }

        //기존 채팅방에 회원이 새로 추가돼서 서버소켓이 mstype 4를 반환했을 때
        if (receivedMessage.mstype === 4 || receivedMessage.mnameList) {
          console.log("444444");
          console.log(receivedMessage.mnameList);
          setMnameList(receivedMessage.mnameList);
          console.log(mNameList);
        }
      };
      return () => {
        clientSocket._onMessageSet = false;
        clientSocket.onmessage = null;
      };
    }
  }, [clientSocket, selectedRoomId, messages]); // cilentSocket 이나 채팅방 새로 선택 시, 메세지마다 리렌더링

  // [8] 기존 채팅방에 회원추가
  const addMember = async (rno) => {
    // // 추가할 회원수
    // const count = Number(prompt("추가할 회원 수"));
    // console.log(count);

    // let newMnoList = [...addMembers.mnoList]; // 기존 mnoList 복사

    // // 추가할 회원번호를 여러 번 입력받아서 newMnoList에 추가
    // for (let i = 0; i < count; i++) {
    //   const mno = prompt("추가할 회원번호");
    //   newMnoList.push(mno); // newMnoList에 mno 추가
    // }

    // // 상태 업데이트 (newMnoList 사용)
    // setAddMembers((prevState) => ({
    //   ...prevState,
    //   mnoList: newMnoList, // 새로 추가된 mnoList 상태 업데이트
    // }));

    if (mnoList.length === 0) {
      alert("추가할 회원을 선택하세요.")
      return;
    }
    try {
      const obj = {
        rno: rno,
        mnoList: mnoList, // 추가할 회원번호 목록
      };

      console.log(mnoList)
      // 서버로 채팅방에 추가할 회원번호 보내고 회원이름 반환받기
      const response = await axios.post("http://localhost:8080/chattingroom/addmember", obj, { withCredentials: true });
      console.log(response.data);

      if (response.data != null) {
        alert("추가성공");
        // setMnameList(response.data); // 추가된 회원명 목록으로 상태 업데이트
        console.log(response.data)
        const socketObj = {
          mstype: 4,
          mnameList: response.data,
          rno: selectedRoomId
        }
        console.log(socketObj)
        clientSocket.send(JSON.stringify(socketObj)) // 채팅방 소켓으로 보내기
        participant() // 이미 추가된 회원 체크박스 업데이트
      }
    } catch (e) {
      console.log("회원 추가 오류 : ", e);
    }
    setMnoList([]) // 회원선택 초기화
  };



  console.log(mNameList)

  // 입장 시 일정 시간동안만 출력
  const [showMessage, setShowMessage] = useState(true);  // 메시지 출력 여부 상태

  useEffect(() => {
    if (mNameList && mNameList.length > 0) {  // mNameList에 값이 있을 때만 타이머 시작
      setShowMessage(true)
      // 30초 후에 메시지를 숨기는 타이머 설정
      const timer = setTimeout(() => {
        setShowMessage(false);  // 30초 후 메시지를 숨김
        setMnameList(null)
      }, 20000); // 30초

      // 컴포넌트가 언마운트될 때 타이머 정리
      return () => clearTimeout(timer)
    }
  }, [mNameList]);


  // [9] 채팅방 나가기
  const deleteRoom = async (rno) => {
    try {
      const response = await axios.delete(`http://localhost:8080/chattingroom?rno=${rno}`)

      if (response.data == true) {
        alert("나가기 성공")
        findAllRoom()
      }
    } catch (e) {

    }
  }

  const mySpaceRef = useRef(null);
  console.log(messages)

  // [10] 메세지 입력 시 스크롤 맨 밑으로 고정
  useEffect(() => {
    // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
    if (mySpaceRef.current) {
      mySpaceRef.current.scrollTop = mySpaceRef.current.scrollHeight;
    }
  }, [messages, mNameList]); // messages가 변경될 때마다 실행됨




  const [open, setOpen] = useState({}); // 부서별 드롭다운 상태 관리
  const [selectedMnos, setSelectedMnos] = useState([]); // 체크박스 선택 상태 관리

  // [11] 부서별로 회원들을 그룹화하는 함수
  const groupMembersByDepartment = () => {
    return members.reduce((acc, member) => {
      const department = member.department;  // 부서를 기준으로 그룹화
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(member);
      return acc;
    }, {});
  };

  // 부서별로 그룹화된 회원들
  const groupedMembers = groupMembersByDepartment();

  // 부서의 드롭다운을 열고 닫는 함수
  const handleClick = (department) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department]: !prevOpen[department],  // 해당 부서의 드롭다운 상태를 토글
    }));
  };

  // // 체크박스 상태 변경 함수
  // const handleCheckboxChange = (mno) => {
  //   setSelectedMnos((prevMnos) => {
  //     if (prevMnos.includes(mno)) {
  //       return prevMnos.filter(item => item !== mno);  // 체크 해제
  //     } else {
  //       return [...prevMnos, mno];  // 체크
  //     }
  //   });
  // };

  console.log(messages)


  // [12] 이미 채팅 참여중인 사람 조회
  const [participationMember, setParticipationMember] = useState([])
  const participant = async () => {

    if (!selectedRoomId) {
      // selectedRoomId가 없으면 함수 종료
      console.log('Room ID가 없습니다.');
      return;
    }

    try {
      console.log(selectedRoomId)
      const response = await axios.get(`http://localhost:8080/chattingroom/participation?rno=${selectedRoomId}`);

      if (response.data != null) {
        setParticipationMember(response.data)
        console.log(participationMember)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    participant();
  }, [selectedRoomId])

  console.log(participationMember)


  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid size={2.8} sx={{ height: '100%' }}>
          <Item >

            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              marginBottom: "3%", height: "4.3%", marginLeft: "-12%"
            }}>
              <Typography variant="body2" color="textSecondary"
                sx={{ display: 'inline-block', mr: 1, marginLeft: "0%" }} >
                {/*                                 {loginInfo.mprofile} {loginInfo.mname}{loginInfo.mrank}{loginInfo.mno} 오늘도 화이팅! */}
                <img
                  src={
                    'http://localhost:8080/file/' +
                    (loginInfo.mprofile === 'default.jpg' ? 'default.jpg' : loginInfo.mprofile)
                  }
                  style={{
                    width: '40px',
                    borderRadius: '40px',
                  }}
                />
              </Typography>
              <span style={{ marginLeft: "5%" }}><b> {loginInfo.mname} 님 </b> ({loginInfo.mrank})
              </span>
            </div>

            <hr></hr>

            <div style={{ margin: " 0 auto", overflow: "scroll", overflowX: 'hidden', height: '94.8%' }}>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                  {rooms.map((room, index) => (
                    <div>
                      <ListItem style={{ width: "100%" }}>
                        <ListItemAvatar>
                          <Avatar alt={room.rname} src={room.avatarUrl || '/static/images/avatar/1.jpg'} />
                        </ListItemAvatar>
                        <ListItemText
                          key={index} onClick={() => handleRoomSelect(room.rno)}
                          primary={`${room.rname} | ${room.rno} 방`} secondary={`${room.rdate}`} />
                      </ListItem>

                      <hr style={{ border: "1px solid #bdbdbd", width: "100%" }} />
                    </div>
                  ))}
                </List>
              </div>
            </div>

          </Item>
        </Grid>


        <Grid size={6.6} sx={{ height: '100%' }}>
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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1.5%", textAlign: "center" }}>
                  <div style={{ display: "flex", width: "100%", textAlign: "center" }}>
                    {roomInfo && (
                      <>
                        <h3 style={{ fontSize: "180%", marginLeft: "20%" }}>{roomInfo.rname} </h3>
                        <h6 style={{ fontSize: "90%", marginLeft: "5%" }}>
                          생성일 : {roomInfo.rdate} <br />
                          수정일 : {roomInfo.rlastdate}
                        </h6>
                      </>
                    )}
                  </div>



                  {/* 채팅방 삭제 */}
                  <Button
                    type="button"
                    onClick={() => deleteRoom(selectedRoomId)}
                    component="label"
                    variant="contained" color='info'

                    sx={{ width: "7%", marginLeft: "-10%", marginRight: "10%" }}
                  >

                    <LogoutIcon />
                  </Button>
                </div>
                <hr />
                <div id="space" ref={mySpaceRef} style={{ backgroundColor: "#f2f4f8", overflow: "scroll", overflowX: 'hidden', height: '2000%' }}>
                  <div style={{ backgroundColor: "#f2f4f8" }}>
                    {/* 메시지 영역 */}
                    {messages.map((msg, index) => (
                      <div key={index} style={{ display: 'flex', marginTop: '15px', marginLeft : "5%" }}>
                        {/* 입장 메시지 처리 */}
                        {msg.mNameList && msg.mNameList.length > 0 && msg.mNameList.map((name, idx) => (
                          <div key={idx} style={{ marginTop: "3%", marginBottom: "3%" }}>
                            {name} 님 입장
                          </div>
                        ))}

                        <div>
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <img
                              src={
                                'http://localhost:8080/file/' +
                                (msg.mprofile === 'default.jpg' ? 'default.jpg' : msg.mprofile)
                              }
                              style={{
                                width: '40px',
                                borderRadius: '40px',
                                marginRight: "3%",
                                marginLeft: "5%"

                              }}
                            />
                            <h3 style={{ color: "black", marginTop: "3%", marginBottom: "2%" }}>
                              {msg.mname}
                            </h3>
                          </div>

                          {/* 기존 메시지 출력 */}
                          {msg.msg ? (
                            <Card sx={{ minWidth: 100 }} style={{ marginLeft: "5%", width: '450px', textAlign: "start", marginBottom: "5%" }}>
                              <CardContent>
                                <Typography variant="body2">
                                  <p style={{ marginTop: "3%", marginBottom: "3%", marginLeft: "1%" }}>{msg.msg}</p>
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size="small" style={{ marginLeft: "1.5%" }}>
                                  {msg.showdate ? msg.showdate : msg.msdate}
                                </Button>    </CardActions>
                            </Card>
                          ) : (
                            <Card sx={{ minWidth: 100 }} style={{ marginLeft: "5%", width: '450px', textAlign: "start" }}>
                              <CardContent>
                                <Typography variant="body2">
                                  <p style={{ marginTop: "3%", marginBottom: "3%", marginLeft: "1%" }}>
                                    {msg.flocation}
                                  </p>
                                </Typography>
                              </CardContent>
                              <CardActions>

                                <Button size="small" style={{ marginLeft: "1.5%" }}>
                                  {msg.showdate ? msg.showdate : msg.msdate}
                                </Button>

                                <Button
                                  style={{ marginBottom: "1.2%" }}
                                  href={`http://localhost:8080/api/msg/file/download?file=${encodeURIComponent(msg.flocation)}`}
                                  download={msg.fname}
                                >
                                  다운로드
                                </Button>
                              </CardActions>
                            </Card>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* mNameList가 있을 경우 입장 메시지 처리 */}
                    {showMessage && mNameList && mNameList.length > 0 && (
                      mNameList.map((name, index) => (
                        <div key={index}>
                          {name} 님 입장
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "7%" }}>

                  {/* 메시지 입력칸과  등록 버튼 */}
                  <div style={{ display: 'flex', marginLeft: "3%" }}>
                    <Input
                      type="text"
                      placeholder="메시지를 입력하세요."
                      value={message}
                      variant="outlined"
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ width: "60%", marginRight: "10px" }}
                    />
                    <Button onClick={sendMessage} variant="contained" color='info'
                      style={{ width: "10%", height: "5%", marginTop: "5%", marginLeft: "2.5%" }}>
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
                      style={{ width: "13%", height: "5%", marginTop: "5%", marginLeft: "2.5%" }}
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
                        style={{ width: "13%", height: "5%", marginTop: "5%", marginLeft: "2.5%" }}
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

        <Grid size={2.6} sx={{ height: '100%' }}>
          <Item >
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "3%",
              height: "4%"
            }}>

              <h2 style={{ fontSize: "180%" }}>조직도</h2>
              {selectedRoomId && (
                <>
                  {/* 기존 채팅방에 회원추가 */}
                  <Button
                    type="button"
                    onClick={() => addMember(selectedRoomId)}
                    component="label"
                    variant="contained"
                    color='info'
                    sx={{ marginLeft: "10%" }}
                  >
                    회원추가
                  </Button></>
              )}

              <Button type='button' onClick={creatR} variant="contained"
                style={{ marginLeft: "10%" }}>
                채팅방 생성
              </Button>
            </div>
            <hr></hr>

            <div style={{ overflow: "scroll", overflowX: 'hidden', height: '800px', height: '94.8%' }}>


              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">

                  </ListSubheader>
                }
              >
                {Object.keys(groupedMembers).map((department) => (
                  <div key={department}>
                    {/* 부서명 드롭다운 버튼 */}
                    <ListItemButton onClick={() => handleClick(department)}>
                      <ListItemIcon>

                      </ListItemIcon>
                      <ListItemText primary={department} /> {/* 부서명 */}
                      {open[department] ? <ExpandLess /> : <ExpandMore />} {/* 드롭다운 화살표 */}
                    </ListItemButton>
                    <Collapse in={open[department]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>


                        {!selectedRoomId && groupedMembers[department].map((m) => (
                          <ListItemButton sx={{ pl: 4 }} key={m.mno}>

                            <img
                              src={
                                'http://localhost:8080/file/' +
                                (m.mprofile === 'default.jpg' ? 'default.jpg' : m.mprofile)
                              }
                              style={{
                                width: '40px',
                                borderRadius: '40px',
                                marginRight: "7%",
                                marginBottom: "1%"
                              }}
                            />
                            <ListItemText
                              primary={`${m.mname} | ${m.mrank} `} // 회원명과 사원번호
                              secondary={`(${m.mno})`} // 직급
                            />
                            <ListItemIcon>


                              <input type='checkbox'
                                value={m.mno}
                                checked={mnoList.includes(m.mno)}
                                onChange={() => handleCheckboxChange(m.mno)}
                              />


                            </ListItemIcon>



                            <Divider variant="inset" component="li" />
                          </ListItemButton>
                        ))}
                        {selectedRoomId && groupedMembers[department].map((m) => (
                          <ListItemButton sx={{ pl: 4 }} key={m.mno}>
                            <img
                              src={
                                'http://localhost:8080/file/' +
                                (m.mprofile === 'default.jpg' ? 'default.jpg' : m.mprofile)
                              }
                              style={{
                                width: '40px',
                                borderRadius: '40px',
                                marginRight: "7%",
                                marginBottom: "1%"
                              }}
                            />
                            <ListItemText
                              primary={`${m.mname} | ${m.mrank} `} // 회원명과 사원번호
                              secondary={`(${m.mno})`} // 직급
                            />

                            <ListItemIcon>
                              {/* 참여 회원에 해당하는 mno가 있을 경우 checked로, 없으면 mnoList에 있는지 확인 */}
                              <input type='checkbox'
                                value={m.mno}
                                checked={participationMember.some(on => on.mno === m.mno) || mnoList.includes(m.mno)} // 조건에 맞으면 체크
                                onChange={() => handleCheckboxChange(m.mno)} />

                            </ListItemIcon>
                            <Divider variant="inset" component="li" />
                          </ListItemButton>
                        ))}

                      </List>
                    </Collapse>
                  </div>
                ))}
              </List>
            </div>

          </Item>
        </Grid>

      </Grid>
    </Box>


  );
};