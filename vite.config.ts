import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'
import { resolve } from 'path'

const locales = ['en', 'zh']
const pages = ['', 'jpeg-compress', 'png-compress', 'webp-convert', 'avif-convert', 'image-resize']

// 长尾关键词落地页 slugs
const landingSlugs = [
  'compress-png-to-100kb', 'compress-png-to-200kb', 'compress-png-to-50kb', 'compress-png-to-20kb',
  'compress-jpeg-to-100kb', 'compress-jpeg-to-200kb', 'compress-jpeg-to-50kb', 'compress-jpeg-to-20kb',
  'compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-1mb', 'compress-image-to-500kb',
  'compress-jpeg-without-losing-quality', 'compress-png-without-losing-quality',
  'reduce-image-size-online-free', 'bulk-image-compressor',
  'convert-png-to-webp', 'convert-jpg-to-webp', 'convert-png-to-avif', 'convert-jpg-to-avif',
  'compress-image-for-email', 'compress-image-for-website', 'compress-photo-for-passport', 'compress-image-for-social-media',
  'resize-image-to-1024x768', 'resize-image-to-800x600', 'resize-image-for-instagram',
  'compress-jpg-to-100kb', 'compress-jpg-to-50kb', 'compress-jpg-to-200kb',
  'image-compressor-online-free', 'reduce-photo-size-kb', 'compress-webp-image',
  'png-to-jpg-converter', 'compress-image-to-2mb'
]

// 博客文章 slugs
const blogSlugs = [
  'how-to-compress-png', 'how-to-reduce-image-size', 'how-to-convert-webp-to-jpg',
  'best-image-compression-settings', 'jpeg-vs-png-vs-webp', 'how-to-compress-images-for-web',
  'what-is-webp-format', 'how-to-compress-jpeg-without-losing-quality',
  'image-optimization-for-seo', 'how-to-convert-png-to-webp'
]

const dynamicRoutes = locales.flatMap(l => [
  ...pages.map(p => `/${l}/${p}`.replace(/\/$/, '') || `/${l}`),
  ...landingSlugs.map(s => `/${l}/${s}`),
  ...blogSlugs.map(s => `/${l}/blog/${s}`)
])

export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://imagecompresstools.com',
      dynamicRoutes,
      readable: true,
      generateRobotsTxt: false
    })
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },
  preview: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify'
  }
})
