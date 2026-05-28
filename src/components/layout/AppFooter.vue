<template>
  <footer class="bg-gray-50 border-t mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
      <p>{{ t('footer.powered') }}</p>
      <p class="mt-1">{{ t('footer.privacy') }}</p>
    </div>
    <!-- 底部广告位 -->
    <div class="bg-gray-100 text-center py-3" id="ad-banner-bottom">
      <!-- 广告位预留 -->
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
