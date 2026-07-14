/**
 * CloudFront Function (viewer-request) for riseup.kids
 *
 * Attach to your distribution's DEFAULT cache behavior.
 * Runtime: cloudfront-js-2.0
 *
 * Ensures /privacy and /terms serve static HTML from S3 BEFORE the SPA fallback.
 * Without this, custom error responses (403/404 → /index.html) load React on legal URLs
 * and cause hydration error #418 or reload loops.
 */
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // --- Legal pages (static HTML in S3: privacy/index.html, terms/index.html) ---
  if (uri === '/privacy' || uri === '/privacy/') {
    request.uri = '/privacy/index.html';
    return request;
  }
  if (uri === '/terms' || uri === '/terms/') {
    request.uri = '/terms/index.html';
    return request;
  }
  if (uri === '/privacy-policy' || uri === '/privacy-policy/') {
    request.uri = '/privacy/index.html';
    return request;
  }

  // --- SPA + SSG prerendered routes (parents/index.html, etc.) ---
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
