// src/codecs/index.ts — Codec 统一入口，含 WASM 特性检测
import { simd, threads } from 'wasm-feature-detect'

export interface WasmFeatures {
  simd: boolean
  threads: boolean
}

let features: WasmFeatures | null = null

/** 检测浏览器 WASM 特性支持（SIMD/threads），结果缓存 */
export async function detectFeatures(): Promise<WasmFeatures> {
  if (!features) {
    const [hasSimd, hasThreads] = await Promise.all([simd(), threads()])
    features = { simd: hasSimd, threads: hasThreads }
  }
  return features
}

export { encodeMozjpeg } from './mozjpeg'
export { encodeOxipng } from './oxipng'
export { encodeWebp } from './webp'
export { encodeAvif } from './avif'
export { encodeResize } from './resize'
