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

        {/* Landing Page - FIRST PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* Customer Pages */}
        <Route path="/CustomerSignUp" element={<CustomerSignUp />} />
        <Route path="/CustomerLogIn" element={<CustomerLogIn />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Any unknown URL → Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)