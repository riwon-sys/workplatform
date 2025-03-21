import { createSlice } from "@reduxjs/toolkit"; 

// Slice : 상태와 리듀서 정의

// [1] 전역 상태(변수)로 사용할 데이터 초기값 정의
const initialState = {
    log : null
}

// [2] createSlice() 함수를 이용한 상태와 리듀서 생성
const logSlice = createSlice( {
    name : 'log', // 상태이름 지정 
    initialState, 
    reducers : {   // 실제 상태를 처리하는 함수 (Slice 는 정의하는 곳) => 형식 : reducers : {함수명 : 처리함수}
        
        // 1) 로그인 리듀서
        log : (state, action) => {
            state.log = action.payload; // 로그인 함수 action(호출) 시 payload(매개변수로 받은 값)를 state 에 저장
        }}
})

// [3] Store 에서 import 하여 사용하기 위해 export
export const {log} = logSlice.actions; // 액션 생성
export default logSlice.reducer;

