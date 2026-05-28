import type { RouteRecordRaw } from 'vue-router'
import { SUPPORTED_LOCALES } from '@/i18n'
import { landingPages } from '@/data/landingPages'

// 博客文章路由
export const blogRoutes: RouteRecordRaw[] = [
  { path: 'how-to-compress-png', name: 'blog-compress-png', component: () => import('@/views/blog/HowToCompressPng.vue') },
  { path: 'how-to-reduce-image-size', name: 'blog-reduce-image-size', component: () => import('@/views/blog/HowToReduceImageSize.vue') },
  { path: 'how-to-convert-webp-to-jpg', name: 'blog-webp-to-jpg', component: () => import('@/views/blog/HowToConvertWebpToJpg.vue') },
  { path: 'best-image-compression-settings', name: 'blog-compression-settings', component: () => import('@/views/blog/BestImageCompressionSettings.vue') },
  { path: 'jpeg-vs-png-vs-webp', name: 'blog-format-comparison', component: () => import('@/views/blog/JpegVsPngVsWebp.vue') },
  { path: 'how-to-compress-images-for-web', name: 'blog-compress-for-web', component: () => import('@/views/blog/HowToCompressImagesForWeb.vue') },
  { path: 'what-is-webp-format', name: 'blog-what-is-webp', component: () => import('@/views/blog/WhatIsWebpFormat.vue') },
  { path: 'how-to-compress-jpeg-without-losing-quality', name: 'blog-compress-jpeg', component: () => import('@/views/blog/HowToCompressJpeg.vue') },
  { path: 'image-optimization-for-seo', name: 'blog-image-seo', component: () => import('@/views/blog/ImageOptimizationForSeo.vue') },
  { path: 'how-to-convert-png-to-webp', name: 'blog-png-to-webp', component: () => import('@/views/blog/HowToConvertPngToWebp.vue') },
]

export const blogSlugs = blogRoutes.map(r => r.path as string)

// 页面路由定义
const pages: RouteRecordRaw[] = [
  { path: '', name: 'home', component: () => import('@/views/HomePage.vue') },
  { path: 'jpeg-compress', name: 'jpeg-compress', component: () => import('@/views/JpegCompressPage.vue') },
  { path: 'png-compress', name: 'png-compress', component: () => import('@/views/PngCompressPage.vue') },
  { path: 'webp-convert', name: 'webp-convert', component: () => import('@/views/WebpConvertPage.vue') },
  { path: 'avif-convert', name: 'avif-convert', component: () => import('@/views/AvifConvertPage.vue') },
  { path: 'image-resize', name: 'image-resize', component: () => import('@/views/ImageResizePage.vue') },
  // 博客文章
  { path: 'blog', children: blogRoutes },
  // 长尾关键词落地页（动态路由）
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

// SSG 预渲染路由列表（含落地页 + 博客）
const landingSlugs = landingPages.map(p => p.slug)
export const routePaths = SUPPORTED_LOCALES.flatMap(locale => [
  ...['', 'jpeg-compress', 'png-compress', 'webp-convert', 'avif-convert', 'image-resize'].map(p => `/${locale}/${p}`.replace(/\/$/, '') || `/${locale}`),
  ...landingSlugs.map(slug => `/${locale}/${slug}`),
  ...blogSlugs.map(slug => `/${locale}/blog/${slug}`)
])
