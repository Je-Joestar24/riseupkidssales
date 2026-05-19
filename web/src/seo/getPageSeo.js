import { translations } from '../i18n/translations.js'
import { VIDEO_LIBRARY_ITEMS } from '../config/videoLibraryVideos.js'

const getFromPath = (obj, path) =>
  path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj)

export function getPageSeo(seoKey, lang) {
  const locale = translations[lang] ?? translations.pt
  const seo = getFromPath(locale, `seo.${seoKey}`)
  if (!seo) return null

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ?? '',
  }
}

export function buildCanonicalUrl(appUrl, pathname, lang) {
  const base = (appUrl || '').replace(/\/+$/, '') || 'https://riseup.kids'
  const path = pathname === '/' ? '' : pathname
  const url = new URL(`${base}${path || '/'}`)
  if (lang && lang !== 'pt') {
    url.searchParams.set('lang', lang)
  }
  return url.toString()
}

export function buildHreflangUrls(appUrl, pathname) {
  const base = (appUrl || '').replace(/\/+$/, '') || 'https://riseup.kids'
  const path = pathname === '/' ? '' : pathname

  return ['pt', 'en', 'es'].map((lang) => {
    const url = new URL(`${base}${path || '/'}`)
    url.searchParams.set('lang', lang)
    return { lang, href: url.toString() }
  })
}

export function buildVideoLibrarySchema({ lang, pageUrl, appUrl }) {
  const locale = translations[lang] ?? translations.pt
  const pageName = getFromPath(locale, 'seo.videos.title') ?? 'Rise Up Kids Videos'
  const pageDescription = getFromPath(locale, 'seo.videos.description') ?? ''

  const itemListElement = VIDEO_LIBRARY_ITEMS.map((video, index) => {
    const name = getFromPath(locale, `videos.items.${video.id}.title`) ?? video.id
    const description = getFromPath(locale, `videos.items.${video.id}.description`) ?? name

    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoObject',
        name,
        description,
        thumbnailUrl: video.thumbnail,
        uploadDate: video.uploadDate ?? undefined,
        duration: video.durationIso ?? undefined,
        contentUrl: video.contentUrl ?? pageUrl,
        embedUrl: video.embedUrl ?? undefined,
      },
    }
  })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        inLanguage: lang,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Rise Up Kids',
          url: (appUrl || '').replace(/\/+$/, '/') || 'https://riseup.kids',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#videolist`,
        name: getFromPath(locale, 'videos.section.title') ?? pageName,
        description: pageDescription,
        numberOfItems: VIDEO_LIBRARY_ITEMS.length,
        itemListElement,
      },
    ],
  }
}
