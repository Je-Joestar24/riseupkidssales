/**
 * Meta (Facebook) Pixel loader — consent-gated.
 *
 * The Pixel script is deliberately NOT in index.html. It is injected here only
 * after the visitor grants cookie consent (see cookieConsent.js +
 * CookieConsentBanner.jsx). Until then nothing loads and no Facebook cookies
 * are set.
 *
 * Pixel ID comes from VITE_META_PIXEL_ID at build time; with no ID configured
 * every function below is a no-op.
 */

const PIXEL_ID = String(import.meta.env?.VITE_META_PIXEL_ID || '').trim()
// Never load on the local dev server — it would send dev traffic to the real
// Pixel. Staging/production are production builds, so the Pixel runs there.
const ENABLED = PIXEL_ID.length > 0 && !import.meta.env?.DEV

let scriptInjected = false
let initialised = false

export function isMetaPixelConfigured() {
  return ENABLED
}

function hasDom() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * Inject Meta's standard fbq bootstrap stub + async script tag (once).
 * This is the official snippet minus the immediate init/track calls, which we
 * make explicitly in enableMetaPixel() so loading stays tied to consent.
 */
function injectPixelScript() {
  if (scriptInjected || !hasDom()) return
  scriptInjected = true
  ;(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
}

/**
 * Load + initialise the Pixel and fire the first PageView. Safe to call
 * repeatedly; only the first call has an effect. No-op without a pixel ID.
 */
export function enableMetaPixel() {
  if (!isMetaPixelConfigured() || !hasDom()) return
  injectPixelScript()
  if (initialised) return
  initialised = true
  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

export function isMetaPixelActive() {
  return initialised
}

/** Fire a PageView for an SPA route change (after the Pixel is initialised). */
export function trackPageView() {
  if (!initialised || !hasDom() || typeof window.fbq !== 'function') return
  window.fbq('track', 'PageView')
}

/** Fire a standard Meta event (Lead, InitiateCheckout, Purchase, ...). */
export function trackMetaEvent(name, params) {
  if (!initialised || !hasDom() || typeof window.fbq !== 'function') return
  if (params && Object.keys(params).length > 0) {
    window.fbq('track', name, params)
  } else {
    window.fbq('track', name)
  }
}
