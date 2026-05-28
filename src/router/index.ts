import type { RouteRecordRaw } from 'vue-router'
import { SUPPORTED_LOCALES } from '@/i18n'
import { landingPages } from '@/data/landingPages'

// 页面路由定义
const pages: RouteRecordRaw[] = [
  { path: '', name: 'home', component: () => import('@/views/HomePage.vue') },
  { path: 'jpeg-compress', name: 'jpeg-compress', component: () => import('@/views/JpegCompressPage.vue') },
  { path: 'png-compress', name: 'png-compress', component: () => import('@/views/PngCompressPage.vue') },
  { path: 'webp-convert', name: 'webp-convert', component: () => import('@/views/WebpConvertPage.vue') },
  { path: 'avif-convert', name: 'avif-convert', component: () => import('@/views/AvifConvertPage.vue') },
  { path: 'image-resize', name: 'image-resize', component: () => import('@/views/ImageResizePage.vue') },
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

// SSG 预渲染路由列表（含落地页）
const landingSlugs = landingPages.map(p => p.slug)
export const routePaths = SUPPORTED_LOCALES.flatMap(locale => [
  ...['', 'jpeg-compress', 'png-compress', 'webp-convert', 'avif-convert', 'image-resize'].map(p => `/${locale}/${p}`.replace(/\/$/, '') || `/${locale}`),
  ...landingSlugs.map(slug => `/${locale}/${slug}`)
])
