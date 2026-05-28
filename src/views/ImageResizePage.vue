<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ t('nav.resize') }}</h1>
    <FileDropZone ref="dropZone" />
    <CompressOptions :disabled="!dropZone?.file" :compressing="compressing" button-key="compress.resize" @compress="handleCompress">
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <label class="space-y-1">
            <span class="text-sm">{{ t('compress.width') }}</span>
            <input type="number" v-model.number="options.width" min="1" class="w-full border rounded px-2 py-1 text-sm" />
          </label>
          <label class="space-y-1">
            <span class="text-sm">{{ t('compress.height') }}</span>
            <input type="number" v-model.number="options.height" min="1" class="w-full border rounded px-2 py-1 text-sm" />
          </label>
        </div>
        <label class="space-y-1">
          <span class="text-sm">{{ t('compress.method') }}</span>
          <select v-model="options.method" class="w-full border rounded px-2 py-1 text-sm">
            <option value="lanczos3">Lanczos3</option>
            <option value="catrom">CatmullRom</option>
            <option value="mitchell">Mitchell</option>
            <option value="triangle">Triangle</option>
          </select>
        </label>
      </div>
    </CompressOptions>
    <CompressResult :result="result" :error="error" @download="downloadResult(outputName, 'image/png')" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { useCompress } from '@/composables/useCompress'
import { DEFAULT_RESIZE } from '@/codecs/types'
import FileDropZone from '@/components/compress/FileDropZone.vue'
import CompressOptions from '@/components/compress/CompressOptions.vue'
import CompressResult from '@/components/compress/CompressResult.vue'

const { t } = useI18n()
useSeo({ titleKey: 'nav.resize', descriptionKey: 'site.description', keywords: ['resize image online', 'image resizer', 'change image size'], path: '/image-resize' })

const dropZone = ref<InstanceType<typeof FileDropZone>>()
const options = reactive({ ...DEFAULT_RESIZE, width: 0, height: 0 })
const { compressing, result, error, compress, downloadResult } = useCompress()
const outputName = computed(() => (dropZone.value?.file?.name?.replace(/\.\w+$/, '') || 'image') + '_resized.png')

function handleCompress() {
  if (dropZone.value?.file) {
    compress(dropZone.value.file, { codec: 'resize', options })
  }
}
</script>
