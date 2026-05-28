# L1-TASK-001 图片压缩工具站 架构设计文档

## 1. 需求摘要

基于 Google Squoosh 开源项目的 WebAssembly 编解码器，构建纯前端图片压缩工具站。核心目标：

- **SEO 驱动流量**：每种压缩格式独立页面，独立 title/description/Schema.org
- **纯前端方案**：所有压缩操作在浏览器端通过 WebAssembly 完成，无后端服务
- **多语言支持**：中英文双语，路径前缀区分（/en/、/zh/）
- **品牌定制**：自有品牌 UI + 广告位预留
- **容器化部署**：Docker + Nginx 静态托管

### 支持的压缩格式

| 格式 | 功能 | 对应页面路由 |
|------|------|-------------|
| JPEG | MozJPEG 压缩 | /jpeg-compress |
| PNG | OxiPNG 优化 | /png-compress |
| WebP | WebP 转换 | /webp-convert |
| AVIF | AVIF 转换 | /avif-convert |
| Resize | 图片尺寸调整 | /image-resize |

## 2. 方案选择

### 2.1 Squoosh 源码引用策略

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| Fork 整仓改造 | 完整功能、可复用 UI | 构建系统复杂（需 Emscripten SDK）、Preact 框架不符合技术栈、大量无用代码 | ❌ 不选 |
| 使用 @squoosh/lib | 开箱即用 | Node.js 包不适合浏览器、项目已停止维护 | ❌ 不选 |
| **提取预编译 WASM + JS glue** | 轻量、可控、无需编译环境、适配 Vue 3 | 需自行封装调用层 | ✅ 选择 |

**选择理由**：Squoosh 仓库已 archived，预编译的 .wasm 文件可直接使用，无需搭建 C++/Rust 编译环境。提取核心 codec 文件到 Vue 3 项目中，在 Web Worker 中执行，既保证性能又保持架构简洁。

### 2.2 SSG 预渲染方案

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| Nuxt 3 | 成熟 SSG、内置 SEO | 框架重、约束多、学习成本高 | ❌ |
| **vite-ssg** | 轻量、基于 Vue 3 + Vue Router、Vite 原生 | 需手动配置部分 SEO | ✅ 选择 |
| @unhead/vue + 手动预渲染 | 灵活 | 需自行实现预渲染逻辑 | ❌ |

**选择理由**：vite-ssg 是 Vite 生态的轻量 SSG 插件，与项目技术栈（Vue 3 + Vite）完美契合，构建时自动预渲染所有路由为静态 HTML，满足 SEO 需求且无额外框架负担。

### 2.3 多语言方案

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| **vue-i18n + 路径前缀** | 成熟、SEO 友好、每语言独立 URL | 路由配置稍复杂 | ✅ 选择 |
| 子域名（en.xxx.com） | SEO 独立 | 需多域名配置、运维复杂 | ❌ |
| 查询参数（?lang=en） | 简单 | SEO 不友好 | ❌ |

### 2.4 UI 组件库

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| Ant Design Vue | 项目技术栈规范 | 组件库较重，工具站不需要复杂组件 | ❌ |
| **TailwindCSS + 自定义组件** | 轻量、高度定制、SSG 友好、响应式原生支持 | 需自行构建组件 | ✅ 选择 |

**选择理由**：工具站 UI 简洁，核心交互是拖拽上传 + 参数调节 + 下载，不需要重型组件库。TailwindCSS 提供原子化样式，配合自定义组件实现品牌定制和广告位布局，且对 SSG 构建零负担。

## 3. 文件结构

