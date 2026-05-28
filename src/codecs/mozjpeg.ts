// src/codecs/mozjpeg.ts — MozJPEG 编码封装
import type { MozjpegEncodeOptions } from './types'

let module: any = null

async function init(): Promise<any> {
  if (!module) {
    const mod = await import('/codecs/mozjpeg/mozjpeg_enc.js' as any)
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
