import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { config } from '../../config/index.ts'

interface MenuItem {
  key: string
  label: string
  icon: string
  path?: string
}

@customElement('app-sidebar')
export class AppSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 256px;
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      color: white;
      transition: width 0.3s ease;
      z-index: 40;
      overflow: hidden;
    }

    .sidebar.collapsed {
      width: 64px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      flex-shrink: 0;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      transition: opacity 0.3s;
    }

    .sidebar.collapsed .logo-text {
      opacity: 0;
    }

    .menu {
      padding: 16px 12px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 4px;
      color: #94a3b8;
      text-decoration: none;
    }

    .menu-item:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .menu-item.active {
      background: rgba(59, 130, 246, 0.2);
      color: #3b82f6;
    }

    .menu-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-icon svg {
      width: 20px;
      height: 20px;
    }

    .menu-label {
      white-space: nowrap;
      transition: opacity 0.3s;
    }

    .sidebar.collapsed .menu-label {
      opacity: 0;
    }

    .toggle-btn {
      position: absolute;
      bottom: 20px;
      left: 12px;
      right: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 8px;
      color: #94a3b8;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .toggle-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }
      .sidebar.mobile-open {
        transform: translateX(0);
      }
    }
  `

  @property({ type: Boolean })
  collapsed = false

  @property({ type: Array })
  menuItems: MenuItem[] = []

  @property({ type: String })
  currentRoute = 'dashboard'

  private getIcon(name: string) {
    const icons: Record<string, string> = {
      'layout-dashboard': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>',
      'users': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      'message-square': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
      'folder': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
      'calendar': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
      'bar-chart-2': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
      'shield': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
      'settings': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
      'chevron-left': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
      'chevron-right': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    }
    return icons[name] || icons['layout-dashboard']
  }

  private handleMenuClick(item: MenuItem) {
    const routeMap: Record<string, string> = {
      dashboard: 'dashboard',
      users: 'users',
      messages: 'messages',
      files: 'files',
      calendar: 'calendar',
      analytics: 'analytics',
      security: 'security',
      settings: 'settings',
    }
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route: routeMap[item.key] || 'dashboard' },
      bubbles: true,
      composed: true,
    }))
  }

  private handleToggle() {
    this.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <aside class="sidebar ${this.collapsed ? 'collapsed' : ''}">
        <div class="logo">
          <div class="logo-icon">H</div>
          <span class="logo-text">${config.brandName}</span>
        </div>

        <nav class="menu">
          ${this.menuItems.map((item) => html`
            <a
              class="menu-item ${this.currentRoute === item.key ? 'active' : ''}"
              @click=${() => this.handleMenuClick(item)}
            >
              <span class="menu-icon" .innerHTML=${this.getIcon(item.icon)}></span>
              <span class="menu-label">${item.label}</span>
            </a>
          `)}
        </nav>

        <button class="toggle-btn" @click=${this.handleToggle}>
          <span .innerHTML=${this.getIcon(this.collapsed ? 'chevron-right' : 'chevron-left')}></span>
        </button>
      </aside>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-sidebar': AppSidebar
  }
}
