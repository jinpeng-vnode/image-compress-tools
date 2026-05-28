<template>
  <div v-if="compressing" class="space-y-2">
    <div class="flex justify-between text-sm text-gray-600">
      <span>{{ t('compress.processing') }}</span>
      <span>{{ progress }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-primary h-2 rounded-full transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{ compressing: boolean; progress: number }>()
</script>
