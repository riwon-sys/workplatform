import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

import App from './work/App.jsx'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './work/member/reduxs/store'; // rw 25-03-21

// 추가 | rw 25-03-25
import { SnackbarProvider } from 'notistack'; // 토스트 메시지용 | rw 25-03-25

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            {/* SnackbarProvider로 Test(App 컴포넌트) 감싸기 */}
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <App />
            </SnackbarProvider>
        </PersistGate>
    </Provider>
);