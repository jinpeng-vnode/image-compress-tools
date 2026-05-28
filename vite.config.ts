import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'
import { resolve } from 'path'

const locales = ['en', 'zh']
const pages = ['', 'jpeg-compress', 'png-compress', 'webp-convert', 'avif-convert', 'image-resize']
const dynamicRoutes = locales.flatMap(l => pages.map(p => `/${l}/${p}`.replace(/\/$/, '') || `/${l}`))

export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://imgcompress.tools',
      dynamicRoutes,
      readable: true
    })
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify'
  }
})
