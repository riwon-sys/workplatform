import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ReportSocket(
    { reportState, mnos, data, setReportState }) {

    console.log(mnos)
    console.log(data)
    const loginInfo = useSelector((state) => state.user.userInfo);
    console.log("로그인된 정보 : ", loginInfo);
    console.log(reportState);
    const [reportSocket, setReportSocket] = useState(null); // 소켓 상태 관리
    const [receivedData, setReceivedData] = useState(null); // 수신된 데이터 상태 관리

    // 보고서 소켓 연결

    useEffect(() => {
        // 소켓이 처음 연결될 때 한 번만 실행
        const socket = new WebSocket("ws://localhost:8080/reportConnect");

        socket.onopen = () => {
            console.log('보고서 소켓 연결 성공');
            // 연결 성공 후 reportState와 loginInfo가 있을 때 데이터 전송
            if (data != null) {
                const sendData = JSON.stringify(data);
                socket.send(sendData);

                console.log('서버가 보낸정보: ', data);

            }
        }

        socket.onmessage = (event) => {
            console.log('메시지 수신: ', event.data);
            setReceivedData(event.data); // 메시지를 상태로 저장
            // setMnos("")

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
                    mdepartment : data.mdepartment,
                    mname : data.mname,
                    mrank  : data.mrank,
                    rpam : data.rpam,
                    rpamnote : data.rpamnote,
                    rpexpected : data.rpexpected,
                    rpname : data.rpname,
                    rppm : data.rppm ,
                    rppmnote : data.rppmnote,
                    rpsignificant: data.rpsignificant,
                    rpunprocessed :data.rpunprocessed,
                    mnoList : mnos
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
    }, [reportState, mnos, data, setReportState]); // reportState, reportSocket, loginInfo가 변경될 때마다 실행

    console.log(receivedData)
    console.log(mnos)
    console.log(loginInfo)

    return (
        <div>
            {/* mnos 배열에서 mno가 loginInfo.mno와 일치하는 경우만 렌더링 */}
            {Array.isArray(mnos) && mnos.map((mno, index) => {
                if (mno.mno === loginInfo.mno) {
                    return (
                        <div key={index}>
                            <p>로그인된 사용자: {loginInfo.mname}</p>
                            <p>보고서 이름: {receivedData.rpname}</p>
                        </div>
                    );
                }
                return null;  // 일치하지 않으면 아무것도 렌더링하지 않음
            })}
        </div>
    );
}
