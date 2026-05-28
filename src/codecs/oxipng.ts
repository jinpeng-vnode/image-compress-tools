// src/codecs/oxipng.ts — OxiPNG 编码封装
import type { OxipngEncodeOptions } from './types'

let module: any = null

async function init(): Promise<any> {
  if (!module) {
    const mod = await import('/codecs/oxipng/squoosh_oxipng.js' as any)
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
