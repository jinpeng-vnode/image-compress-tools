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
  'png-to-jpg-converter', 'compress-image-to-2mb',
  // 第二批长尾关键词
  'reduce-image-size-to-50kb', 'compress-photo-for-email', 'resize-image-to-passport-size',
  'compress-image-for-whatsapp', 'reduce-pdf-image-size', 'compress-gif-online',
  'compress-image-without-losing-quality', 'convert-heic-to-jpg', 'optimize-images-for-website',
  'compress-screenshot', 'reduce-image-resolution-online', 'compress-image-for-instagram',
  'image-size-reducer-in-kb', 'compress-multiple-images-at-once', 'photo-compressor-for-id-card',
  'compress-image-to-20kb'
]

// 博客页面 slugs
const blogSlugs = [
  'blog/how-to-compress-png', 'blog/reduce-image-size-online', 'blog/convert-webp-to-jpg',
  'blog/compress-jpeg-without-quality-loss', 'blog/best-image-optimization',
  'blog/reduce-photo-file-size', 'blog/compress-images-for-web', 'blog/png-vs-jpg-comparison',
  'blog/image-compression-guide', 'blog/batch-image-resize'
]

const dynamicRoutes = locales.flatMap(l => [
  ...pages.map(p => `/${l}/${p}`.replace(/\/$/, '') || `/${l}`),
  ...landingSlugs.map(s => `/${l}/${s}`),
  ...blogSlugs.map(s => `/${l}/${s}`)
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
