/* AdminMemberList.jsx 전체 사원 리스트 + 검색 + 필터 + 페이징 | rw 25-03-25 생성 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMemberForm from "./AdminMemberForm";

const AdminMemberList = () => {
    const [members, setMembers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [deptFilter, setDeptFilter] = useState("");
    const [rankFilter, setRankFilter] = useState("");
    const [selectedMno, setSelectedMno] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get("/api/member/all").then((res) => {
            setMembers(res.data);
            setFiltered(res.data);
        });
    }, []);

    useEffect(() => {
        let temp = members;
        if (search) {
            temp = temp.filter((m) => m.mname.includes(search));
        }
        if (deptFilter) {
            temp = temp.filter((m) => String(m.mno).startsWith(deptFilter));
        }
        if (rankFilter) {
            temp = temp.filter((m) => m.mrank === rankFilter);
        }
        setFiltered(temp);
        setPage(1);
    }, [search, deptFilter, rankFilter, members]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const pageList = filtered.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div>
            <h2>👔 사원 정보 관리 (인사팀 전용)</h2>

            <div>
                🔍 <input
                placeholder="이름 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

                🏢 <select onChange={(e) => setDeptFilter(e.target.value)}>
                <option value="">전체 부서</option>
                <option value="1">인사</option>
                <option value="2">마케팅</option>
                <option value="3">영업</option>
                <option value="4">운영</option>
                <option value="5">기술</option>
                <option value="6">디자인</option>
                <option value="7">재무</option>
            </select>

                🏷 <select onChange={(e) => setRankFilter(e.target.value)}>
                <option value="">전체 직급</option>
                <option>사원</option>
                <option>대리</option>
                <option>과장</option>
                <option>차장</option>
                <option>부장</option>
            </select>
            </div>

            <table border="1" width="100%" style={{ marginTop: "10px" }}>
                <thead>
                <tr>
                    <th>사번</th>
                    <th>이름</th>
                    <th>부서</th>
                    <th>직급</th>
                    <th>상태</th>
                    <th>수정</th>
                </tr>
                </thead>
                <tbody>
                {pageList.map((m) => (
                    <tr key={m.mno}>
                        <td>{m.mno}</td>
                        <td>{m.mname}</td>
                        <td>{"" + m.mno.toString().charAt(0)}</td>
                        <td>{m.mrank}</td>
                        <td>{m.mstatus}</td>
                        <td>
                            <button onClick={() => setSelectedMno(m.mno)}>수정</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ marginTop: "10px" }}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        style={{ fontWeight: page === i + 1 ? "bold" : "normal" }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {selectedMno && (
                <div style={{ marginTop: "20px", border: "1px solid gray", padding: "10px" }}>
                    <AdminMemberForm
                        mno={selectedMno}
                        onUpdate={() => {
                            setSelectedMno(null);
                            axios.get("/api/member/all").then((res) => setMembers(res.data));
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminMemberList;
