import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import BusinessMetrics from './pages/BusinessMetrics.tsx'
import UnifiedDashboard from './pages/UnifiedDashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/business-metrics" element={<BusinessMetrics />} />
        <Route path="/unified" element={<UnifiedDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
