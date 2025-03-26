import * as React from 'react';
import { useEffect, useState } from 'react'; /* rw 25-03-21 */
import { Link, useNavigate } from "react-router-dom"; /* rw 25-03-21 */

/* mui import */
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, Typography, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';

/* mui icon */
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemIcon from '@mui/material/ListItemIcon';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import ApprovalIcon from '@mui/icons-material/Approval';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

/* redux  | rw 25-03-21 */
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './member/reduxs/userSlice';

/* toast | rw 25-03-25 */
import { useSnackbar } from 'notistack'; // ✅ 토스트 메시지

import Socket from "./socket.jsx";
import ReportSocket from './ReportSocket.jsx';


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

export default function SideBar({ reportState, setReportState, mnos, setMnos, data
  , setNextApMno, nextApMno, setNextAp, nextAp, setNextApState, nextApState, setLastRpno, lastRpno }) {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('xl'));
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(isMdUp);

  const loginInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // 토스트 함수 사용

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);

  useEffect(() => {
    setOpen(isMdUp);
  }, [isMdUp]);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // 로그아웃 함수: 토스트 포함
  const onLogout = async () => {
    if( !confirm('로그아웃 하시겠습니까?') ){ return; }
    try {
      await axios.get('http://localhost:8080/workplatform/logout', { withCredentials: true });
      dispatch(logout());
      enqueueSnackbar("로그아웃 되었습니다. 다음에 또 만나요! 👋", { variant: "info" });
      navigate('/');
    } catch (e) {
      console.error("로그아웃 오류:", e);
      enqueueSnackbar("로그아웃 중 오류가 발생했습니다.", { variant: "error" });
    }
  };

  const mainMenuItems = [
    { name: "메신저", path: "/chatting", icon: <QuestionAnswerIcon /> },
    { name: "보고서 작성", path: "/report/write", icon: <NoteAddIcon /> },
    { name: "나의 보고서", path: "/report/view", icon: <DescriptionIcon /> },
    { name: "결재 목록", path: "/report/approval", icon: <ApprovalIcon /> },
  ];

  const menuItems = [
    { name: "게시판", path: "/board", icon: <DvrTwoToneIcon /> },
    { name: "내 정보", path: "/member/mypage", icon: <PersonIcon /> }, // 정의한 롸우터 경로를 입력 | rw 25-03-26 생성
  ];

  return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'center' : 'flex-start', pr: 3 }}>
              <img
                src="/logoimg/logoname_blue.jpg"
                alt="Logo"
                style={{ width: open ? 140 : 30, height: open ? 40 : 30, transition: "0.3s" }}
              />
            </Box>
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <img src='/logoimg/logo_blue_icon.png' style={{ width: '40px', marginRight: -5 }} />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {mainMenuItems.map((item) => (
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

          <List>
            {menuItems.map((item) => (
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
            {/* 인사팀이면 사원등록 메뉴 보여주기 */}
            {String(loginInfo?.mno).startsWith("1") &&
                (loginInfo?.mrank === "차장" || loginInfo?.mrank === "부장") && (
                    <ListItem key="사원 등록" disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                          component={Link}
                          to="/member/post"
                          sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                      >
                        <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                          <PersonAddAlt1Icon />
                        </ListItemIcon>
                        <ListItemText primary="사원 등록" sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                )}
          </List>

        <Divider />

        <Socket /> {/*브라우저 소켓 추가*/}
        <ReportSocket
          reportState={reportState}
          mnos={mnos}
          data={data}
          setReportState={setReportState}

          setNextApMno={setNextApMno}
          setNextAp={setNextAp}
          setNextApState={setNextApState}
          nextApState={nextApState}
          nextAp={nextAp}
          nextApMno={nextApMno}
          setLastRpno={setLastRpno} lastRpno={lastRpno}
        />

        {/* 로그인 영역 */}
        <Box sx={{ flexGrow: 1 }} />

          <Divider />
          <Box sx={{ textAlign: "center", p: "2px" }}>
            {loginInfo ? (
                <>
                  <DrawerHeader>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'center' : 'flex-start' }}>
                      <img
                        src={'http://localhost:8080/file/' + (loginInfo.mprofile === 'default.jpg' ? 'default.jpg' : loginInfo.mprofile)}
                        alt="profile"
                        style={{
                          width: '40px',
                          borderRadius: '40px'
                        }}
                        />
                      <div
                        style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: 'gray',
                          margin: '0px 25px 0px 10px'
                        }}
                      >
                        { loginInfo.mname } 님 ({ loginInfo.mrank })
                      </div>
                    </Box>
                    <IconButton onClick={onLogout} sx={{ marginRight: "-7px" }} >
                      { open ?
                        <LogoutIcon color='primary' /> :
                        <img
                          src={'http://localhost:8080/file/' + (loginInfo.mprofile === 'default.jpg' ? 'default.jpg' : loginInfo.mprofile)}
                          alt="profile"
                          style={{ width: '40px', borderRadius: '40px' }}
                        />
                      }
                    </IconButton>
                  </DrawerHeader>

                  {/* <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      component={Link}
                      onClick={onLogout}
                      sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                        <img
                          src={'http://localhost:8080/file/' + (loginInfo.mprofile === 'default.jpg' ? 'default.jpg' : loginInfo.mprofile)}
                          alt="profile"
                          style={{ width: '40px', borderRadius: '40px' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        // primary={item.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem> */}
                  {/* <Typography variant="body2" color="textSecondary" sx={{ display: 'inline-block', mr: 1 }}>
                    <img
                        src={'http://localhost:8080/file/' + (loginInfo.mprofile === 'default.jpg' ? 'default.jpg' : loginInfo.mprofile)}
                        alt="profile"
                        style={{ width: '40px', borderRadius: '40px' }}
                    />
                  </Typography>
                  <Button variant="contained" onClick={onLogout} color="info">
                    로그아웃
                  </Button> */}
                </>
            ) : (
                <>
                  {open ? (
                      <>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'inline-block', mr: 1 }}>
                          로그인 &nbsp;해주세요.
                        </Typography>
                        <Button variant="contained" color="info">
                          <Link to="/member/login" style={{ color: 'white' }}>
                            로그인
                          </Link>
                        </Button>
                      </>
                  ) : (
                      <ListItemButton
                          component={Link}
                          to="/member/login"
                          sx={{
                            minWidth: 70,
                            justifyContent: 'center',
                            ml: -1.5,
                            p: 1.8
                          }}
                      >
                        <LoginIcon color='primary' />
                      </ListItemButton>
                  )}
                </>
            )}
          </Box>
        </Drawer>
      </Box>
  );
}