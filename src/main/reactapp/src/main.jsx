import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))

import Chatting from './chatsocket/chat/Chatting.jsx'
root.render( <Chatting /> )

// import ChatApp from './chatsocket/chat/ChattingTest'
// root.render(<ChatApp/>)