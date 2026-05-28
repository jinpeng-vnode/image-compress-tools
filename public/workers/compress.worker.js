// public/workers/compress.worker.js — 压缩 Web Worker（独立文件，不经过 Vite 打包）

// codec 模块缓存
const codecs = {}

async function loadCodec(name, path) {
  if (!codecs[name]) {
    const mod = await import(path)
    if (name === 'oxipng' || name === 'resize') {
      await mod.default()
      codecs[name] = mod
    } else {
      codecs[name] = await mod.default()
    }
  }
  return codecs[name]
}

self.onmessage = async (e) => {
  const { id, imageData, encode } = e.data
  try {
    let result
    const { data, width, height } = imageData

    switch (encode.codec) {
      case 'mozjpeg': {
        const mod = await loadCodec('mozjpeg', '/codecs/mozjpeg/mozjpeg_enc.js')
        result = mod.encode(data, width, height, encode.options)
        break
      }
      case 'oxipng': {
        const mod = await loadCodec('oxipng', '/codecs/oxipng/squoosh_oxipng.js')
        result = mod.optimise(data, width, height, encode.options.level, encode.options.interlace)
        break
      }
      case 'webp': {
        const mod = await loadCodec('webp', '/codecs/webp/webp_enc.js')
        result = mod.encode(data, width, height, encode.options)
        break
      }
      case 'avif': {
        const mod = await loadCodec('avif', '/codecs/avif/avif_enc.js')
        result = mod.encode(data, width, height, encode.options)
        break
      }
      case 'resize': {
        const mod = await loadCodec('resize', '/codecs/resize/squoosh_resize.js')
        result = mod.resize(data, width, height, encode.options.width, encode.options.height)
        break
      }
      default:
        throw new Error(`Unknown codec: ${encode.codec}`)
    }

    if (!result) throw new Error(`${encode.codec} encoding returned null`)

    self.postMessage({
      id,
      success: true,
      result: {
        data: new Uint8Array(result),
        width,
        height,
        originalSize: data.byteLength,
        compressedSize: result.byteLength
      }
    })
  } catch (error) {
    self.postMessage({
      id,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}
