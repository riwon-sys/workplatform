import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Avatar, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0, 35),
    textAlign: 'center',
    height: '100%',
}));

const Member_Myinfo = () => {
    const navigate = useNavigate();
    const loginInfo = useSelector((state) => state.user.userInfo);

    const [inputPwd, setInputPwd] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [mphone, setMphone] = useState(loginInfo.mphone);
    const [mtype, setMtype] = useState(loginInfo.mtype);
    const [mpwd, setMpwd] = useState('');

    const [profile, setProfile] = useState(null);
    const [preview, setPreview] = useState(null);

    const isValidPhone = (phone) => /^010-\d{4}-\d{4}$/.test(phone);

    const handlePasswordCheck = () => {
        if (inputPwd === '1234') {
            setIsVerified(true);
            setErrorMsg('');
        } else {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
        }
    };

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setProfile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const onUpdate = async () => {
        if (!isValidPhone(mphone)) {
            alert("전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)");
            return;
        }

        const formData = new FormData();
        formData.append("mno", loginInfo.mno);
        formData.append("mname", loginInfo.mname);
        formData.append("mrank", loginInfo.mrank);
        formData.append("memail", loginInfo.memail);
        formData.append("mpwd", mpwd);
        formData.append("mphone", mphone);
        formData.append("mtype", mtype);
        if (profile) formData.append("uploadFile", profile);

        try {
            const res = await axios.put("http://localhost:8080/workplatform/update", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res.data === true) {
                alert("정보가 성공적으로 수정되었습니다.");
                navigate('/');
            } else {
                alert("수정 실패: 관리자에게 문의하세요.");
            }
        } catch (err) {
            alert("서버 오류: " + err.message);
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
                        <TextField label="직급" value={loginInfo.mrank} fullWidth margin="normal" InputProps={{ readOnly: true }} />

                        <TextField
                            label="비밀번호 변경"
                            value={mpwd}
                            onChange={(e) => setMpwd(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="password"
                        />

                        <TextField
                            label="연락처"
                            value={mphone}
                            onChange={(e) => setMphone(e.target.value)}
                            fullWidth
                            margin="normal"
                            placeholder="010-0000-0000"
                            helperText="전화번호는 010-0000-0000 형식입니다."
                        />

                        <TextField
                            select
                            label="상태"
                            value={mtype}
                            onChange={(e) => setMtype(e.target.value)}
                            fullWidth
                            margin="normal"
                            SelectProps={{ native: true }}
                        >
                            <option value={0}>활동</option>
                            <option value={1}>부재</option>
                            <option value={2}>외부업무</option>
                            <option value={3} disabled>퇴사</option>
                        </TextField>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body1" gutterBottom>프로필 사진</Typography>
                            <Avatar
                                src={preview || `http://localhost:8080/file/${loginInfo.mprofile}`}
                                sx={{ width: 100, height: 100, mx: 'auto' }}
                            />
                            <input type="file" accept="image/*" onChange={onFileChange} style={{ marginTop: '1rem' }} />
                        </Box>

                        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={onUpdate}>
                            정보 수정
                        </Button>
                        <Typography variant="body2" align="center" sx={{ mt: 4, color: 'gray' }}>
                            문의: insateam_jang@example.com
                        </Typography>
                    </Box>
                )}
            </Item>
        </Box>
    );
};

export default Member_Myinfo;