import { BrowserRouter, Route, Routes } from "react-router-dom";

/* mui */
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

/* jsx import */
import SideBar from './SideBar.jsx';
import Report_Write from './Report_Write.jsx';
import Report_View from './Report_View.jsx';
import Board from './Board.jsx';
import BoardDetail from './BoardDetail.jsx'
import theme from './theme';
import ChatTeset from "../chatsocket/chat/ChattingTest.jsx";
import Report_List from "./Report_List.jsx";
import Report_Form from "./Report_Form.jsx";
import Member_Post from "./member/Member_Post.jsx";
import Member_Login from "./member/Member_Login.jsx";


import Report_Approval from "./Report_Approval.jsx";

/* redux */

import { store , persistor } from './member/reduxs/store' // rw 25-03-21
import { Provider } from 'react-redux'; // rw 25-03-21
import { PersistGate } from 'redux-persist/integration/react';; // PersistGate 라이브러리 가져오기 | rw 25-03-21


/* css */
import './App.css';
import Report_Update from "./Report_Update.jsx";
import { useEffect, useState } from "react";

export default function Test( props ){
    const [log, setLog] = useState()
    useEffect(() => {
        // WebSocket 연결
        const socket = new WebSocket("ws://localhost:8080/browserConnect");

        // 소켓 연결이 성공하면
        socket.onopen = () => {
            console.log('브라우저 소켓 연결 성공');
        };

        // 소켓에서 메시지를 받으면
        socket.onmessage = (event) => {
            console.log('**********************수신된 메시지: ', event.data);

            setLog(event.data)
        };

        // 소켓 연결 종료시
        socket.onclose = () => {
            console.log('----- 브라우저 소켓 연결 종료 ------');
        };

        // 에러 발생 시
        socket.onerror = (error) => {
            console.error('WebSocket 오류: ', error);
        };

        // 컴포넌트가 언마운트될 때 소켓 연결 종료
        return () => {
            socket.close();
        };
    }, []);  // 빈 배열([])로 설정해서 한 번만 연결되게 함

    return(<>
      <Provider store={ store }> {/* 리덕스 스토어 적용(Provider 로 감싼 컴포넌트 all redux 전역상태 사용 가능) | rw 25-03-21 */}
        <ThemeProvider theme={theme}>
            <CssBaseline />
            
            <BrowserRouter> {/* 모든 라우팅을 감싼다.*/}
                <Box sx={{ display: 'flex' }}>
                    <SideBar />

                    <Routes>
                        <Route path="/" element={ <ChatTeset /> }></Route>
                        <Route path="/chatting" element={ <ChatTeset /> }></Route>
                        <Route path="/report/write" element={ <Report_Write /> }></Route>
                        <Route path="/report/view" element={ <Report_View /> }></Route>
                        <Route path="/report/view/:rpno" element={ <Report_View /> }></Route>
                        <Route path="/report/approval" element={ <Report_Approval /> }></Route>
                        <Route path="/report/approval/:rpno" element={ <Report_Approval /> }></Route>
                        <Route path="/board" element={ <Board /> }></Route>
                        <Route path="/board/detail" element={ <BoardDetail/> }></Route>
                        <Route path="/report/list" element={ <Report_List /> } ></Route>
                        <Route path="/report/Form" element={ <Report_Form /> } ></Route>
                        <Route path="/report/update/:rpno" element={ <Report_Update /> } ></Route>
                        <Route path="/member/post" element={ <Member_Post /> } ></Route>
                        <Route path="/member/login" element={ <Member_Login /> } ></Route>
                    </Routes>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
      </Provider>        {/* 리덕스 스토어 적용(Provider 로 감싼 컴포넌트 all redux 전역상태 사용 가능) | rw 25-03-21 */}
   </>)
} // f end

