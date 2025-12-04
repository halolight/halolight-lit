import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { menuItems, storageKeys } from '../../config/index.ts'
import { authStore } from '../../stores/auth.ts'
import type { AuthState } from '../../types/index.ts'
import './app-sidebar.ts'
import './app-header.ts'
import './app-footer.ts'

@customElement('app-layout')
export class AppLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f8fafc;
    }

    .layout {
      display: flex;
      min-height: 100vh;
    }

    .main-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 256px;
      transition: margin-left 0.3s ease;
    }

    .main-container.collapsed {
      margin-left: 64px;
    }

    .main-content {
      flex: 1;
      padding: 24px;
      margin-top: 64px;
      display: flex;
      flex-direction: column;
    }

    .page-content {
      flex: 1;
    }

    @media (max-width: 768px) {
      .main-container {
        margin-left: 0;
      }
    }
  `

  @property({ type: String })
  currentRoute = 'dashboard'

  @state()
  private sidebarCollapsed = false

  @state()
  private authState: AuthState = authStore.getState()

  private unsubscribe?: () => void

  connectedCallback() {
    super.connectedCallback()
    const saved = localStorage.getItem(storageKeys.sidebarCollapsed)
    this.sidebarCollapsed = saved === 'true'
    this.unsubscribe = authStore.subscribe((state) => {
      this.authState = state
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.unsubscribe?.()
  }

  private handleToggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed
    localStorage.setItem(storageKeys.sidebarCollapsed, String(this.sidebarCollapsed))
  }

  private handleNavigate(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: e.detail }))
  }

  private handleLogout() {
    authStore.logout()
    this.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'login' } }))
  }

  render() {
    return html`
      <div class="layout">
        <app-sidebar
          .collapsed=${this.sidebarCollapsed}
          .menuItems=${menuItems}
          .currentRoute=${this.currentRoute}
          @navigate=${this.handleNavigate}
          @toggle=${this.handleToggleSidebar}
        ></app-sidebar>

        <div class="main-container ${this.sidebarCollapsed ? 'collapsed' : ''}">
          <app-header
            .user=${this.authState.user}
            .sidebarCollapsed=${this.sidebarCollapsed}
            @toggle-sidebar=${this.handleToggleSidebar}
            @logout=${this.handleLogout}
            @navigate=${this.handleNavigate}
          ></app-header>

          <main class="main-content">
            <div class="page-content">
              <slot></slot>
            </div>
            <app-footer></app-footer>
          </main>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-layout': AppLayout
  }
}
