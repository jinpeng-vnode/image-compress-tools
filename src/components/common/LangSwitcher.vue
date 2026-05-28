<template>
  <div class="flex items-center gap-1 text-sm">
    <button
      v-for="lang in SUPPORTED_LOCALES"
      :key="lang"
      :class="['px-2 py-1 rounded', locale === lang ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100']"
      @click="switchLocale(lang)"
    >
      {{ lang === 'en' ? 'EN' : '中文' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()

function switchLocale(lang: SupportedLocale) {
  const currentPath = route.path.replace(/^\/(en|zh)/, '')
  locale.value = lang
  router.push(`/${lang}${currentPath}`)
}
</script>
