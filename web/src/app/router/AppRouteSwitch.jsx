import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import HomePageBackButton from '../../components/common/HomePageBackButton.jsx'
import LanguageQuerySync from './LanguageQuerySync.jsx'
import HomePage from '../../pages/HomePage.jsx'
import ParentPage from '../../pages/ParentPage.jsx'
import SchoolsPage from '../../pages/SchoolsPage.jsx'
import VideoLibraryPage from '../../pages/VideoLibrary.jsx'
import PrivacySettingsPage from '../../pages/PrivacySettingsPage.jsx'
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage.jsx'

const CheckoutPage = lazy(() => import('../../pages/CheckoutPage.jsx'))
const CheckoutRegister = lazy(() => import('../../pages/CheckoutRegister.jsx'))
const CheckoutSuccess = lazy(() => import('../../pages/CheckoutSuccess.jsx'))

function CheckoutPageLazy() {
  return (
    <Suspense fallback={null}>
      <CheckoutPage />
    </Suspense>
  )
}

function CheckoutRegisterLazy() {
  return (
    <Suspense fallback={null}>
      <CheckoutRegister />
    </Suspense>
  )
}

function CheckoutSuccessLazy() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccess />
    </Suspense>
  )
}

/** Shared between client (`useRoutes`) and SSR (`useRoutes` inside `StaticRouter`). */
export const appRouteObjects = [
  { path: '/', element: <HomePage /> },
  { path: '/parents', element: <ParentPage /> },
  { path: '/schools', element: <SchoolsPage /> },
  { path: '/videos', element: <VideoLibraryPage /> },
  { path: '/privacy', element: <PrivacySettingsPage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
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
