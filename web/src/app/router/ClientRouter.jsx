import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'
import { AppRouteSwitch } from './AppRouteSwitch.jsx'
import AnalyticsListener from '../../analytics/AnalyticsListener.jsx'
import CookieConsentBanner from '../../components/common/CookieConsentBanner.jsx'

export default function ClientRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouteSwitch />
      <AnalyticsListener />
      <CookieConsentBanner />
    </BrowserRouter>
  )
}
