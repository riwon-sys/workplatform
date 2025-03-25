import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import Box from '@mui/material/Box';

import Snackbar from '@mui/material/Snackbar';

export default function ReportSocket(
    { reportState, mnos, data, setReportState }) {

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


    const [state, setState] = React.useState({
        open: true, // 처음에 닫혀 있는 상태로 설정
        vertical: 'top',
        horizontal: 'right',
        backgroundColor: 'white'
    });
    const { vertical, horizontal, open } = state;


    const handleClose = () => {
        setState({ ...state, open: false }); // Snackbar를 닫음
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

        // 소켓 연결을 상태로 저장하여 컴포넌트 언마운트 시 소켓을 종료할 수 있게 함
        setReportSocket(socket);

        // 컴포넌트 언마운트 시 소켓 연결 종료
        return () => {
            socket.close();
        };
    }, []); // 의존성 배열에 빈 배열을 넣어 컴포넌트 마운트 시 한 번만 실행됨

    // reportState가 true일 때 소켓으로 데이터 전송
    useEffect(() => {
        if (reportState && reportSocket && loginInfo && loginInfo.mno) {
            // 소켓이 연결되었을 때만 메시지를 전송
            if (reportSocket.readyState === WebSocket.OPEN) {
                console.log(data)
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
                    mnoList: mnoList
                }
                console.log(obj)
                const sendData = JSON.stringify(obj);
                reportSocket.send(sendData);
                console.log('서버에서 보낸 데이터 : ', data);
                console.log("서버소켓으로 보내기 성공~~~~~")
                // setReportState(false)
            } else {
                console.log('소켓이 아직 연결되지 않았습니다.');
            }
        }
    }, [reportState, mnos, data, setReportState]); 

    // receivedData가 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        if (receivedData) {
            console.log('receivedData:', receivedData);
            console.log('receivedData.mnoList:', receivedData.mnoList); // 정상적으로 mnoList를 접근할 수 있습니다.
        }
    }, [receivedData]); // receivedData가 변경될 때마다 실행
    
    useEffect(() => {
        if (receivedData) {
            setState(prevState => ({
                ...prevState,
                open: true // 새로운 로그 메시지가 오면 Snackbar 열기
            }));
        }

        //  메시지를 숨기는 타이머 설정
        const timer = setTimeout(() => {
            setReceivedData(prevState => ({
                ...prevState,
                open: false // 메시지를 숨김
            }));
            setReceivedData(null); // 메시지 내용 초기화
        }, 40000);

        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => clearTimeout(timer);

    }, [receivedData]);

    return (
        <Box sx={{ width: 800, backgroundColor: 'red' }}>
            {/* receivedData가 null이 아니고 mnoList가 존재할 때만 렌더링 */}
            {receivedData && Array.isArray(receivedData.mnoList) && receivedData.mnoList.map((mno, index) => {
                if (mno === loginInfo.mno) {
                    return (
                        <Snackbar
                            key={mno}
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            message={<>


                                <p>{receivedData.mname}</p>
                                <hr />
                                <br />
                                <p>{receivedData.rpname}</p>


                            </>
                            }
                            ContentProps={{
                                sx: {
                                    backgroundColor: 'black',
                                    color: 'white',
                                },
                            }}
                        />
                    );
                }
                return null; // 일치하지 않으면 아무것도 렌더링하지 않음
            })}
        </Box>
    );
}
