import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno del .env
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: { enabled: true },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          navigateFallback: 'index.html',
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true
        },
        manifest: {
          name: 'Bogart',
          short_name: 'Bogart',
          description: 'Bogart',
          theme_color: '#d29f53',
          display: 'standalone',
          display_override: ["window-controls-overlay", "standalone"],
          start_url: '/',
          icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
          ]
        }
      })
    ],

    // Proxy nivel raíz usando la variable de entorno
    server: {
      proxy: {
        "/api": {
        target: "https://cmsfe3xc5.bookcdn.net:8443",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
        "/llms.txt": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
        "/sitemap.xml": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
        "/robots.txt": { target: env.VITE_API_URL, changeOrigin: true }
      }
    }
  }
})
