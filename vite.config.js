import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  base: '/',  // Important for Vercel deployment
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
  port: 5174,
  strictPort: false,
  host: true,
  cors: true,
  proxy: {
    '/api': {
      target: 'https://devtinder-7-63h9.onrender.com',
      changeOrigin: true,
      secure: true
    }
  }
}
})