import { isPrelaunchSalesPage } from '../constants/salesPageConfig.js'
import { useTranslation } from './useTranslation.js'

/**
 * Invitation header/footer copy for the active sales page mode.
 */
export function useInvitationCopy() {
  const { t } = useTranslation()
  const base = isPrelaunchSalesPage ? 'invitation.prelaunch' : 'invitation.launch'

  return {
    isPrelaunch: isPrelaunchSalesPage,
    badge: t(`${base}.badge`),
    title: t(`${base}.title`),
    subtitle: isPrelaunchSalesPage ? t(`${base}.subtitle`) : null,
    subtitle1: !isPrelaunchSalesPage ? t(`${base}.subtitle1`) : null,
    subtitle2: !isPrelaunchSalesPage ? t(`${base}.subtitle2`) : null,
    footer: t(`${base}.footer`),
    submitLabel: t(
      isPrelaunchSalesPage ? 'invitation.form.submitPrelaunch' : 'invitation.form.submitLaunch'
    ),
  }
}

export default useInvitationCopy
