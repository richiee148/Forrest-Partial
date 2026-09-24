import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import CustomerLogIn from './CustomerLogIn.jsx'
import CustomerSignUp from './CustomerSignUp.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<CustomerSignUp />} />
        <Route path="/CustomerSignUp" element={<CustomerSignUp />} />
        <Route path="/CustomerLogIn" element={<CustomerLogIn />} />
        <Route path="*" element={<Navigate to="/CustomerSignUp" replace />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)