import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Customize your Coating',
        short_name: 'CYC',
        description:
          'Customize Your Coating is a an application that allows you to preview your Cerakote® color and gloss choices.',
        icons: [
          {
            src: '/icons/ic_launcher.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
