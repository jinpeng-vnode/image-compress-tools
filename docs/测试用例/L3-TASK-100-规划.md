# L3-TASK-100 图片压缩工具站黑盒测试规划

## 关联信息
- Issue: #18 TASK-100: 已上线站点黑盒测试验证
- PRD: docs/产品/ (如有)
- 设计文档: design/ (如有)

## 测试目标
对图片压缩工具站进行黑盒巡检，验证所有功能页面的可访问性、视觉效果和交互功能。

## 测试范围
- 首页: http://host.docker.internal:8088/ 或 http://192.168.3.9:8088/
- PNG压缩页面
- JPEG压缩页面  
- WebP转换页面
- AVIF转换页面
- 图片尺寸调整页面
- 中英文双语版本

## 用例清单

### TC-001 [Type-U] 首页访问和导航
- 步骤: navigate → snapshot → 检查页面结构 → screenshot
- 预期: 页面正常加载，显示导航菜单和功能入口
- URL: http://192.168.3.9:8088/
- 状态: ❌ BLOCKED - 服务返回502错误

### TC-002 [Type-U] PNG压缩页面功能
- 步骤: navigate → snapshot → 检查上传区域和选项 → screenshot  
- 预期: 显示文件上传区域和压缩选项
- URL: http://192.168.3.9:8088/png
- 状态: ❌ BLOCKED - 依赖首页导航

### TC-003 [Type-U] JPEG压缩页面功能
- 步骤: navigate → snapshot → 检查上传区域和选项 → screenshot
- 预期: 显示文件上传区域和质量调节选项
- URL: http://192.168.3.9:8088/jpeg  
- 状态: ❌ BLOCKED - 依赖首页导航

### TC-004 [Type-U] WebP转换页面功能
- 步骤: navigate → snapshot → 检查上传区域和选项 → screenshot
- 预期: 显示文件上传区域和WebP转换选项
- URL: http://192.168.3.9:8088/webp
- 状态: ❌ BLOCKED - 依赖首页导航

### TC-005 [Type-U] AVIF转换页面功能  
- 步骤: navigate → snapshot → 检查上传区域和选项 → screenshot
- 预期: 显示文件上传区域和AVIF转换选项
- URL: http://192.168.3.9:8088/avif
- 状态: ❌ BLOCKED - 依赖首页导航

### TC-006 [Type-U] 图片尺寸调整页面功能
- 步骤: navigate → snapshot → 检查上传区域和尺寸选项 → screenshot  
- 预期: 显示文件上传区域和尺寸调整选项
- URL: http://192.168.3.9:8088/resize
- 状态: ❌ BLOCKED - 依赖首页导航

### TC-007 [Type-U] 中英文语言切换
- 步骤: navigate → snapshot → click 语言切换按钮 → snapshot 验证 → screenshot
- 预期: 页面内容切换为对应语言，URL包含语言标识
- URL: http://192.168.3.9:8088/
- 状态: ❌ BLOCKED - 服务无法访问

### TC-008 [Type-V] 视觉效果检查
- 步骤: navigate → screenshot → 上传图床 → 检查布局/图标/字体
- 预期: 页面布局正常，图标清晰，字体可读
- URL: 所有页面
- 状态: ❌ BLOCKED - 服务无法访问

## 阻塞问题
- **P1-DEPLOY-001**: 服务返回502错误，无法访问任何页面
- 相关Issue: #20
- 影响: 所有测试用例无法执行

## 执行计划
1. 等待 #20 Bug修复
2. 服务恢复后重新执行所有用例
3. 每个页面截图上传到 https://iili.io/
4. 记录发现的问题并创建Bug Issue

## 验收标准映射
1. ✅ Playwright MCP浏览器工具访问 → TC-001~007
2. ✅ 检查视觉效果 → TC-008  
3. ✅ 检查功能交互 → TC-002~006
4. ✅ 检查双语切换 → TC-007
5. ✅ 每页截图留证 → 所有用例
6. ✅ 发现问题创建Bug → P1-DEPLOY-001已创建