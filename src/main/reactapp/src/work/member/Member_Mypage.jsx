/*  Member_Mypage.jsx 마이페이지 UI 및 기능 구현 | rw 25-03-26 생성 */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, TextField, Button, Avatar } from '@mui/material';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

// 기본 고정 틀 반드시 필요
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '100%',
    color: theme.palette.text.secondary,
    ...theme.applyStyles?.('dark', {  // 옵셔널 체이닝 추가
        backgroundColor: '#1A2027',
    }),
}));



const Member_Mypage = () => {
    const loginUser = useSelector((state) => state.user.userInfo);
    const [verified, setVerified] = useState(false); // 비밀번호 확인 여부
    const [inputPwd, setInputPwd] = useState(''); // 사용자 입력 비밀번호

    // 추후 서버에서 로그인 유저 정보 가져오기 (비밀번호 확인 후)
    const [memberData, setMemberData] = useState(null);

    const handlePasswordCheck = () => {
        // 실제 API 요청으로 교체 필요
        if (inputPwd === '1234') { //  실제 구현 시 서버에서 암호화된 비밀번호 비교 필요
            setVerified(true);
            // 예시 데이터 (실제 서버 연동 시 fetch/axios 사용)
            setMemberData({
                mno: loginUser.mno,
                mname: loginUser.mname,
                mphone: loginUser.mphone,
                memail: loginUser.memail,
                mtype: loginUser.mtype,
                mrank: loginUser.mrank,
                mprofile: loginUser.mprofile,
            });
        } else {
            alert("비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#eeeeee',
                }}
            >
                <Item
                    sx={{
                        overflow: 'auto', // scroll → auto 권장
                        overflowX: 'hidden',
                        minWidth: '700px',
                        maxWidth: '1000px',
                        width: '100%',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        마이페이지
                    </Typography>

                    {!verified ? (
                        <>
                            <Typography variant="body1" gutterBottom>
                                보안을 위해 비밀번호를 다시 입력해주세요.
                            </Typography>
                            <TextField
                                type="password"
                                label="비밀번호 입력"
                                fullWidth
                                value={inputPwd}
                                onChange={(e) => setInputPwd(e.target.value)}
                                sx={{ my: 2 }}
                            />
                            <Button variant="contained" onClick={handlePasswordCheck}>
                                확인
                            </Button>
                        </>
                    ) : (
                        memberData && (
                            <Box sx={{ mt: 4, textAlign: 'left' }}>
                                <Typography>사번: {memberData.mno}</Typography>
                                <Typography>이름: {memberData.mname}</Typography>
                                <Typography>이메일: {memberData.memail}</Typography>
                                <Typography>연락처: {memberData.mphone}</Typography>
                                <Typography>직급: {memberData.mrank}</Typography>
                                <Typography>상태: {memberData.mtype}</Typography>
                                <Box sx={{ my: 2 }}>
                                    <Avatar
                                        src={'http://localhost:8080/file/' + (memberData.mprofile === 'default.jpg' ? 'default.jpg' : memberData.mprofile)}
                                        sx={{ width: 100, height: 100, mx: 'auto' }}
                                    />
                                </Box>
                            </Box>
                        )
                    )}
                </Item>
            </Box>
        </Container>
    );
};
export default Member_Mypage;