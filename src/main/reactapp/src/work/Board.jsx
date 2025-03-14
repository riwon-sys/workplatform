import { useEffect, useState } from "react"
import axios from 'axios';
export default function Board(){

     // [1] 컴포넌트 최초 실행될때 (딱 1번) 실행하는 생명주기 함수
     useEffect(()=>{
        console.log('컴포넌트 실행될때 딱 한번 실행')
        onRead();//컴포넌트가 열릴때 axios와 통신하여 데이터 가져옴
     })

     //[2]axios 이용하여 서버와 통신
     const onRead = async()=>{
        const response = await axios.get('http://localhost:8080/work/board')
        console.log(response.data);
        setBoard(response.data); // 서버로부터 받은 모든 상태변수 저장'
     }

     //[3]서버로부터 받은 결과를 저장하는 상태변수
     const [board,setBoard] =useState([ ])
     console.log(board)



    return(<>
        <h2> 게시판 </h2>
        <table>
            <thead>
                <tr><th>번호</th><th></th><th>번호</th></tr>
            </thead>

        </table>
    </>)
}
    
