/*  Member_Infoall.jsx 사원 전체 조회 (비밀번호 재확인 필수) | rw 25-03-28 생성 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Member_Infoall(props) {
    const Infoall = useSelector((state) => state.user.userInfo);
    const [memberInfo, setMemberInfo] = useState([]);
    const [inputPwd, setInputPwd] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isVerified) {
            fetchMemberInfoAll();
        }
    }, [isVerified]);

    const fetchMemberInfoAll = async () => {
        try {
            const response = await axios.get("http://localhost:8080/workplatform/infoall");
            setMemberInfo(response.data);
            console.log(response.data);
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
                <table border="1" width="100%" style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#ddd' }}>
                    <tr>
                        <th>사번</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>직급</th>
                        <th>비밀번호(암호화)</th>
                        <th>연락처</th>
                        <th>상태</th>
                        <th>프로필 사진</th>
                    </tr>
                    </thead>
                    <tbody>
                    {memberInfo.map((member, index) => (
                        <tr key={index}>
                            <td>{member.mno}</td>
                            <td>{member.mname}</td>
                            <td>{member.memail}</td>
                            <td>{member.mrank}</td>
                            <td>{member.mpwd}</td>
                            <td>{member.mphone}</td>
                            <td>
                                {member.mtype === 0 && "활동"}
                                {member.mtype === 1 && "부재"}
                                {member.mtype === 2 && "외부업무"}
                                {member.mtype === 3 && "퇴사"}
                            </td>
                            <td>
                                <img
                                    src={`http://localhost:8080/file/${member.mprofile}`}
                                    alt="프로필사진"
                                    width="50"
                                    height="50"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}