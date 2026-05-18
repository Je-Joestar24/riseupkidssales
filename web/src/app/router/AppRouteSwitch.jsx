import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import HomePageBackButton from '../../components/common/HomePageBackButton.jsx'
import HomePage from '../../pages/HomePage.jsx'
import PrivacySettingsPage from '../../pages/PrivacySettingsPage.jsx'
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage.jsx'

const ParentPage = lazy(() => import('../../pages/ParentPage.jsx'))
const SchoolsPage = lazy(() => import('../../pages/SchoolsPage.jsx'))
const VideoLibraryPage = lazy(() => import('../../pages/VideoLibrary.jsx'))

const CheckoutPage = lazy(() => import('../../pages/CheckoutPage.jsx'))
const CheckoutRegister = lazy(() => import('../../pages/CheckoutRegister.jsx'))
const CheckoutSuccess = lazy(() => import('../../pages/CheckoutSuccess.jsx'))

function ParentPageLazy() {
  return (
    <Suspense fallback={null}>
      <ParentPage />
    </Suspense>
  )
}

function SchoolsPageLazy() {
  return (
    <Suspense fallback={null}>
      <SchoolsPage />
    </Suspense>
  )
}

function VideoLibraryPageLazy() {
  return (
    <Suspense fallback={null}>
      <VideoLibraryPage />
    </Suspense>
  )
}

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
  { path: '/parents', element: <ParentPageLazy /> },
  { path: '/schools', element: <SchoolsPageLazy /> },
  { path: '/videos', element: <VideoLibraryPageLazy /> },
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
      {routeElement}
      <HomePageBackButton />
    </>
  )
}
