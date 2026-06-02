// src/codecs/resize.ts — 图片缩放封装（resize + 编码为 PNG）
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
  const targetW = options.width || width
  const targetH = options.height || height
  const result = mod.resize(data, width, height, targetW, targetH)
  if (!result) throw new Error('Resize failed')
  // 将 RGBA 像素数据编码为 PNG（通过 OffscreenCanvas）
  const rgba = new Uint8ClampedArray(result)
  const imgData = new ImageData(rgba, targetW, targetH)
  const canvas = new OffscreenCanvas(targetW, targetH)
  const ctx = canvas.getContext('2d')!
  ctx.putImageData(imgData, 0, 0)
  const blob = await canvas.convertToBlob({ type: 'image/png' })
  return new Uint8Array(await blob.arrayBuffer())
}
