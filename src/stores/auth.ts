import type { User, AuthState } from '../types/index.ts'
import { storageKeys } from '../config/index.ts'

type AuthListener = (state: AuthState) => void

// 简单的认证状态管理
class AuthStore {
  private state: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  }

  private listeners: Set<AuthListener> = new Set()

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    try {
      const token = localStorage.getItem(storageKeys.token)
      const userStr = localStorage.getItem(storageKeys.user)
      if (token && userStr) {
        this.state = {
          user: JSON.parse(userStr),
          token,
          isAuthenticated: true,
          loading: false,
        }
      }
    } catch {
      this.clearStorage()
    }
  }

  private saveToStorage() {
    if (this.state.token && this.state.user) {
      localStorage.setItem(storageKeys.token, this.state.token)
      localStorage.setItem(storageKeys.user, JSON.stringify(this.state.user))
    }
  }

  private clearStorage() {
    localStorage.removeItem(storageKeys.token)
    localStorage.removeItem(storageKeys.user)
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state))
  }

  subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getState(): AuthState {
    return { ...this.state }
  }

  async login(email: string, password: string): Promise<boolean> {
    this.state = { ...this.state, loading: true }
    this.notify()

    // 模拟 API 请求延迟
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Demo 账户验证
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

      this.state = {
        user,
        token: 'mock-jwt-token-' + Date.now(),
        isAuthenticated: true,
        loading: false,
      }
      this.saveToStorage()
      this.notify()
      return true
    }

    this.state = { ...this.state, loading: false }
    this.notify()
    return false
  }

  async register(name: string, email: string, _password: string): Promise<boolean> {
    this.state = { ...this.state, loading: true }
    this.notify()

    // 模拟 API 请求延迟
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: 'viewer',
      status: 'active',
      department: '',
      position: '',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    }

    this.state = {
      user,
      token: 'mock-jwt-token-' + Date.now(),
      isAuthenticated: true,
      loading: false,
    }
    this.saveToStorage()
    this.notify()
    return true
  }

  logout() {
    this.state = {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    }
    this.clearStorage()
    this.notify()
  }
}

export const authStore = new AuthStore()
