// src/codecs/oxipng.ts — OxiPNG 编码封装
import type { OxipngEncodeOptions } from './types'

let module: any = null

async function init(): Promise<any> {
  if (!module) {
    const path = '/codecs/oxipng/squoosh_oxipng.js'
    const mod = await import(/* @vite-ignore */ path)
    await mod.default()
    module = mod
  }
  return module
}

export async function encodeOxipng(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  options: OxipngEncodeOptions
): Promise<Uint8Array> {
  const mod = await init()
  const result = mod.optimise(data, width, height, options.level, options.interlace)
  if (!result) throw new Error('OxiPNG encoding failed')
  return new Uint8Array(result)
}
