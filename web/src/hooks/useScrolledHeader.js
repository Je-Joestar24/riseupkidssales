import { useEffect, useState } from 'react'
import { NAV_HEADER_SCROLL_THRESHOLD_PX } from '../config/constants.js'
import { isHeaderScrolled } from '../utils/scrolledHeader.js'

function readScrollY() {
  if (typeof window === 'undefined') return 0
  const viewportY = typeof window.visualViewport?.pageTop === 'number' ? window.visualViewport.pageTop : 0
  return Math.max(0, window.scrollY || document.documentElement.scrollTop || viewportY || 0)
}

export function useScrolledHeader(thresholdPx = NAV_HEADER_SCROLL_THRESHOLD_PX) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let raf = 0
    const sync = () => {
      raf = 0
      setScrolled(isHeaderScrolled(readScrollY(), thresholdPx))
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(sync)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchend', onScroll, { passive: true })
    window.visualViewport?.addEventListener('scroll', onScroll, { passive: true })
    window.visualViewport?.addEventListener('resize', onScroll, { passive: true })
    sync()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchend', onScroll)
      window.visualViewport?.removeEventListener('scroll', onScroll)
      window.visualViewport?.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [thresholdPx])

  return scrolled
}

export default useScrolledHeader
