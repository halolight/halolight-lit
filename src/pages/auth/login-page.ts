import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { authStore } from '../../stores/auth.ts'
import { config } from '../../config/index.ts'
import '../../components/ui/app-input.ts'
import '../../components/ui/app-button.ts'

@customElement('login-page')
export class LoginPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%);
      color: #0f172a;
    }

    .layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%);
    }

    .layout-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* 左侧装饰区域 */
    .hero-panel {
      display: none;
      flex: 1;
      background: linear-gradient(135deg, #2563eb, #4f46e5, #7c3aed);
      color: #fff;
      position: relative;
      overflow: hidden;
    }

    .hero-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 32px 32px;
      pointer-events: none;
      z-index: 0;
    }

    .hero-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(800px circle at 20% 20%, rgba(255,255,255,0.12), transparent 40%),
                  radial-gradient(700px circle at 80% 60%, rgba(255,255,255,0.08), transparent 45%);
      pointer-events: none;
      z-index: 0;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 64px;
      gap: 24px;
      animation: fadeInUp 0.8s ease;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .brand-logo {
      width: 56px;
      height: 56px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.12);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 800;
      border: 1px solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease;
    }

    .brand:hover .brand-logo {
      transform: scale(1.05);
    }

    .brand-name {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
    }

    .hero-title {
      font-size: clamp(32px, 4vw, 48px);
      font-weight: 800;
      margin: 0;
      line-height: 1.1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hero-desc {
      color: rgba(255, 255, 255, 0.78);
      max-width: 540px;
      line-height: 1.6;
      margin: 0;
      font-size: 16px;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      max-width: 520px;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      padding: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      backdrop-filter: blur(8px);
      animation: floatUp 6s ease-in-out infinite;
      transition: transform 0.2s ease, background 0.2s ease;
      cursor: default;
    }

    .feature-card:hover {
      transform: translateY(-2px) scale(1.01);
      background: rgba(255, 255, 255, 0.15);
    }

    @keyframes floatUp {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    .feature-card:nth-child(1) { animation-delay: 0s; }
    .feature-card:nth-child(2) { animation-delay: 0.5s; }
    .feature-card:nth-child(3) { animation-delay: 1s; }
    .feature-card:nth-child(4) { animation-delay: 1.5s; }

    .feature-icon {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.12);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    .feature-text {
      color: #fff;
      font-weight: 600;
      font-size: 14px;
    }

    /* 右侧表单区域 */
    .form-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
    }

    .login-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
      width: 100%;
      max-width: 420px;
      padding: 28px;
      border: 1px solid #e2e8f0;
      position: relative;
      overflow: hidden;
      animation: fadeInUp 0.6s ease;
    }

    .card-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #2563eb, #4f46e5, #7c3aed);
    }

    .card-header {
      text-align: center;
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 6px 0;
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .card-subtitle {
      margin: 0;
      color: #475569;
      font-size: 13px;
    }

    .logo {
      text-align: center;
      margin-bottom: 16px;
    }

    .logo-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      color: white;
      margin-bottom: 10px;
      box-shadow: 0 12px 30px rgba(79, 70, 229, 0.35);
    }

    .logo h1 {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      color: #0f172a;
    }

    .logo p {
      color: #475569;
      margin: 8px 0 0;
      font-size: 13px;
    }

    .demo-hint {
      background: linear-gradient(135deg, #fef9c3, #fde68a);
      border: 1px solid #fcd34d;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 20px;
      font-size: 12px;
      color: #92400e;
      text-align: center;
      box-shadow: 0 10px 24px rgba(251, 191, 36, 0.22);
    }

    .demo-hint strong {
      display: block;
      margin-bottom: 4px;
      font-weight: 600;
    }

    .demo-hint a {
      color: #92400e;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 500;
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
      border-radius: 12px;
      font-size: 14px;
      transition: all 0.2s;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.8);
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      background: white;
    }

    .form-input.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 12px;
      margin-top: 4px;
    }

    .password-wrapper {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: #94a3b8;
      padding: 4px;
      transition: all 0.2s;
    }

    .password-toggle:hover {
      color: #64748b;
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      font-size: 14px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: #64748b;
      transition: all 0.2s;
    }

    .checkbox-label:hover {
      color: #374151;
    }

    .checkbox-label input {
      width: 16px;
      height: 16px;
      accent-color: #667eea;
    }

    .forgot-link {
      color: #667eea;
      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .submit-btn {
      width: 100%;
      padding: 14px 24px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
      position: relative;
      overflow: hidden;
    }

    .submit-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .submit-btn:hover:not(:disabled)::before {
      left: 100%;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .social-login {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 4px;
      margin-bottom: 16px;
    }

    .social-btn {
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: #f8fafc;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #0f172a;
    }

    .social-btn:hover {
      background: #fff;
      border-color: #cbd5e1;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
      transform: translateY(-1px);
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 18px 0;
      color: #94a3b8;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, #e2e8f0, transparent);
    }

    .divider span {
      padding: 0 12px;
      font-weight: 600;
    }

    .register-link {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: #64748b;
    }

    .register-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    /* 响应式布局：桌面端显示双列 */
    @media (min-width: 1024px) {
      .layout-inner {
        flex-direction: row;
      }

      .hero-panel {
        display: flex;
        width: 50%;
      }

      .form-panel {
        width: 50%;
      }

      .login-card {
        max-width: 480px;
      }

      .logo {
        display: none;
      }
    }
  `

  @state()
  private email = ''

  @state()
  private password = ''

  @state()
  private showPassword = false

  @state()
  private remember = false

  @state()
  private loading = false

  @state()
  private error = ''

  private async handleSubmit(e: Event) {
    e.preventDefault()
    this.error = ''

    if (!this.email || !this.password) {
      this.error = '请填写邮箱和密码'
      return
    }

    this.loading = true
    const success = await authStore.login(this.email, this.password)
    this.loading = false

    if (success) {
      this.dispatchEvent(new CustomEvent('navigate', {
        detail: { route: 'dashboard' },
        bubbles: true,
        composed: true,
      }))
    } else {
      this.error = '邮箱或密码错误'
    }
  }

  private handleNavigate(route: string) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route },
      bubbles: true,
      composed: true,
    }))
  }

  private fillDemo() {
    this.email = config.demoEmail
    this.password = config.demoPassword
  }

  render() {
    const features = [
      { icon: '🚀', text: '快速部署，即刻启动' },
      { icon: '📊', text: '实时数据分析与可视化' },
      { icon: '🔒', text: '企业级安全保障' },
      { icon: '⚡', text: '极致性能体验' },
    ]

    return html`
      <div class="layout">
        <div class="layout-inner">
          <!-- 左侧装饰区域 (桌面端显示) -->
          <div class="hero-panel">
            <div class="hero-content">
              <div class="brand">
                <div class="brand-logo">H</div>
                <div>
                  <p class="brand-name">Admin Pro</p>
                  <p style="margin:4px 0 0;opacity:0.8;font-size:12px;">企业级管理系统</p>
                </div>
              </div>

              <h1 class="hero-title">欢迎回来 <span aria-hidden="true">👋</span></h1>
              <p class="hero-desc">登录您的账户，开始管理业务数据与团队协作，体验高效的工作流程。</p>

              <div class="features">
                ${features.map(
                  (item) => html`
                    <div class="feature-card">
                      <div class="feature-icon">${item.icon}</div>
                      <div class="feature-text">${item.text}</div>
                    </div>
                  `,
                )}
              </div>
            </div>
          </div>

          <!-- 右侧表单区域 -->
          <div class="form-panel">
            <div class="login-card">
              <div class="card-accent"></div>

              <!-- 移动端显示的 Logo -->
              <div class="logo">
                <div class="logo-icon">H</div>
                <h1>${config.brandName}</h1>
                <p>欢迎回来，请登录您的账户</p>
              </div>

              <div class="card-header">
                <h2 class="card-title">登录账户</h2>
                <p class="card-subtitle">输入您的邮箱和密码登录</p>
              </div>

              <!-- 社交登录按钮 (移到顶部) -->
              <div class="social-login">
                <button class="social-btn" type="button" title="GitHub 登录">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </button>
                <button class="social-btn" type="button" title="Google 登录">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>
                </button>
                <button class="social-btn" type="button" title="微信登录">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 2a5.5 5.5 0 0 1 5.5 5.5c0 2.2-1.35 4.13-3.38 4.99l1.38 2.26-3.2-1.7a6.62 6.62 0 0 1-2.3.4 5.5 5.5 0 1 1 2-10.45ZM7 6c-3.3 0-6 2.35-6 5.25 0 1.85 1.12 3.5 2.82 4.45L2 18.5l3.4-1.8c.5.1 1 .15 1.6.15 3.3 0 6-2.35 6-5.25S10.3 6 7 6Zm1.25 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm10 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM5.5 11.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/></svg>
                </button>
              </div>

              <div class="divider"><span>或使用邮箱登录</span></div>

              ${config.showDemoHint
                ? html`
                    <div class="demo-hint">
                      <strong>演示账户</strong>
                      邮箱: ${config.demoEmail} / 密码: ${config.demoPassword}
                      <br />
                      <a @click=${this.fillDemo}>点击填充</a>
                    </div>
                  `
                : ''}

              <form @submit=${this.handleSubmit}>
                <div class="form-group">
                  <label class="form-label">邮箱</label>
                  <input
                    type="email"
                    class="form-input ${this.error ? 'error' : ''}"
                    placeholder="请输入邮箱"
                    .value=${this.email}
                    @input=${(e: Event) => (this.email = (e.target as HTMLInputElement).value)}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">密码</label>
                  <div class="password-wrapper">
                    <input
                      type=${this.showPassword ? 'text' : 'password'}
                      class="form-input ${this.error ? 'error' : ''}"
                      placeholder="请输入密码"
                      .value=${this.password}
                      @input=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
                    />
                    <button
                      type="button"
                      class="password-toggle"
                      @click=${() => (this.showPassword = !this.showPassword)}
                    >
                      ${this.showPassword
                        ? html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
                        : html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`}
                    </button>
                  </div>
                  ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
                </div>

                <div class="form-footer">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      .checked=${this.remember}
                      @change=${(e: Event) => (this.remember = (e.target as HTMLInputElement).checked)}
                    />
                    记住我
                  </label>
                  <a class="forgot-link" @click=${() => this.handleNavigate('forgot-password')}>
                    忘记密码?
                  </a>
                </div>

                <button type="submit" class="submit-btn" ?disabled=${this.loading}>
                  ${this.loading ? '登录中...' : '登录'}
                </button>
              </form>

              <div class="register-link">
                还没有账户? <a @click=${() => this.handleNavigate('register')}>立即注册</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage
  }
}
