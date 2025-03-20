import { useState } from "react"
import axios from 'axios'
export default function Member_Login ( props ) {

    // (1) state 입력 값 저장
    const [ memeberInfo,setMemberInfo ] = useState({ mid:"" , mpwd:""})
    // (2) state 수정 처리
    const onInputChange =( event ) => { setMemberInfo( {...memeberInfo , [event.target.name] : event.target.value}); }

    // (3) 입력받은 값들을 axios 이용 및 자바에게 요청하고 응답받기 // import axios from 'axios'
    const onLogin = async()=> {
        const response = await axios.post( 'http://localhost:8080/workplatform/login' , memeberInfo )
        const result = response.data;
        if ( result == true) { alert('Login successful');}
        else { alert('Login failed'); }  // 로긴 실패

    }

    return (<>
        <h3> 로그인 페이지 TEST </h3>
        <form>

        사원 번호 : <input type ="text" name="mno" value={setMemberInfo.mno} onChange={onInputChange}/> <br/>

        비밀 번호 : <input type ="password" name="mpwd" value={setMemberInfo.mpwd} onChange={onInputChange}/> <br/>

        { /* jsx 주석  */}
        <button type = "button" onClick={ onLogin }> 로그인 </button>

        </form>
        </>);
    }