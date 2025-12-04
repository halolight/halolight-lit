import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { authStore } from '../stores/auth.ts'
import { config } from '../config/index.ts'
import type { AuthState } from '../types/index.ts'

@customElement('settings-page')
export class SettingsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .page-subtitle {
      color: #64748b;
      margin: 4px 0 0;
    }

    .settings-grid {
      display: grid;
      gap: 24px;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #f1f5f9;
      padding: 24px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 6px;
    }

    .form-input {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      box-sizing: border-box;
      transition: all 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .setting-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .setting-item:first-child {
      padding-top: 0;
    }

    .setting-info {
      flex: 1;
    }

    .setting-title {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .setting-desc {
      font-size: 13px;
      color: #64748b;
      margin: 0;
    }

    .toggle {
      position: relative;
      width: 44px;
      height: 24px;
      background: #e2e8f0;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .toggle.active {
      background: #3b82f6;
    }

    .toggle-knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .toggle.active .toggle-knob {
      transform: translateX(20px);
    }

    .save-btn {
      padding: 10px 24px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .save-btn:hover {
      background: #2563eb;
    }

    .danger-zone {
      border-color: #fecaca;
    }

    .danger-zone .card-title {
      color: #dc2626;
    }

    .danger-btn {
      padding: 10px 24px;
      background: white;
      color: #dc2626;
      border: 1px solid #dc2626;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .danger-btn:hover {
      background: #fef2f2;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `

  @state()
  private authState: AuthState = authStore.getState()

  @state()
  private notifications = {
    email: true,
    push: false,
    sms: false,
  }

  @state()
  private darkMode = false

  private unsubscribe?: () => void

  connectedCallback() {
    super.connectedCallback()
    this.unsubscribe = authStore.subscribe((state) => {
      this.authState = state
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.unsubscribe?.()
  }

  private toggleNotification(key: keyof typeof this.notifications) {
    this.notifications = {
      ...this.notifications,
      [key]: !this.notifications[key],
    }
  }

  private toggleDarkMode() {
    this.darkMode = !this.darkMode
    document.documentElement.classList.toggle('dark', this.darkMode)
  }

  render() {
    const user = this.authState.user

    return html`
      <div class="page-header">
        <h1 class="page-title">系统设置</h1>
        <p class="page-subtitle">管理您的账户和应用设置</p>
      </div>

      <div class="settings-grid">
        <div class="card">
          <h2 class="card-title">个人资料</h2>
          <form>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">姓名</label>
                <input type="text" class="form-input" .value=${user?.name || ''} />
              </div>
              <div class="form-group">
                <label class="form-label">邮箱</label>
                <input type="email" class="form-input" .value=${user?.email || ''} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">部门</label>
                <input type="text" class="form-input" .value=${user?.department || ''} />
              </div>
              <div class="form-group">
                <label class="form-label">职位</label>
                <input type="text" class="form-input" .value=${user?.position || ''} />
              </div>
            </div>
            <button type="button" class="save-btn">保存修改</button>
          </form>
        </div>

        <div class="card">
          <h2 class="card-title">通知设置</h2>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">邮件通知</h3>
              <p class="setting-desc">接收重要更新和活动的邮件通知</p>
            </div>
            <div
              class="toggle ${this.notifications.email ? 'active' : ''}"
              @click=${() => this.toggleNotification('email')}
            >
              <div class="toggle-knob"></div>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">推送通知</h3>
              <p class="setting-desc">在浏览器中接收实时推送通知</p>
            </div>
            <div
              class="toggle ${this.notifications.push ? 'active' : ''}"
              @click=${() => this.toggleNotification('push')}
            >
              <div class="toggle-knob"></div>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">短信通知</h3>
              <p class="setting-desc">接收重要安全提醒的短信通知</p>
            </div>
            <div
              class="toggle ${this.notifications.sms ? 'active' : ''}"
              @click=${() => this.toggleNotification('sms')}
            >
              <div class="toggle-knob"></div>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="card-title">外观设置</h2>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">深色模式</h3>
              <p class="setting-desc">使用深色主题减少眼睛疲劳</p>
            </div>
            <div
              class="toggle ${this.darkMode ? 'active' : ''}"
              @click=${this.toggleDarkMode}
            >
              <div class="toggle-knob"></div>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="card-title">关于</h2>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">应用名称</h3>
              <p class="setting-desc">${config.brandName}</p>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">版本</h3>
              <p class="setting-desc">v0.1.0</p>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">框架</h3>
              <p class="setting-desc">Lit 3 + Vite + Tailwind CSS</p>
            </div>
          </div>
        </div>

        <div class="card danger-zone">
          <h2 class="card-title">危险区域</h2>
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">删除账户</h3>
              <p class="setting-desc">永久删除您的账户和所有数据，此操作不可撤销</p>
            </div>
            <button class="danger-btn">删除账户</button>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-page': SettingsPage
  }
}
