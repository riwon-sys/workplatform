import { BrowserRouter, Route, Routes } from "react-router-dom";

/* mui */
import Box from '@mui/material/Box';

/* jsx import */
import SideBar from './SideBar.jsx';
import Chatting from './Chatting.jsx';
import Report_Write from './Report_Write.jsx';
import Report_View from './Report_View.jsx';
import Board from './Board.jsx';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/* css */
import './App.css';

import ChatTeset from "../chatsocket/chat/ChattingTest.jsx";

export default function Test( props ){
    return(<>
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <SideBar />

                <Routes>
                    <Route path="/" element={ <Chatting /> }></Route>
                    <Route path="/chatting" element={ <ChatTeset /> }></Route>
                    <Route path="/report/write" element={ <Report_Write /> }></Route>
                    <Route path="/report/view" element={ <Report_View /> }></Route>
                    <Route path="/board" element={ <Board /> }></Route>
                </Routes>
            </Box>
        </BrowserRouter>
        </ThemeProvider>
    </>)
} // f end
