import { Link } from "react-router-dom";

/* mui */
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function SideBar(){
    return(<>
        <div id="sideMenu">
            <Container fixed maxWidth="xl" >
                <Box sx={{ bgcolor: 'white', height: '100vh' }} >
                    <Stack spacing={1} direction="column" sx={{ minWidth: 0}} >
                        <Link to="/" className="logoLink" > <img src="logo.png" /> <span> 워크 플랫폼 </span> </Link>
                        <Link to="/chatting"> <Button> 메신저 </Button> </Link>
                        <Link to="/report_Write"> <Button> 보고서 작성 </Button> </Link>
                        <Link to="/report_View"> <Button> 보고서 현황 </Button> </Link>
                        <Link to="/board"> <Button> 사내 게시판 </Button> </Link>
                        
                    </Stack>

                </Box>
            </Container>
        </div>
    </>)
} // f end