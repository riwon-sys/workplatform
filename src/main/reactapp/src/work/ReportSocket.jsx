import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import Box from '@mui/material/Box';

import Snackbar from '@mui/material/Snackbar';
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReportSocket(
    { reportState, mnos, data, setReportState,
        setNextApMno, setNextAp, setNextApState, nextApState, nextApMno, nextAp }) {

    console.log(mnos)
    console.log(data)
    const loginInfo = useSelector((state) => state.user.userInfo);
    console.log("로그인된 정보 : ", loginInfo);
    console.log(reportState);
    const [reportSocket, setReportSocket] = useState(null); // 소켓 상태 관리
    const [receivedData, setReceivedData] = useState(null); // 수신된 데이터 상태 관리
    const [checkMnos, setCheckMnos] = useState([])
    const mnoList = mnos.filter(item => item.mno !== null).map(item => item.mno);

    console.log(mnoList)
    // 보고서 소켓 연결

    // 결재 전 가장 낮은 직급의 mno 찾기
    const lowestIndexItem = mnos
        .filter((item, index, array) => item.apstate === false && item.mno !== loginInfo.mno)  // apstate가 false이고 mno가 loginInfo.mno와 다른 항목만 필터링
        .shift();  // 배열에서 첫 번째 아이템

    if (lowestIndexItem) {
        console.log(lowestIndexItem.mno);  // 정상 출력
    } else {
        console.log('No item found with apstate === false and mno !== loginInfo.mno');
    }


    // 다음결재자
    console.log(nextAp)
    console.log(nextApMno)
    console.log(nextApState)

    const nextMno = nextApMno
        .filter((item,index , array) => item.apstate === false && item.mno != loginInfo.mno)
        .shift()
        
        console.log(nextMno)
    if (nextMno) {
        console.log(nextMno.mno);  // 정상 출력
    } else {
        console.log('No item found with apstate === false and mno !== loginInfo.mno');
    }



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
        if(receivedData.rpno == null){
        navigate('/report/approval');
        }else{
            navigate(`/report/approval/${receivedData.rpno}`);
            
        }
    };

    useEffect(() => {
        // 소켓이 처음 연결될 때 한 번만 실행
        const socket = new WebSocket("ws://localhost:8080/reportConnect");

        socket.onopen = () => {
            // console.log('보고서 소켓 연결 성공');
            // // 연결 성공 후 reportState와 loginInfo가 있을 때 데이터 전송
            // if (data != null) {
            //     const sendData = JSON.stringify(data);
            //     socket.send(sendData);

            //     console.log('서버가 보낸정보: ', data);

            // }
        }

        socket.onmessage = (event) => {
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


    useEffect(() => {
        // receivedData.mnoList가 존재하고, 배열일 때만 실행
        if (receivedData && receivedData.mnoList && Array.isArray(receivedData.mnoList) && receivedData.mnoList.length > 0) {
            console.log("mnoList가 존재합니다. useEffect 실행됨");
    
            // 여기에 소켓으로 데이터를 보내거나 원하는 작업 수행
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
                    mnoList: receivedData.mnoList,
                    apmno: lowestIndexItem.mno
                };
                const sendData = JSON.stringify(obj);
                reportSocket.send(sendData);
                console.log("서버로 보내기 성공!");
                setReportState(false);  // 전송 후 상태 변경
            }
        } else {
            console.log('mnoList가 존재하지 않거나 빈 배열입니다.');
        }
    }, [receivedData]);  // receivedData가 변경될 때마다 실행
    
    // // reportState가 true일 때 소켓으로 데이터 전송
    // useEffect(() => {
    //     if (reportState && reportSocket && loginInfo && loginInfo.mno) {
    //         // 소켓이 연결되었을 때만 메시지를 전송
    //         if (reportSocket.readyState === WebSocket.OPEN) {
    //             console.log(lowestIndexItem.mno);  // 정상 출력
    //             console.log(data)
    //             const obj = {
    //                 mdepartment: data.mdepartment,
    //                 mname: data.mname,
    //                 mrank: data.mrank,
    //                 rpam: data.rpam,
    //                 rpamnote: data.rpamnote,
    //                 rpexpected: data.rpexpected,
    //                 rpname: data.rpname,
    //                 rppm: data.rppm,
    //                 rppmnote: data.rppmnote,
    //                 rpsignificant: data.rpsignificant,
    //                 rpunprocessed: data.rpunprocessed,
    //                 mnoList: mnoList,
    //                 apmno: lowestIndexItem.mno
    //             }
    //             console.log(obj)
    //             const sendData = JSON.stringify(obj);
    //             reportSocket.send(sendData);
    //             console.log('서버에서 보낸 데이터 : ', data);
    //             console.log("서버소켓으로 보내기 성공~~~~~")
    //             setReportState(false)
    //         } else {
    //             console.log('소켓이 아직 연결되지 않았습니다.');
    //         }
    //     }
    // }, [reportState]);


    console.log("결재상태 : ", nextApState)

    // nextApState가 true일 때 소켓으로 데이터 전송
    useEffect(() => {
        if (receivedData && receivedData.nextMno && nextMno && nextMno.mno && nextApState && reportSocket && loginInfo && loginInfo.mno) {
            // 소켓이 연결되었을 때만 메시지를 전송
            if (reportSocket.readyState === WebSocket.OPEN) {
                console.log(nextMno.mno);  // 정상 출력
                console.log(nextAp)
                const obj = {
                    rpname: nextAp.rpname,
                    rpam: nextAp.rpam,
                    rppm: nextAp.rppm,
                    rpamnote: nextAp.rpamnote,
                    rppmnote: nextAp.rppmnote,
                    rpunprocessed: nextAp.rpunprocessed,
                    rpsignificant: nextAp.rpsignificant,
                    rpexpected: nextAp.rpexpected,
                    mname: nextAp.mname,
                    mrank: nextAp.mrank,
                    mdepartment: nextAp.mdepartment,
                    apno: nextAp.apno,
                    rpno : nextAp.rpno,
                    nextMno: nextMno.mno
                }
                console.log(obj)
                const sendData = JSON.stringify(obj);
                reportSocket.send(sendData);
                console.log('서버에서 보낸 데이터 : ', data);
                console.log("서버소켓으로 보내기 성공~~~~~")
                setNextApState(false)
                
            } else {
                console.log('소켓이 아직 연결되지 않았습니다.');
            }
        }
    }, [receivedData]);

    // receivedData가 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        if (receivedData) {
            console.log('receivedData:', receivedData);
        }
    }, [receivedData]); // receivedData가 변경될 때마다 실행

    useEffect(() => {
        if (receivedData) {
            setState(prevState => ({
                ...prevState,
                open: true // 새로운 로그 메시지가 오면 Snackbar 열기
            }));
        }

        // //  메시지를 숨기는 타이머 설정
        // const timer = setTimeout(() => {
        //     setReceivedData(prevState => ({
        //         ...prevState,
        //         open: false // 메시지를 숨김
        //     }));
        //     setReceivedData(null); // 메시지 내용 초기화
        // }, 40000);

        // // 컴포넌트가 언마운트될 때 타이머 정리
        // return () => clearTimeout(timer);

    }, [receivedData]);

    console.log(nextMno)
    if (receivedData && receivedData.nextMno) {
    console.log(receivedData.nextMno)
}console.log("*********서버가 보냄",receivedData)
    return (
        <>
          {/* 첫 번째 Box: mnoList에서 조건에 맞는 항목 렌더링 */}
          <Box sx={{ width: 800, backgroundColor: 'red' }}>
            {receivedData && Array.isArray(receivedData.mnoList) && receivedData.mnoList.map((mno, index) => {
              if (receivedData.apmno === loginInfo.mno) {
                return (
                  <Snackbar
                    key={mno}
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
                );
              }
              return null; // 조건에 맞지 않으면 아무것도 렌더링하지 않음
            })}
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
