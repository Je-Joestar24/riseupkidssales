import { useCallback, useEffect, useState } from 'react'
import { experienceLanguage, restoreAccess, submitEmail } from '../utils/experienceAccess.js'
import { restoreExperienceSession, verifyExperienceEmail } from '../services/experienceService.js'

/** localStorage can throw just by being touched (blocked cookies, some private modes). */
function getStorage() {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const CHECKING = { status: 'checking', videos: [], error: null }

/**
 * Gate state for the /experiencia page. It reads as 'checking' on the server AND the first client
 * render (so they match), then — in the browser only — asks the server whether this device already
 * passed the email check. The flow itself lives in utils/experienceAccess.js, where it is tested.
 *
 * The result is stored together with the language it was for, so switching the page language
 * goes back to 'checking' by itself (a Portuguese unlock never shows on the Spanish page).
 */
export function useExperienceAccess(language) {
  const lang = experienceLanguage(language)
  const [result, setResult] = useState({ lang: null, ...CHECKING })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    restoreAccess({ storage: getStorage(), language: lang, restore: restoreExperienceSession }).then(
      (outcome) => {
        if (!cancelled) {
          setResult({ lang, status: outcome.status, videos: outcome.videos || [], error: null })
        }
      }
    )

    return () => {
      cancelled = true
    }
  }, [lang])

  const submit = useCallback(
    async (email) => {
      setSubmitting(true)
      const outcome = await submitEmail({
        email,
        storage: getStorage(),
        language: lang,
        verify: verifyExperienceEmail,
      })
      setSubmitting(false)
      setResult({ lang, status: outcome.status, videos: outcome.videos || [], error: outcome.error || null })
    },
    [lang]
  )

  const current = result.lang === lang ? result : CHECKING
  return { status: current.status, videos: current.videos, error: current.error, submitting, submit }
}

export default useExperienceAccess
