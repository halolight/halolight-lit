# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Halolight Lit 是一个基于 Lit + Vite 的 Web Components 中文后台管理系统，具备原生组件化和跨框架能力。

- **在线预览**: https://halolight-lit.h7ml.cn
- **GitHub**: https://github.com/halolight/halolight-lit

## 技术栈速览

- **核心框架**: Lit 3
- **构建工具**: Vite
- **路由**: @lit/router
- **样式**: Tailwind CSS 3.4 + CSS-in-JS
- **类型**: TypeScript 5.9

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 生产构建
pnpm preview      # 预览构建产物
```

## 架构

### Lit 核心概念

```typescript
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("my-counter")
export class MyCounter extends LitElement {
  static styles = css`
    button { padding: 8px 16px; }
  `;

  @state()
  private count = 0;

  render() {
    return html`
      <button @click=${() => this.count++}>
        Count: ${this.count}
      </button>
    `;
  }
}
```

### 目录结构

```
src/
├── main.ts           # 应用入口
├── components/       # Web Components
│   └── my-element.ts
├── styles/           # 全局样式
└── index.html        # HTML 入口
```

### Lit 特性

- **Web Components**：基于浏览器原生标准
- **Shadow DOM**：样式隔离
- **装饰器**：简洁的组件定义
- **响应式属性**：自动更新视图

### 装饰器使用

```typescript
import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

@customElement("user-card")
export class UserCard extends LitElement {
  // 公开属性（可从外部传入）
  @property({ type: String })
  name = "";

  // 内部状态
  @state()
  private loading = false;

  // DOM 查询
  @query("#input")
  private input!: HTMLInputElement;
}
```

### 模板语法

```typescript
render() {
  return html`
    <!-- 属性绑定 -->
    <div class=${this.active ? "active" : ""}>
    
    <!-- 布尔属性 -->
    <button ?disabled=${this.loading}>Submit</button>
    
    <!-- 事件绑定 -->
    <button @click=${this.handleClick}>Click</button>
    
    <!-- 属性设置 -->
    <input .value=${this.inputValue}>
    
    <!-- 条件渲染 -->
    ${this.loading ? html`<spinner-el></spinner-el>` : html`<content-el></content-el>`}
    
    <!-- 列表渲染 -->
    ${this.items.map(item => html`<li>${item}</li>`)}
  `;
}
```

### 代码规范

- **自定义元素命名**: 使用 kebab-case，必须包含连字符
- **装饰器**: 使用 TypeScript 装饰器定义组件
- **样式隔离**: 使用 Shadow DOM 和 `static styles`

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_API_URL` | API 基础 URL | `/api` |
| `VITE_MOCK` | 启用 Mock 数据 | `true` |
| `VITE_APP_TITLE` | 应用标题 | `Admin Pro` |

## 新增功能开发指南

### 添加新组件

```typescript
// src/components/app-button.ts
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-button")
export class AppButton extends LitElement {
  static styles = css`
    button {
      padding: 8px 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #2563eb;
    }
  `;

  @property({ type: Boolean })
  disabled = false;

  render() {
    return html`
      <button ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}
```

### 添加新页面

```typescript
// src/pages/dashboard-page.ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("dashboard-page")
export class DashboardPage extends LitElement {
  static styles = css`
    :host { display: block; padding: 16px; }
  `;

  @state()
  private stats = { total: 0 };

  render() {
    return html`
      <h1>Dashboard</h1>
      <p>Total: ${this.stats.total}</p>
    `;
  }
}
```

## 注意事项

- **自定义元素注册**: 确保在使用前注册组件
- **Shadow DOM**: 样式不会泄漏到外部
- **跨框架使用**: Web Components 可在任何框架中使用
