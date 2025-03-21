import { createSlice } from'@reduxjs/toolkit'

// (1) 전역 상태의 변수로 사용할 데이터의 초기값 정의

const initialState = {
    userInfo : null, // 로그인한 정보를 저장 할 속성 (로그인)
    isAuthenticated : false // 로그인 여부 상태를 저장하는 속성 (비로그인)
}

// (2) 'createSlice' 함수 이용한 상태와 리듀서 만들기
// (3) 전역상태 정의 , name:" 상태 변수 이름 "  , 상태변수의 초기값

// (4) 전역 상태 수정하는 리듀서 만들기 , reducers : { 함수명 : 처리함수 , 함수명 : 처리함수 }
const userSlice = createSlice({
     name : "user", // 상태 변수의 이름
     initialState, // 상태 변수의 초기값
     reducers : {
         // (5) loginReducer : 로그인 성공 시 상태를 업데이트
         login(state, action) {
             state.isAuthenticated = true;
             state.userInfo = action.payload; // 로그인 성공 시 payload(로그인 정보)를 userInfo 에 저장

         }
     , // 구분 짓기
         // (6) logoutReducer : 로그아웃 성공 시 상태를 업데이트
         logout(state) {
             state.isAuthenticated = false;
             state.userInfo = null; // 로그아웃 성공 시 userInfo를 null로 변경
         }
     }
})
// (5) export ( 내보내기 )
export const { login , logout } = userSlice.actions; // 액션 만들기
export default userSlice.reducer; // 리듀서 export( 내보내기 ) // userReducer