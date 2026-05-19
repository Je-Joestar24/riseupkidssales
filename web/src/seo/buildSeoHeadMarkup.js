import { getPageSeo, buildCanonicalUrl, buildHreflangUrls, buildVideoLibrarySchema } from './getPageSeo.js'
import { MARKETING_SEO_PATHS } from './pageSeoRoutes.js'

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
}

function upsertMeta(html, attr, key, content) {
  if (!content) return html
  const escaped = escapeHtml(content)
  const metaTag = `<meta ${attr}="${key}" content="${escaped}" />`
  const pattern = new RegExp(`<meta ${attr}="${key}"[^>]*>`, 'i')
  if (pattern.test(html)) {
    return html.replace(pattern, metaTag)
  }
  return html.replace('</head>', `  ${metaTag}\n</head>`)
}

function upsertTitle(html, title) {
  const escaped = escapeHtml(title)
  if (/<title>[^<]*<\/title>/i.test(html)) {
    return html.replace(/<title>[^<]*<\/title>/i, `<title>${escaped}</title>`)
  }
  return html.replace('</head>', `  <title>${escaped}</title>\n</head>`)
}

function removeTags(html, pattern) {
  return html.replace(pattern, '')
}

/**
 * Inject per-route SEO into the HTML template (build-time prerender).
 */
export function applySeoToHtml(html, { pathname, lang, seoKey, appUrl }) {
  if (!seoKey || !MARKETING_SEO_PATHS.includes(pathname)) {
    return html
  }

  const seo = getPageSeo(seoKey, lang)
  if (!seo) return html

  const canonical = buildCanonicalUrl(appUrl, pathname, lang)
  const hreflangLinks = buildHreflangUrls(appUrl, pathname)
  const xDefaultHref = buildCanonicalUrl(appUrl, pathname, 'pt')

  let out = upsertTitle(html, seo.title)
  out = upsertMeta(out, 'name', 'description', seo.description)
  out = upsertMeta(out, 'name', 'keywords', seo.keywords)

  out = upsertMeta(out, 'property', 'og:type', 'website')
  out = upsertMeta(out, 'property', 'og:site_name', 'Rise Up Kids')
  out = upsertMeta(out, 'property', 'og:title', seo.title)
  out = upsertMeta(out, 'property', 'og:description', seo.description)
  out = upsertMeta(out, 'property', 'og:url', canonical)

  out = upsertMeta(out, 'name', 'twitter:card', 'summary_large_image')
  out = upsertMeta(out, 'name', 'twitter:title', seo.title)
  out = upsertMeta(out, 'name', 'twitter:description', seo.description)

  out = removeTags(out, /<link rel="alternate" hreflang="[^"]+" href="[^"]+"\s*\/?>\s*/gi)
  out = removeTags(out, /<link rel="canonical" href="[^"]+"\s*\/?>\s*/gi)
  out = removeTags(out, /<script type="application\/ld\+json" data-ruk-seo="true">[\s\S]*?<\/script>\s*/gi)

  const linkTags = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    ...hreflangLinks.map(
      ({ lang: hrefLang, href }) =>
        `<link rel="alternate" hreflang="${hrefLang}" href="${escapeHtml(href)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(xDefaultHref)}" />`,
  ].join('\n  ')

  let jsonLd = ''
  if (seoKey === 'videos') {
    const schema = buildVideoLibrarySchema({ lang, pageUrl: canonical, appUrl })
    jsonLd = `<script type="application/ld+json" data-ruk-seo="true">${JSON.stringify(schema)}</script>`
  }

  out = out.replace(
    '</head>',
    `  ${linkTags}\n  ${jsonLd}\n</head>`,
  )

  out = out.replace(/<html lang="[^"]*">/i, `<html lang="${lang}">`)

  return out
}
