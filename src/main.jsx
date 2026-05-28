import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Sales from './components/sales.jsx'
import Deals from './components/deals.jsx'
import Analytics from './components/analytics.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>

        <Route path='/deals' element={<Deals />}></Route>

        <Route path='/sales' element={<Sales />}></Route>

        <Route path='/analytics' element={<Analytics />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
