# Halolight Lit | Admin Pro

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/halolight/halolight-lit/blob/main/LICENSE)
[![Lit](https://img.shields.io/badge/Lit-3-%23325CFF.svg)](https://lit.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-%233178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-%2306B6D4.svg)](https://tailwindcss.com/)

基于 Lit + Vite 的 Web Components 中文后台管理系统，具备原生组件化、Shadow DOM 隔离和跨框架能力。

- 在线预览：<https://halolight-lit.h7ml.cn>
- GitHub：<https://github.com/halolight/halolight-lit>

## 功能亮点

- **Web Components**：基于浏览器原生标准
- **Shadow DOM**：完美的样式隔离
- **跨框架使用**：可在 React/Vue/Angular 中使用
- **TypeScript**：完整类型安全支持
- **装饰器语法**：简洁的组件定义
- **Tailwind CSS**：原子化样式

## 目录结构

```
src/
├── main.ts           # 应用入口
├── components/       # Web Components
│   └── my-element.ts
├── styles/           # 全局样式
└── index.html        # HTML 入口
```

## 快速开始

```bash
pnpm install
pnpm dev         # 开发模式
pnpm build       # 生产构建
pnpm preview     # 预览构建产物
```

## 技术栈

| 类别 | 技术 |
|------|------|
| 核心框架 | Lit 3 |
| 类型系统 | TypeScript 5.9 |
| 构建工具 | Vite |
| 样式 | Tailwind CSS 3.4 + Shadow DOM |

## 为什么选择 Lit

- **Web 标准**：基于 Custom Elements 和 Shadow DOM
- **极小体积**：约 5KB gzipped
- **跨框架**：组件可在任何框架中使用
- **性能优异**：高效的更新机制

## 许可证

[MIT](LICENSE)
