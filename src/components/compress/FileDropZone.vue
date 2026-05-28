<template>
  <div
    :class="['border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
      isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary']"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @click="triggerInput"
  >
    <div v-if="!preview" class="space-y-2">
      <UploadCloud class="w-10 h-10 mx-auto text-gray-400" />
      <p class="text-gray-600">{{ t('compress.upload') }}</p>
      <p class="text-xs text-gray-400">{{ t('compress.uploadHint') }}</p>
    </div>
    <div v-else class="space-y-2">
      <img :src="preview" alt="Preview" class="max-h-48 mx-auto rounded" />
      <p class="text-sm text-gray-500">{{ file?.name }} ({{ formatSize(file?.size || 0) }})</p>
    </div>
    <input ref="inputRef" type="file" accept="image/jpeg,image/png,image/webp,image/avif" class="hidden" @change="onFileInput" />
  </div>
  <p v-if="error" class="text-red-500 text-sm mt-2">{{ t(`compress.error.${error}`) }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { UploadCloud } from 'lucide-vue-next'
import { useFileUpload } from '@/composables/useFileUpload'

const { t } = useI18n()
const { file, preview, error, isDragging, onDrop, onDragOver, onDragLeave, onFileInput } = useFileUpload()
const inputRef = ref<HTMLInputElement>()

function triggerInput() { inputRef.value?.click() }
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

defineExpose({ file, preview, error })
</script>
