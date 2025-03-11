import { Link } from "react-router-dom";

export default function SideBar(){
    return(<>
        <div>
            <ul id="sideMenu" >
                <li> <Link to="/ " > 홈 </Link> </li>
                <li> <Link to="/chatting" > 메신저 </Link> </li>
                <li> <Link to="/report_Write" > 보고서 현황 </Link> </li>
                <li> <Link to="/report_View" > 보고서 작성 </Link> </li>
                <li> <Link to="/board" > 사내 게시판 </Link> </li>

            </ul>
        </div>
    </>)
} // f end