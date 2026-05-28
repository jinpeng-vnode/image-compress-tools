<template>
  <div class="space-y-8">
    <div class="text-center space-y-3">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('home.title') }}</h1>
      <p class="text-gray-600">{{ t('home.subtitle') }}</p>
    </div>
    <h2 class="text-xl font-semibold text-center">{{ t('home.features') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <router-link
        v-for="tool in tools"
        :key="tool.path"
        :to="`/${locale}/${tool.path}`"
        class="p-6 border rounded-lg hover:shadow-md hover:border-primary transition-all"
      >
        <component :is="tool.icon" class="w-8 h-8 mb-2 text-primary" />
        <h3 class="font-semibold">{{ t(tool.nameKey) }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ tool.desc }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { Camera, Image, Globe, Sparkles, Maximize } from 'lucide-vue-next'

const { t, locale } = useI18n()

useSeo({
  titleKey: 'home.title',
  descriptionKey: 'home.subtitle',
  keywords: ['image compress online free', 'compress images', 'reduce image size'],
  path: '/'
})

const tools = [
  { path: 'jpeg-compress', icon: Camera, nameKey: 'nav.jpeg', desc: 'MozJPEG encoder' },
  { path: 'png-compress', icon: Image, nameKey: 'nav.png', desc: 'OxiPNG optimizer' },
  { path: 'webp-convert', icon: Globe, nameKey: 'nav.webp', desc: 'WebP converter' },
  { path: 'avif-convert', icon: Sparkles, nameKey: 'nav.avif', desc: 'AVIF converter' },
  { path: 'image-resize', icon: Maximize, nameKey: 'nav.resize', desc: 'Image resizer' }
]
</script>
