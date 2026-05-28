import type { RouteRecordRaw } from 'vue-router'
import { SUPPORTED_LOCALES } from '@/i18n'
import { landingPages } from '@/data/landingPages'

// 博客路由定义
const blogPages: RouteRecordRaw[] = [
  { path: 'blog/how-to-compress-png', name: 'blog-how-to-compress-png', component: () => import('@/views/blog/HowToCompressPng.vue') },
  { path: 'blog/reduce-image-size-online', name: 'blog-reduce-image-size-online', component: () => import('@/views/blog/ReduceImageSizeOnline.vue') },
  { path: 'blog/convert-webp-to-jpg', name: 'blog-convert-webp-to-jpg', component: () => import('@/views/blog/ConvertWebpToJpg.vue') },
  { path: 'blog/compress-jpeg-without-quality-loss', name: 'blog-compress-jpeg-without-quality-loss', component: () => import('@/views/blog/CompressJpegWithoutQualityLoss.vue') },
  { path: 'blog/best-image-optimization', name: 'blog-best-image-optimization', component: () => import('@/views/blog/BestImageOptimization.vue') },
  { path: 'blog/reduce-photo-file-size', name: 'blog-reduce-photo-file-size', component: () => import('@/views/blog/ReducePhotoFileSize.vue') },
  { path: 'blog/compress-images-for-web', name: 'blog-compress-images-for-web', component: () => import('@/views/blog/CompressImagesForWeb.vue') },
  { path: 'blog/png-vs-jpg-comparison', name: 'blog-png-vs-jpg-comparison', component: () => import('@/views/blog/PngVsJpgComparison.vue') },
  { path: 'blog/image-compression-guide', name: 'blog-image-compression-guide', component: () => import('@/views/blog/ImageCompressionGuide.vue') },
  { path: 'blog/batch-image-resize', name: 'blog-batch-image-resize', component: () => import('@/views/blog/BatchImageResize.vue') },
]

// 页面路由定义
const pages: RouteRecordRaw[] = [
  { path: '', name: 'home', component: () => import('@/views/HomePage.vue') },
  { path: 'jpeg-compress', name: 'jpeg-compress', component: () => import('@/views/JpegCompressPage.vue') },
  { path: 'png-compress', name: 'png-compress', component: () => import('@/views/PngCompressPage.vue') },
  { path: 'webp-convert', name: 'webp-convert', component: () => import('@/views/WebpConvertPage.vue') },
  { path: 'avif-convert', name: 'avif-convert', component: () => import('@/views/AvifConvertPage.vue') },
  { path: 'image-resize', name: 'image-resize', component: () => import('@/views/ImageResizePage.vue') },
  ...blogPages,
  // 长尾关键词落地页（动态路由，必须放最后）
  { path: ':slug', name: 'landing', component: () => import('@/views/LandingPage.vue') }
]

// 为每种语言生成带前缀的路由
export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/en/' },
  ...SUPPORTED_LOCALES.map(locale => ({
    path: `/${locale}`,
    children: pages.map(p => ({
      ...p,
      name: `${locale}-${p.name}`,
      path: p.path
    }))
  }))
]

// SSG 预渲染路由列表（含落地页和博客）
const landingSlugs = landingPages.map(p => p.slug)
const blogSlugs = [
  'blog/how-to-compress-png', 'blog/reduce-image-size-online', 'blog/convert-webp-to-jpg',
  'blog/compress-jpeg-without-quality-loss', 'blog/best-image-optimization',
  'blog/reduce-photo-file-size', 'blog/compress-images-for-web', 'blog/png-vs-jpg-comparison',
  'blog/image-compression-guide', 'blog/batch-image-resize'
]
export const routePaths = SUPPORTED_LOCALES.flatMap(locale => [
  ...['', 'jpeg-compress', 'png-compress', 'webp-convert', 'avif-convert', 'image-resize'].map(p => `/${locale}/${p}`.replace(/\/$/, '') || `/${locale}`),
  ...landingSlugs.map(slug => `/${locale}/${slug}`),
  ...blogSlugs.map(slug => `/${locale}/${slug}`)
])
