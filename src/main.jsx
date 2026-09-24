import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import CustomerLogIn from './CustomerLogIn.jsx'
import CustomerSignUp from './CustomerSignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/CustomerSignUp" element={<CustomerSignUp />} />
        <Route path="/CustomerLogIn" element={<CustomerLogIn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)