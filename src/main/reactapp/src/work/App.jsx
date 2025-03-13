import { BrowserRouter, Route, Routes } from "react-router-dom";

/* mui */
import '@fontsource/roboto/300.css';

/* jsx import */
import SideBar from './SideBar.jsx';
import Chatting from './Chatting.jsx';
import Report_Write from './Report_Write.jsx';
import Report_View from './Report_View.jsx';
import Board from './Board.jsx';

/* css */
import './App.css';

export default function Test( props ){
    return(<>
        <BrowserRouter>
            <div id="wrap">
                <SideBar />

                <Routes>
                    <Route path="/" element={ <Chatting /> }></Route>
                    <Route path="/chatting" element={ <Chatting /> }></Route>
                    <Route path="/report_Write" element={ <Report_Write /> }></Route>
                    <Route path="/report_View" element={ <Report_View /> }></Route>
                    <Route path="/board" element={ <Board /> }></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>)
} // f end
