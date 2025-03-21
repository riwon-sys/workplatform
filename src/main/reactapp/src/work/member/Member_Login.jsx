import { useState } from "react";                // rw 25-03-20
import axios from "axios";                       // rw 25-03-20
import { useNavigate } from "react-router-dom";  // rw 25-03-20

import { useDispatch } from 'react-redux';        //  로그인 > 회원정보 요청 store 저장  | rw 25-03-21
import { login } from '../member/reduxs/userSlice' // rw 25-03-21

import { ThemeProvider, createTheme } from "@mui/material/styles";                           // rw 25-03-20
import { Box, Card, IconButton, TextField, Button, Typography, Stack } from "@mui/material"; // rw 25-03-20
import { Brightness7, Brightness4, Settings, Close } from "@mui/icons-material";             // rw 25-03-20

export default function Member_Login() {
  // ========= 리덕스 전역 변수 사용 =========        | rw 25-03-21
  // (1-1) 리덕스 사용하기 위한 useDispatch 함수 가져오기 | rw 25-03-21
  const dispatch = useDispatch();


  // (1) 입력 값 저장 (state)  | rw 25-03-20
  const [memberInfo, setMemberInfo] = useState({ mno: "", mpwd: "" });

  // (2) 입력값 변경 처리  | rw 25-03-20
  const onInputChange = (event) => {
    setMemberInfo({ ...memberInfo, [event.target.name]: event.target.value });
  };

  // (3) 로그인 요청 처리 | rw 25-03-20
  const navigate = useNavigate();
  const onLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/workplatform/login", memberInfo , {withCredentials: true});
      const result = response.data;
      if (result == true) {
          // (4) 로그인 성공 할 경우 로그인 성공한 회원 정보 가져오기 | rw 25-03-21
          const response2 = await axios.get('http://localhost:8080/workplatform/myinfo', {withCredentials :true});
        alert("Login successful");
        navigate("/"); // 네비게이트 부활 | rw 25-03-21
        // location.href="/"; // 로케이션 죽음 | rw 25-03-21
        // ========= 리덕스 전역 변수 사용 ========= | rw 25-03-21
        // (2-1) useDispatch 함수를 이용한 리듀서 함수 액션 하기; 로그인 액션에 회원정보를 대입한다( 전역변수 대입 )| rw 25-03-21
        dispatch ( login ( response2.data )); // useState(지역) 아닌 store (전역)에 저장 response.data:payload | rw 25-03-21

      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("서버 오류 발생");
      console.error(error);
    }
  };

  return <LoginScreen memberInfo={memberInfo} onInputChange={onInputChange} onLogin={onLogin} />;
}

// (4) 로그인 화면 UI
const LoginScreen = ({ memberInfo, onInputChange, onLogin }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleColorMode = () => setDarkMode(!darkMode);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px" }}>
        <Card variant="outlined" sx={{ width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "12px", position: "relative" }}>
          {/* 우측 상단 버튼 */}
          <Box sx={{ position: "absolute", top: 5, right: 5, display: "flex", gap: 1 }}>
            <IconButton color="primary" onClick={toggleColorMode}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton color="primary">
              <Settings />
            </IconButton>
            <IconButton color="primary">
              <Close />
            </IconButton>
          </Box>

          {/* 로그인 폼 */}
          <Typography variant="h5" align="center" gutterBottom>
            로그인
          </Typography>
          <Stack spacing={2}>
            <TextField label="사원번호" name="mno" value={memberInfo.mno} onChange={onInputChange} variant="outlined" fullWidth />
            <TextField label="비밀번호" name="mpwd" type="password" value={memberInfo.mpwd} onChange={onInputChange} variant="outlined" fullWidth />
            <Button variant="contained" color="primary" fullWidth onClick={onLogin}>
              로그인
            </Button>
          </Stack>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
