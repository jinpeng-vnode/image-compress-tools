<template>
  <header class="bg-white shadow-sm border-b">
    <!-- 广告横幅位 -->
    <div class="bg-gray-100 text-center py-2 text-sm text-gray-500" id="ad-banner-top">
      <!-- 广告位预留 -->
    </div>
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <router-link :to="`/${locale}/`" class="flex items-center gap-2">
        <ImageIcon class="w-6 h-6 text-primary" />
        <span class="text-xl font-bold text-primary">{{ t('site.name') }}</span>
      </router-link>
      <nav class="hidden md:flex items-center gap-4 text-sm">
        <router-link :to="`/${locale}/jpeg-compress`" class="hover:text-primary">{{ t('nav.jpeg') }}</router-link>
        <router-link :to="`/${locale}/png-compress`" class="hover:text-primary">{{ t('nav.png') }}</router-link>
        <router-link :to="`/${locale}/webp-convert`" class="hover:text-primary">{{ t('nav.webp') }}</router-link>
        <router-link :to="`/${locale}/avif-convert`" class="hover:text-primary">{{ t('nav.avif') }}</router-link>
        <router-link :to="`/${locale}/image-resize`" class="hover:text-primary">{{ t('nav.resize') }}</router-link>
      </nav>
      <LangSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Image as ImageIcon } from 'lucide-vue-next'
import LangSwitcher from '@/components/common/LangSwitcher.vue'

const { t, locale } = useI18n()
</script>
