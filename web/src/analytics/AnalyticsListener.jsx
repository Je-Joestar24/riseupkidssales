import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookieConsent } from '../hooks/useCookieConsent.js'
import { enableMetaPixel, trackPageView } from './metaPixel.js'

/**
 * Client-only, renders nothing.
 *
 * - Loads the Meta Pixel the first time consent is granted (enableMetaPixel also
 *   fires the initial PageView).
 * - Fires a PageView on every later SPA route change while consent stands.
 */
export default function AnalyticsListener() {
  const { granted } = useCookieConsent()
  const location = useLocation()
  const enabledRef = useRef(false)

  useEffect(() => {
    if (!granted) return
    if (!enabledRef.current) {
      enabledRef.current = true
      enableMetaPixel()
    } else {
      trackPageView()
    }
  }, [granted, location.pathname, location.search])

  return null
}