```
image-compress-tools/
├── public/
│   ├── codecs/                          # Squoosh 预编译 WASM + JS glue
│   │   ├── mozjpeg/
│   │   │   ├── mozjpeg_enc.js           # Emscripten glue (JPEG)
│   │   │   └── mozjpeg_enc.wasm         # 247KB
│   │   ├── oxipng/
│   │   │   ├── squoosh_oxipng.js        # wasm-pack glue (PNG)
│   │   │   └── squoosh_oxipng_bg.wasm   # 144KB
│   │   ├── webp/
│   │   │   ├── webp_enc.js              # Emscripten glue (WebP)
│   │   │   └── webp_enc.wasm            # 292KB
│   │   ├── avif/
│   │   │   ├── avif_enc.js              # Emscripten glue (AVIF)
│   │   │   └── avif_enc.wasm            # 2.7MB
│   │   └── resize/
│   │       ├── squoosh_resize.js        # wasm-pack glue (Resize)
│   │       └── squoosh_resize_bg.wasm   # 37KB
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── main.ts                          # 应用入口（vite-ssg）
│   ├── App.vue                          # 根组件
│   ├── router/
│   │   └── index.ts                     # 路由定义（含多语言前缀）
│   ├── codecs/                          # WASM 编解码器封装层
│   │   ├── types.ts                     # 所有 codec 的 TS 类型定义
│   │   ├── mozjpeg.ts                   # MozJPEG 编码封装
│   │   ├── oxipng.ts                    # OxiPNG 编码封装
│   │   ├── webp.ts                      # WebP 编码封装
│   │   ├── avif.ts                      # AVIF 编码封装
│   │   └── resize.ts                    # Resize 封装
│   ├── workers/
│   │   └── compress.worker.ts           # Web Worker 入口（统一处理所有 codec）
│   ├── composables/
│   │   ├── useCompress.ts               # 压缩逻辑 composable（调用 Worker）
│   │   ├── useFileUpload.ts             # 文件上传/拖拽逻辑
│   │   └── useSeo.ts                    # SEO meta 管理
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue            # 顶部导航 + 语言切换
│   │   │   ├── AppFooter.vue            # 底部信息
│   │   │   └── AppSidebar.vue           # 侧边栏（广告位）
│   │   ├── compress/
│   │   │   ├── FileDropZone.vue         # 拖拽上传区域
│   │   │   ├── CompressOptions.vue      # 压缩参数面板
│   │   │   ├── CompressProgress.vue     # 压缩进度
│   │   │   ├── CompressResult.vue       # 压缩结果（对比 + 下载）
│   │   │   └── ImagePreview.vue         # 图片预览（前后对比）
│   │   ├── ads/
│   │   │   ├── AdBanner.vue             # 横幅广告位
│   │   │   └── AdSidebar.vue            # 侧边广告位
│   │   └── common/
│   │       ├── LangSwitcher.vue         # 语言切换器
│   │       └── SchemaOrg.vue            # Schema.org JSON-LD 注入
│   ├── views/
│   │   ├── HomePage.vue                 # 首页（功能导航）
│   │   ├── JpegCompressPage.vue         # JPEG 压缩页
│   │   ├── PngCompressPage.vue          # PNG 压缩页
│   │   ├── WebpConvertPage.vue          # WebP 转换页
│   │   ├── AvifConvertPage.vue          # AVIF 转换页
│   │   └── ImageResizePage.vue          # 图片缩放页
│   ├── i18n/
│   │   ├── index.ts                     # vue-i18n 初始化
│   │   ├── en.json                      # 英文翻译
│   │   └── zh.json                      # 中文翻译
│   ├── seo/
│   │   ├── meta.ts                      # 每页 SEO meta 配置
│   │   └── sitemap.ts                   # sitemap 生成逻辑
│   └── styles/
│       └── main.css                     # TailwindCSS 入口 + 全局样式
├── design/
│   └── L1-TASK-001-architecture.md      # 本文档
├── index.html                           # HTML 模板
├── vite.config.ts                       # Vite + vite-ssg 配置
├── tailwind.config.ts                   # TailwindCSS 配置
├── tsconfig.json
├── package.json
├── Dockerfile                           # 多阶段构建（build + nginx）
├── docker-compose.yml                   # 容器编排
├── nginx.conf                           # Nginx 静态托管配置
└── README.md
```

## 4. 类型定义

