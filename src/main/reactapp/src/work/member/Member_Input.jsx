// 사진 등록 : <input type="file" accept="default.jpg"><br/> 25-03-18 사진등록 고민
// [1] 회원 가입 HTML
// [2] 회원가입 리액트 입력 폼 방법 + 첨부파일
import {useState} from "react"

// [3] 회원가입 입력받은 state 값들을 axios를 이용하여 서버에게 보내고 응답받기
// + <button type="button" onClick= { onSignup }> 회원 등록 </button>
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// [4] 회원가입 첨부파일 미리보기 기능, 첨부파일 유무에 따라서 fomdata 속성 설정


import * as React from 'react';
import { Card, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaximizeIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export default function Member_Input ( props ) {
    // (1) 입력받은 값들을 저장하는 state 변수 선언
    // const [ memberInfo , setMemberInfo ] = useState({mno : "" , mname : "" , mphone : "" , memail : "" ,  mrank : "" ,  uploadfile:null})

    // [4] -(1) 리액트의 memberInfo 의 속성명은 일반적으로 (자바) memberDto 의 멤버변수와 동일하게 하는게 좋음
    const [ memberInfo , setMemberInfo ] = useState({mno : "" , mname : "" , mphone : "" , memail : "" , mrank : ""})

    // (2) 입력받은 값들을 state 렌더링 하는 함수 , event : onChange 결과정보 , event.target : 해당 함수를 실행시키는 마크업
    const onInputChange = (event) => {
        setMemberInfo({
            ...memberInfo,
            [event.target.name]: event.target.value
        });
    };

    // (3) 입력받은 첨부파일
    // [4] -(2) 입력받은 첨부파일 및 첨부파일의 미리보기
    const [profile , setProfile] = useState(null); // 업로드 파일을 파일 객체로 저장하는 state 변수
    const [preview , setPreview] = useState(null); // 업로드 파일을 바이트 단위로 저장하는 state 변수
    const onFileUpload = (event) => { console.log(event.target.files[0])
       // 1. 업로드 된 파일 반환
       const file = event.target.files[0];
       // 2. state 저장
       setProfile( file );
       // 3. 이미지 미리보기( 자바의 업로드 와는 관계 없음)
       if( file ){
           // 4. 파일 읽기 객체 선언
           const reader = new FileReader(); // js 객체 : 파일의 읽기 객체
           // 5. 파일 읽기 메소드 정의 .reader.onloadend(() => { 파일 읽어 드림 ; 실행 할 코드 })
           reader.onloadend = () => {
               console.log( reader.result ); // 읽어 드림 파일 출력 , reader.result : 가져온 파일의 결과물은 바이트 단위
               setPreview( reader.result ); // state 에 저장
           }
           // 6. 파일 읽기 // 파일 객체 읽기 // reader.readAsDataURL ( File 객체 )
           reader.readAsDataURL( file ); // file : File 객체
       }else{ // 파일이 없으면
           setPreview(null);
       }
    }




    // (4) 입력받은 값들을 axios 로 보내고 응답받기
    const navigate = useNavigate();
    const onSignup = async () => {
        // 1. formdata 객체 만들기 , json 과 다르게 문자열 전송이 아닌 바이트(바이너리) 전송을 하기위한 폼전송 필요
        const formdata = new FormData();
        // 2. formdata 속성 넣기 , .append( '속성명' ,  값)
        formdata.append('mno', memberInfo.mno);
        formdata.append('mname', memberInfo.mname);
        formdata.append('mphone', memberInfo.mphone);
        formdata.append('memail', memberInfo.memail);
        formdata.append('mrank', memberInfo.mrank);
        //formdata.append('uploadfile', memberInfo.uploadfile);

        // [4] -(3) 만약에 첨부파일이 존재하면 첨부파일 추가
        if( profile ){
            formdata.append('uploadFile' , profile );
        }

        // 3.axios 에서 사용할 http 헤더 정보 , axios 에서는 application/json 은 기본값이므로 설정 할 필요가 없음
        const option = { headers : { "Content-Type" : "multipart/form-data"}}
        // 4. axios 동기
        const response = await axios.post("http://localhost:8080/workplatform/signup" , formdata , option );
        // 5. 응답 받기 , rsponse.data
        const result = response.data;
        // 6. 응답에 따른 처리
        if( result == true){
            alert( '회원가입 완료' );
            // 7. 페이지 전환
            navigate('login'); // navigate 비교 location.href 비교 ; F5 의 여부
            }
            else{ alert ('회원가입 실패');}
    }


  const [darkMode, setDarkMode] = React.useState(false); // 색상 모드 상태 추가

  const toggleColorMode = () => {
    setDarkMode(!darkMode); // 색상 모드 토글
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Blue 색상
      },
      secondary: {
        main: '#dc004e', // Pink 색상
      },
      mode: darkMode ? 'dark' : 'light', // darkMode 상태에 따라 모드 변경
    },
  });


return (
  <>
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            maxWidth: '850px',
            padding: '50px',
            marginTop: '50px',
            borderRadius: '12px',
            position: 'relative',
          }}
        >
          {/* 최상단 오른쪽 버튼들 (사원 등록 박스 내) */}
          <Box
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              display: 'flex',
              gap: 3,
            }}
          >
            {/* 밝기 모드 전환 버튼 추가 */}
            <IconButton
              color="primary"
              aria-label="color-mode-toggle"
              onClick={toggleColorMode}
              sx={{ fontSize: 30 }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* 세팅 버튼 */}
            <IconButton
              color="primary"
              aria-label="settings"
              component="span"
              sx={{ fontSize: 30 }}
            >
              <SettingsIcon />
            </IconButton>

            {/* 나머지 아이콘 버튼들 */}
            <IconButton
              color="primary"
              aria-label="minimize"
              component="span"
              sx={{ fontSize: 30 }}
            >
              <MinimizeIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              sx={{ fontSize: 30 }}
            >
              <MaximizeIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="close"
              component="span"
              sx={{ fontSize: 30 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: 'center', marginBottom: '30px' }}
          >
            사원 등록
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="사원 번호"
              type="number"
              name="mno"
              value={memberInfo.mno}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="이름"
              type="text"
              name="mname"
              value={memberInfo.mname}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="전화번호"
              type="text"
              name="mphone"
              value={memberInfo.mphone}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="이메일"
              type="email"
              name="memail"
              value={memberInfo.memail}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="직급"
              type="text"
              name="mrank"
              value={memberInfo.mrank}
              onChange={onInputChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="사진 등록"
              type="file"
              accept="image/*"
              onChange={onFileUpload}
              fullWidth
              required
              variant="outlined"
            />

            {preview && (
              <>
                미리보기 :
                <img
                  src={preview}
                  style={{ width: '100px' }}
                  alt="미리보기 이미지"
                />
              </>
            )}

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
  </>
); // R E

} //  C E



// npm install @mui/material @emotion/react @emotion/styled

// npm install @mui/material @mui/styled-engine-sc styled-components

// npm install @mui/icons-material

// 팀단위로 업무를 할 경우에는 pacakage.json 파일 내
// 'dependencies'에 코드 자동 작성됨( 빌드 그레이들 )

// npm install 현재 pacakage.json 파일 내 dependencies 코드들을 라이브러리들을 자동 설치

// 라이브 러리를 관리 잘하기 !!!

// 이제 컴포넌트를 사용하기



