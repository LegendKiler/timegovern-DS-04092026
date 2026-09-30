import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

function forceFullReload() {
  return {
    name: 'force-full-reload',
    handleHotUpdate({ server }) {
      server.ws.send({ type: 'full-reload' })
      return []
    },
  }
}

export default defineConfig({
  plugins: [react(), forceFullReload()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/adsb': {
        target: 'https://api.adsb.lol',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/adsb/, ''),
      },
      '/api/octotrip': {
        target: 'https://mcp.octotrip.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/octotrip/, '/rental-cars/mcp'),
      },
      '/api/flights': {
        target: 'https://api.travelpayouts.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/flights/, ''),
      },
    },
  },
})