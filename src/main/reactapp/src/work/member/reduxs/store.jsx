import { configureStore } from'@reduxjs/toolkit'

import userReducer from './userSlice'
//(1) 리덕스 store 만들기 | rw 25-03-21

// (2) 변수에 configureStore 함수 대입한다. | rw 25-03-21

// (3) configureStore 함수의 매개변수에 리듀서 정의 및 등록 | rw 25-03-21

// (4) { reducer : { 리듀서명1 : 등록할 리듀서1 , 리듀서명2 : 등록할 리듀서2 } } | rw 25-03-21
// export const store = configureStore ({
//    reducer : { user : userReducer }
// })

// [12] 리덕스 상태 유지 | rw 25-03-21
// (12-(6)) 리덕스 퍼시스턴스 함수 가져오기 // | rw 25-03-21
import { persistStore , persistReducer } from'redux-persist'
import storage from'redux-persist/lib/storage' // 브라우저의 localStorage 사용

// (12-(7)) 퍼시스턴스 설정 , { storage , key : "key정의" } | rw 25-03-21
const persistConfig = {
  storage ,  // localStorage 사용 설정
  key : 'root',  // localStorage 저장할 키 설정
}

// (12-(8)) persistReducer 설정 | rw 25-03-21
const persistedReducer = persistReducer( persistConfig, userReducer )
export const store = configureStore({
   // reducer : { user : userReducer } // 퍼시스턴스 적용하기전의 리듀서
// (12-(9)) 퍼시스턴스 적용된 리듀서 | rw 25-03-21
   reducer : { user : persistedReducer },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // 직렬화 체크 비활성화
      })
})

// (12-(10)) persistor 만들기 | rw 25-03-21
export const persistor = persistStore( store );

// (5) store 내보내기 | rw 25-03-21
export default store;

