/*  Member_Input.jsx 고정 박스형 비밀번호 확인 | rw 25-03-27 생성 */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  MenuItem,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0, 35),
  textAlign: 'center',
  height: '100%',
}));

const Member_Input = () => {
  const [inputPwd, setInputPwd] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handlePasswordCheck1 = () => {
    if (inputPwd === '1234') {
      setIsVerified(true);
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };

  const isValidMno = (mno) => /^[1-7][0-9]{5}$/.test(mno);
  const isValidPhone = (phone) => /^010-\d{4}-\d{4}$/.test(phone);

  const [memberInfo, setMemberInfo] = useState({
    mno: '', mname: '', mphone: '', memail: '', mrank: ''
  });

  const getTeamNameByMno = (mno) => {
    const first = mno?.toString()?.charAt(0);
    return {
      '1': '인사', '2': '마켓팅', '3': '영업',
      '4': '운영', '5': '기술', '6': '디자인', '7': '회계'
    }[first] || '';
  };

  useEffect(() => {
    const { mno, mrank } = memberInfo;
    const team = getTeamNameByMno(mno);
    if (!team || !mrank) return;

    let email = '';
    switch (mrank) {
      case '부장': email = `${team}hr_chief.@workplatform.com`; break;
      case '차장': email = `${team}hr_director.@workplatform.com`; break;
      case '과장': email = `${team}hr_manager.@workplatform.com`; break;
      case '대리': email = `${team}hr_stafff.@workplatform.com`; break;
      case '사원': email = `${team}hr_associate.@workplatform.com`; break;
      default: email = '';
    }
    setMemberInfo((prev) => ({ ...prev, memail: email }));
  }, [memberInfo.mno, memberInfo.mrank]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({ ...prev, [name]: value }));
  };

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

  const onSignup = async () => {
    if (!isValidMno(memberInfo.mno)) {
      alert('사원번호는 6자리 숫자이며 1~7로 시작해야 합니다.');
      return;
    }
    if (!isValidPhone(memberInfo.mphone)) {
      alert('전화번호는 010-0000-0000 형식이어야 합니다.');
      return;
    }

    const formdata = new FormData();
    formdata.append('mno', memberInfo.mno);
    formdata.append('mname', memberInfo.mname);
    formdata.append('mphone', memberInfo.mphone);
    formdata.append('memail', memberInfo.memail);
    formdata.append('mrank', memberInfo.mrank);
    if (profile) formdata.append('uploadFile', profile);

    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    const response = await axios.post('http://localhost:8080/workplatform/signup', formdata, option);

    if (response.data === true) {
      alert('회원가입 완료');
      navigate('/login');
    } else {
      alert('회원가입 실패');
    }
  };

  return (
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#eeeeee' }}>
        <Item sx={{ minWidth: '800px', maxWidth: '1000px', width: '100%' }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: "bold" }} paddingTop={!isVerified ? '300px' : '100px'}>
            사원 등록
          </Typography>

          {!isVerified ? (
              <>
                <Typography variant="body1" gutterBottom>
                  비밀번호를 입력해주세요.
                </Typography>
                <TextField
                    type="password"
                    label="비밀번호 입력"
                    fullWidth
                    value={inputPwd}
                    onChange={(e) => setInputPwd(e.target.value)}
                    sx={{ my: 2 }}
                />
                <Button variant="contained" onClick={handlePasswordCheck1} fullWidth>
                  확인
                </Button>
                {errorMsg && <Typography color="error" sx={{ mt: 2 }}>{errorMsg}</Typography>}
              </>
          ) : (
              <Box sx={{ mt: 3 }}>
                <TextField label="사원번호" name="mno" value={memberInfo.mno} onChange={onInputChange}
                           fullWidth required margin="normal" placeholder="예: 123456"
                           helperText="6자리 숫자, 1~7로 시작" />
                {memberInfo.mno.length === 6 && (
                    <Typography variant="body2" sx={{ color: 'green', mb: 2 }}>
                      선택된 팀: {getTeamNameByMno(memberInfo.mno)}
                    </Typography>
                )}
                <TextField label="이름" name="mname" value={memberInfo.mname} onChange={onInputChange}
                           fullWidth required margin="normal" />
                <TextField label="전화번호" name="mphone" value={memberInfo.mphone} onChange={onInputChange}
                           fullWidth required margin="normal" placeholder="010-0000-0000"
                           helperText="전화번호 형식은 010-0000-0000 입니다." />
                <TextField label="이메일 (자동 생성)" name="memail" value={memberInfo.memail}
                           fullWidth required margin="normal" InputProps={{ readOnly: true }}
                           helperText="사번과 직급에 따라 자동 생성됩니다." />
                <TextField select label="직급" name="mrank" value={memberInfo.mrank} onChange={onInputChange}
                           fullWidth required margin="normal">
                  {['사원', '대리', '과장', '차장', '부장'].map((r) => (
                      <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                </TextField>
                <TextField label="사진 등록" type="file" inputProps={{ accept: 'image/*' }}
                           onChange={onFileUpload} fullWidth margin="normal" />
                {preview && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>미리보기</Typography>
                      <Avatar src={preview} sx={{ width: 100, height: 100, mx: 'auto' }} />
                    </Box>
                )}
                <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={onSignup}>
                  등록
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

export default Member_Input;
