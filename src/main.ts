import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { authStore } from './stores/auth.ts'
import { uiSettingsStore } from './stores/ui-settings.ts'
import { websocket } from './services/websocket.ts'
import type { AuthState } from './types/index.ts'

// 导入组件
import './components/layout/app-layout.ts'
import './components/layout/tab-bar.ts'
import './components/command-menu.ts'
import './pages/auth/login-page.ts'
import './pages/auth/register-page.ts'
import './pages/auth/forgot-password-page.ts'
import './pages/dashboard-page.ts'
import './pages/users-page.ts'
import './pages/user-detail-page.ts'
import './pages/settings-page.ts'
import './pages/messages-page.ts'
import './pages/files-page.ts'
import './pages/calendar-page.ts'
import './pages/analytics-page.ts'
import './pages/security-page.ts'
import './pages/privacy-page.ts'
import './pages/terms-page.ts'

type Route = 'login' | 'register' | 'forgot-password' | 'dashboard' | 'users' | 'user-detail' | 'settings' | 'messages' | 'files' | 'calendar' | 'analytics' | 'security' | 'privacy' | 'terms' | 'not-found'

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
  `

  @state()
  private currentRoute: Route = 'login'

  @state()
  private routeParams: Record<string, string> = {}

  @state()
  private authState: AuthState = authStore.getState()

  private unsubscribe?: () => void

  connectedCallback() {
    super.connectedCallback()

    // Initialize UI settings (apply saved skin)
    uiSettingsStore.getState()

    // Initialize WebSocket connection
    if (this.authState.isAuthenticated) {
      websocket.connect()
    }

    this.unsubscribe = authStore.subscribe((state) => {
      this.authState = state
      // 如果已登录且在认证页面，跳转到仪表盘
      if (state.isAuthenticated && this.isAuthRoute()) {
        this.navigate('dashboard')
      }
      // Connect/disconnect WebSocket based on auth state
      if (state.isAuthenticated && websocket.status === 'disconnected') {
        websocket.connect()
      } else if (!state.isAuthenticated && websocket.status === 'connected') {
        websocket.close()
      }
    })

    this.handlePopState()
    window.addEventListener('popstate', () => this.handlePopState())

    // Handle custom navigation events
    window.addEventListener('app:navigate', (e: Event) => {
      const customEvent = e as CustomEvent
      const path = customEvent.detail.path
      this.parseRoute(path)
      window.history.pushState({}, '', path)
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.unsubscribe?.()
    window.removeEventListener('popstate', () => this.handlePopState())
  }

  private isAuthRoute(): boolean {
    return ['login', 'register', 'forgot-password'].includes(this.currentRoute)
  }

  private handlePopState() {
    const path = window.location.pathname
    this.parseRoute(path)
  }

  private parseRoute(path: string) {
    // 解析路由
    if (path === '/' || path === '/login') {
      this.currentRoute = this.authState.isAuthenticated ? 'dashboard' : 'login'
    } else if (path === '/register') {
      this.currentRoute = 'register'
    } else if (path === '/forgot-password') {
      this.currentRoute = 'forgot-password'
    } else if (path === '/dashboard') {
      this.currentRoute = this.authState.isAuthenticated ? 'dashboard' : 'login'
    } else if (path === '/users') {
      this.currentRoute = this.authState.isAuthenticated ? 'users' : 'login'
    } else if (path.startsWith('/users/')) {
      const id = path.split('/')[2]
      this.routeParams = { id }
      this.currentRoute = this.authState.isAuthenticated ? 'user-detail' : 'login'
    } else if (path === '/messages') {
      this.currentRoute = this.authState.isAuthenticated ? 'messages' : 'login'
    } else if (path === '/files') {
      this.currentRoute = this.authState.isAuthenticated ? 'files' : 'login'
    } else if (path === '/calendar') {
      this.currentRoute = this.authState.isAuthenticated ? 'calendar' : 'login'
    } else if (path === '/analytics') {
      this.currentRoute = this.authState.isAuthenticated ? 'analytics' : 'login'
    } else if (path === '/security') {
      this.currentRoute = this.authState.isAuthenticated ? 'security' : 'login'
    } else if (path === '/settings') {
      this.currentRoute = this.authState.isAuthenticated ? 'settings' : 'login'
    } else if (path === '/privacy') {
      this.currentRoute = 'privacy'
    } else if (path === '/terms') {
      this.currentRoute = 'terms'
    } else {
      this.currentRoute = 'not-found'
    }
  }

  navigate(route: Route, params?: Record<string, string>) {
    this.currentRoute = route
    this.routeParams = params || {}

    let path = '/'
    switch (route) {
      case 'login':
        path = '/login'
        break
      case 'register':
        path = '/register'
        break
      case 'forgot-password':
        path = '/forgot-password'
        break
      case 'dashboard':
        path = '/dashboard'
        break
      case 'users':
        path = '/users'
        break
      case 'user-detail':
        path = `/users/${params?.id || ''}`
        break
      case 'messages':
        path = '/messages'
        break
      case 'files':
        path = '/files'
        break
      case 'calendar':
        path = '/calendar'
        break
      case 'analytics':
        path = '/analytics'
        break
      case 'security':
        path = '/security'
        break
      case 'settings':
        path = '/settings'
        break
      case 'privacy':
        path = '/privacy'
        break
      case 'terms':
        path = '/terms'
        break
    }
    window.history.pushState({}, '', path)
  }

  private handleNavigate(e: CustomEvent<{ route: Route; params?: Record<string, string> }>) {
    this.navigate(e.detail.route, e.detail.params)
  }

  render() {
    // 认证页面和公开页面
    if (this.isAuthRoute() || this.currentRoute === 'privacy' || this.currentRoute === 'terms') {
      return this.renderPublicPage()
    }

    // 需要登录的页面
    if (!this.authState.isAuthenticated) {
      this.navigate('login')
      return html``
    }

    // 带布局的页面
    return html`
      <command-menu></command-menu>
      <app-layout
        .currentRoute=${this.currentRoute}
        @navigate=${this.handleNavigate}
      >
        ${this.renderPage()}
      </app-layout>
    `
  }

  private renderPublicPage() {
    if (this.currentRoute === 'privacy') {
      return html`<privacy-page></privacy-page>`
    }
    if (this.currentRoute === 'terms') {
      return html`<terms-page></terms-page>`
    }
    return this.renderAuthPage()
  }

  private renderAuthPage() {
    switch (this.currentRoute) {
      case 'login':
        return html`<login-page @navigate=${this.handleNavigate}></login-page>`
      case 'register':
        return html`<register-page @navigate=${this.handleNavigate}></register-page>`
      case 'forgot-password':
        return html`<forgot-password-page @navigate=${this.handleNavigate}></forgot-password-page>`
      default:
        return html`<login-page @navigate=${this.handleNavigate}></login-page>`
    }
  }

  private renderPage() {
    switch (this.currentRoute) {
      case 'dashboard':
        return html`<dashboard-page></dashboard-page>`
      case 'users':
        return html`<users-page @navigate=${this.handleNavigate}></users-page>`
      case 'user-detail':
        return html`<user-detail-page .userId=${this.routeParams.id}></user-detail-page>`
      case 'messages':
        return html`<messages-page></messages-page>`
      case 'files':
        return html`<files-page></files-page>`
      case 'calendar':
        return html`<calendar-page></calendar-page>`
      case 'analytics':
        return html`<analytics-page></analytics-page>`
      case 'security':
        return html`<security-page></security-page>`
      case 'settings':
        return html`<settings-page></settings-page>`
      default:
        return html`<div class="p-8 text-center">
          <h1 class="text-2xl font-bold text-gray-900">404</h1>
          <p class="mt-2 text-gray-600">页面未找到</p>
        </div>`
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot
  }
}
