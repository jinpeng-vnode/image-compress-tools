// src/codecs/types.ts — WASM 编解码器类型定义（完整字段，匹配 Squoosh WASM struct）

export type CodecType = 'mozjpeg' | 'oxipng' | 'webp' | 'avif' | 'resize'

export interface MozjpegEncodeOptions {
  quality: number
  baseline: boolean
  arithmetic: boolean
  progressive: boolean
  optimize_coding: boolean
  smoothing: number
  color_space: number
  quant_table: number
  trellis_multipass: boolean
  trellis_opt_zero: boolean
  trellis_opt_table: boolean
  trellis_loops: number
  auto_subsample: boolean
  chroma_subsample: number
  separate_chroma_quality: boolean
  chroma_quality: number
}

export interface OxipngEncodeOptions {
  level: number
  interlace: boolean
}

export interface WebpEncodeOptions {
  quality: number
  target_size: number
  target_PSNR: number
  method: number
  sns_strength: number
  filter_strength: number
  filter_sharpness: number
  filter_type: number
  partitions: number
  segments: number
  pass: number
  show_compressed: number
  preprocessing: number
  autofilter: number
  partition_limit: number
  alpha_compression: number
  alpha_filtering: number
  alpha_quality: number
  lossless: number
  exact: number
  image_hint: number
  emulate_jpeg_size: number
  low_memory: number
  near_lossless: number
  use_delta_palette: number
  use_sharp_yuv: number
}

export interface AvifEncodeOptions {
  quality: number
  qualityAlpha: number
  speed: number
  subsample: number
  tileRowsLog2: number
  tileColsLog2: number
  chromaDeltaQ: boolean
  sharpness: number
  denoiseLevel: number
  tune: number
  enableSharpYUV: boolean
  lossless: number
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
  fileSize: number
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

// 默认编码选项（完整字段，匹配 Squoosh WASM struct 要求）
export const DEFAULT_MOZJPEG: MozjpegEncodeOptions = {
  quality: 75,
  baseline: false,
  arithmetic: false,
  progressive: true,
  optimize_coding: true,
  smoothing: 0,
  color_space: 3,
  quant_table: 3,
  trellis_multipass: false,
  trellis_opt_zero: false,
  trellis_opt_table: false,
  trellis_loops: 1,
  auto_subsample: true,
  chroma_subsample: 2,
  separate_chroma_quality: false,
  chroma_quality: 75,
}

export const DEFAULT_OXIPNG: OxipngEncodeOptions = { level: 2, interlace: false }

export const DEFAULT_WEBP: WebpEncodeOptions = {
  quality: 75,
  target_size: 0,
  target_PSNR: 0,
  method: 4,
  sns_strength: 50,
  filter_strength: 60,
  filter_sharpness: 0,
  filter_type: 1,
  partitions: 0,
  segments: 4,
  pass: 1,
  show_compressed: 0,
  preprocessing: 0,
  autofilter: 0,
  partition_limit: 0,
  alpha_compression: 1,
  alpha_filtering: 1,
  alpha_quality: 100,
  lossless: 0,
  exact: 0,
  image_hint: 0,
  emulate_jpeg_size: 0,
  low_memory: 0,
  near_lossless: 100,
  use_delta_palette: 0,
  use_sharp_yuv: 0,
}

export const DEFAULT_AVIF: AvifEncodeOptions = {
  quality: 50,
  qualityAlpha: -1,
  speed: 6,
  subsample: 1,
  tileRowsLog2: 0,
  tileColsLog2: 0,
  chromaDeltaQ: false,
  sharpness: 0,
  denoiseLevel: 0,
  tune: 0,
  enableSharpYUV: false,
  lossless: 0,
}

export const DEFAULT_RESIZE: ResizeOptions = {
  width: 0, height: 0, method: 'lanczos3', fitMethod: 'contain',
  premultiply: true, linearRGB: true
}
