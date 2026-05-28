<template>
  <div class="space-y-6" v-if="page">
    <h1 class="text-2xl font-bold">{{ isZh ? page.h1Zh : page.h1En }}</h1>
    <p class="text-gray-600">{{ isZh ? page.descZh : page.descEn }}</p>
    <FileDropZone ref="dropZone" />
    <CompressOptions :disabled="!dropZone?.file" :compressing="compressing" @compress="handleCompress">
      <div class="space-y-3" v-if="page.codec === 'mozjpeg'">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.quality') }}: {{ jpegOpts.quality }}</span>
          <input type="range" v-model.number="jpegOpts.quality" min="1" max="100" class="w-48" />
        </label>
      </div>
      <div class="space-y-3" v-else-if="page.codec === 'oxipng'">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.level') }}: {{ pngOpts.level }}</span>
          <input type="range" v-model.number="pngOpts.level" min="0" max="6" class="w-48" />
        </label>
      </div>
      <div class="space-y-3" v-else-if="page.codec === 'webp'">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.quality') }}: {{ webpOpts.quality }}</span>
          <input type="range" v-model.number="webpOpts.quality" min="1" max="100" class="w-48" />
        </label>
      </div>
      <div class="space-y-3" v-else-if="page.codec === 'avif'">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.quality') }}: {{ avifOpts.quality }}</span>
          <input type="range" v-model.number="avifOpts.quality" min="1" max="100" class="w-48" />
        </label>
      </div>
      <div class="space-y-3" v-else-if="page.codec === 'resize'">
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.width') }}: {{ resizeOpts.width }}</span>
          <input type="number" v-model.number="resizeOpts.width" min="1" max="10000" class="w-24 border rounded px-2" />
        </label>
        <label class="flex items-center justify-between">
          <span class="text-sm">{{ t('compress.height') }}: {{ resizeOpts.height }}</span>
          <input type="number" v-model.number="resizeOpts.height" min="1" max="10000" class="w-24 border rounded px-2" />
        </label>
      </div>
    </CompressOptions>
    <CompressResult :result="result" :error="error" @download="downloadResult(outputName, mimeType)" />

    <!-- SEO 内容区 -->
    <section class="mt-8 prose prose-sm max-w-none">
      <h2 class="text-lg font-semibold">{{ isZh ? `如何${page.titleZh}` : `How to ${page.titleEn}` }}</h2>
      <ol class="list-decimal list-inside space-y-1 text-gray-700">
        <li>{{ isZh ? '上传或拖拽图片到上方区域' : 'Upload or drag your image to the area above' }}</li>
        <li>{{ isZh ? '调整压缩参数' : 'Adjust compression settings' }}</li>
        <li>{{ isZh ? '点击压缩按钮' : 'Click the compress button' }}</li>
        <li>{{ isZh ? '下载压缩后的图片' : 'Download your compressed image' }}</li>
      </ol>
      <h2 class="text-lg font-semibold mt-4">{{ isZh ? '为什么选择我们？' : 'Why Choose Us?' }}</h2>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>{{ isZh ? '100% 浏览器内处理，无需上传文件' : '100% browser-based, no file upload needed' }}</li>
        <li>{{ isZh ? '基于 WebAssembly 的专业编码器' : 'Professional WebAssembly-based encoders' }}</li>
        <li>{{ isZh ? '完全免费，无水印，无限制' : 'Completely free, no watermark, no limits' }}</li>
        <li>{{ isZh ? '隐私安全，数据不离开您的设备' : 'Privacy safe, data never leaves your device' }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { useCompress } from '@/composables/useCompress'
import { landingPages } from '@/data/landingPages'
import { DEFAULT_MOZJPEG, DEFAULT_OXIPNG, DEFAULT_WEBP, DEFAULT_AVIF, DEFAULT_RESIZE } from '@/codecs/types'
import FileDropZone from '@/components/compress/FileDropZone.vue'
import CompressOptions from '@/components/compress/CompressOptions.vue'
import CompressResult from '@/components/compress/CompressResult.vue'

const route = useRoute()
const { t, locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const slug = computed(() => route.params.slug as string)
const page = computed(() => landingPages.find(p => p.slug === slug.value))

// 为每个 codec 准备选项
const jpegOpts = reactive({ ...DEFAULT_MOZJPEG })
const pngOpts = reactive({ ...DEFAULT_OXIPNG })
const webpOpts = reactive({ quality: 75 })
const avifOpts = reactive({ quality: 50 })
const resizeOpts = reactive({ ...DEFAULT_RESIZE, width: 1024, height: 768 })

const dropZone = ref<InstanceType<typeof FileDropZone>>()
const { compressing, result, error, compress, downloadResult } = useCompress()

const mimeType = computed(() => {
  const codecMap: Record<string, string> = { mozjpeg: 'image/jpeg', oxipng: 'image/png', webp: 'image/webp', avif: 'image/avif', resize: 'image/png' }
  return codecMap[page.value?.codec || 'mozjpeg']
})

const extMap: Record<string, string> = { mozjpeg: '.jpg', oxipng: '.png', webp: '.webp', avif: '.avif', resize: '.png' }
const outputName = computed(() => {
  const base = dropZone.value?.file?.name?.replace(/\.\w+$/, '') || 'image'
  return base + '_compressed' + (extMap[page.value?.codec || 'mozjpeg'])
})

function handleCompress() {
  if (!dropZone.value?.file || !page.value) return
  const codec = page.value.codec
  if (codec === 'mozjpeg') compress(dropZone.value.file, { codec: 'mozjpeg', options: jpegOpts })
  else if (codec === 'oxipng') compress(dropZone.value.file, { codec: 'oxipng', options: pngOpts })
  else if (codec === 'webp') compress(dropZone.value.file, { codec: 'webp', options: webpOpts })
  else if (codec === 'avif') compress(dropZone.value.file, { codec: 'avif', options: avifOpts })
  else if (codec === 'resize') compress(dropZone.value.file, { codec: 'resize', options: resizeOpts })
}

// 动态 SEO
if (page.value) {
  useSeo({
    titleKey: '__dynamic__',
    descriptionKey: '__dynamic__',
    keywords: page.value.keywords,
    path: `/${page.value.slug}`,
    dynamicTitle: isZh.value ? page.value.titleZh : page.value.titleEn,
    dynamicDesc: isZh.value ? page.value.descZh : page.value.descEn
  })
}
</script>
