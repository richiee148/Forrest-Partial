import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import CustomerLogIn from './CustomerLogIn.jsx'
import CustomerSignUp from './CustomerSignUp.jsx'
import Dashboard from './dashboard.jsx'
import LandingPage from './landingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        
        <Route path="/landingPage" element={<LandingPage />} />

        <Route path="/CustomerSignUp" element={<CustomerSignUp />} />
        <Route path="/CustomerLogIn" element={<CustomerLogIn />} />

       
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/landingPage" replace />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)