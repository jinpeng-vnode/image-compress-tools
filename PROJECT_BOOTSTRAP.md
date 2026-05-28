# PROJECT_BOOTSTRAP.md — 图片压缩工具站

> 项目部署/启动快速指南，供全栈工程师和后续维护参考。

## 项目概述

纯前端图片压缩工具站，基于 Squoosh WASM 编解码器，Vue 3 + Vite + vite-ssg 构建，Nginx 静态托管。

## 技术栈

- 前端：Vue 3 + TypeScript + TailwindCSS + vite-ssg
- 构建：Vite 5 + yarn
- 容器：Docker（多阶段构建：node:20-alpine → nginx:alpine）
- 部署：docker-compose + Nginx 静态托管

## 服务器信息

| 项目 | 值 |
|------|-----|
| 服务器 | Mac Mini (192.168.3.9) |
| 部署路径 | ~/projects/image-compress-tools |
| 端口 | 8088 |
| 容器名 | image-compress-tools-web-1 |
| 分支 | dev |
| 访问地址 | http://192.168.3.9:8088/ |

## 首次部署步骤

```bash
# 1. SSH 到 Mac Mini（使用 paramiko，PATH 需要 export）
export PATH=/usr/local/bin:/opt/homebrew/bin:$PATH

# 2. Clone 仓库
mkdir -p ~/projects && cd ~/projects
git clone -b dev https://github.com/jinpeng-vnode/image-compress-tools.git
cd image-compress-tools

# 3. 获取 WASM codec 文件（从 Squoosh 仓库提取）
bash scripts/fetch-codecs.sh

# 4. 构建并启动
docker compose up -d --build
```

## 日常更新

```bash
export PATH=/usr/local/bin:/opt/homebrew/bin:$PATH
cd ~/projects/image-compress-tools
git pull origin dev
docker compose up -d --build
```

## 仅重启（无代码变更）

```bash
export PATH=/usr/local/bin:/opt/homebrew/bin:$PATH
cd ~/projects/image-compress-tools
docker compose restart
```

## 注意事项

1. **SSH PATH 问题**：Mac Mini SSH 默认 PATH 不含 `/usr/local/bin`，需手动 export
2. **Docker Hub 超时**：Dockerfile 使用 `nginx:alpine`（非 `nginx:1.25-alpine`），因 Mac Mini 本地已有该镜像，避免拉取超时
3. **WASM 文件不在 Git 中**：`public/codecs/` 在 `.gitignore` 中，首次部署必须执行 `fetch-codecs.sh`
4. **端口 8088**：已确认不与其他服务冲突
5. **禁止修改宿主机配置**：一切在 Docker 容器内完成

## 健康检查

```bash
# 检查容器状态
docker ps --filter 'name=image-compress'

# 检查首页
curl -s http://localhost:8088/ | grep '<title>'

# 检查 WASM MIME 类型
curl -s -o /dev/null -w '%{content_type}' http://localhost:8088/codecs/mozjpeg/mozjpeg_enc.wasm
# 应返回 application/wasm
```

## 目录结构（关键文件）

```
image-compress-tools/
├── Dockerfile              # 多阶段构建
├── docker-compose.yml      # 容器编排（8088:80）
├── nginx.conf              # Nginx 配置（WASM MIME + COOP/COEP + gzip）
├── scripts/fetch-codecs.sh # WASM 文件提取脚本
├── public/codecs/          # WASM 文件（不在 Git 中）
├── src/                    # Vue 3 源码
└── dist/                   # 构建产物（容器内生成）
```
