import { useRef } from "react";
import { useState } from "react";

export default function Chatting( props ) {
    // 1. 해당 컴포넌트가 렌더링 될때 소켓은 재랜더링 방지 useRef 
        // useRef(초기값) :         { current : 참조값 }
        // - 컴포넌트가 렌더링시 참조값을 고정 할수 있다.

    // test 랜덤 아이디 생성
    const [ id, setId ] = useState( Math.floor(Math.random() * 100) );
    // 방 번호 생성
    const [ room, setRoom ] = useState( '' );
    // 방 리스트
    const [ roomArr, setRoomArr ] = useState( [ { room : '', id : '' } ] );

    let clientSocket = useRef( null );
    // 2. Ref 참조가 없으면 
    if( !clientSocket.current ){
        // ====== (클라이언트) 웹소켓 구현 ====================
            // 1. new WebSocket( 서버소켓url ); // 비동기 // 서버소켓에게 접속 요청
        clientSocket.current = new WebSocket( 'ws://localhost:8080/chatConnect' );      console.log( clientSocket );     // 확인
        // onclose // onerror // onmessage // onopen : WebSocket객체내 포함된 메소드들
            // 2. 각 메소드 정의
                // - 1. 클라이언트소켓이 close 발생했을때 콜백함수 정의
        clientSocket.current.onclose = (e)=>{ console.log(e);  console.log('소켓 닫힘');}
                // - 2. 클라이언트소켓이 error 발생했을때 콜백함수 정의 (* error 이미 발생했고 다음 행동 정의 )
        clientSocket.current.onerror = (e) =>{ console.log(e); console.log('소켓 에러');  }
                // - 3. 클라이언트소켓이 message 받았을때 콜백함수 정의
        clientSocket.current.onmessage = (e) => {  console.log( e );
            msgList.push( e.data ); // 받은 메시지를 state 저장 
            setMsgList( [...msgList ] ); // setState 
        }
                // - 4. 클라이언트소켓이 open 발생했을때 콜백함수 정의
        clientSocket.current.onopen = (e)=>{ console.log(e); console.log('서버소켓연결성공'); }
    }

    const onSend = ( ) => {
        // 3. 연결된 서버소켓에게 메시지 보내기
        clientSocket.current.send( msgInput ); // 입력받은 데이터를 서버소켓 에게 보내기.
    }

    // 방 입장
    const onEnter1 = (  ) => {
        roomArr.forEach( data => {
            setRoomArr = [ ...RoomArr, { room:1, id } ];
            console.log( room ); console.log( id ); console.log( RoomArr );
        })

    } // f end

    // - 채팅 내용 입력창 
    const [ msgInput , setMsgInput ] = useState('');
    // - 채팅 창 의 내용물 들
    const [ msgList , setMsgList ] = useState ([]);

    return (<>
        <div>
            <h3> 채팅방 </h3>
            <div>
                {
                    msgList.map( (msg)=>{
                        return <div> {msg} </div>
                    })
                }
            </div>
            <textarea value={msgInput} onChange= { (e)=>{ setMsgInput( e.target.value ) }} > </textarea>
            <button type="button" onClick={ onSend }> 전송 </button> <br/>
            <button type="button" onClick={ onEnter1 } > 1번 채팅방 </button> <br/>
            <button type="button" onClick={ onEnter2 } > 2번 채팅방 </button> <br/>
            <button type="button" onClick={ onEnter3 } > 3번 채팅방 </button> <br/>
            <button type="button" onClick={ onEnter4 } > 4번 채팅방 </button> <br/>
        </div>
    </>)

}