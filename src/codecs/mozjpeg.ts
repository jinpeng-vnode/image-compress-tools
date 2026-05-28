// src/codecs/mozjpeg.ts — MozJPEG 编码封装
import type { MozjpegEncodeOptions } from './types'

let module: any = null

async function init(): Promise<any> {
  if (!module) {
    // 使用变量避免 Vite/Rollup 静态分析 resolve
    const path = '/codecs/mozjpeg/mozjpeg_enc.js'
    const mod = await import(/* @vite-ignore */ path)
    module = await mod.default()
  }
  return module
}

export async function encodeMozjpeg(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  options: MozjpegEncodeOptions
): Promise<Uint8Array> {
  const mod = await init()
  const result = mod.encode(data, width, height, options)
  if (!result) throw new Error('MozJPEG encoding failed')
  return new Uint8Array(result)
}
