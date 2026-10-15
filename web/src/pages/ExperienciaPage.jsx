import { useEffect } from 'react'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '../components/experience/experience.css'
import ExperienceGate from '../components/experience/ExperienceGate.jsx'
import ExperienceContent from '../components/experience/ExperienceContent.jsx'
import { useTranslation } from '../hooks/useTranslation.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useNoIndex } from '../hooks/useNoIndex.js'
import { useExperienceAccess } from '../hooks/useExperienceAccess.js'
import { pickSignupUrl } from '../utils/experienceAccess.js'
import logoUrl from '../assets/images/experience/logo.png'
import {
  EXPERIENCE_JOIN_URL,
  EXPERIENCE_RECIPE_URL,
  EXPERIENCE_SIGNUP_URL_ES,
  EXPERIENCE_SIGNUP_URL_PT,
} from '../constants/env.js'

const HTML_LANG = { pt: 'pt-BR', es: 'es', en: 'en' }

/** Keeps <html lang> in step with the page language, and puts it back on leaving. */
function useHtmlLang(language) {
  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = HTML_LANG[language] || 'pt-BR'
    return () => {
      document.documentElement.lang = previous
    }
  }, [language])
}

/**
 * Free Smoothie Experience (/experiencia, ?lang=es for Spanish). Hidden on purpose: not in any menu,
 * noindex, not in the sitemap. The videos are not part of this page's code — they are returned by
 * the server only after the visitor's email is confirmed as a freebie subscriber.
 */
export default function ExperienciaPage() {
  const { t, language } = useTranslation()
  useDocumentTitle(t('experiencia.pageTitle'))
  useHtmlLang(language)
  useNoIndex()

  const access = useExperienceAccess(language)
  const signupUrl = pickSignupUrl(language, {
    pt: EXPERIENCE_SIGNUP_URL_PT,
    es: EXPERIENCE_SIGNUP_URL_ES,
  })

  let body
  if (access.status === 'checking') {
    // Also what the server prerenders: just the logo on the cream background — nothing gated.
    body = (
      <section className="exp-gate" role="status">
        <img className="exp-logo" src={logoUrl} alt="Rise Up Kids" />
        <span className="exp-sr">{t('experiencia.loading')}</span>
      </section>
    )
  } else if (access.status === 'unlocked') {
    body = (
      <main aria-label={t('experiencia.mainAria')}>
        <ExperienceContent
          videos={access.videos}
          recipeUrl={EXPERIENCE_RECIPE_URL}
          joinUrl={EXPERIENCE_JOIN_URL}
        />
      </main>
    )
  } else {
    body = (
      <main aria-label={t('experiencia.mainAria')}>
        <ExperienceGate
          error={access.error}
          submitting={access.submitting}
          onSubmit={access.submit}
          signupUrl={signupUrl}
        />
      </main>
    )
  }

  return <div className="exp-page">{body}</div>
}
