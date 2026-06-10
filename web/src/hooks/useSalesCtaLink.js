import { Link } from 'react-router-dom'
import {
  CHECKOUT_PATH,
  getPrelaunchWaitlistUrl,
  isPrelaunchSalesPage,
} from '../constants/salesPageConfig.js'
import { useLanguage } from './useLanguage.js'

const isExternalUrl = (href) => /^https?:\/\//i.test(href)

/**
 * Checkout CTA target: Flodesk waitlist (new tab) in prelaunch, /checkout at launch.
 */
export function useSalesCtaLink(overrideHref) {
  const { language } = useLanguage()
  const href =
    overrideHref ??
    (isPrelaunchSalesPage ? getPrelaunchWaitlistUrl(language) : CHECKOUT_PATH)
  const isExternal = isExternalUrl(href)

  const openCta = () => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const buttonLinkProps = isExternal
    ? { component: 'a', href, target: '_blank', rel: 'noopener noreferrer' }
    : { component: Link, to: href }

  return {
    href,
    isExternal,
    openCta,
    buttonLinkProps,
  }
}

export default useSalesCtaLink
