// 主题状态管理
export type Theme = 'light' | 'dark' | 'auto'

interface ThemeState {
  theme: Theme
  isDark: boolean
}

class ThemeStore {
  private state: ThemeState = {
    theme: 'light',
    isDark: false,
  }

  private listeners: Set<(state: ThemeState) => void> = new Set()

  constructor() {
    // 从 localStorage 加载主题
    const savedTheme = localStorage.getItem('halolight_theme') as Theme
    if (savedTheme) {
      this.state.theme = savedTheme
    } else {
      // 检测系统主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      this.state.theme = prefersDark ? 'dark' : 'light'
    }

    this.updateIsDark()
    this.applyTheme()

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.state.theme === 'auto') {
        this.updateIsDark()
        this.applyTheme()
        this.notify()
      }
    })
  }

  private updateIsDark() {
    if (this.state.theme === 'auto') {
      this.state.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      this.state.isDark = this.state.theme === 'dark'
    }
  }

  private applyTheme() {
    if (this.state.isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state))
  }

  getState(): ThemeState {
    return { ...this.state }
  }

  setTheme(theme: Theme) {
    this.state.theme = theme
    localStorage.setItem('halolight_theme', theme)
    this.updateIsDark()
    this.applyTheme()
    this.notify()
  }

  toggleTheme() {
    const newTheme = this.state.isDark ? 'light' : 'dark'
    this.setTheme(newTheme)
  }

  subscribe(listener: (state: ThemeState) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
}

export const themeStore = new ThemeStore()