```typescript
// src/codecs/types.ts

/** 支持的编解码器类型 */
export type CodecType = 'mozjpeg' | 'oxipng' | 'webp' | 'avif' | 'resize'

/** MozJPEG 编码选项 */
export interface MozjpegEncodeOptions {
  quality: number           // 1-100, 默认 75
  progressive: boolean      // 默认 true
  optimize_coding: boolean  // 默认 true
  smoothing: number         // 0-100, 默认 0
  color_space: 3            // YCbCr
  auto_subsample: boolean   // 默认 true
  chroma_subsample: number  // 2
}

/** OxiPNG 编码选项 */
export interface OxipngEncodeOptions {
  level: number      // 0-6, 默认 2
  interlace: boolean // 默认 false
}

/** WebP 编码选项 */
export interface WebpEncodeOptions {
  quality: number    // 0-100, 默认 75
  method: number     // 0-6, 默认 4（速度/质量平衡）
  lossless: 0 | 1   // 默认 0（有损）
}

/** AVIF 编码选项 */
export interface AvifEncodeOptions {
  quality: number       // 0-100, 默认 50
  qualityAlpha: number  // 0-100, 默认 -1（与 quality 相同）
  speed: number         // 0-10, 默认 6
  subsample: number     // 1=4:2:0, 默认 1
}

/** 图片缩放选项 */
export interface ResizeOptions {
  width: number
  height: number
  method: 'triangle' | 'catrom' | 'mitchell' | 'lanczos3'
  fitMethod: 'stretch' | 'contain'
  premultiply: boolean   // 默认 true
  linearRGB: boolean     // 默认 true
}

/** 统一编码选项联合类型 */
export type EncodeOptions =
  | { codec: 'mozjpeg'; options: MozjpegEncodeOptions }
  | { codec: 'oxipng'; options: OxipngEncodeOptions }
  | { codec: 'webp'; options: WebpEncodeOptions }
  | { codec: 'avif'; options: AvifEncodeOptions }
  | { codec: 'resize'; options: ResizeOptions }

/** Worker 消息：主线程 → Worker */
export interface CompressRequest {
  id: string                    // 请求唯一 ID
  imageData: ImageData          // 原始图片像素数据
  encode: EncodeOptions         // 编码配置
}

/** Worker 消息：Worker → 主线程 */
export interface CompressResponse {
  id: string
  success: boolean
  result?: {
    blob: Blob                  // 压缩后文件
    width: number
    height: number
    originalSize: number        // 原始大小 (bytes)
    compressedSize: number      // 压缩后大小 (bytes)
    ratio: number               // 压缩率 (0-1)
  }
  error?: string
}

/** 页面 SEO 配置 */
export interface PageSeoConfig {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogImage?: string
  schema: SchemaOrgWebApplication
}

/** Schema.org WebApplication 结构 */
export interface SchemaOrgWebApplication {
  '@type': 'WebApplication'
  name: string
  description: string
  applicationCategory: 'MultimediaApplication'
  operatingSystem: 'Any'
  offers: { '@type': 'Offer'; price: '0'; priceCurrency: 'USD' }
}

/** 多语言路由配置 */
export interface LocaleRoute {
  path: string
  name: string
  codec: CodecType | null       // null 表示首页
  seo: Record<'en' | 'zh', PageSeoConfig>
}
```

## 5. 外部接口（路由定义）

本项目为纯前端，无后端 API。"接口"即页面路由：

| 路由 | 页面组件 | 功能 | SEO 关键词 |
|------|----------|------|-----------|
| `/:locale/` | HomePage | 首页导航 | image compress online free |
| `/:locale/jpeg-compress` | JpegCompressPage | JPEG 压缩 | compress jpeg online, reduce jpg size |
| `/:locale/png-compress` | PngCompressPage | PNG 压缩 | compress png online, png optimizer |
| `/:locale/webp-convert` | WebpConvertPage | WebP 转换 | convert to webp, webp converter |
| `/:locale/avif-convert` | AvifConvertPage | AVIF 转换 | convert to avif, avif converter |
| `/:locale/image-resize` | ImageResizePage | 图片缩放 | resize image online, image resizer |

- `:locale` 取值：`en` | `zh`
- 默认语言：`en`（根路径 `/` 重定向到 `/en/`）
- 每个路由 SSG 预渲染为静态 HTML

## 6. 模块依赖（调用关系）

```
┌─────────────────────────────────────────────────────────┐
│                      Views (页面)                         │
│  HomePage / JpegCompressPage / PngCompressPage / ...     │
└──────────────┬──────────────────────────────┬───────────┘
               │                              │
               ▼                              ▼
┌──────────────────────┐        ┌─────────────────────────┐
│   Components (组件)   │        │   Composables (逻辑)     │
│  FileDropZone         │        │  useCompress            │
│  CompressOptions      │        │  useFileUpload          │
│  CompressResult       │        │  useSeo                 │
│  ImagePreview         │        └────────────┬────────────┘
└──────────────────────┘                      │
                                              ▼
                              ┌────────────────────────────┐
                              │   Web Worker               │
                              │   compress.worker.ts       │
                              └────────────┬───────────────┘
                                           │
                                           ▼
                              ┌────────────────────────────┐
                              │   Codecs 封装层             │
                              │   mozjpeg.ts / oxipng.ts   │
                              │   webp.ts / avif.ts        │
                              └────────────┬───────────────┘
                                           │
                                           ▼
                              ┌────────────────────────────┐
                              │   WASM 文件 (public/codecs) │
                              │   .wasm + .js glue         │
                              └────────────────────────────┘
```

### 数据流

