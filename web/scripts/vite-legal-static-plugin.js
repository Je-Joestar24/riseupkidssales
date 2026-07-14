/**
 * Serves /privacy and /terms as static HTML in Vite dev (matches production _redirects).
 */
export function legalStaticPagesPlugin() {
  const middleware = (req, _res, next) => {
    const url = req.url?.split('?')[0] ?? '';
    const map = {
      '/privacy': '/privacy/index.html',
      '/privacy/': '/privacy/index.html',
      '/terms': '/terms/index.html',
      '/terms/': '/terms/index.html',
    };
    if (map[url]) {
      req.url = map[url];
    }
    next();
  };

  return {
    name: 'legal-static-pages',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
