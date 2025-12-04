// 环境变量配置
export const config = {
  // 基础配置
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  useMock: import.meta.env.VITE_MOCK !== 'false',

  // 演示账号配置
  demoEmail: import.meta.env.VITE_DEMO_EMAIL || 'admin@halolight.h7ml.cn',
  demoPassword: import.meta.env.VITE_DEMO_PASSWORD || '123456',
  showDemoHint: import.meta.env.VITE_SHOW_DEMO_HINT !== 'false',

  // WebSocket 配置
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',

  // 应用配置
  appTitle: import.meta.env.VITE_APP_TITLE || 'Admin Pro',
  brandName: import.meta.env.VITE_BRAND_NAME || 'Halolight',

  // 可选配置
  gaId: import.meta.env.VITE_GA_ID || '',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
}

// 路由配置
export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  users: '/users',
  userDetail: '/users/:id',
  messages: '/messages',
  files: '/files',
  calendar: '/calendar',
  security: '/security',
  settings: '/settings',
  analytics: '/analytics',
}

// 菜单配置
export const menuItems = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'layout-dashboard',
    path: routes.dashboard,
  },
  {
    key: 'users',
    label: '用户管理',
    icon: 'users',
    path: routes.users,
  },
  {
    key: 'messages',
    label: '消息中心',
    icon: 'message-square',
    path: routes.messages,
  },
  {
    key: 'files',
    label: '文件管理',
    icon: 'folder',
    path: routes.files,
  },
  {
    key: 'calendar',
    label: '日历',
    icon: 'calendar',
    path: routes.calendar,
  },
  {
    key: 'analytics',
    label: '分析报告',
    icon: 'bar-chart-2',
    path: routes.analytics,
  },
  {
    key: 'security',
    label: '安全审计',
    icon: 'shield',
    path: routes.security,
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: 'settings',
    path: routes.settings,
  },
]

// 存储 key
export const storageKeys = {
  token: 'halolight_token',
  user: 'halolight_user',
  theme: 'halolight_theme',
  sidebarCollapsed: 'halolight_sidebar_collapsed',
}
