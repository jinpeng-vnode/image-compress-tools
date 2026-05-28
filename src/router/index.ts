// src/router/index.ts — 路由定义
import type { RouteRecordRaw } from 'vue-router'
import { SUPPORTED_LOCALES } from '@/i18n'

// 页面路由定义
const pages: RouteRecordRaw[] = [
  { path: '', name: 'home', component: () => import('@/views/HomePage.vue') },
  { path: 'jpeg-compress', name: 'jpeg-compress', component: () => import('@/views/JpegCompressPage.vue') },
  { path: 'png-compress', name: 'png-compress', component: () => import('@/views/PngCompressPage.vue') },
  { path: 'webp-convert', name: 'webp-convert', component: () => import('@/views/WebpConvertPage.vue') },
  { path: 'avif-convert', name: 'avif-convert', component: () => import('@/views/AvifConvertPage.vue') },
  { path: 'image-resize', name: 'image-resize', component: () => import('@/views/ImageResizePage.vue') }
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

// SSG 预渲染路由列表
export const routePaths = SUPPORTED_LOCALES.flatMap(locale =>
  pages.map(p => `/${locale}/${p.path}`.replace(/\/$/, '') || `/${locale}`)
)
