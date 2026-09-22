/**
 * QA-only: ?previewConfirmation=1 on the parents or schools page shows the post-submission
 * confirmation message immediately, without needing a working backend or a configured reCAPTCHA
 * key to review the copy, translations, or styling. The param is never present in normal use, so
 * this has no effect on a real visitor's flow.
 */
export function shouldPreviewConfirmation(search) {
  return new URLSearchParams(search || '').get('previewConfirmation') === '1'
}
