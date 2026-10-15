import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation.js'
import logoUrl from '../../assets/images/experience/logo.png'

const ERROR_KEYS = {
  invalidEmail: 'experiencia.gate.invalidEmail',
  verification: 'experiencia.gate.verificationFailed',
  unavailable: 'experiencia.gate.unavailable',
}

/**
 * The only thing a visitor sees until the email check passes: one email field. If the email isn't
 * a confirmed freebie subscriber, a sign-up prompt appears instead of any content.
 */
export default function ExperienceGate({ error, submitting, onSubmit, signupUrl }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!submitting) onSubmit(email)
  }

  const errorKey = ERROR_KEYS[error]

  return (
    <section className="exp-gate" aria-labelledby="exp-gate-title">
      <div className="exp-card">
        <img className="exp-logo" src={logoUrl} alt="Rise Up Kids" />
        <h2 id="exp-gate-title">{t('experiencia.gate.title')}</h2>
        <p>{t('experiencia.gate.text')}</p>

        <form onSubmit={handleSubmit} noValidate>
          <input
            id="experience-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={t('experiencia.gate.placeholder')}
            aria-label={t('experiencia.gate.placeholder')}
            aria-invalid={error === 'invalidEmail'}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="exp-btn" type="submit" disabled={submitting} aria-busy={submitting}>
            {submitting ? t('experiencia.gate.checking') : t('experiencia.gate.button')}
          </button>
        </form>

        {errorKey && (
          <p role="alert" className="exp-error-text">
            {t(errorKey)}
          </p>
        )}

        {error === 'notRegistered' && (
          <div className="exp-err" role="status">
            <p>{t('experiencia.notRegistered.title')}</p>
            {signupUrl && (
              <a className="exp-btn exp-gold" href={signupUrl}>
                {t('experiencia.notRegistered.button')}
              </a>
            )}
          </div>
        )}

        <p className="exp-hint">{t('experiencia.gate.hint')}</p>
      </div>
    </section>
  )
}
