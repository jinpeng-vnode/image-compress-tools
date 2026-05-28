// src/codecs/webp.ts — WebP 编码封装
import type { WebpEncodeOptions } from './types'

let module: any = null

async function init(): Promise<any> {
  if (!module) {
    const path = '/codecs/webp/webp_enc.js'
    const mod = await import(/* @vite-ignore */ path)
    module = await mod.default()
  }
  return module
}

export async function encodeWebp(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  options: WebpEncodeOptions
): Promise<Uint8Array> {
  const mod = await init()
  const result = mod.encode(data, width, height, options)
  if (!result) throw new Error('WebP encoding failed')
  return new Uint8Array(result)
}
