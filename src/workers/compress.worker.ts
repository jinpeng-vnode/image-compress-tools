// src/workers/compress.worker.ts — 压缩 Web Worker（通过 codecs 封装层调用 WASM）
import { encodeMozjpeg, encodeOxipng, encodeWebp, encodeAvif, encodeResize, detectFeatures } from '../codecs'
import type { CompressRequest, CompressResponse } from '../codecs/types'

// 初始化时检测 WASM 特性
detectFeatures().then(f => {
  console.log(`[Worker] WASM features: SIMD=${f.simd}, Threads=${f.threads}`)
})

self.onmessage = async (e: MessageEvent<CompressRequest>) => {
  const { id, fileSize, imageData, encode } = e.data
  try {
    const { data, width, height } = imageData
    const input = data instanceof Uint8ClampedArray ? data : new Uint8ClampedArray(data.buffer || data)
    let encoded: Uint8Array

    switch (encode.codec) {
      case 'mozjpeg':
        encoded = await encodeMozjpeg(input, width, height, encode.options)
        break
      case 'oxipng':
        encoded = await encodeOxipng(input, width, height, encode.options)
        break
      case 'webp':
        encoded = await encodeWebp(input, width, height, encode.options)
        break
      case 'avif':
        encoded = await encodeAvif(input, width, height, encode.options)
        break
      case 'resize':
        encoded = await encodeResize(input, width, height, encode.options)
        break
      default:
        throw new Error(`Unknown codec: ${(encode as any).codec}`)
    }

    const originalSize = fileSize
    const compressedSize = encoded.byteLength

    const response: CompressResponse = {
      id,
      success: true,
      result: {
        data: encoded,
        width,
        height,
        originalSize,
        compressedSize,
        ratio: compressedSize / originalSize
      }
    }
    self.postMessage(response, [encoded.buffer])
  } catch (error) {
    const response: CompressResponse = {
      id,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
    self.postMessage(response)
  }
}
