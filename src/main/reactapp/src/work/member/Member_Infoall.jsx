/* Member_Infoall.jsx 사원 전체 조회 (비밀번호 재확인 & 수정모달 연동) | rw 25-03-29 생성 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem,
    styled, Paper, Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

/* mui import */
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0, 10),
  textAlign: 'center',
  height: '100%',
}));

export default function Member_Infoall(props) {
    const Infoall = useSelector((state) => state.user.userInfo);
    const [memberInfo, setMemberInfo] = useState([]);
    const [inputPwd, setInputPwd] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [ page, setPage ] = useState(1); // 현재 페이지
    const [ totalPages, setTotalPages ] = useState(1); // 전체 페이지 수

    // 모달 상태
    const [open, setOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        if (isVerified) { fetchMemberInfoAll( page ); }
    }, [ isVerified, page ]);

    const fetchMemberInfoAll = async ( page ) => {
        try {
            const response = await axios.get(`http://localhost:8080/workplatform/infoall?page=${page}&pageSize=10` );
            setMemberInfo( response.data.list );
            setPage( response.data.pageNum );
            setTotalPages( response.data.pages );
        } catch ( error ) {
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
        formData.append("mpwd", Infoall.mpwd);
        if (selectedMember.uploadFile) {
            formData.append("uploadFile", selectedMember.uploadFile);
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
            uploadFile: e.target.files[0]
        });
    };

    // mui 페이지네이션 페이지 번호 가져오기
    const handlePageChange = ( e, value ) => {
        setPage( value );
    }

    return (
        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#eeeeee' }}>
            <Item 
                sx={ 
                    !isVerified? { minWidth: "1000px", maxWidth: "1300px" 
                    } : { 
                    minWidth: "1100px", width: '100%', overflow: "auto" 
                } }
            >
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: "bold" }} paddingTop={!isVerified ? '300px' : '40px'}>
                    사원 관리
                </Typography>

                    {!isVerified ? (<>
                        <div style={{ padding : "0px 200px" }} >
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
                            <Button variant="contained" onClick={handlePasswordCheck} fullWidth>
                                확인
                            </Button>
                            {errorMsg && <Typography color="error" sx={{ mt: 2 }}>{errorMsg}</Typography>}
                        </div>

                        </>
                    ) : (<>
                        <div style={{ height: "700px" }} >
                        <Table sx={{ height: "100%" }} >
                            <TableHead sx={{ backgroundColor: '#eeeeee' }}>
                                <TableRow sx={{ '& th': { fontWeight: "bold", fontSize: "17px", textAlign: "center" } }}>
                                    <TableCell sx={{ width: "8%" }} >사번</TableCell>
                                    <TableCell sx={{ width: "10%" }} >이름</TableCell>
                                    <TableCell sx={{ width: "32%" }} >이메일</TableCell>
                                    <TableCell sx={{ width: "10%" }} >직급</TableCell>
                                    <TableCell sx={{ width: "15%" }} >연락처</TableCell>
                                    <TableCell sx={{ width: "10%" }} >상태</TableCell>
                                    <TableCell sx={{ width: "10%" }} >프로필</TableCell>
                                    <TableCell sx={{ width: "10%" }} >수정</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {memberInfo.map((member, index) => (<>
                                    <TableRow key={index} sx={{ '& td': { fontSize: "15px", textAlign: "center", height: "9%", py: 0.5 } }}>
                                        <TableCell>{member.mno}</TableCell>
                                        <TableCell>{member.mname}</TableCell>
                                        <TableCell sx={{ textAlign: "left" }} >{member.memail || "없음"}</TableCell>
                                        <TableCell>{member.mrank}</TableCell>
                                        <TableCell>{member.mphone}</TableCell>
                                        <TableCell>
                                            {["활동", "부재", "외부업무", "퇴사"][member.mtype]}
                                        </TableCell>
                                        <TableCell>
                                            <img
                                                src={`http://localhost:8080/file/${member.mprofile}`}
                                                alt="프로필사진"
                                                width="40"
                                                height="40"
                                                style={{ marginTop: "5px" }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" size="small"
                                                    onClick={() => handleOpenModal(member)}>
                                                수정
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </>))}
                                {/* 부족한 행 채우기 */}
                                {Array.from({ length: 10 - memberInfo.length }).map((_, index) => (
                                    <TableRow key={`empty-${index}`}>
                                        <TableCell colSpan={8} sx={{ height: "9%" }} />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </div>
                        
                        <Stack spacing={2} mt={3} >
                            <Pagination
                                color="primary"
                                page={ page }
                                count={ totalPages }
                                defaultPage={ 1 }
                                onChange={ handlePageChange }
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            />
                        </Stack>

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
            </Item>
        </Box>
    );
}