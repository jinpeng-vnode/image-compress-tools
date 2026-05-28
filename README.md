# Image Compress Tools

基于 Google Squoosh 开源项目的图片压缩工具站。

## 功能全景图 — 完成度: 95%

> 项目定义：基于 Google Squoosh（MIT协议）的图片压缩工具站，纯前端 WebAssembly 方案，SEO 驱动流量
> 当前阶段：已上线（http://192.168.3.9:8088/）
> 下一步优先级：
> 1. Cloudflare 域名绑定
> 2. 广告接入
> 禁止：修改 Mac Mini 宿主机配置；引入后端服务（纯前端方案）

image-compress-tools
├── 核心压缩引擎（基于 Squoosh WebAssembly）
│   ├── PNG 压缩 — ✅
│   ├── JPEG 压缩 — ✅
│   ├── WebP 转换 — ✅
│   ├── AVIF 转换 — ✅
│   └── 图片尺寸调整 — ✅
├── SEO 优化
│   ├── 每种格式独立页面（独立 title/description） — ✅
│   ├── Schema.org 结构化数据 — ✅
│   ├── sitemap.xml — ✅
│   ├── robots.txt — ✅
│   ├── Open Graph 标签 — ✅
│   └── 多语言 hreflang — ✅
├── 前端 UI
│   ├── 品牌定制 — ✅
│   ├── 专业图标库（Lucide Icons） — ✅
│   ├── 广告位预留 — ✅
│   ├── 中英文双语支持 — ✅
│   └── 响应式布局 — ✅
├── 测试
│   └── E2E 测试（Playwright, 13 cases） — ✅
└── 部署
    ├── Docker 容器化 — ✅
    ├── Nginx 静态托管 — ✅
    └── Cloudflare 域名绑定 — ❌
