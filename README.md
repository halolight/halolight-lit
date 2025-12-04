# HaloLight Lit | Admin Pro

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/halolight/halolight-lit/blob/main/LICENSE)
[![Lit](https://img.shields.io/badge/Lit-3-%23325CFF.svg)](https://lit.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-%233178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-%2306B6D4.svg)](https://tailwindcss.com/)

基于 Lit + Vite 的 Web Components 中文后台管理系统，具备原生组件化、Shadow DOM 隔离和跨框架能力。

- 在线预览：<https://halolight-lit.h7ml.cn>
- GitHub：<https://github.com/halolight/halolight-lit>

## 🚀 功能亮点

- **Web Components**：基于浏览器原生标准
- **Shadow DOM**：完美的样式隔离
- **跨框架使用**：可在 React/Vue/Angular 中使用
- **TypeScript**：完整类型安全支持
- **装饰器语法**：简洁的组件定义
- **Tailwind CSS**：原子化样式
- **完整功能**：认证系统、仪表盘、用户管理、系统设置
- **响应式设计**：适配桌面端和移动端
- **中文界面**：完整的本土化支持
- **Mock 数据**：内置模拟数据，无需后端即可运行
- **深色模式**：支持明暗主题切换

## 📁 目录结构

```
src/
├── components/         # Web Components
│   ├── dashboard/     # 仪表盘组件
│   ├── layout/        # 布局组件
│   └── ui/            # UI 组件
├── pages/             # 页面组件
│   ├── auth/          # 认证页面
│   ├── dashboard-page.ts
│   ├── users-page.ts
│   ├── user-detail-page.ts
│   └── settings-page.ts
├── stores/            # 状态管理
├── mock/              # Mock 数据
├── types/             # 类型定义
├── config/            # 配置
└── main.ts            # 应用入口
```

## 🚪 认证信息

### 演示账户

- **邮箱**: `admin@halolight.h7ml.cn`
- **密码**: `123456`

## 🔧 环境变量

项目包含以下环境变量配置文件：

- `.env.example` - 环境变量模板（提交到版本控制）
- `.env.development` - 开发环境配置（提交到版本控制）
- `.env.production` - 生产环境配置（提交到版本控制）
- `.env.local` - 本地环境配置（不提交，从 `.env.example` 复制并修改）

### 基础配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_API_URL` | API 基础 URL | `/api` |
| `VITE_MOCK` | 启用 Mock 数据 | `true` |

### 演示账号配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_DEMO_EMAIL` | 演示账户邮箱 | `admin@halolight.h7ml.cn` |
| `VITE_DEMO_PASSWORD` | 演示账户密码 | `123456` |
| `VITE_SHOW_DEMO_HINT` | 显示演示提示 | `true` |

### WebSocket 配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_WS_URL` | WebSocket 服务器地址 | `ws://localhost:3001` |

### 应用配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_APP_TITLE` | 应用标题 | `Admin Pro` |
| `VITE_BRAND_NAME` | 品牌名称 | `Halolight` |

### 可选配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_GA_ID` | Google Analytics ID | - |
| `VITE_SENTRY_DSN` | Sentry DSN（错误追踪） | - |

## 🛠️ 技术栈

- **核心框架**: Lit 3
- **构建工具**: Vite 7
- **类型系统**: TypeScript 5.9
- **样式**: Tailwind CSS 3.4
- **图标**: Lucide
- **图表**: Chart.js
- **日期**: Day.js
- **路由**: 自定义路由系统

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 📋 功能清单

### 认证系统
- ✅ 登录页面
- ✅ 注册页面
- ✅ 忘记密码
- ✅ 记住登录状态

### 仪表盘
- ✅ 数据统计卡片
- ✅ 访问趋势图表
- ✅ 销售统计图表
- ✅ 最近活动列表
- ✅ 待办任务管理
- ✅ 流量来源饼图

### 用户管理
- ✅ 用户列表展示
- ✅ 搜索和筛选
- ✅ 分页功能
- ✅ 用户详情页面
- ✅ 用户信息编辑

### 系统设置
- ✅ 个人资料编辑
- ✅ 通知设置
- ✅ 外观设置（深色模式）
- ✅ 关于信息

## 🎯 开发规范

### 组件命名
- 自定义元素使用 kebab-case（如 `app-button`）
- 必须包含连字符

### 文件结构
- 每个组件单独文件
- 类型定义集中管理
- 配置统一管理

### 样式规范
- 使用 Tailwind CSS 类名
- 组件内部样式使用 Shadow DOM
- 全局样式通过 CSS 变量控制主题

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关项目

- [HaloLight 文档](https://github.com/halolight/docs)
- [HaloLight Next.js](https://github.com/halolight/halolight)
- [HaloLight Vue](https://github.com/halolight/halolight-vue)

## 💬 支持

如有问题或建议，请在 [GitHub Issues](https://github.com/halolight/halolight-lit/issues) 中提交。