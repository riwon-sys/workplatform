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
import Report_List from './component/report/Report_List';
import Report_Form from './component/report/Report_Form.jsx';
import Member_Post from "./member/Member_Post.jsx";
import Member_Login from "./member/Member_Login.jsx";


import Report_Approval from "./Report_Approval.jsx";


/* redux */
import { store , persistor } from './member/reduxs/store' // rw 25-03-21
import {Provider, useSelector} from 'react-redux'; // rw 25-03-21
import { PersistGate } from 'redux-persist/integration/react';; // PersistGate 라이브러리 가져오기 | rw 25-03-21


/* css */
import './App.css';
import Report_Update from "./Report_Update.jsx";
import { useEffect, useState } from "react";


import ReportSocket from "./ReportSocket.jsx";
import BoardWrite from "./BoardWrite.jsx";

export default function App(props) {
    const loginInfo = useSelector( (state) => state.user.userInfo ); // 🔸 로그인 정보 가져오기
    const [reportState, setReportState] = useState(false);
    const [mnos, setMnos] = useState([])
    const [ data, setData ] = useState({
        rpname: '',
        rpam: '',
        rppm: '',
        rpamnote: '',
        rppmnote: '',
        rpunprocessed: '',
        rpsignificant: '',
        rpexpected: '',
        mname: '',
        mdepartment: '',
        mrank: ''
      });

      console.log(reportState)
    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                {
                    loginInfo ? (
                        // 로그인 되어 있을 때: 사이드바 + 라우트 전체 출력
                        <Box sx={{ display: 'flex' }}>
                            <SideBar
                                reportState={reportState}
                                setReportState={setReportState}
                                mnos={mnos}
                                setMnos={setMnos}
                                data={data} />
                            <Routes>
                                <Route path="/" element={<ChatTeset />} />
                                <Route path="/chatting" element={<ChatTeset />} />
                                <Route path="/report/write" element={<Report_Write setReportState={setReportState} setMnos={setMnos} setData={setData} />} />

                                <Route path="/report/view" element={<Report_View />} />
                                <Route path="/report/view/:rpno" element={<Report_View />} />
                                <Route path="/report/approval" element={<Report_Approval />} />
                                <Route path="/report/approval/:rpno" element={<Report_Approval />} />
                                <Route path="/board" element={<Board />} />
                                <Route path="/board/detail" element={<BoardDetail />} />
                                <Route path="/board/write" element={<BoardWrite />} />
                                <Route path="/report/list" element={<Report_List />} />
                                <Route path="/report/Form" element={<Report_Form />} />
                                <Route path="/report/update/:rpno" element={<Report_Update />} />
                                <Route path="/member/post" element={<Member_Post />} />
                                <Route path="/member/login" element={<Member_Login />} />
                            </Routes>
                        </Box>
                    ) : (
                        // 로그인 안 되어 있을 때: 로그인 화면만 보여줌
                        <Routes>
                            <Route path="*" element={<Member_Login />} />
                        </Routes>
                    )
                }
            </BrowserRouter>
        </ThemeProvider>


    );
}
