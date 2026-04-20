import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
  proxy: {
    "/api": {
    target: "https://cmsfe3xc5.bookcdn.net:8443",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, "")
  },
  }
}
})


{/* 
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  }
})
*/}