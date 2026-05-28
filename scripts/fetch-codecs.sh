#!/bin/bash
# scripts/fetch-codecs.sh — 从 Squoosh 仓库提取预编译 WASM codec 文件
# 用法: bash scripts/fetch-codecs.sh
set -e

REPO="https://github.com/GoogleChromeLabs/squoosh.git"
CLONE_DIR="/tmp/squoosh-clone"
OUT_DIR="public/codecs"

echo "=== 提取 Squoosh WASM codec 文件 ==="

# 浅克隆 Squoosh 仓库（如果尚未克隆）
if [ ! -d "$CLONE_DIR" ]; then
  echo "浅克隆 Squoosh 仓库..."
  git clone --depth 1 "$REPO" "$CLONE_DIR"
fi

SRC="$CLONE_DIR/codecs"

# 创建输出目录
mkdir -p "$OUT_DIR/mozjpeg" "$OUT_DIR/oxipng" "$OUT_DIR/webp" "$OUT_DIR/avif" "$OUT_DIR/resize"

# 复制 MozJPEG
echo "提取 MozJPEG codec..."
cp "$SRC/mozjpeg/enc/mozjpeg_enc.js" "$OUT_DIR/mozjpeg/"
cp "$SRC/mozjpeg/enc/mozjpeg_enc.wasm" "$OUT_DIR/mozjpeg/"

# 复制 OxiPNG
echo "提取 OxiPNG codec..."
cp "$SRC/oxipng/pkg/squoosh_oxipng.js" "$OUT_DIR/oxipng/"
cp "$SRC/oxipng/pkg/squoosh_oxipng_bg.wasm" "$OUT_DIR/oxipng/"

# 复制 WebP
echo "提取 WebP codec..."
cp "$SRC/webp/enc/webp_enc.js" "$OUT_DIR/webp/"
cp "$SRC/webp/enc/webp_enc.wasm" "$OUT_DIR/webp/"

# 复制 AVIF
echo "提取 AVIF codec..."
cp "$SRC/avif/enc/avif_enc.js" "$OUT_DIR/avif/"
cp "$SRC/avif/enc/avif_enc.wasm" "$OUT_DIR/avif/"

# 复制 Resize
echo "提取 Resize codec..."
cp "$SRC/resize/pkg/squoosh_resize.js" "$OUT_DIR/resize/"
cp "$SRC/resize/pkg/squoosh_resize_bg.wasm" "$OUT_DIR/resize/"

# 添加 LICENSE
cat > "$OUT_DIR/LICENSE" << 'EOF'
Apache License 2.0

The WASM codec files in this directory are extracted from:
https://github.com/GoogleChromeLabs/squoosh

Copyright 2018 Google LLC
Licensed under the Apache License, Version 2.0
EOF

echo ""
echo "=== 完成！codec 文件已提取到 $OUT_DIR ==="
ls -la "$OUT_DIR"/*
