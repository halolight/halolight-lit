import type { ApiResponse, PaginatedResponse, User, DashboardSummary, ChartData, Activity, Task, Notification } from '../types/index.ts'
import {
  mockUsers,
  mockDashboardSummary,
  mockVisitsData,
  mockSalesData,
  mockPieData,
  mockActivities,
  mockTasks,
  mockNotifications,
} from './data.ts'

// API 模拟延迟
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// 成功响应包装
function success<T>(data: T): ApiResponse<T> {
  return { code: 200, message: 'success', data }
}

// 错误响应包装
function error(message: string, code: number = 400): ApiResponse<null> {
  return { code, message, data: null }
}

// Mock API 服务
export const mockApi = {
  // 认证相关
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string } | null>> {
    await delay(600)
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL || 'admin@example.com'
    const demoPassword = import.meta.env.VITE_DEMO_PASSWORD || '123456'

    if (email === demoEmail && password === demoPassword) {
      const user: User = {
        id: '1',
        name: '管理员',
        email: demoEmail,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        role: 'admin',
        status: 'active',
        department: '技术部',
        position: '系统管理员',
        createdAt: '2024-01-01T00:00:00Z',
        lastLoginAt: new Date().toISOString(),
      }
      return success({ user, token: 'mock-jwt-token-' + Date.now() })
    }
    return error('邮箱或密码错误', 401)
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    await delay(200)
    const user = mockUsers[0]
    return success(user)
  },

  // 用户管理
  async getUsers(page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<User>>> {
    await delay(400)
    const start = (page - 1) * pageSize
    const items = mockUsers.slice(start, start + pageSize)
    return success({
      items,
      total: mockUsers.length,
      page,
      pageSize,
      totalPages: Math.ceil(mockUsers.length / pageSize),
    })
  },

  async getUserById(id: string): Promise<ApiResponse<User | null>> {
    await delay(300)
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      return success(user)
    }
    return error('用户不存在', 404)
  },

  // 仪表盘
  async getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
    await delay(400)
    return success(mockDashboardSummary)
  },

  async getVisitsChart(): Promise<ApiResponse<ChartData>> {
    await delay(300)
    return success(mockVisitsData)
  },

  async getSalesChart(): Promise<ApiResponse<ChartData>> {
    await delay(300)
    return success(mockSalesData)
  },

  async getPieChart(): Promise<ApiResponse<ChartData>> {
    await delay(200)
    return success(mockPieData)
  },

  async getActivities(): Promise<ApiResponse<Activity[]>> {
    await delay(300)
    return success(mockActivities)
  },

  async getTasks(): Promise<ApiResponse<Task[]>> {
    await delay(200)
    return success(mockTasks)
  },

  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    await delay(200)
    return success(mockNotifications)
  },

  async getRecentUsers(limit: number = 5): Promise<ApiResponse<User[]>> {
    await delay(200)
    return success(mockUsers.slice(0, limit))
  },
}
