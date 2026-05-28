<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ t('nav.jpeg') }}</h1>
    <FileDropZone ref="dropZone" />
    <CompressOptions :disabled="!dropZone?.file" :compressing="compressing" @compress="handleCompress">
      <div class="space-y-3">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.quality') }}: {{ options.quality }}</span>
          <input type="range" v-model.number="options.quality" min="1" max="100" class="w-48" />
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="options.progressive" />
          <span class="text-sm">{{ t('compress.progressive') }}</span>
        </label>
      </div>
    </CompressOptions>
    <CompressResult :result="result" :error="error" @download="downloadResult(outputName, 'image/jpeg')" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { useCompress } from '@/composables/useCompress'
import { DEFAULT_MOZJPEG } from '@/codecs/types'
import FileDropZone from '@/components/compress/FileDropZone.vue'
import CompressOptions from '@/components/compress/CompressOptions.vue'
import CompressResult from '@/components/compress/CompressResult.vue'

const { t } = useI18n()
useSeo({ titleKey: 'nav.jpeg', descriptionKey: 'site.description', keywords: ['compress jpeg online', 'reduce jpg size', 'mozjpeg'], path: '/jpeg-compress' })

const dropZone = ref<InstanceType<typeof FileDropZone>>()
const options = reactive({ ...DEFAULT_MOZJPEG })
const { compressing, result, error, compress, downloadResult } = useCompress()
const outputName = computed(() => (dropZone.value?.file?.name?.replace(/\.\w+$/, '') || 'image') + '_compressed.jpg')

function handleCompress() {
  if (dropZone.value?.file) {
    compress(dropZone.value.file, { codec: 'mozjpeg', options })
  }
}
</script>
