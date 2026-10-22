import { SHARE_PAGES } from '../seo/sharePages.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useHtmlLang } from '../hooks/useHtmlLang.js'
import { useNoIndex } from '../hooks/useNoIndex.js'

// The light teal behind the Flodesk form, so there is no flash of another colour while it loads.
const PAGE_STYLE = { position: 'fixed', inset: 0, background: '#d3e6e4' }
const FRAME_STYLE = { display: 'block', width: '100%', height: '100%', border: 0 }

/**
 * Share-link page (/free in Portuguese, /gratis in Spanish): the client's Flodesk sign-up form,
 * full-screen, on our own domain — see sharePages.js for why. The language comes from the path, not
 * from ?lang=, because the link preview (written at build time) is per path.
 */
export default function FreeSignupPage({ path }) {
  const page = SHARE_PAGES[path]
  useDocumentTitle(page.title)
  useHtmlLang(page.language)
  useNoIndex()

  return (
    <main style={PAGE_STYLE}>
      <iframe src={page.formUrl} title={page.frameTitle} style={FRAME_STYLE} />
    </main>
  )
}
