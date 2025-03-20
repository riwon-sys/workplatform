import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))


import Test from './work/App.jsx'
root.render(<Test/>);