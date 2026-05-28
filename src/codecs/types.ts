// src/codecs/types.ts — WASM 编解码器类型定义

export type CodecType = 'mozjpeg' | 'oxipng' | 'webp' | 'avif' | 'resize'

export interface MozjpegEncodeOptions {
  quality: number
  progressive: boolean
  optimize_coding: boolean
  smoothing: number
  color_space: number
  auto_subsample: boolean
  chroma_subsample: number
}

export interface OxipngEncodeOptions {
  level: number
  interlace: boolean
}

export interface WebpEncodeOptions {
  quality: number
  method: number
  lossless: 0 | 1
}

export interface AvifEncodeOptions {
  quality: number
  qualityAlpha: number
  speed: number
  subsample: number
}

export interface ResizeOptions {
  width: number
  height: number
  method: 'triangle' | 'catrom' | 'mitchell' | 'lanczos3'
  fitMethod: 'stretch' | 'contain'
  premultiply: boolean
  linearRGB: boolean
}

export type EncodeOptions =
  | { codec: 'mozjpeg'; options: MozjpegEncodeOptions }
  | { codec: 'oxipng'; options: OxipngEncodeOptions }
  | { codec: 'webp'; options: WebpEncodeOptions }
  | { codec: 'avif'; options: AvifEncodeOptions }
  | { codec: 'resize'; options: ResizeOptions }

export interface CompressRequest {
  id: string
  imageData: { data: Uint8ClampedArray; width: number; height: number }
  encode: EncodeOptions
}

export interface CompressResponse {
  id: string
  success: boolean
  result?: {
    data: Uint8Array
    width: number
    height: number
    originalSize: number
    compressedSize: number
    ratio: number
  }
  error?: string
}

// 默认编码选项
export const DEFAULT_MOZJPEG: MozjpegEncodeOptions = {
  quality: 75, progressive: true, optimize_coding: true,
  smoothing: 0, color_space: 3, auto_subsample: true, chroma_subsample: 2
}

export const DEFAULT_OXIPNG: OxipngEncodeOptions = { level: 2, interlace: false }

export const DEFAULT_WEBP: WebpEncodeOptions = { quality: 75, method: 4, lossless: 0 }

export const DEFAULT_AVIF: AvifEncodeOptions = { quality: 50, qualityAlpha: -1, speed: 6, subsample: 1 }

export const DEFAULT_RESIZE: ResizeOptions = {
  width: 0, height: 0, method: 'lanczos3', fitMethod: 'contain',
  premultiply: true, linearRGB: true
}
