import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'
import { AppRouteSwitch } from './AppRouteSwitch.jsx'

export default function ClientRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouteSwitch />
    </BrowserRouter>
  )
}
