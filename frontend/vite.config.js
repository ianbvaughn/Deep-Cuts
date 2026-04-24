import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/deep-cuts-react",
  server: {
    host: '127.0.0.1',
    proxy: {
      '/spotify': {
        target: process.env.VITE_API_BASE_URL || 'http://127.0.0.1:10000',
        changeOrigin: true,
        credentials: true,
      }
    }
  }
})