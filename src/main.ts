// src/main.ts — 应用入口（vite-ssg）
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, routePaths } from './router'
import { i18n } from './i18n'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: '/'
  },
  ({ app, router }) => {
    app.use(i18n)

    // 路由守卫：根据路径设置语言
    router.beforeEach((to) => {
      const locale = to.path.split('/')[1]
      if (locale === 'en' || locale === 'zh') {
        i18n.global.locale.value = locale
      }
    })
  }
)
