// src/codecs/avif.ts — AVIF 编码封装
import type { AvifEncodeOptions } from './types'

let module: any = null

async function init(): Promise<any> {
  if (!module) {
    const path = '/codecs/avif/avif_enc.js'
    const mod = await import(/* @vite-ignore */ path)
    module = await mod.default()
  }
  return module
}

export async function encodeAvif(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  options: AvifEncodeOptions
): Promise<Uint8Array> {
  const mod = await init()
  const result = mod.encode(data, width, height, options)
  if (!result) throw new Error('AVIF encoding failed')
  return new Uint8Array(result)
}
