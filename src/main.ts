// src/main.ts — 应用入口
import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import './styles/main.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(createHead())

// 路由守卫：根据路径设置语言
router.beforeEach((to) => {
  const locale = to.path.split('/')[1]
  if (locale === 'en' || locale === 'zh') {
    i18n.global.locale.value = locale
  }
})

app.mount('#app')
