import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { authStore } from '../../stores/auth.ts'
import { config } from '../../config/index.ts'

@customElement('register-page')
export class RegisterPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 420px;
      padding: 40px;
    }

    .logo {
      text-align: center;
      margin-bottom: 32px;
    }

    .logo-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      color: white;
      margin-bottom: 16px;
    }

    .logo h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .logo p {
      color: #64748b;
      margin: 8px 0 0;
      font-size: 14px;
    }

    .form-group {
      margin-bottom: 20px;
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
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.2s;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-input.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 12px;
      margin-top: 4px;
    }

    .password-strength {
      margin-top: 8px;
    }

    .strength-bar {
      display: flex;
      gap: 4px;
      margin-bottom: 4px;
    }

    .strength-segment {
      height: 4px;
      flex: 1;
      background: #e2e8f0;
      border-radius: 2px;
      transition: background 0.3s;
    }

    .strength-segment.active.weak {
      background: #ef4444;
    }

    .strength-segment.active.fair {
      background: #f59e0b;
    }

    .strength-segment.active.good {
      background: #10b981;
    }

    .strength-segment.active.strong {
      background: #059669;
    }

    .strength-text {
      font-size: 12px;
      color: #64748b;
    }

    .submit-btn {
      width: 100%;
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 8px;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .login-link {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: #64748b;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .terms {
      font-size: 12px;
      color: #64748b;
      text-align: center;
      margin-top: 16px;
    }

    .terms a {
      color: #667eea;
      text-decoration: none;
    }
  `

  @state()
  private name = ''

  @state()
  private email = ''

  @state()
  private password = ''

  @state()
  private confirmPassword = ''

  @state()
  private loading = false

  @state()
  private errors: Record<string, string> = {}

  private getPasswordStrength(): { level: number; text: string; class: string } {
    const password = this.password
    if (!password) return { level: 0, text: '', class: '' }

    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    if (password.length >= 12) score++

    if (score <= 1) return { level: 1, text: '弱', class: 'weak' }
    if (score === 2) return { level: 2, text: '一般', class: 'fair' }
    if (score === 3) return { level: 3, text: '良好', class: 'good' }
    return { level: 4, text: '强', class: 'strong' }
  }

  private validate(): boolean {
    const errors: Record<string, string> = {}

    if (!this.name.trim()) {
      errors.name = '请输入姓名'
    }

    if (!this.email.trim()) {
      errors.email = '请输入邮箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.email = '邮箱格式不正确'
    }

    if (!this.password) {
      errors.password = '请输入密码'
    } else if (this.password.length < 6) {
      errors.password = '密码至少 6 位'
    }

    if (this.password !== this.confirmPassword) {
      errors.confirmPassword = '两次密码不一致'
    }

    this.errors = errors
    return Object.keys(errors).length === 0
  }

  private async handleSubmit(e: Event) {
    e.preventDefault()

    if (!this.validate()) return

    this.loading = true
    const success = await authStore.register(this.name, this.email, this.password)
    this.loading = false

    if (success) {
      this.dispatchEvent(new CustomEvent('navigate', {
        detail: { route: 'dashboard' },
        bubbles: true,
        composed: true,
      }))
    }
  }

  private handleNavigate(route: string) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route },
      bubbles: true,
      composed: true,
    }))
  }

  render() {
    const strength = this.getPasswordStrength()

    return html`
      <div class="container">
        <div class="card">
          <div class="logo">
            <div class="logo-icon">H</div>
            <h1>${config.brandName}</h1>
            <p>创建您的账户</p>
          </div>

          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label class="form-label">姓名</label>
              <input
                type="text"
                class="form-input ${this.errors.name ? 'error' : ''}"
                placeholder="请输入姓名"
                .value=${this.name}
                @input=${(e: Event) => (this.name = (e.target as HTMLInputElement).value)}
              />
              ${this.errors.name ? html`<div class="error-message">${this.errors.name}</div>` : ''}
            </div>

            <div class="form-group">
              <label class="form-label">邮箱</label>
              <input
                type="email"
                class="form-input ${this.errors.email ? 'error' : ''}"
                placeholder="请输入邮箱"
                .value=${this.email}
                @input=${(e: Event) => (this.email = (e.target as HTMLInputElement).value)}
              />
              ${this.errors.email ? html`<div class="error-message">${this.errors.email}</div>` : ''}
            </div>

            <div class="form-group">
              <label class="form-label">密码</label>
              <input
                type="password"
                class="form-input ${this.errors.password ? 'error' : ''}"
                placeholder="请输入密码"
                .value=${this.password}
                @input=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
              />
              ${this.errors.password ? html`<div class="error-message">${this.errors.password}</div>` : ''}
              ${this.password
                ? html`
                    <div class="password-strength">
                      <div class="strength-bar">
                        ${[1, 2, 3, 4].map(
                          (i) => html`
                            <div class="strength-segment ${i <= strength.level ? `active ${strength.class}` : ''}"></div>
                          `,
                        )}
                      </div>
                      <div class="strength-text">密码强度: ${strength.text}</div>
                    </div>
                  `
                : ''}
            </div>

            <div class="form-group">
              <label class="form-label">确认密码</label>
              <input
                type="password"
                class="form-input ${this.errors.confirmPassword ? 'error' : ''}"
                placeholder="请再次输入密码"
                .value=${this.confirmPassword}
                @input=${(e: Event) => (this.confirmPassword = (e.target as HTMLInputElement).value)}
              />
              ${this.errors.confirmPassword
                ? html`<div class="error-message">${this.errors.confirmPassword}</div>`
                : ''}
            </div>

            <button type="submit" class="submit-btn" ?disabled=${this.loading}>
              ${this.loading ? '注册中...' : '注册'}
            </button>
          </form>

          <div class="terms">
            注册即表示您同意我们的 <a href="#">服务条款</a> 和 <a href="#">隐私政策</a>
          </div>

          <div class="login-link">
            已有账户? <a @click=${() => this.handleNavigate('login')}>立即登录</a>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'register-page': RegisterPage
  }
}
