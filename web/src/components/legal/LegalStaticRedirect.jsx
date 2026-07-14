import { useEffect } from 'react'

/**
 * Forces a full page load to the static legal HTML (no React on those URLs).
 * Prevents SPA client routing from hitting the catch-all when users click in-app links.
 */
export default function LegalStaticRedirect({ page }) {
  useEffect(() => {
    window.location.replace(`/${page}/`)
  }, [page])

  return null
}
