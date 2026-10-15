import { useSyncExternalStore } from 'react'
import { shouldPreviewConfirmation } from '../utils/leadConfirmationPreview.js'

const subscribeToNothing = () => () => {}

/**
 * QA-only (?previewConfirmation=1): true when the confirmation page should be shown without a real
 * submission. Reads the URL only in the browser — during the server-side prerender (no `window`)
 * it is always false, so the build works and the static HTML never contains the preview.
 */
export function usePreviewConfirmation() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => shouldPreviewConfirmation(window.location.search),
    () => false
  )
}

export default usePreviewConfirmation
