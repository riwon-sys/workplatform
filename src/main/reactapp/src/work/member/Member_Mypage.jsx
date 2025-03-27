/*  Member_Mypage.jsx 마이페이지 UI 및 MUI 기능 + 보안/제한적 수정 기능 반영 | rw 25-03-26 수정 */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Avatar,
    IconButton,
    Card,
    MenuItem,
} from '@mui/material';
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
    Settings as SettingsIcon,
    Minimize as MinimizeIcon,
    Fullscreen as MaximizeIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0, 35),
    textAlign: 'center',
    height: '100%',
}));

const Member_Mypage = () => {
    const loginUser = useSelector((state) => state.user.userInfo);
    const [verified, setVerified] = useState(false);
    const [inputPwd, setInputPwd] = useState('');
    const [memberData, setMemberData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [newPwd, setNewPwd] = useState('');
    const [profileFile, setProfileFile] = useState(null);

    const toggleColorMode = () => setDarkMode(!darkMode);

    const theme = createTheme({
        palette: {
            primary: { main: '#1976d2' },
            secondary: { main: '#dc004e' },
            mode: darkMode ? 'dark' : 'light',
        },
    });

    const handlePasswordCheck = () => {
        if (inputPwd === '1234') {
            const data = {
                mno: loginUser.mno,
                mname: loginUser.mname,
                mphone: loginUser.mphone,
                memail: loginUser.memail,
                mtype: loginUser.mtype,
                mrank: loginUser.mrank,
                mprofile: loginUser.mprofile,
                mpwd: loginUser.mpwd,
            };
            setMemberData(data);
            setFormData(data);
            setVerified(true);
        } else {
            alert('비밀번호가 올바르지 않습니다.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        setProfileFile(file);
    };

    const handleSave = () => {
        if (!/^010\d{8}$/.test(formData.mphone)) {
            alert('전화번호 형식이 올바르지 않습니다. 예: 01012345678');
            return;
        }
        if (formData.mtype === '3') {
            alert('퇴사 상태(3)로는 변경할 수 없습니다.');
            return;
        }
        if (newPwd.trim() !== '') {
            formData.mpwd = newPwd;
        }
        if (profileFile) {
            formData.mprofile = profileFile.name;
        }
        alert('수정이 완료되었습니다. (실제 서버 연동 필요)');
        setMemberData(formData);
        setEditMode(false);
    };

    return (
        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#eeeeee' }}>
            <Item
                sx={{
                    minWidth: '800px',
                    maxWidth: '1000px',
                    width: '100%',
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: "bold" }}
                    paddingTop={ !verified ? '300px' : '100px' }
                >
                    내 정보
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
                        <Button variant="contained" onClick={handlePasswordCheck} fullWidth>
                            확인
                        </Button>
                    </>
                ) : (
                    memberData && (
                        <Box sx={{ mt: 3 }}>
                            <TextField label="사번" value={formData.mno} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="이름" value={formData.mname} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="이메일" value={formData.memail} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField label="연락처" value={formData.mphone} name="mphone" onChange={handleChange} fullWidth margin="normal" InputProps={{ readOnly: !editMode }} />
                            <TextField label="직급" value={formData.mrank} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                            <TextField select label="상태" name="mtype" value={formData.mtype} onChange={handleChange} fullWidth margin="normal" disabled={!editMode}>
                                <MenuItem value="0">활동</MenuItem>
                                <MenuItem value="1">부재</MenuItem>
                                <MenuItem value="2">외부업무</MenuItem>
                            </TextField>
                            {editMode && (
                                <>
                                    <TextField label="기존 비밀번호" type="password" value="********" fullWidth margin="normal" disabled />
                                    <TextField label="새 비밀번호" type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} fullWidth margin="normal" />
                                    <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
                                        프로필 사진 업로드
                                        <input type="file" accept="image/*" hidden onChange={handleProfileUpload} />
                                    </Button>
                                </>
                            )}
                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <Avatar src={`http://localhost:8080/file/${formData.mprofile}`} sx={{ width: 100, height: 100, mx: 'auto' }} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                {!editMode ? (
                                    <Button variant="outlined" fullWidth onClick={() => setEditMode(true)}>수정하기</Button>
                                ) : (
                                    <Button variant="contained" color="primary" fullWidth onClick={handleSave}>저장</Button>
                                )}
                            </Box>
                        </Box>
                    )
                )}
            </Item>
        </Box>

    );
};

export default Member_Mypage;