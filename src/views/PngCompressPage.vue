<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ t('nav.png') }}</h1>
    <FileDropZone ref="dropZone" />
    <CompressOptions :disabled="!dropZone?.file" :compressing="compressing" @compress="handleCompress">
      <div class="space-y-3">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.level') }}: {{ options.level }}</span>
          <input type="range" v-model.number="options.level" min="0" max="6" class="w-48" />
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
import { DEFAULT_OXIPNG } from '@/codecs/types'
import FileDropZone from '@/components/compress/FileDropZone.vue'
import CompressOptions from '@/components/compress/CompressOptions.vue'
import CompressResult from '@/components/compress/CompressResult.vue'

const { t } = useI18n()
useSeo({ titleKey: 'nav.png', descriptionKey: 'site.description', keywords: ['compress png online', 'png optimizer', 'oxipng'], path: '/png-compress' })

const dropZone = ref<InstanceType<typeof FileDropZone>>()
const options = reactive({ ...DEFAULT_OXIPNG })
const { compressing, result, error, compress, downloadResult } = useCompress()
const outputName = computed(() => (dropZone.value?.file?.name?.replace(/\.\w+$/, '') || 'image') + '_compressed.png')

function handleCompress() {
  if (dropZone.value?.file) {
    compress(dropZone.value.file, { codec: 'oxipng', options })
  }
}
</script>
