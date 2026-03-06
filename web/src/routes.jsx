import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import PrivacySettingsPage from './pages/PrivacySettingsPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CheckoutRegister from './pages/CheckoutRegister.jsx'
import CheckoutSuccess from './pages/CheckoutSuccess.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacySettingsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/register" element={<CheckoutRegister />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}
