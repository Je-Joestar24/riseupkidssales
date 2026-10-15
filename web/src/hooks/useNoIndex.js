import { useEffect } from 'react'
import { NOINDEX_CONTENT } from '../seo/hiddenPageHead.js'

/**
 * Keeps the current page out of search results for as long as it's mounted. The prerendered HTML
 * already carries the tag for crawlers; this covers a visitor navigating here inside the app, and
 * removes it again on leaving so a normal page opened afterwards is never left noindexed.
 */
export function useNoIndex() {
  useEffect(() => {
    let tag = document.querySelector('meta[name="robots"]')
    const created = !tag
    const previous = tag ? tag.getAttribute('content') : null

    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'robots')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', NOINDEX_CONTENT)

    return () => {
      // A tag that was already noindex came from the prerendered HTML of THIS page, so it must not
      // outlive the page when the visitor navigates elsewhere inside the app.
      if (created || previous === NOINDEX_CONTENT) tag.remove()
      else if (previous !== null) tag.setAttribute('content', previous)
    }
  }, [])
}

export default useNoIndex
