import { useCallback, useEffect, useState } from 'react'
import {
  CONSENT_DENIED,
  CONSENT_GRANTED,
  getConsent,
  hasStoredConsent,
  setConsent,
  subscribeConsent,
} from '../analytics/cookieConsent.js'

/**
 * Reactive cookie-consent state.
 *
 * `ready` starts false on the server and on the first client render (the site is
 * pre-rendered), then a mount effect fills in the real values. The banner waits
 * for `ready` so a returning visitor never sees it flash.
 */
export function useCookieConsent() {
  const [state, setState] = useState({
    ready: false,
    decided: false,
    consent: CONSENT_DENIED,
  })

  useEffect(() => {
    setState({ ready: true, decided: hasStoredConsent(), consent: getConsent() })
    return subscribeConsent((next) => {
      setState({ ready: true, decided: true, consent: next })
    })
  }, [])

  const grant = useCallback(() => setConsent(CONSENT_GRANTED), [])
  const deny = useCallback(() => setConsent(CONSENT_DENIED), [])

  return {
    ...state,
    granted: state.consent === CONSENT_GRANTED,
    grant,
    deny,
  }
}

export default useCookieConsent
