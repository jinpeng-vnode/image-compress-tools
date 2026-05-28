<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ t('nav.webp') }}</h1>
    <FileDropZone ref="dropZone" />
    <CompressOptions :disabled="!dropZone?.file" :compressing="compressing" @compress="handleCompress">
      <div class="space-y-3">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.quality') }}: {{ options.quality }}</span>
          <input type="range" v-model.number="options.quality" min="0" max="100" class="w-48" />
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" :checked="options.lossless === 1" @change="options.lossless = ($event.target as HTMLInputElement).checked ? 1 : 0" />
          <span class="text-sm">{{ t('compress.lossless') }}</span>
        </label>
      </div>
    </CompressOptions>
    <CompressResult :result="result" :error="error" @download="downloadResult(outputName, 'image/webp')" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { useCompress } from '@/composables/useCompress'
import { DEFAULT_WEBP } from '@/codecs/types'
import FileDropZone from '@/components/compress/FileDropZone.vue'
import CompressOptions from '@/components/compress/CompressOptions.vue'
import CompressResult from '@/components/compress/CompressResult.vue'

const { t } = useI18n()
useSeo({ titleKey: 'nav.webp', descriptionKey: 'site.description', keywords: ['convert to webp', 'webp converter', 'webp online'], path: '/webp-convert' })

const dropZone = ref<InstanceType<typeof FileDropZone>>()
const options = reactive({ ...DEFAULT_WEBP })
const { compressing, result, error, compress, downloadResult } = useCompress()
const outputName = computed(() => (dropZone.value?.file?.name?.replace(/\.\w+$/, '') || 'image') + '.webp')

function handleCompress() {
  if (dropZone.value?.file) {
    compress(dropZone.value.file, { codec: 'webp', options })
  }
}
</script>
