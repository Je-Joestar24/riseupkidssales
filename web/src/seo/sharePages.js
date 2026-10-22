/**
 * Share-link pages: small branded pages on riseup.kids that embed a Flodesk sign-up form, so the
 * client can send our own link (whose WhatsApp / Instagram preview says Rise Up Kids) instead of the
 * Flodesk link (whose preview says Flodesk).
 *
 * Crawlers behind link previews do not run JavaScript, so the preview text and image are written into
 * the prerendered HTML here. Prerender writes one page per path in one language, which is why Spanish
 * has its own path (/gratis) rather than a ?lang= switch: a ?lang=es link would preview in Portuguese.
 *
 * These pages are deliberately NOT in SEO_ROUTE_MAP, the sitemap or any menu, and are noindex: they
 * are links to hand out, not pages to rank.
 */
export const SHARE_IMAGE = {
  path: '/share/free-share.jpg',
  width: 1200,
  height: 630,
}

export const SHARE_PAGES = {
  '/free': {
    language: 'pt',
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    formUrl: 'https://riseupkids.myflodesk.com/stjjhtqnlz',
    title: 'Experiência Gratuita Rise Up Kids – Strawberry Banana Smoothie',
    description: 'Experiencie o Inglês. Participe desta Experiência Gratuita!',
    imageAlt: 'Rise Up Kids – receita Strawberry Banana Smoothie',
    frameTitle: 'Cadastro da Experiência Gratuita Rise Up Kids',
  },
  '/gratis': {
    language: 'es',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    formUrl: 'https://riseupkids.myflodesk.com/dftjzwem69',
    title: 'Experiencia Gratuita Rise Up Kids – Strawberry Banana Smoothie',
    description: 'Vive el inglés. ¡Participa en esta experiencia gratuita!',
    imageAlt: 'Rise Up Kids – receta Strawberry Banana Smoothie',
    frameTitle: 'Registro de la Experiencia Gratuita Rise Up Kids',
  },
}

export function isSharePagePath(pathname) {
  return Object.prototype.hasOwnProperty.call(SHARE_PAGES, pathname)
}
