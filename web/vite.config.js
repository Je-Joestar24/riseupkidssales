import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devPort = parseInt(env.VITE_SALES_DEV_SERVER_PORT || env.VITE_DEV_SERVER_PORT || '4175', 10)
  const apiUrl = env.VITE_API_URL || 'http://localhost:5000'
  const proxyTarget = apiUrl.replace(/\/api\/?$/, '').replace(/\/+$/, '') || apiUrl

  return {
    plugins: [react()],
    server: {
      port: devPort,
      open: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/uploads': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
    build: {
      assetsDir: 'assets',
      sourcemap: false,
    },
    preview: {
      port: devPort,
      open: true,
    },
  }
})

