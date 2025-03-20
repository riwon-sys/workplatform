import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';

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

  const menuItems = [
    { name: "메신저", path: "/chatting", icon: <QuestionAnswerIcon /> },
    { name: "보고서 작성", path: "/report/write", icon: <NoteAddIcon /> },
    { name: "보고서 현황", path: "/report/view", icon: <DescriptionIcon /> },
    { name: "게시판", path: "/board", icon: <DvrTwoToneIcon /> },
    { name: "사원 등록", path : "/member/post",icon: <DvrTwoToneIcon />} // rw 25-03-18
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'center' : 'flex-start', p: 1, pr: 2 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: open ? 40 : 30, height: open ? 40 : 30, transition: "0.3s" }}
            />
            {open && (
              <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                워크 플랫폼
              </Typography>
            )}
          </Box>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon sx={{ marginRight: 0.5 }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* 메뉴 리스트 */}
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
              <Typography variant="body2" color="textSecondary" sx={{ display: 'inline-block', mr: 1 }} >
                로그인 &nbsp;해주세요.
              </Typography>
              <Button variant="contained" color="info" >
                <Link to = "/member/login" style={{ color: 'white' }} > 로그인 </Link>
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
