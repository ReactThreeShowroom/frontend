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
        name: 'Kote Masters',
        short_name: 'KM',
        theme_color: '#ffffff',
        description:
          'KoteMaster is a an application that allows you to preview your Cerakote® color and gloss choices.',
        icons: [
          {
            src: '/icons/KM-Only-Square-WBG-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/KM-Only-Square-WBG-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
