import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch import
import { log } from './member/reduxs/logSlice.jsx'
import axios from 'axios';
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function Socket() {
    const [roomInfo, setRoomInfo] = useState(null);
    const [state, setState] = React.useState({
        open: true, // 처음에 닫혀 있는 상태로 설정
        vertical: 'bottom',
        horizontal: 'right',
        backgroundColor: 'white'
    });
    const { vertical, horizontal, open } = state;


    const handleClose = () => {
        setState({ ...state, open: false }); // Snackbar를 닫음
    };

    const [findLog, setFindLog] = useState(null);

    useEffect(() => {
        // WebSocket 연결
        const socket = new WebSocket("ws://localhost:8080/browserConnect");
    
        // 소켓 연결이 성공하면
        socket.onopen = () => {
            console.log('브라우저 소켓 연결 성공');
        };
    
        // 소켓에서 메시지를 받으면
        socket.onmessage = (event) => {
            console.log('**********************수신된 메시지: ', event.data);
    
            try {
                const json = JSON.parse(event.data);
                setFindLog(json); // 상태 업데이트
    
                console.log(json.msg);
    
                // findLog와 json.rno가 모두 존재할 때만 findRoomInfo 호출
                if (json && json.rno) {
                    findRoomInfo(json.rno); // rno를 전달하여 채팅방 정보를 가져옴
                }
            } catch (error) {
                console.error("JSON 파싱 에러:", error);
            }
        };
    
        // 소켓 연결 종료시
        socket.onclose = () => {
            console.log('----- 브라우저 소켓 연결 종료 ------');
        };
    
        // 에러 발생 시
        socket.onerror = (error) => {
            console.error('WebSocket 오류: ', error);
        };
    
        // 컴포넌트가 언마운트될 때 소켓 연결 종료
        return () => {
            socket.close();
        };
    }, []);  // 빈 배열([])로 설정해서 한 번만 연결되게 함
    
    // findRoomInfo 메서드 수정 (rno를 인자로 받도록)
    const findRoomInfo = async (rno) => {
        try {
            const response = await axios.get(`http://localhost:8080/chattingroom/findroominfo?rno=${rno}`);
            console.log(response.data);
            setRoomInfo(response.data);
        } catch (e) {
            console.log("채팅방 상세 정보 오류", e);
        }
    };
    

    const [showMessage, setShowMessage] = useState(true); // 메시지 출력 여부 상태

    useEffect(() => {
        if (findLog) {
            setState(prevState => ({
                ...prevState,
                open: true // 새로운 로그 메시지가 오면 Snackbar 열기
            }));
        }

        //  메시지를 숨기는 타이머 설정
        const timer = setTimeout(() => {
            setState(prevState => ({
                ...prevState,
                open: false // 메시지를 숨김
            }));
            setFindLog(null); // 메시지 내용 초기화
        }, 40000);

        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => clearTimeout(timer);

    }, [findLog]);

    return (
        <>
            <Box sx={{ width: 800, backgroundColor: 'red' }}>
                {showMessage && findLog && roomInfo && (

                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message={
                            <>
                                {roomInfo.rname} 번 채팅방
                                <hr />
                                <br />
                                {findLog.mname} :
                                {findLog.msg ? findLog.msg : (findLog.flocation ? findLog.flocation : '')}
                                {/* msg가 있으면 msg를 출력하고, msg가 없으면 flocation을 출력 */}
                            </>
                        }
                        ContentProps={{
                            sx: {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                        key={vertical + horizontal}
                    />
                )}
            </Box>
        </>
    );
}
