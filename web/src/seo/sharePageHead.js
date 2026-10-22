import { NOINDEX_CONTENT } from './hiddenPageHead.js'
import { upsertMeta, upsertTitle } from './buildSeoHeadMarkup.js'
import { SHARE_IMAGE, SHARE_PAGES, isSharePagePath } from './sharePages.js'

/**
 * Build-time (prerender) head for a share-link page: its own title/description, Open Graph and
 * Twitter tags with an ABSOLUTE image URL (link previews ignore relative ones), and noindex.
 * Returns the HTML unchanged for any other path, and is safe to apply twice.
 */
export function applySharePageHead(html, pathname, appUrl) {
  if (!isSharePagePath(pathname)) return html

  const page = SHARE_PAGES[pathname]
  const base = String(appUrl || '').replace(/\/+$/, '')
  const pageUrl = `${base}${pathname}`
  const imageUrl = `${base}${SHARE_IMAGE.path}`

  let out = upsertTitle(html, page.title)
  out = upsertMeta(out, 'name', 'description', page.description)

  out = upsertMeta(out, 'property', 'og:type', 'website')
  out = upsertMeta(out, 'property', 'og:site_name', 'Rise Up Kids')
  out = upsertMeta(out, 'property', 'og:locale', page.ogLocale)
  out = upsertMeta(out, 'property', 'og:title', page.title)
  out = upsertMeta(out, 'property', 'og:description', page.description)
  out = upsertMeta(out, 'property', 'og:url', pageUrl)
  out = upsertMeta(out, 'property', 'og:image', imageUrl)
  out = upsertMeta(out, 'property', 'og:image:width', String(SHARE_IMAGE.width))
  out = upsertMeta(out, 'property', 'og:image:height', String(SHARE_IMAGE.height))
  out = upsertMeta(out, 'property', 'og:image:alt', page.imageAlt)

  out = upsertMeta(out, 'name', 'twitter:card', 'summary_large_image')
  out = upsertMeta(out, 'name', 'twitter:title', page.title)
  out = upsertMeta(out, 'name', 'twitter:description', page.description)
  out = upsertMeta(out, 'name', 'twitter:image', imageUrl)
  out = upsertMeta(out, 'name', 'twitter:image:alt', page.imageAlt)

  out = upsertMeta(out, 'name', 'robots', NOINDEX_CONTENT)
  return out
}
