/*  Member_Mypage.jsx 고정 박스형 마이페이지 | rw 25-03-27 생성 */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0, 35),
    textAlign: 'center',
    height: '100%',
}));

const Member_Mypage = () => {
    const loginInfo = useSelector((state) => state.user.userInfo);

    const [inputPwd, setInputPwd] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handlePasswordCheck = () => {
        if (inputPwd === '1234') {
            setIsVerified(true);
            setErrorMsg('');
        } else {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
        }
    };

    const [mphone, setMphone] = useState(loginInfo.mphone);
    const [phoneCheck, setPhoneCheck] = useState(false);

    const isValidPhone = (phone) => /^010-\d{4}-\d{4}$/.test(phone);

    const checkPhoneDuplicate = async () => {
        if (!isValidPhone(mphone)) {
            alert("전화번호 형식이 올바르지 않습니다. (010-0000-0000)");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:8080/workplatform/check-phone?mphone=${mphone}`);
            if (res.data.duplicate === true) {
                alert("이미 사용 중인 연락처입니다.");
                setPhoneCheck(false);
            } else {
                alert("사용 가능한 번호입니다.");
                setPhoneCheck(true);
            }
        } catch (err) {
            console.error(err);
            alert("중복 확인 중 오류가 발생했습니다.");
            setPhoneCheck(false);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#eeeeee' }}>
            <Item sx={{ minWidth: '800px', maxWidth: '1000px', width: '100%' }}>
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: "bold" }} paddingTop={!isVerified ? '300px' : '100px'}>
                    내 정보
                </Typography>

                {!isVerified ? (
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
                        <Button variant="contained" onClick={handlePasswordCheck} fullWidth>
                            확인
                        </Button>
                        {errorMsg && <Typography color="error" sx={{ mt: 2 }}>{errorMsg}</Typography>}
                    </>
                ) : (
                    <Box sx={{ mt: 3 }}>
                        <TextField label="사번" value={loginInfo.mno} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        <TextField label="이름" value={loginInfo.mname} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        <TextField label="이메일" value={loginInfo.memail} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        <TextField
                            label="연락처"
                            value={mphone}
                            onChange={(e) => {
                                setMphone(e.target.value);
                                setPhoneCheck(false); // 번호 변경 시 중복 확인 다시 필요
                            }}
                            fullWidth
                            margin="normal"
                            placeholder="010-0000-0000"
                            helperText={phoneCheck ? "✔ 중복 확인 완료" : "전화번호는 010-0000-0000 형식입니다."}
                        />
                        <Button
                            variant="outlined"
                            onClick={checkPhoneDuplicate}
                            sx={{ mt: 1, mb: 2 }}
                        >
                            중복 확인
                        </Button>
                        <TextField label="직급" value={loginInfo.mrank} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        <TextField
                            label="상태"
                            value={
                                loginInfo.mtype === 0 ? '활동' :
                                    loginInfo.mtype === 1 ? '부재' :
                                        loginInfo.mtype === 2 ? '외부업무' : '퇴사'
                            }
                            fullWidth margin="normal" InputProps={{ readOnly: true }}
                        />
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body1" gutterBottom>프로필 사진</Typography>
                            <Avatar src={`http://localhost:8080/file/${loginInfo.mprofile}`} sx={{ width: 100, height: 100, mx: 'auto' }} />
                        </Box>
                        <Typography variant="body2" align="center" sx={{ mt: 4, color: 'gray' }}>
                            문의: insateam_jang@example.com
                        </Typography>
                    </Box>
                )}
            </Item>
        </Box>
    );
};

export default Member_Mypage;