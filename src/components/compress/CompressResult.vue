<template>
  <div v-if="result" class="p-4 bg-green-50 rounded-lg space-y-3">
    <div class="flex justify-between text-sm">
      <span>{{ t('compress.original') }}: {{ formatSize(result.originalSize) }}</span>
      <span>{{ t('compress.compressed') }}: {{ formatSize(result.compressedSize) }}</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div class="bg-accent h-2 rounded-full" :style="{ width: `${savings}%` }"></div>
    </div>
    <p class="text-accent font-medium text-center">{{ t('compress.savings', { percent: savings }) }}</p>
    <button
      class="w-full py-2 px-4 bg-accent text-white rounded-lg hover:opacity-90"
      @click="$emit('download')"
    >
      {{ t('compress.download') }}
    </button>
  </div>
  <div v-if="error" class="p-4 bg-red-50 rounded-lg">
    <p class="text-red-600 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
  result: { originalSize: number; compressedSize: number } | null
  error: string | null
}>()
defineEmits<{ download: [] }>()

const savings = computed(() => {
  if (!props.result) return 0
  return Math.round((1 - props.result.compressedSize / props.result.originalSize) * 100)
})

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}
</script>
