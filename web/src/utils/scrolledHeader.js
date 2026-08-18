import { NAV_HEADER_SCROLL_THRESHOLD_PX } from '../config/constants.js'

export function isHeaderScrolled(scrollY, thresholdPx = NAV_HEADER_SCROLL_THRESHOLD_PX) {
  return Math.max(0, Number(scrollY) || 0) > thresholdPx
}
