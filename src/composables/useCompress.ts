// src/composables/useCompress.ts — 压缩逻辑 composable
import { ref } from 'vue'
import type { EncodeOptions, CompressResponse } from '@/codecs/types'

export interface CompressResult {
  data: Uint8Array
  width: number
  height: number
  originalSize: number
  compressedSize: number
  ratio: number
}

let worker: Worker | null = null
let requestId = 0
const pending = new Map<string, { resolve: (v: CompressResponse) => void; reject: (e: any) => void; timer: ReturnType<typeof setTimeout> }>()

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('../workers/compress.worker.ts', import.meta.url), { type: 'module' })
    worker.onmessage = (e: MessageEvent<CompressResponse>) => {
      const entry = pending.get(e.data.id)
      if (entry) {
        clearTimeout(entry.timer)
        pending.delete(e.data.id)
        entry.resolve(e.data)
      }
    }
    worker.onerror = (e) => {
      for (const [, entry] of pending) {
        clearTimeout(entry.timer)
        entry.reject(e)
      }
      pending.clear()
    }
  }
  return worker
}

export function useCompress() {
  const compressing = ref(false)
  const progress = ref(0)
  const result = ref<CompressResult | null>(null)
  const error = ref<string | null>(null)

  async function compress(file: File, encode: EncodeOptions): Promise<void> {
    compressing.value = true
    progress.value = 0
    error.value = null
    result.value = null

    try {
      // 检测浏览器兼容性
      if (typeof WebAssembly === 'undefined') {
        throw new Error('WASM_NOT_SUPPORTED')
      }
      if (typeof Worker === 'undefined') {
        throw new Error('WORKER_NOT_SUPPORTED')
      }

      progress.value = 10
      const bitmap = await createImageBitmap(file)
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(bitmap, 0, 0)
      const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height)
      progress.value = 30

      const id = String(++requestId)
      const w = getWorker()

      const response = await new Promise<CompressResponse>((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(id)
          reject(new Error('COMPRESS_TIMEOUT'))
        }, 60000)
        pending.set(id, { resolve, reject, timer })
        w.postMessage({
          id,
          imageData: { data: imageData.data, width: imageData.width, height: imageData.height },
          encode: JSON.parse(JSON.stringify(encode))
        }, [imageData.data.buffer])
        progress.value = 50
      })

      if (response.success && response.result) {
        result.value = response.result
        progress.value = 100
      } else {
        error.value = response.error || 'Unknown error'
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      compressing.value = false
    }
  }

  function downloadResult(filename: string, mimeType: string) {
    if (!result.value) return
    const blob = new Blob([result.value.data], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return { compressing, progress, result, error, compress, downloadResult }
}
