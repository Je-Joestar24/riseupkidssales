/**
 * Pages that exist for a specific audience and must stay out of Google (e.g. the free Smoothie
 * Experience at /experiencia). They are deliberately NOT in SEO_ROUTE_MAP (no canonical or hreflang
 * is advertised), NOT in the sitemap, and NOT linked from any menu.
 *
 * robots.txt is intentionally left alone: a Disallow would stop crawlers from fetching the page,
 * so they would never see the noindex below — and it would also publish the hidden path.
 */
export const NOINDEX_CONTENT = 'noindex, nofollow, noarchive'

export const HIDDEN_PAGE_TITLES = {
  '/experiencia': 'Experiência Rise Up Kids',
}

export function isHiddenPagePath(pathname) {
  return Object.prototype.hasOwnProperty.call(HIDDEN_PAGE_TITLES, pathname)
}

/**
 * Build-time (prerender) head for a hidden page: a neutral title and the robots noindex tag.
 * Returns the HTML unchanged for any other path, and is safe to apply twice.
 */
export function applyHiddenPageHead(html, pathname) {
  if (!isHiddenPagePath(pathname)) return html

  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${HIDDEN_PAGE_TITLES[pathname]}</title>`)

  if (!/<meta\s+name="robots"/i.test(out)) {
    out = out.replace('</head>', `<meta name="robots" content="${NOINDEX_CONTENT}" />\n</head>`)
  }
  return out
}
