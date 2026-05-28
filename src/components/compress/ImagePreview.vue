<template>
  <div v-if="original && compressed" class="grid grid-cols-2 gap-4">
    <div class="space-y-1">
      <p class="text-xs text-gray-500 text-center">{{ t('compress.original') }}</p>
      <img :src="original" alt="Original" class="w-full rounded border" />
    </div>
    <div class="space-y-1">
      <p class="text-xs text-gray-500 text-center">{{ t('compress.compressed') }}</p>
      <img :src="compressed" alt="Compressed" class="w-full rounded border" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{ originalFile: File | null; compressedBlob: Blob | null }>()

const original = computed(() => props.originalFile ? URL.createObjectURL(props.originalFile) : null)
const compressed = computed(() => props.compressedBlob ? URL.createObjectURL(props.compressedBlob) : null)

onUnmounted(() => {
  if (original.value) URL.revokeObjectURL(original.value)
  if (compressed.value) URL.revokeObjectURL(compressed.value)
})
</script>
