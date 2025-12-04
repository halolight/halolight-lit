import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { config } from '../../config/index.ts'

@customElement('forgot-password-page')
export class ForgotPasswordPage extends LitElement {
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
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .back-link {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
    }

    .back-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .back-link a:hover {
      text-decoration: underline;
    }

    .success-message {
      background: #d1fae5;
      border: 1px solid #34d399;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      color: #065f46;
    }

    .success-message svg {
      color: #10b981;
      margin-bottom: 8px;
    }

    .success-message h3 {
      margin: 0 0 8px;
      font-size: 16px;
    }

    .success-message p {
      margin: 0;
      font-size: 14px;
    }
  `

  @state()
  private email = ''

  @state()
  private loading = false

  @state()
  private error = ''

  @state()
  private sent = false

  private async handleSubmit(e: Event) {
    e.preventDefault()
    this.error = ''

    if (!this.email.trim()) {
      this.error = '请输入邮箱'
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.error = '邮箱格式不正确'
      return
    }

    this.loading = true
    // 模拟发送邮件
    await new Promise((resolve) => setTimeout(resolve, 1500))
    this.loading = false
    this.sent = true
  }

  private handleNavigate(route: string) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route },
      bubbles: true,
      composed: true,
    }))
  }

  render() {
    return html`
      <div class="container">
        <div class="card">
          <div class="logo">
            <div class="logo-icon">H</div>
            <h1>${config.brandName}</h1>
            <p>重置您的密码</p>
          </div>

          ${this.sent
            ? html`
                <div class="success-message">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h3>邮件已发送</h3>
                  <p>我们已向 ${this.email} 发送了密码重置链接，请查收邮件。</p>
                </div>
              `
            : html`
                <form @submit=${this.handleSubmit}>
                  <div class="form-group">
                    <label class="form-label">邮箱</label>
                    <input
                      type="email"
                      class="form-input ${this.error ? 'error' : ''}"
                      placeholder="请输入注册邮箱"
                      .value=${this.email}
                      @input=${(e: Event) => (this.email = (e.target as HTMLInputElement).value)}
                    />
                    ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
                  </div>

                  <button type="submit" class="submit-btn" ?disabled=${this.loading}>
                    ${this.loading ? '发送中...' : '发送重置链接'}
                  </button>
                </form>
              `}

          <div class="back-link">
            <a @click=${() => this.handleNavigate('login')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              返回登录
            </a>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forgot-password-page': ForgotPasswordPage
  }
}
