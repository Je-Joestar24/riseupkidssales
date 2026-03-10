import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import CheckoutRegister from '../pages/CheckoutRegister.jsx'
import CheckoutSuccess from '../pages/CheckoutSuccess.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Navigate to="/checkout/register" replace />} />
        <Route path="/checkout/register" element={<CheckoutRegister />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

