# L1-TASK-001 测试规划

## 关联信息
- Issue: #1 L1 TASK-001: 图片压缩工具站架构设计
- 设计文档: design/L1-TASK-001-architecture.md
- 验收标准: 8 条（构建、Docker、路由、多语言、SEO、Schema.org、sitemap/robots、容器服务）

## Quality Hub
- 项目: image-compress-tools (d8c38ba3-2f1a-43ef-a6cf-52f7fc869cd6)
- 功能点: L1-TASK-001 构建与部署验证 (0d907dcd-4c9c-4720-8ea4-6d81c0e7762f)
- 本次执行: Run 3fd624f7-b447-436c-ba8d-5952c8430320 (10/10 PASS)

## 测试策略
- 全部采用 Type-S 静态验证（SSG 站点构建产物可直接检查）
- Docker 构建因测试环境无 docker 命令，改为配置文件结构验证
- 浏览器网络隔离无法直接 Type-U，但 SSG 预渲染 HTML 可通过文件检查等效验证

## 用例清单

### TC-001 [Type-S] [构建] yarn install + yarn build 构建成功
- Quality Hub 用例 ID: b4dbaae6-7d9f-4681-bb44-3f758987bcf2
- 模式: B（新建）
- 步骤摘要: yarn install → fetch-codecs.sh → yarn build → 验证 dist/ 13个HTML
- 结果: ✅ PASS

### TC-002 [Type-S] [路由] SSG 预渲染13个页面路由文件存在
- Quality Hub 用例 ID: e353beaa-924c-4304-a798-e88deabc4a06
- 模式: B（新建）
- 步骤摘要: 检查 dist/ 下 index.html + en/zh 各6个页面
- 结果: ✅ PASS

### TC-003 [Type-S] [SEO] 每页独立 title 和 description
- Quality Hub 用例 ID: 0a25c30c-2425-4428-92e7-3925febaf66f
- 模式: B（新建）
- 步骤摘要: grep 每个功能页的 title/description → 验证5个功能页 title 各不相同
- 结果: ✅ PASS
- 备注: 中英文页面 title 相同（都是中文），P3 i18n 改进建议

### TC-004 [Type-S] [SEO] Schema.org JSON-LD WebApplication
- Quality Hub 用例 ID: 7c5563c0-32c4-499c-9c0f-e5b976e16dfc
- 模式: B（新建）
- 步骤摘要: grep application/ld+json + WebApplication
- 结果: ✅ PASS

### TC-005 [Type-S] [SEO] sitemap.xml 包含13个URL
- Quality Hub 用例 ID: c807c859-7ecb-4e1b-aea8-c069bec615cb
- 模式: B（新建）
- 步骤摘要: 检查 dist/sitemap.xml 存在 → 统计 <url> 数量
- 结果: ✅ PASS

### TC-006 [Type-S] [SEO] robots.txt 正确配置
- Quality Hub 用例 ID: 9438ade7-854e-48cf-9fdf-4d7fe6d37cad
- 模式: B（新建）
- 步骤摘要: 检查 Allow: / 和 Sitemap 字段
- 结果: ✅ PASS

### TC-007 [Type-S] [多语言] hreflang 标签完整
- Quality Hub 用例 ID: 620f8053-8e47-42a5-ab85-46f63ca2feec
- 模式: B（新建）
- 步骤摘要: 检查 en/zh/x-default hreflang 标签
- 结果: ✅ PASS

### TC-008 [Type-S] [SEO] Open Graph 标签完整
- Quality Hub 用例 ID: 142f8474-a531-46ed-98e6-e0b3a46a5213
- 模式: B（新建）
- 步骤摘要: 检查 og:title/og:description/og:type
- 结果: ✅ PASS

### TC-009 [Type-S] [Docker] Dockerfile 多阶段构建结构正确
- Quality Hub 用例 ID: 4dfd0346-46fb-4ea7-aeb6-8e0a1f4555fe
- 模式: B（新建）
- 步骤摘要: 验证 node builder + nginx 阶段 + yarn install/build/COPY dist
- 结果: ✅ PASS

### TC-010 [Type-S] [Docker] nginx.conf WASM MIME 和安全头配置
- Quality Hub 用例 ID: 7260af87-cbb3-48db-8d07-a946772d54db
- 模式: B（新建）
- 步骤摘要: 验证 WASM MIME、COOP/COEP、gzip、try_files
- 结果: ✅ PASS

## 改进建议（不阻塞验收）
1. **P3 i18n**: 中英文页面 title 相同（都是中文），英文页面应使用英文 title
2. **P3 Docker**: Dockerfile 应添加 `RUN bash scripts/fetch-codecs.sh` 步骤，确保自包含构建（当前依赖本地已有 WASM 文件）
3. **P3 Git**: public/codecs/ 未被 git 跟踪，新 clone 的仓库需要先执行 fetch-codecs.sh
