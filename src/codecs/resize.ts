// src/codecs/resize.ts — 图片缩放封装
import type { ResizeOptions } from './types'

let module: any = null

async function init(): Promise<any> {
  if (!module) {
    const path = '/codecs/resize/squoosh_resize.js'
    const mod = await import(/* @vite-ignore */ path)
    await mod.default()
    module = mod
  }
  return module
}

export async function encodeResize(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  options: ResizeOptions
): Promise<Uint8Array> {
  const mod = await init()
  const result = mod.resize(data, width, height, options.width, options.height)
  if (!result) throw new Error('Resize failed')
  return new Uint8Array(result)
}
