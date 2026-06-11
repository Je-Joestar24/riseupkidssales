import { Navigate } from 'react-router-dom'
import {
  FOUNDER_WAITLIST_SECTION_ID,
  isPrelaunchSalesPage,
} from '../../constants/salesPageConfig.js'

/**
 * During prelaunch, checkout routes redirect to the invitation section on the parents page.
 */
export default function PrelaunchCheckoutRedirect({ children }) {
  if (isPrelaunchSalesPage) {
    return <Navigate to={`/parents#${FOUNDER_WAITLIST_SECTION_ID}`} replace />
  }

  return children
}
