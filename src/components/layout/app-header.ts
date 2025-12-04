import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { User } from '../../types/index.ts'
import '../ui/theme-toggle.ts'

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .header {
      position: fixed;
      top: 0;
      right: 0;
      left: 256px;
      height: 64px;
      background: var(--card-bg, white);
      border-bottom: 1px solid var(--border-color, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 30;
      transition: left 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
    }

    .header.collapsed {
      left: 64px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .menu-toggle {
      display: none;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
      border-radius: 8px;
    }

    .menu-toggle:hover {
      background: #f1f5f9;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: #f8fafc;
      border-radius: 8px;
      width: 300px;
    }

    .search-box input {
      border: none;
      background: none;
      outline: none;
      width: 100%;
      font-size: 14px;
      color: #1e293b;
    }

    .search-box input::placeholder {
      color: #94a3b8;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .icon-btn {
      position: relative;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
      border-radius: 8px;
      transition: all 0.2s;
    }

    .icon-btn:hover {
      background: #f1f5f9;
      color: #1e293b;
    }

    .icon-btn svg {
      width: 20px;
      height: 20px;
    }

    .badge {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 12px 6px 6px;
      background: #f8fafc;
      border-radius: 24px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .user-menu:hover {
      background: #f1f5f9;
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
    }

    .user-role {
      font-size: 12px;
      color: #64748b;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      min-width: 200px;
      overflow: hidden;
      z-index: 50;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s;
    }

    .dropdown-item:hover {
      background: #f8fafc;
      color: #1e293b;
    }

    .dropdown-item.danger {
      color: #ef4444;
    }

    .dropdown-item.danger:hover {
      background: #fef2f2;
    }

    .dropdown-divider {
      height: 1px;
      background: #e2e8f0;
      margin: 4px 0;
    }

    .user-menu-wrapper {
      position: relative;
    }

    @media (max-width: 768px) {
      .header {
        left: 0;
      }

      .menu-toggle {
        display: block;
      }

      .search-box {
        display: none;
      }
    }
  `

  @property({ type: Object })
  user: User | null = null

  @property({ type: Boolean })
  sidebarCollapsed = false

  @state()
  private showDropdown = false

  private roleLabels: Record<string, string> = {
    admin: '管理员',
    manager: '经理',
    editor: '编辑',
    viewer: '访客',
  }

  private handleToggle() {
    this.dispatchEvent(new CustomEvent('toggle-sidebar', { bubbles: true, composed: true }))
  }

  private handleLogout() {
    this.showDropdown = false
    this.dispatchEvent(new CustomEvent('logout', { bubbles: true, composed: true }))
  }

  private handleSettings() {
    this.showDropdown = false
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route: 'settings' },
      bubbles: true,
      composed: true,
    }))
  }

  private handleMessages() {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route: 'messages' },
      bubbles: true,
      composed: true,
    }))
  }

  render() {
    return html`
      <header class="header ${this.sidebarCollapsed ? 'collapsed' : ''}">
        <div class="header-left">
          <button class="menu-toggle" @click=${this.handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="搜索..." />
          </div>
        </div>

        <div class="header-right">
          <theme-toggle></theme-toggle>

          <button class="icon-btn" @click=${this.handleMessages}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="badge"></span>
          </button>

          <div class="user-menu-wrapper">
            <div class="user-menu" @click=${() => (this.showDropdown = !this.showDropdown)}>
              <img
                class="avatar"
                src=${this.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt="avatar"
              />
              <div class="user-info">
                <span class="user-name">${this.user?.name || '用户'}</span>
                <span class="user-role">${this.roleLabels[this.user?.role || 'viewer']}</span>
              </div>
            </div>

            ${this.showDropdown
              ? html`
                  <div class="dropdown">
                    <div class="dropdown-item" @click=${this.handleSettings}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      设置
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item danger" @click=${this.handleLogout}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      退出登录
                    </div>
                  </div>
                `
              : ''}
          </div>
        </div>
      </header>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader
  }
}
