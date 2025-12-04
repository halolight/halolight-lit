// 用户类型
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: Role
  status: UserStatus
  department: string
  position: string
  phone?: string
  createdAt: string
  lastLoginAt: string
}

export type Role = 'admin' | 'manager' | 'editor' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'suspended'

// 认证类型
export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  accounts?: User[]
  activeAccountId?: string | null
}

// API 响应类型
export interface ApiResponse<T> {
  code: number
  message: string
  data: T | null
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 仪表盘类型
export interface DashboardSummary {
  totalUsers: number
  activeUsers: number
  totalOrders: number
  totalRevenue: number
  newUsers: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
  userGrowth: number
  orderGrowth: number
  revenueGrowth: number
  conversionRate: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
  }[]
}

export interface Activity {
  id: string
  type: 'login' | 'order' | 'user' | 'system'
  title: string
  description: string
  timestamp: string
  user?: Pick<User, 'id' | 'name' | 'avatar'>
}

export interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'system' | 'user' | 'task'
  title: string
  message?: string
  content?: string
  read: boolean
  createdAt: string
}

// 小部件类型
export type WidgetType =
  | 'stats'
  | 'chart-line'
  | 'chart-bar'
  | 'chart-pie'
  | 'recent-users'
  | 'notifications'
  | 'tasks'
  | 'calendar'
  | 'quick-actions'

export interface DashboardWidget {
  id: string
  type: WidgetType
  title: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}

// 路由类型
export interface RouteConfig {
  path: string
  component: string
  title: string
  icon?: string
  requiresAuth?: boolean
  children?: RouteConfig[]
}

// 菜单项类型
export interface MenuItem {
  key: string
  label: string
  icon: string
  path?: string
  children?: MenuItem[]
}
