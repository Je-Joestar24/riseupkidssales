import { useTranslation } from '../../hooks/useTranslation.js'
import { isBunnyEmbedUrl, withPlayerParams } from '../../utils/experienceAccess.js'
import logoUrl from '../../assets/images/experience/logo.png'
import recipeCardsUrl from '../../assets/images/experience/recipe-cards.jpg'

const PLAY_ICON = (
  <svg width="16" height="18" viewBox="0 0 18 20" aria-hidden="true">
    <path d="M2 1 L17 10 L2 19 Z" fill="#fff" />
  </svg>
)

const RECIPE_ICON = (
  <svg width="22" height="24" viewBox="0 0 24 26" aria-hidden="true">
    <path d="M12 7c6 0 10 2 10 6 0 6-6 12-10 12S2 19 2 13c0-4 4-6 10-6z" fill="#fff" />
    <path d="M6 6l3 1.5L12 3l3 4.5L18 6l-2 3H8z" fill="#fff" />
  </svg>
)

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/riseupkids1',
    path: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2c-2.7 0-3 0-4.1.1C4.3 2.2 2.2 4.3 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.1 3.6 2.2 5.7 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.1 5.7-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1C21.8 4.3 19.7 2.2 16.1 2.1 15 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .1 2.6.1 3.9 1.4 4 4 .1 1 .1 1.4.1 4s0 3-.1 4c-.1 2.6-1.4 3.9-4 4-1 .1-1.4.1-4 .1s-3 0-4-.1c-2.6-.1-3.9-1.4-4-4-.1-1-.1-1.4-.1-4s0-3 .1-4c.1-2.6 1.4-3.9 4-4 1-.1 1.3-.1 4-.1z',
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.com/riseupkids1/',
    path: 'M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.5 2.1-4.5 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@riseup.kids',
    path: 'M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2-2.8V9a6.2 6.2 0 1 0 5.3 6.2V8.5a7.9 7.9 0 0 0 4.4 1.4V6.6a4.5 4.5 0 0 1-4.4-4.6z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@riseup.kids1',
    path: 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z',
  },
]

/** The unlocked page: welcome, the videos, the recipe, and the way to join. */
export default function ExperienceContent({ videos, recipeUrl, joinUrl }) {
  const { t } = useTranslation()
  const safeVideos = (videos || []).filter(isBunnyEmbedUrl)

  return (
    <>
      <section className="exp-band exp-hero">
        <div className="exp-wrap">
          <img className="exp-logo" src={logoUrl} alt="Rise Up Kids" />
          <h1>{t('experiencia.content.title')}</h1>
          <p className="exp-sub">
            <span>{t('experiencia.content.sub1')}</span>
            <br />
            <b>{t('experiencia.content.sub2')}</b>
          </p>
        </div>
      </section>

      <section className="exp-band exp-videos">
        <div className="exp-wrap">
          <h2>{t('experiencia.content.readyTitle')}</h2>
          <p>{t('experiencia.content.readyText')}</p>
          <div className="exp-gifts">
            <div className="exp-gift">
              <div className="exp-ic">{PLAY_ICON}</div>
              <span>{t('experiencia.content.giftVideo1')}</span>
            </div>
            <div className="exp-gift">
              <div className="exp-ic">{PLAY_ICON}</div>
              <span>{t('experiencia.content.giftVideo2')}</span>
            </div>
            <div className="exp-gift">
              <span className="exp-badge">{t('experiencia.content.free')}</span>
              <div className="exp-ic exp-teal">{RECIPE_ICON}</div>
              <span>{t('experiencia.content.giftRecipe')}</span>
            </div>
          </div>
        </div>
      </section>

      {safeVideos.map((src, index) => (
        <section key={`video-${index}`} className={`exp-vband${index > 0 ? ' exp-vband-next' : ''}`}>
          <div className="exp-wrap">
            <h3>
              <span>{index + 1}</span>
              <b>{`${t('experiencia.content.videoLabel')} ${index + 1}`}</b>
            </h3>
            <div className="exp-frame">
              <iframe
                src={withPlayerParams(src)}
                title={`${t('experiencia.content.videoLabel')} ${index + 1}`}
                loading="lazy"
                allowFullScreen
                allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>
      ))}

      <section className="exp-band exp-recipeband">
        <div className="exp-wrap">
          <img className="exp-cards" src={recipeCardsUrl} alt="" />
          {recipeUrl && (
            <a className="exp-btn" href={recipeUrl} target="_blank" rel="noopener noreferrer">
              {t('experiencia.content.recipeButton')}
            </a>
          )}
        </div>
      </section>

      <section className="exp-band exp-join">
        <div className="exp-wrap">
          <h2>{t('experiencia.content.joinTitle')}</h2>
          <p>{t('experiencia.content.joinText')}</p>
          <p className="exp-stars">
            <span>★</span> Reach for the stars <span>★</span>
          </p>
          {joinUrl && (
            <a className="exp-btn exp-gold" href={joinUrl}>
              {t('experiencia.content.joinButton')}
            </a>
          )}
        </div>
      </section>

      <footer className="exp-footer">
        <div className="exp-social">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={link.path} />
              </svg>
            </a>
          ))}
        </div>
        © Rise Up Kids
      </footer>
    </>
  )
}
