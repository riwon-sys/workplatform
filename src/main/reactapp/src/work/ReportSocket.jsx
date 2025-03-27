import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import Box from '@mui/material/Box';

import Snackbar from '@mui/material/Snackbar';
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReportSocket(
    { reportState, mnos, setData, data, setReportState,
        setNextApMno, setNextAp, setNextApState, nextApState, nextApMno, nextAp, setLastRpno, lastRpno }) {

    console.log(mnos)
    console.log(data)
    console.log(nextAp)
    const loginInfo = useSelector((state) => state.user.userInfo);
    // console.log("로그인된 정보 : ", loginInfo);
    console.log(reportState);
    const [reportSocket, setReportSocket] = useState(null); // 소켓 상태 관리
    const [receivedData, setReceivedData] = useState(null); // 수신된 데이터 상태 관리
    const [checkMnos, setCheckMnos] = useState([])
    const mnoList = mnos.filter(item => item.mno !== null).map(item => item.mno);
    const [s, setS] = useState(false)

    // console.log(lastRpno)
    // console.log(mnoList)
    console.log(mnos)
    // console.log(data)
    // 보고서 소켓 연결
    console.log(nextApMno)

    // [0] 소켓 연결
    useEffect(() => {
        // 소켓이 처음 연결될 때 한 번만 실행
        const socket = new WebSocket("ws://localhost:8080/reportConnect");

        socket.onopen = () => {
            console.log('보고서 소켓 연결 성공');
            // // 연결 성공 후 reportState와 loginInfo가 있을 때 데이터 전송
            // if (data != null) {
            //     const sendData = JSON.stringify(data);
            //     socket.send(sendData);

            //     console.log('서버가 보낸정보: ', data);

            // }
        }

        socket.onmessage = (event) => {
            setNextApMno(null)
            // setMnos(null) // props 에 추가한뒤 주석 풀기
            console.log('메시지 수신: ', event.data);
            setReceivedData(JSON.parse(event.data));


        };

        socket.onclose = () => {
            console.log('----- 보고서 소켓 연결 종료 ------');
        };

        socket.onerror = (error) => {
            console.error('WebSocket 오류: ', error);
        };

        // 소켓을 상태로 저장
        setReportSocket(socket);

        // 브라우저를 닫을 때 소켓 종료
        const handleBeforeUnload = () => {
            socket.close(); // 소켓 종료
        };

        // `beforeunload` 이벤트 리스너 등록
        window.addEventListener('beforeunload', handleBeforeUnload);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            socket.close(); // 소켓 종료
            window.removeEventListener('beforeunload', handleBeforeUnload); // 이벤트 리스너 제거
        };

    }, []); // 의존성 배열에 빈 배열을 넣어 컴포넌트 마운트 시 한 번만 실행됨


    // [1] 보고서 등록 성공 시 다음 결재자 찾기
    const [next, setNext] = useState(null)
    useEffect(() => {
        console.log("다음결재자 찾기")
        const currentIndex = mnoList.findIndex(item => item === loginInfo.mno)

        if (currentIndex != -1 && currentIndex + 1 < mnos.length) {
            const nextItem = mnoList[currentIndex + 1]
            console.log(nextItem)
            setNext(nextItem)
            console.log(next)
            setS(true)
        } else {
            console.log("다음결재자 없음")
            setNext(null)
        }

    }, [mnoList, loginInfo])

    console.log("최초결재상태", reportState)
    // 보고서 등록 시 다음 결재자를 찾고 서버 소켓으로 전달
    useEffect(() => {
        if (next != null && loginInfo && loginInfo.mno && data.mname !== '') {
            // 소켓이 연결되었을 때만 메시지를 전송
            if (reportSocket && reportSocket.readyState === WebSocket.OPEN) {

                const obj = {
                    mdepartment: data.mdepartment,
                    mname: data.mname,
                    mrank: data.mrank,
                    rpam: data.rpam,
                    rpamnote: data.rpamnote,
                    rpexpected: data.rpexpected,
                    rpname: data.rpname,
                    rppm: data.rppm,
                    rppmnote: data.rppmnote,
                    rpsignificant: data.rpsignificant,
                    rpunprocessed: data.rpunprocessed,
                    mnoList: nextApMno,  // mnoList는 nextApMno를 사용
                    apmno: next,  // lowestIndexItem.mno에 안전하게 접근
                    lastRpno: lastRpno
                };

                const sendData = JSON.stringify(obj);
                reportSocket.send(sendData);
                console.log('서버에서 보낸 데이터 : ', data);
                console.log("서버소켓으로 보내기 성공~~~~~");

                setReportState(false);
                // setNext(null)
                // setS(false)
                // 데이터를 초기화
            setData({
                rpname: '',
                rpam: '',
                rppm: '',
                rpamnote: '',
                rppmnote: '',
                rpunprocessed: '',
                rpsignificant: '',
                rpexpected: '',
                mname: '',
                mdepartment: '',
                mrank: ''
            });



            } else {
                console.log('소켓이 아직 연결되지 않았습니다.');
            }
        } else {
            console.log('필요한 값들이 누락되었습니다. ');
        }


    }, [next, data]); //s


    // [2] 등록된 보고서 결재 시 다음 결재자 찾기
    const [nextNext, setNextNext] = useState(null);

    useEffect(() => {
        if (Array.isArray(nextApMno) && loginInfo && loginInfo.mno) {
            // apstate가 false인 항목들을 필터링
            const filteredItems = nextApMno.filter(item => item.apstate === false);

            // loginInfo.mno와 일치하는 항목을 찾음
            const loginInfoIndex = filteredItems.findIndex(item => item.mno === loginInfo.mno);

            if (loginInfoIndex !== -1 && loginInfoIndex + 1 < filteredItems.length) {
                // loginInfo.mno와 일치하는 항목의 다음 항목을 찾음
                const nextItem = filteredItems[loginInfoIndex + 1];
                setNextNext(nextItem.mno);  // 그 다음 항목의 mno를 nn에 담음
                console.log(nextNext)
            } else {
                // 만약 그런 항목이 없으면 0을 담음
                setNextNext(0);
                console.log(nextNext)
            }
        }
    }, [nextApMno, loginInfo]);


    // 보고서 결재 시 다음 결재자 찾고 서버소켓으로 보내기
    console.log("결재상태 : ", nextApState)
    useEffect(() => {
        if (nextNext != null && loginInfo && loginInfo.mno && nextAp.mname != '') {
            // 소켓이 연결되었을 때만 메시지를 전송
            if (reportSocket && reportSocket.readyState === WebSocket.OPEN) {
                console.log(nextNext)
                console.log(nextAp)
                const obj = {
                    rpno: nextAp.rpno,
                    rpname: nextAp.rpname,
                    rpam: nextAp.rpam,
                    rppm: nextAp.rppm,
                    rpamnote: nextAp.rpamnote,
                    rppmnote: nextAp.rppmnote,
                    rpunprocessed: nextAp.rpunprocessed,
                    rpsignificant: nextAp.rpsignificant,
                    rpexpected: nextAp.rpsignificant,
                    mname: nextAp.mname,
                    mrank: nextAp.mrank,
                    mdepartment: nextAp.mdepartment,
                    apno: "",
                    nextMno: nextNext
                };

                console.log(obj);
                const sendData = JSON.stringify(obj);
                reportSocket.send(sendData);
                console.log('서버에서 보낸 데이터 : ', data);
                console.log("서버소켓으로 보내기 성공~~~~~");
                setNextApState(false)
                // setNextNext(null)

                setNextAp({rpname: '',
                    rpam: '',
                    rppm: '',
                    rpamnote: '',
                    rppmnote: '',
                    rpunprocessed: '',
                    rpsignificant: '', 
                    rpexpected: '',
                    mname: '',
                    mrank: '',
                    mdepartment: '',
                    apno: '' ,
                    rpno : ''})
            } else {
                console.log('소켓이 아직 연결되지 않았습니다.');
            }
        } else {
            console.log('정의되지 않음');
        }

    }, [nextApState, nextNext, data]);




    const navigate = useNavigate();
    const [state, setState] = React.useState({
        open: true, // 처음에 닫혀 있는 상태로 설정
        vertical: 'top',
        horizontal: 'right',
        backgroundColor: 'white'
    });
    const { vertical, horizontal, open } = state;


    const handleClose = () => {
        setState({ ...state, open: false }); // Snackbar를 닫음
        if (receivedData.lastRpno > 0 && receivedData.rpno == 0) {
            console.log("다음보고서번호", receivedData.lastRpno)
            navigate(`/report/approval/${receivedData.lastRpno}`);
            setState(prevState => ({
                ...prevState,
                open: false


            }));
            setReceivedData(null)
            // setData(null)
        } else if (receivedData.rpno > 0 && receivedData.lastRpno == 0) {
            console.log("보고서번호", receivedData.rpno)
            navigate(`/report/approval/${receivedData.rpno}`);

            setState(prevState => ({
                ...prevState,
                open: false


            }));
            setReceivedData(null)
        }
    };
    // // receivedData가 변경될 때마다 실행되는 useEffect
    // useEffect(() => {
    //     if (receivedData) {
    //         console.log('receivedData:', receivedData);
    //     }
    // }, [receivedData]); // receivedData가 변경될 때마다 실행

    useEffect(() => {
        if (receivedData) {
            setState(prevState => ({
                ...prevState,
                open: true // 새로운 로그 메시지가 오면 Snackbar 열기


            }));
        }

//setReceivedData(null)//
    }, [receivedData]);

    // console.log(nextMno)
    if (receivedData && receivedData.nextMno) {
        console.log(receivedData.nextMno)
    } console.log("*********서버가 보냄", receivedData)
    return (
        <>
            {/* 첫 번째 Box: mnoList에서 조건에 맞는 항목 렌더링 */}
            <Box sx={{ width: 800, backgroundColor: 'red' }}>
                {receivedData && receivedData.rpno == 0 && receivedData.apmno === loginInfo.mno && (
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message={
                            <>
                                <p>
                                    결재요청
                                    <Button onClick={handleClose}>결재하기</Button>
                                </p>
                                <hr />
                                <br />
                                <p>{receivedData.mname} : {receivedData.rpname}</p>
                            </>
                        }
                        ContentProps={{
                            sx: {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    />
                )}

            </Box>

            {/* 두 번째 Box: nextMno와 loginInfo.mno 비교 */}
            <Box sx={{ width: 800, backgroundColor: 'red' }}>
                {receivedData && receivedData.nextMno === loginInfo.mno && (
                    <Snackbar
                        key={receivedData.nextMno}
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message={
                            <>
                                <p>
                                    결재요청
                                    <Button onClick={handleClose}>결재하기</Button>
                                </p>
                                <hr />
                                <br />
                                <p>{receivedData.mname} : {receivedData.rpname}</p>
                            </>
                        }
                        ContentProps={{
                            sx: {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    />
                )}
            </Box>
        </>
    );

}
