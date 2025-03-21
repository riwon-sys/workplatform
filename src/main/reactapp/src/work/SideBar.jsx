import * as React from 'react';
import { Link } from "react-router-dom";

/* mui import */
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, Typography } from '@mui/material';

/* mui icon */
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import ApprovalIcon from '@mui/icons-material/Approval';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';

import axios from 'axios';                      // rw 25-03-21
import { useEffect , useState } from 'react';   // rw 25-03-21
import { useNavigate } from "react-router-dom"; // rw 25-03-21

import { useDispatch , useSelector } from 'react-redux'; // rw 25-03-21
import { logout } from './member/reduxs/userSlice' // rw 25-03-21


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // 로그인 상태 관리
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    // localStorage에서 로그인 상태 불러오기
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("username"); // 로그아웃 시 상태 삭제
  };

  const mainMenuItems = [
    { name: "메신저", path: "/chatting", icon: <QuestionAnswerIcon /> },
    { name: "보고서 작성", path: "/report/write", icon: <NoteAddIcon /> },
    { name: "나의 보고서", path: "/report/view", icon: <DescriptionIcon /> },
    { name: "결재 목록", path: "/report/approval", icon: <ApprovalIcon /> },
  ];
  const menuItems = [
    { name: "게시판", path: "/board", icon: <DvrTwoToneIcon /> },
    { name: "나의 정보", path: "/board", icon: <PersonIcon /> },
    { name: "사원 등록", path : "/member/post",icon: <PersonAddAlt1Icon />} // rw 25-03-18
  ];

  // 로그인을 하였지만 비로그인 상태로 보일 경우// rw 25-03-20
  // import axios from 'axios'; // rw 25-03-20
  // import { useEffect , useState } from 'react'; // rw 25-03-20

      // (1) 로그인 상태 저장 state | 객체 저장 예정 {빈 객체}를 초기값 선언 | rw 25-03-20
      // ========= 리덕스 전역 변수 사용 =========        | rw 25-03-21
      // (1-1) 전역상태에서 로그인된 회원정보 불러오기 user 라는 이이름의 리듀서 정보를 가져오기
      const loginInfo = useSelector( (state) => state.user.userInfo );
      // (2-1) 로그아웃 하기 위한 useDispatch()
      const dispatch = useDispatch();
      // const [ login , setLogin ] = useState ({});

      // (2) axios  로그인 상태 요청 및 응답 받기
      //const onLoginInfo = async()=>{
      //    const response = await axios.get('http://localhost:8080/workplatform/myinfo' , {withCredentials: true} );
      //    const result = response.data; console.log( response.data );
      //    setLogin ( result );
      //} // f e
      // (3) useEffect 'onLoginInfo' // 최초 1회 실행
      // useEffect( ()=>{onLoginInfo()}, [] )

      // (4) axios 로그아웃 요청 및 응답 받기
      const navigate = useNavigate();
      const onLogout = async()=>{
          const response = axios.get('http://localhost:8080/workplatform/logout' , {withCredentials: true});
          alert('로그아웃 되었습니다.');

           navigate('/'); // 네비게이트 부활 | rw 25-03-21
           dispatch(logout());
          // location.href="/"; // 로케이션 죽음 | rw 25-03-21
      }






  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'center' : 'flex-start', pr: 3 }}>
            <img
              src="/logoname_blue.jpg"
              alt="Logo"
              style={{ width: open ? 140 : 30, height: open ? 40 : 30, transition: "0.3s" }}
            />
          </Box>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <img src='/logo_blue.jpg' style={{ width: '40px' , marginRight: -5 }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* 메뉴 리스트 */}
        <List>
          {mainMenuItems.map((item, index) => 
            (
              <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>

        <Divider />

        {/* 메뉴 리스트 */}
        <List>
          {menuItems.map((item, index) => 
            (
              <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>

        <Divider />

        {/* 로그인 영역 */}
        <Box sx={{ flexGrow: 1 }} />

        <Divider />
        <Box sx={{ textAlign: "center", p: 2 }}>
          {isLoggedIn ? (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {username}님
              </Typography>
              <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 1 }}>
                로그아웃
              </Button>
            </>
          ) : (
            <>

            {loginInfo ? (<>
                              <Typography variant="body2" color="textSecondary" sx={{ display: 'inline-block', mr: 1 }} >
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
                              <Button variant="contained" onClick={onLogout} color="info" >
                                   로그아웃
                              </Button>
                </>) : (<>
                                  <Typography variant="body2" color="textSecondary" sx={{ display: 'inline-block', mr: 1 }} >
                                    로그인 &nbsp;해주세요.
                                  </Typography>
                                  <Button variant="contained" color="info" >
                                    <Link to = "/member/login" style={{ color: 'white' }} > 로그인 </Link>
                                  </Button>
                    </>)
            }
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
