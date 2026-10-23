import { Navigate, useLocation } from 'react-router-dom'
import { resolveLanguageFromSearch, withLanguage } from '../../utils/salesLanguage.js'
import {
  FOUNDER_WAITLIST_SECTION_ID,
  isCheckoutPublic,
} from '../../constants/salesPageConfig.js'

/**
 * The checkout routes redirect to the invitation section on the parents page only when the checkout
 * is not public (prelaunch with VITE_CHECKOUT_PUBLIC=false), keeping the visitor's language.
 */
export default function PrelaunchCheckoutRedirect({ children }) {
  const { search } = useLocation()

  if (!isCheckoutPublic) {
    const language = resolveLanguageFromSearch(search)
    return <Navigate to={withLanguage(`/parents#${FOUNDER_WAITLIST_SECTION_ID}`, language)} replace />
  }

  return children
}
