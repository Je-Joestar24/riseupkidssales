import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import PrivacySettingsPage from './pages/PrivacySettingsPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CheckoutRegister from './pages/CheckoutRegister.jsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacySettingsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/register" element={<CheckoutRegister />} />
      </Routes>
    </BrowserRouter>
  )
}