```
用户拖拽图片 → FileDropZone 读取为 ImageData
  → useCompress 发送 CompressRequest 到 Worker
    → Worker 加载对应 codec WASM → 执行编码
      → 返回 CompressResponse（含压缩后 Blob）
        → CompressResult 展示对比 + 提供下载
```

## 7. 错误处理

| 场景 | 错误类型 | 前端展示 |
|------|----------|----------|
| WASM 加载失败 | CODEC_LOAD_ERROR | "压缩引擎加载失败，请刷新页面重试" |
| 文件格式不支持 | INVALID_FILE_TYPE | "不支持的文件格式，请上传 JPG/PNG/WebP/AVIF 图片" |
| 文件过大（>50MB） | FILE_TOO_LARGE | "文件过大，请上传 50MB 以内的图片" |
| Worker 执行超时（60s） | COMPRESS_TIMEOUT | "压缩超时，请尝试降低质量或缩小图片尺寸" |
| Worker 执行异常 | COMPRESS_ERROR | "压缩失败：{具体错误信息}" |
| 浏览器不支持 WebAssembly | WASM_NOT_SUPPORTED | "您的浏览器不支持 WebAssembly，请升级浏览器" |
| 浏览器不支持 Web Worker | WORKER_NOT_SUPPORTED | "您的浏览器不支持后台处理，请升级浏览器" |

## 8. 模块分配表

| 模块/文件 | 负责角色 | 层级 | 依赖 |
|-----------|----------|------|------|
| `design/L1-TASK-001-architecture.md` | 架构师 | L1 | 无 |
| `design/ui/L1.5-TASK-001-ui.md` | UI设计员 | L1.5 | 架构设计 |
| `public/codecs/*` (WASM 文件提取) | 前端开发者 | L2 | 架构设计 |
| `src/codecs/*.ts` (编解码器封装) | 前端开发者 | L2 | 架构设计 |
| `src/workers/compress.worker.ts` | 前端开发者 | L2 | codecs 封装 |
| `src/composables/useCompress.ts` | 前端开发者 | L2 | Worker |
| `src/composables/useFileUpload.ts` | 前端开发者 | L2 | 无 |
| `src/composables/useSeo.ts` | 前端开发者 | L2 | i18n |
| `src/components/layout/*` | 前端开发者 | L2 | UI 规格 |
| `src/components/compress/*` | 前端开发者 | L2 | UI 规格 + composables |
| `src/components/ads/*` | 前端开发者 | L2 | UI 规格 |
| `src/views/*` | 前端开发者 | L2 | 所有 components + composables |
| `src/router/index.ts` | 前端开发者 | L2 | 路由定义 |
| `src/i18n/*` | 前端开发者 | L2 | 无 |
| `src/seo/*` | 前端开发者 | L2 | i18n |
| `vite.config.ts` | 前端开发者 | L2 | 无 |
| `tailwind.config.ts` | 前端开发者 | L2 | 无 |
| `Dockerfile` | 全栈工程师 | L3 | 前端构建完成 |
| `docker-compose.yml` | 全栈工程师 | L3 | Dockerfile |
| `nginx.conf` | 全栈工程师 | L3 | 路由结构 |

## 9. 开发层级

### L1 — 无前置依赖
- 架构设计文档（本文档）
- UI 规格文档

### L2 — 依赖 L1 + L1.5
- 项目脚手架搭建（Vite + Vue 3 + TypeScript）
- WASM codec 文件提取与封装
- Web Worker 通信层
- 多语言配置（vue-i18n）
- 路由与 SSG 配置（vite-ssg）
- 页面组件开发
- SEO 配置（meta + Schema.org + sitemap）
- TailwindCSS 样式系统

### L3 — 依赖 L2
- Docker 容器化
- Nginx 配置
- 部署上线

## 10. 依赖清单

### 前端运行时依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| vue | ^3.4 | 前端框架 |
| vue-router | ^4.3 | 路由管理 |
| vue-i18n | ^9.10 | 多语言 |
| @unhead/vue | ^0.9 | SEO head 管理（vite-ssg 集成） |
| wasm-feature-detect | ^1.6 | WASM 特性检测（SIMD/threads） |

### 前端开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| vite | ^5.4 | 构建工具 |
| vite-ssg | ^0.23 | SSG 预渲染 |
| typescript | ^5.4 | 类型系统 |
| tailwindcss | ^3.4 | 原子化 CSS |
| autoprefixer | ^10.4 | CSS 前缀 |
| postcss | ^8.4 | CSS 处理 |
| @vitejs/plugin-vue | ^5.0 | Vue SFC 支持 |
| vite-plugin-sitemap | ^0.6 | sitemap.xml 生成 |

