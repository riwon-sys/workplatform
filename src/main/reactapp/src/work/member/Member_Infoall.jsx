/* Member_Infoall.jsx 사원 전체 조회 (비밀번호 재확인 & 수정모달 연동) | rw 25-03-29 생성 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem
} from '@mui/material';

export default function Member_Infoall(props) {
    const Infoall = useSelector((state) => state.user.userInfo);
    const [memberInfo, setMemberInfo] = useState([]);
    const [inputPwd, setInputPwd] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // 모달 상태
    const [open, setOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        if (isVerified) {
            fetchMemberInfoAll();
        }
    }, [isVerified]);

    const fetchMemberInfoAll = async () => {
        try {
            const response = await axios.get("http://localhost:8080/workplatform/infoall");
            setMemberInfo(response.data);
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            alert("서버에서 데이터를 가져오지 못했습니다.");
        }
    };

    const handlePasswordCheck = () => {
        if (inputPwd === '1234') { // ⚠️ 실제 서버 검증 권장
            setIsVerified(true);
            setErrorMsg('');
        } else {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
        }
    };

    const handleOpenModal = (member) => {
        setSelectedMember(member);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedMember(null);
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("mno", selectedMember.mno);
        formData.append("mname", selectedMember.mname);
        formData.append("mrank", selectedMember.mrank);
        formData.append("mphone", selectedMember.mphone);
        formData.append("mtype", selectedMember.mtype);
        if (selectedMember.mprofileFile) {
            formData.append("mprofile", selectedMember.mprofileFile);
        }

        try {
            await axios.post("http://localhost:8080/member/updateInfo", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert('수정 성공!');
            fetchMemberInfoAll(); // 목록 갱신
            handleCloseModal();
        } catch (e) {
            alert('수정 실패!');
        }
    };

    const handleChange = (e) => {
        setSelectedMember({
            ...selectedMember,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setSelectedMember({
            ...selectedMember,
            mprofileFile: e.target.files[0]
        });
    };

    return (
        <div style={{ padding: '30px' }}>
            <h3>사원 전체 조회</h3>

            {!isVerified ? (
                <div>
                    <p>보안을 위해 비밀번호를 다시 입력해주세요.</p>
                    <input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={inputPwd}
                        onChange={(e) => setInputPwd(e.target.value)}
                    />
                    <button onClick={handlePasswordCheck}>확인</button>
                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                </div>
            ) : (
                <>
                    <table border="1" width="100%" style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#ddd' }}>
                        <tr>
                            <th>사번</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>직급</th>
                            <th>연락처</th>
                            <th>상태</th>
                            <th>프로필 사진</th>
                            <th>수정</th>
                        </tr>
                        </thead>
                        <tbody>
                        {memberInfo.map((member, index) => (
                            <tr key={index}>
                                <td>{member.mno}</td>
                                <td>{member.mname}</td>
                                <td>{member.memail || "없음"}</td>
                                <td>{member.mrank}</td>
                                <td>{member.mphone}</td>
                                <td>
                                    {["활동", "부재", "외부업무", "퇴사"][member.mtype]}
                                </td>
                                <td>
                                    <img
                                        src={`http://localhost:8080/file/${member.mprofile}`}
                                        alt="프로필사진"
                                        width="50"
                                        height="50"
                                    />
                                </td>
                                <td>
                                    <Button variant="contained" size="small"
                                            onClick={() => handleOpenModal(member)}>
                                        수정
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {selectedMember && (
                        <Dialog open={open} onClose={handleCloseModal}>
                            <DialogTitle>회원 정보 수정 ({selectedMember.mno})</DialogTitle>
                            <DialogContent>
                                <TextField
                                    name="mname"
                                    label="이름"
                                    fullWidth
                                    margin="dense"
                                    value={selectedMember.mname}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name="mrank"
                                    label="직급"
                                    select fullWidth margin="dense"
                                    value={selectedMember.mrank}
                                    onChange={handleChange}
                                >
                                    {['사원','대리','과장','부장'].map(rank=>(
                                        <MenuItem key={rank} value={rank}>{rank}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name="mphone"
                                    label="연락처"
                                    fullWidth margin="dense"
                                    value={selectedMember.mphone}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name="mtype"
                                    label="상태"
                                    select fullWidth margin="dense"
                                    value={selectedMember.mtype}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>활동</MenuItem>
                                    <MenuItem value={1}>부재</MenuItem>
                                    <MenuItem value={2}>외부업무</MenuItem>
                                    <MenuItem value={3}>퇴사</MenuItem>
                                </TextField>
                                <input type="file" onChange={handleFileChange}/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseModal}>취소</Button>
                                <Button onClick={handleUpdate}>저장</Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </>
            )}
        </div>
    );
}