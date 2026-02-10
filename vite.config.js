import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/clubs/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/calendar': {
        target: 'https://alliance.forsyth.k12.ga.us',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/calendar/, '/fs/elements/249645'),
      },
      '/api/calendar-ics': {
        target: 'https://alliance.forsyth.k12.ga.us',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/calendar-ics/, '/fs/calendar-manager/events.ics'),
      },
    },
  },
})