### 系统依赖（Docker 内）

| 包名 | 版本 | 用途 |
|------|------|------|
| node | 20-alpine | 构建环境 |
| nginx | 1.25-alpine | 静态文件托管 |

## 11. 开发者备注

### 11.1 WASM 文件提取步骤

1. 克隆 Squoosh 仓库：`git clone https://github.com/GoogleChromeLabs/squoosh.git`
2. 从 `codecs/` 目录提取以下文件到 `public/codecs/`：
   - `codecs/mozjpeg/enc/mozjpeg_enc.wasm` + 对应 `.js`
   - `codecs/oxipng/pkg/squoosh_oxipng_bg.wasm` + `squoosh_oxipng.js`
   - `codecs/webp/enc/webp_enc.wasm` + 对应 `.js`
   - `codecs/avif/enc/avif_enc.wasm` + 对应 `.js`
   - `codecs/resize/pkg/squoosh_resize_bg.wasm` + `squoosh_resize.js`
3. 修改 JS glue 文件中的 WASM 路径引用，确保相对路径正确
4. 在 `public/codecs/` 下添加 `LICENSE` 文件（Apache 2.0 声明）

### 11.2 Web Worker 通信模式

```typescript
// src/workers/compress.worker.ts 伪代码
import { encodeMozjpeg } from '../codecs/mozjpeg'
import { encodeOxipng } from '../codecs/oxipng'
import { encodeWebp } from '../codecs/webp'
import { encodeAvif } from '../codecs/avif'

// 按需加载 codec，首次调用时初始化 WASM
self.onmessage = async (e: MessageEvent<CompressRequest>) => {
  const { id, imageData, encode } = e.data
  try {
    let result: Uint8Array
    switch (encode.codec) {
      case 'mozjpeg': result = await encodeMozjpeg(imageData, encode.options); break
      case 'oxipng':  result = await encodeOxipng(imageData, encode.options); break
      case 'webp':    result = await encodeWebp(imageData, encode.options); break
      case 'avif':    result = await encodeAvif(imageData, encode.options); break
    }
    self.postMessage({ id, success: true, result: { /* ... */ } })
  } catch (error) {
    self.postMessage({ id, success: false, error: String(error) })
  }
}
```

### 11.3 SSG 预渲染配置

```typescript
// vite.config.ts 关键配置
import { ViteSSG } from 'vite-ssg'

// 需要预渲染的路由列表（自动从 router 提取）
// vite-ssg 会在构建时为每个路由生成独立 HTML 文件
// 确保每个 HTML 包含完整的 <head> meta 标签
```

### 11.4 SEO 实现要点

1. **每页独立 meta**：通过 `@unhead/vue` 的 `useHead()` 在每个页面组件中设置
2. **Schema.org JSON-LD**：每页注入 `WebApplication` 类型的结构化数据
3. **hreflang**：每页 `<link rel="alternate" hreflang="en" href="...">` + `hreflang="zh"`
4. **sitemap.xml**：构建时通过 `vite-plugin-sitemap` 自动生成
5. **robots.txt**：静态文件放 `public/` 目录
6. **Open Graph**：每页设置 `og:title`、`og:description`、`og:image`

### 11.5 Nginx 配置要点

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # WASM MIME 类型
    types {
        application/wasm wasm;
    }

    # 静态资源缓存（JS/CSS/WASM 长期缓存）
    location ~* \.(js|css|wasm|woff2|png|jpg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 回退 + SSG 静态文件优先
    location / {
        try_files $uri $uri/index.html $uri.html /index.html;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Cross-Origin-Embedder-Policy "require-corp";
    add_header Cross-Origin-Opener-Policy "same-origin";
}
```

> 注意：`Cross-Origin-Embedder-Policy` 和 `Cross-Origin-Opener-Policy` 是 SharedArrayBuffer 所需的安全头，AVIF/OxiPNG 多线程 WASM 依赖此特性。

### 11.6 Docker 多阶段构建

```dockerfile
# 阶段 1：构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# 阶段 2：运行
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### 11.7 性能优化策略

- **WASM 懒加载**：AVIF codec 2.7MB，仅在用户进入 AVIF 页面时加载
- **WASM 缓存**：利用 Service Worker 或 HTTP 长期缓存，避免重复下载
- **Worker 复用**：单个 Worker 实例处理所有压缩请求，避免频繁创建/销毁
- **流式处理**：大图片分块处理（如果 codec 支持）
- **SIMD 加速**：检测浏览器 SIMD 支持，优先加载 `_simd.wasm` 版本
