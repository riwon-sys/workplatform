import React, { useState, useEffect  } from 'react';
import { Card, Box, Button, TextField, Typography, IconButton, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaximizeIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Member_Input() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleColorMode = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // 상태 변수
  const [memberInfo, setMemberInfo] = useState({
    mno: '',
    mname: '',
    mphone: '',
    memail: '',
    mrank: '',
  });

  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // 값 변경 핸들러
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  useEffect(() => {
    const { mno, mrank } = memberInfo;
    const team = getTeamNameByMno(mno);
    if (!team || !mrank) return;

    let email = '';
    switch (mrank) {
      case '부장':
        email = `${team}team@example.com`; break;
      case '차장':
        email = `${team}team_team@example.com`; break;
      case '과장':
        email = `${team}team_jang@example.com`; break;
      case '대리':
        email = `${team}team_dari@example.com`; break;
      default:
        email = '';
    }

    setMemberInfo((prev) => ({
      ...prev,
      memail: email,
    }));
  }, [memberInfo.mno, memberInfo.mrank]);

  const getTeamNameByMno = (mno) => {
    const first = mno?.toString()?.charAt(0);
    switch (first) {
      case '1': return 'insa';
      case '2': return 'marketing';
      case '3': return 'sales';
      case '4': return 'ops';
      case '5': return 'tech';
      case '6': return 'design';
      case '7': return 'finance';
      default: return '';
    }
  };

  // 파일 업로드 핸들러
  const onFileUpload = (e) => {
    const file = e.target.files[0];
    setProfile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // 등록 버튼 클릭
  const onSignup = async () => {
    const formdata = new FormData();
    formdata.append('mno', memberInfo.mno);
    formdata.append('mname', memberInfo.mname);
    formdata.append('mphone', memberInfo.mphone);
    formdata.append('memail', memberInfo.memail);
    formdata.append('mrank', memberInfo.mrank);
    if (profile) {
      formdata.append('uploadFile', profile);
    }

    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    const response = await axios.post('http://localhost:8080/workplatform/signup', formdata, option);

    if (response.data === true) {
      alert('회원가입 완료');
      navigate('login');
    } else {
      alert('회원가입 실패');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
        <Card sx={{ width: '100%', maxWidth: '850px', padding: '50px', borderRadius: '12px', position: 'relative' }}>
          {/* 상단 아이콘 버튼 */}
          <Box sx={{ position: 'absolute', top: 5, right: 5, display: 'flex', gap: 3 }}>
            <IconButton onClick={toggleColorMode}>{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>
            <IconButton><SettingsIcon /></IconButton>
            <IconButton><MinimizeIcon /></IconButton>
            <IconButton><MaximizeIcon /></IconButton>
            <IconButton><CloseIcon /></IconButton>
          </Box>

          {/* 타이틀 */}
          <Typography component="h1" variant="h4" sx={{ textAlign: 'center', marginBottom: '30px' }}>
            사원 등록
          </Typography>

          {/* 안내 문구 */}
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray', marginBottom: '20px' }}>
            기타 문의사항은 인사팀으로 문의주세요.
            <br />
            insateam_jang@example.com 또는 insateam_team@example.com
          </Typography>

          {/* 폼 입력 영역 */}
          <Box sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
            {/* 사원 번호 */}
            <TextField
              label="사원 번호"
              type="number"
              name="mno"
              value={memberInfo.mno}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
              placeholder="예: 123456"
              helperText="6자리 숫자 (1~7로 시작)"
            />
            {memberInfo.mno.length === 6 && (
              <Typography variant="body2" sx={{ color: 'green', marginTop: '8px' }}>
                선택된 팀: {getTeamNameByMno(memberInfo.mno)}
              </Typography>
            )}

            {/* 이름 */}
            <TextField
              label="이름"
              type="text"
              name="mname"
              value={memberInfo.mname}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
              sx={{ marginTop: '20px' }}
            />

            {/* 전화번호 */}
            <TextField
              label="전화번호"
              type="text"
              name="mphone"
              value={memberInfo.mphone}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
              placeholder="010-0000-0000"
              helperText="전화번호는 총 11자리입니다. ( 예 : 01012345678 )"
              sx={{ marginTop: '20px' }}
            />

           <TextField
             label="이메일 (자동 완성)"
             type="email"
             name="memail"
             value={memberInfo.memail}
             fullWidth
             required
             variant="outlined"
             InputProps={{ readOnly: true }}
             helperText="사번과 직급을 입력하면 이메일이 자동으로 생성됩니다."
             sx={{ marginTop: '20px' }}
           />

            {/* 직급 */}
            <TextField
              select
              label="직급"
              name="mrank"
              value={memberInfo.mrank}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
              sx={{ marginTop: '20px' }}
            >
              <MenuItem value="대리">대리</MenuItem>
              <MenuItem value="과장">과장</MenuItem>
              <MenuItem value="차장">차장</MenuItem>
              <MenuItem value="부장">부장</MenuItem>
            </TextField>

            {/* 사진 등록 */}
            <TextField
              label="사진 등록"
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={onFileUpload}
              fullWidth
              variant="outlined"
              sx={{ marginTop: '20px' }}
            />

            {/* 미리보기 */}
            {preview && (
              <Box sx={{ marginTop: '10px' }}>
                미리보기:
                <img src={preview} alt="미리보기" style={{ width: '100px', marginTop: '5px' }} />
              </Box>
            )}

            {/* 등록 버튼 */}
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '20px' }}
              onClick={onSignup}
            >
              등록
            </Button>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}



// npm install @mui/material @emotion/react @emotion/styled

// npm install @mui/material @mui/styled-engine-sc styled-components

// npm install @mui/icons-material

// 팀단위로 업무를 할 경우에는 pacakage.json 파일 내
// 'dependencies'에 코드 자동 작성됨( 빌드 그레이들 )

// npm install 현재 pacakage.json 파일 내 dependencies 코드들을 라이브러리들을 자동 설치

// 라이브 러리를 관리 잘하기 !!!

// 이제 컴포넌트를 사용하기



