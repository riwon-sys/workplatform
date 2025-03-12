import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";

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

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // 경로 매핑

  const menuItems = [
    { name: "메신저", path: "/chatting" },
    { name: "보고서 작성", path: "/report/write" },
    { name: "보고서 현황", path: "/report/view" },
    { name: "게시판", path: "/board" },
  ];

  const extraItems = [
    { name: "All mail", path: "/mail/all" },
    { name: "Trash", path: "/mail/trash" },
    { name: "Spam", path: "/mail/spam" },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path} // 경로 수정
                sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                  {index === 0 ? <MailIcon /> : <InboxIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {extraItems.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path} // 경로 수정
                sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}


// import { Link } from "react-router-dom";

// /* mui */
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';

// export default function SideBar(){
//     return(<>
//         <div id="sideMenu">
//             <Container fixed maxWidth="xl" >
//                 <Box sx={{ bgcolor: 'white', height: '100vh' }} >
//                     <Stack spacing={1} direction="column" sx={{ minWidth: 0}} >
//                         <Link to="/" className="logoLink" > <img src="logo.png" /> <span> 워크 플랫폼 </span> </Link>
//                         <Link to="/chatting"> <Button> 메신저 </Button> </Link>
//                         <Link to="/report_Write"> <Button> 보고서 작성 </Button> </Link>
//                         <Link to="/report_View"> <Button> 보고서 현황 </Button> </Link>
//                         <Link to="/board"> <Button> 사내 게시판 </Button> </Link>
                        
//                     </Stack>

//                 </Box>
//             </Container>
//         </div>
//     </>)
// } // f end
