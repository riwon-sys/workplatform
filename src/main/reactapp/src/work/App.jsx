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
import theme from './theme';

/* css */
import './App.css';

import ChatTeset from "../chatsocket/chat/ChattingTest.jsx";
import BoardDetail from "./BoardDetail.jsx";

export default function Test( props ){
    return(<>
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <SideBar />

                <Routes>
                    <Route path="/" element={ <ChatTeset /> }></Route>
                    <Route path="/chatting" element={ <ChatTeset /> }></Route>
                    <Route path="/report/write" element={ <Report_Write /> }></Route>
                    <Route path="/report/view" element={ <Report_View /> }></Route>
                    <Route path="/board" element={ <Board /> }></Route>
                    <Route path="/board/detail" element={ <BoardDetail /> }></Route>
                </Routes>
            </Box>
        </BrowserRouter>
        </ThemeProvider>
    </>)
} // f end
