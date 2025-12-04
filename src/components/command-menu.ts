import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { uiSettingsStore } from '../stores/ui-settings.ts'
import { authStore } from '../stores/auth.ts'
import { themeStore } from '../stores/theme.ts'

@customElement('command-menu')
export class CommandMenu extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.4);
      z-index: 50;
    }
    :host([open]) {
      display: flex;
    }
    .panel {
      width: min(720px, 90vw);
      background: var(--card-bg, #fff);
      border-radius: 16px;
      border: 1px solid var(--border-color, #e2e8f0);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      padding: 16px;
    }
    input {
      width: 100%;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid var(--border-color, #e2e8f0);
      margin-bottom: 12px;
      font-size: 14px;
      background: var(--bg-color, #f8fafc);
      color: var(--text-color, #1e293b);
    }
    input:focus {
      outline: 2px solid var(--primary-color, #3b82f6);
      outline-offset: -2px;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 400px;
      overflow-y: auto;
      display: grid;
      gap: 8px;
    }
    .group-title {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      padding: 8px 12px 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    button.item {
      width: 100%;
      text-align: left;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid transparent;
      background: color-mix(in srgb, var(--primary-color) 6%, transparent);
      cursor: pointer;
      font-size: 14px;
      color: var(--text-color, #1e293b);
      transition: all 0.2s ease;
    }
    button.item:hover {
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      border-color: var(--primary-color, #3b82f6);
    }
    button.item:focus {
      outline: 2px solid var(--primary-color, #3b82f6);
      outline-offset: -2px;
    }
  `

  @property({ type: Boolean, reflect: true }) open = false
  @state() private query = ''

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeydown)
    super.disconnectedCallback()
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      this.open = !this.open
    }
    if (e.key === 'Escape' && this.open) {
      e.preventDefault()
      this.open = false
    }
  }

  private runNavigate(path: string) {
    this.open = false
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: { path } }))
  }

  private switchAccount(id: string) {
    if (authStore.switchAccount) {
      authStore.switchAccount(id)
    }
    this.open = false
    this.requestUpdate()
  }

  private setSkin(skin: string) {
    uiSettingsStore.setSkin(skin as any)
    this.open = false
    this.requestUpdate()
  }

  private toggleTheme() {
    const currentTheme = themeStore.getTheme()
    themeStore.setTheme(currentTheme === 'dark' ? 'light' : 'dark')
    this.open = false
    this.requestUpdate()
  }

  render() {
    const auth = authStore.getState()
    return html`
      <div class="panel" @click=${(e: Event) => e.stopPropagation()}>
        <input
          placeholder="输入命令或搜索..."
          .value=${this.query}
          @input=${(e: Event) => (this.query = (e.target as HTMLInputElement).value)}
        />
        <ul>
          <li><div class="group-title">导航</div></li>
          <li><button class="item" @click=${() => this.runNavigate('/dashboard')}>前往仪表盘</button></li>
          <li><button class="item" @click=${() => this.runNavigate('/users')}>用户管理</button></li>
          <li><button class="item" @click=${() => this.runNavigate('/settings')}>系统设置</button></li>

          <li><div class="group-title">皮肤</div></li>
          <li><button class="item" @click=${() => this.setSkin('default')}>默认皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('blue')}>蓝色皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('emerald')}>翡翠皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('amber')}>琥珀皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('violet')}>紫罗兰皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('rose')}>玫瑰皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('teal')}>青色皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('slate')}>灰蓝皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('ocean')}>深海蓝皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('sunset')}>暮光橙皮肤</button></li>
          <li><button class="item" @click=${() => this.setSkin('aurora')}>极光绿皮肤</button></li>

          <li><div class="group-title">主题</div></li>
          <li><button class="item" @click=${() => this.toggleTheme()}>切换深色/浅色模式</button></li>

          ${auth.accounts && auth.accounts.length > 0 ? html`
            <li><div class="group-title">账号</div></li>
            ${auth.accounts.map((account: any) => html`
              <li>
                <button class="item" @click=${() => this.switchAccount(account.id)}>
                  切换为 ${account.name} ${account.id === auth.activeAccountId ? '(当前)' : ''}
                </button>
              </li>
            `)}
          ` : null}

          <li><div class="group-title">操作</div></li>
          <li><button class="item" @click=${() => { authStore.logout(); this.open = false; }}>退出登录</button></li>
        </ul>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'command-menu': CommandMenu
  }
}
