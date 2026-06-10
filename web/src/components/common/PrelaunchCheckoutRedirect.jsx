import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {
  getPrelaunchWaitlistUrl,
  isPrelaunchSalesPage,
} from '../../constants/salesPageConfig.js'
import { useLanguage } from '../../hooks/useLanguage.js'

/**
 * During prelaunch, block checkout routes and send users to the external waitlist form.
 */
export default function PrelaunchCheckoutRedirect({ children }) {
  const { language } = useLanguage()

  useEffect(() => {
    if (!isPrelaunchSalesPage) return
    window.open(getPrelaunchWaitlistUrl(language), '_blank', 'noopener,noreferrer')
  }, [language])

  if (isPrelaunchSalesPage) {
    return <Navigate to="/parents" replace />
  }

  return children
}
