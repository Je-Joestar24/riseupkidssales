import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import HomePageBackButton from '../../components/common/HomePageBackButton.jsx'
import PrelaunchCheckoutRedirect from '../../components/common/PrelaunchCheckoutRedirect.jsx'
import LanguageQuerySync from './LanguageQuerySync.jsx'
import HomePage from '../../pages/HomePage.jsx'
import ParentPage from '../../pages/ParentPage.jsx'
import SchoolsPage from '../../pages/SchoolsPage.jsx'
import VideoLibraryPage from '../../pages/VideoLibrary.jsx'
import PrivacySettingsPage from '../../pages/PrivacySettingsPage.jsx'
import LegalStaticRedirect from '../../components/legal/LegalStaticRedirect.jsx'

const CheckoutPage = lazy(() => import('../../pages/CheckoutPage.jsx'))
const CheckoutRegister = lazy(() => import('../../pages/CheckoutRegister.jsx'))
const CheckoutSuccess = lazy(() => import('../../pages/CheckoutSuccess.jsx'))

function CheckoutPageLazy() {
  return (
    <PrelaunchCheckoutRedirect>
      <Suspense fallback={null}>
        <CheckoutPage />
      </Suspense>
    </PrelaunchCheckoutRedirect>
  )
}

function CheckoutRegisterLazy() {
  return (
    <PrelaunchCheckoutRedirect>
      <Suspense fallback={null}>
        <CheckoutRegister />
      </Suspense>
    </PrelaunchCheckoutRedirect>
  )
}

function CheckoutSuccessLazy() {
  return (
    <PrelaunchCheckoutRedirect>
      <Suspense fallback={null}>
        <CheckoutSuccess />
      </Suspense>
    </PrelaunchCheckoutRedirect>
  )
}

/**
 * Shared between client (`useRoutes`) and SSR (`useRoutes` inside `StaticRouter`).
 * /privacy and /terms are static HTML in dist/ (source: web/legal/) — LegalStaticRedirect
 * forces a full page load so React does not hydrate over the legal pages.
 */
export const appRouteObjects = [
  { path: '/', element: <HomePage /> },
  { path: '/parents', element: <ParentPage /> },
  { path: '/schools', element: <SchoolsPage /> },
  { path: '/videos', element: <VideoLibraryPage /> },
  { path: '/privacy-settings', element: <PrivacySettingsPage /> },
  { path: '/privacy', element: <LegalStaticRedirect page="privacy" /> },
  { path: '/terms', element: <LegalStaticRedirect page="terms" /> },
  { path: '/privacy-policy', element: <LegalStaticRedirect page="privacy" /> },
  { path: '/checkout', element: <CheckoutPageLazy /> },
  { path: '/checkout/register', element: <CheckoutRegisterLazy /> },
  { path: '/checkout/success', element: <CheckoutSuccessLazy /> },
  { path: '*', element: <Navigate to="/" replace /> },
]

export function AppRouteSwitch() {
  const routeElement = useRoutes(appRouteObjects)
  return (
    <>
      <LanguageQuerySync />
      {routeElement}
      <HomePageBackButton />
    </>
  )
}
