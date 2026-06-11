import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  CHECKOUT_PATH,
  FOUNDER_WAITLIST_SECTION_ID,
  isPrelaunchSalesPage,
} from '../constants/salesPageConfig.js'

const isExternalUrl = (href) => /^https?:\/\//i.test(href)

export function scrollToInvitationSection() {
  const section = document.getElementById(FOUNDER_WAITLIST_SECTION_ID)
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Prelaunch: scroll to invitation section. Launch: navigate to /checkout.
 */
export function useSalesCtaLink(overrideHref) {
  const scrollsToInvitation = isPrelaunchSalesPage && !overrideHref

  const scrollToInvitation = useCallback(() => {
    scrollToInvitationSection()
  }, [])

  const buttonLinkProps = scrollsToInvitation
    ? { type: 'button', onClick: scrollToInvitation }
    : isExternalUrl(overrideHref)
      ? {
          component: 'a',
          href: overrideHref,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : { component: Link, to: overrideHref ?? CHECKOUT_PATH }

  return {
    scrollsToInvitation,
    scrollToInvitation,
    buttonLinkProps,
  }
}

export default useSalesCtaLink
