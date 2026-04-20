import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),

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
