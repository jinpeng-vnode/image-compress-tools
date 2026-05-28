// src/composables/useCompress.ts — 压缩逻辑 composable
import { ref } from 'vue'
import type { EncodeOptions } from '@/codecs/types'

interface CompressResult {
  data: Uint8Array
  width: number
  height: number
  originalSize: number
  compressedSize: number
}

interface CompressResponse {
  id: string
  success: boolean
  result?: CompressResult
  error?: string
}

let worker: Worker | null = null
let requestId = 0

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker('/workers/compress.worker.js', { type: 'module' })
  }
  return worker
}

export function useCompress() {
  const compressing = ref(false)
  const result = ref<CompressResult | null>(null)
  const error = ref<string | null>(null)

  async function compress(file: File, encode: EncodeOptions): Promise<void> {
    compressing.value = true
    error.value = null
    result.value = null

    try {
      const bitmap = await createImageBitmap(file)
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(bitmap, 0, 0)
      const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height)

      const id = String(++requestId)
      const w = getWorker()

      const response = await new Promise<CompressResponse>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Compression timed out')), 60000)
        w.onmessage = (e: MessageEvent<CompressResponse>) => {
          if (e.data.id === id) {
            clearTimeout(timeout)
            resolve(e.data)
          }
        }
        w.onerror = (e) => { clearTimeout(timeout); reject(e) }
        w.postMessage({
          id,
          imageData: { data: imageData.data, width: imageData.width, height: imageData.height },
          encode
        })
      })

      if (response.success && response.result) {
        result.value = response.result
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

  return { compressing, result, error, compress, downloadResult }
}
