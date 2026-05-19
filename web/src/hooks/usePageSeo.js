import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { APP_URL } from '../constants/env.js'
import { getSeoKeyForPath } from '../seo/pageSeoRoutes.js'
import {
  getPageSeo,
  buildCanonicalUrl,
  buildHreflangUrls,
  buildVideoLibrarySchema,
} from '../seo/getPageSeo.js'
import { useTranslation } from './useTranslation.js'

const SEO_JSON_LD_ID = 'ruk-seo-json-ld'

function upsertMetaTag(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLinkTag(rel, href, extra = {}) {
  const selector = Object.entries({ rel, ...extra })
    .map(([k, v]) => `[${k}="${v}"]`)
    .join('')
  let el = document.querySelector(`link${selector}`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.href = href
}

export function usePageSeo(seoKey) {
  const { language } = useTranslation()
  const { pathname } = useLocation()
  const resolvedKey = seoKey ?? getSeoKeyForPath(pathname)

  useEffect(() => {
    if (!resolvedKey) return

    const seo = getPageSeo(resolvedKey, language)
    if (!seo) return

    const appUrl = APP_URL || window.location.origin
    const canonical = buildCanonicalUrl(appUrl, pathname, language)

    document.title = seo.title
    document.documentElement.lang = language

    upsertMetaTag('name', 'description', seo.description)
    upsertMetaTag('name', 'keywords', seo.keywords)
    upsertMetaTag('property', 'og:title', seo.title)
    upsertMetaTag('property', 'og:description', seo.description)
    upsertMetaTag('property', 'og:url', canonical)
    upsertMetaTag('name', 'twitter:title', seo.title)
    upsertMetaTag('name', 'twitter:description', seo.description)

    upsertLinkTag('canonical', canonical)

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove())

    buildHreflangUrls(appUrl, pathname).forEach(({ lang, href }) => {
      upsertLinkTag('alternate', href, { hreflang: lang })
    })
    upsertLinkTag('alternate', buildCanonicalUrl(appUrl, pathname, 'pt'), { hreflang: 'x-default' })

    let jsonLdEl = document.getElementById(SEO_JSON_LD_ID)
    if (resolvedKey === 'videos') {
      const schema = buildVideoLibrarySchema({
        lang: language,
        pageUrl: canonical,
        appUrl,
      })
      if (!jsonLdEl) {
        jsonLdEl = document.createElement('script')
        jsonLdEl.type = 'application/ld+json'
        jsonLdEl.id = SEO_JSON_LD_ID
        jsonLdEl.setAttribute('data-ruk-seo', 'true')
        document.head.appendChild(jsonLdEl)
      }
      jsonLdEl.textContent = JSON.stringify(schema)
    } else if (jsonLdEl) {
      jsonLdEl.remove()
    }
  }, [resolvedKey, language, pathname])
}

export default usePageSeo
