import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { config } from '../config/index.ts'

@customElement('privacy-page')
export class PrivacyPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      padding: 48px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .header {
      text-align: center;
      margin-bottom: 48px;
    }

    .title {
      font-size: 36px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 14px;
      color: #64748b;
    }

    .content {
      color: #475569;
      line-height: 1.8;
    }

    .section {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }

    .section-content {
      font-size: 15px;
      margin-bottom: 12px;
    }

    .section-list {
      margin-left: 24px;
      margin-top: 12px;
    }

    .section-list li {
      margin-bottom: 8px;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      margin-top: 32px;
    }

    .back-btn:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .highlight {
      color: #3b82f6;
      font-weight: 500;
    }
  `

  private handleBack() {
    window.history.back()
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <h1 class="title">隐私政策</h1>
          <p class="subtitle">最后更新时间: ${new Date().toLocaleDateString('zh-CN')}</p>
        </div>

        <div class="content">
          <div class="section">
            <h2 class="section-title">1. 引言</h2>
            <p class="section-content">
              欢迎使用 <span class="highlight">${config.brandName}</span>。我们非常重视您的隐私保护和个人信息安全。
              本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息,以及您所享有的相关权利。
            </p>
            <p class="section-content">
              请您在使用我们的服务前,仔细阅读并充分理解本政策。如果您不同意本政策的任何内容,请立即停止使用我们的服务。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">2. 信息收集</h2>
            <p class="section-content">
              我们可能收集以下类型的信息:
            </p>
            <ul class="section-list">
              <li><strong>账户信息:</strong> 包括您的用户名、电子邮件地址、密码(加密存储)等注册信息</li>
              <li><strong>使用信息:</strong> 包括您使用服务的时间、频率、操作记录等</li>
              <li><strong>设备信息:</strong> 包括设备型号、操作系统版本、浏览器类型、IP地址等</li>
              <li><strong>日志信息:</strong> 包括访问日志、错误日志、性能数据等技术信息</li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">3. 信息使用</h2>
            <p class="section-content">
              我们收集的信息将用于以下目的:
            </p>
            <ul class="section-list">
              <li>提供、维护和改进我们的服务</li>
              <li>处理您的请求和交易</li>
              <li>向您发送服务通知、更新和技术支持</li>
              <li>分析服务使用情况,优化用户体验</li>
              <li>检测、预防和解决技术问题及安全隐患</li>
              <li>遵守法律法规的要求</li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">4. 信息存储与安全</h2>
            <p class="section-content">
              我们采取多种安全措施来保护您的个人信息:
            </p>
            <ul class="section-list">
              <li>使用行业标准的加密技术保护数据传输和存储</li>
              <li>实施严格的访问控制和权限管理</li>
              <li>定期进行安全审计和漏洞扫描</li>
              <li>采用防火墙、入侵检测等技术手段</li>
              <li>对员工进行数据安全培训</li>
            </ul>
            <p class="section-content">
              尽管我们已采取合理措施保护您的信息,但请注意,任何安全措施都无法做到绝对安全。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">5. 信息共享</h2>
            <p class="section-content">
              我们不会向第三方出售、出租或交易您的个人信息。但在以下情况下,我们可能会共享您的信息:
            </p>
            <ul class="section-list">
              <li>获得您的明确同意</li>
              <li>为提供服务所必需(如云服务提供商、支付处理商)</li>
              <li>遵守法律法规、法院命令或政府要求</li>
              <li>保护我们或他人的合法权益、财产或安全</li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">6. Cookie 和类似技术</h2>
            <p class="section-content">
              我们使用 Cookie 和类似技术来:
            </p>
            <ul class="section-list">
              <li>记住您的登录状态和偏好设置</li>
              <li>分析服务使用情况和性能</li>
              <li>提供个性化的用户体验</li>
            </ul>
            <p class="section-content">
              您可以通过浏览器设置管理或禁用 Cookie,但这可能影响某些功能的正常使用。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">7. 您的权利</h2>
            <p class="section-content">
              您对自己的个人信息享有以下权利:
            </p>
            <ul class="section-list">
              <li><strong>访问权:</strong> 您有权访问我们持有的您的个人信息</li>
              <li><strong>更正权:</strong> 您有权要求更正不准确或不完整的信息</li>
              <li><strong>删除权:</strong> 您有权要求删除您的个人信息</li>
              <li><strong>限制处理权:</strong> 您有权要求限制对您个人信息的处理</li>
              <li><strong>数据可携权:</strong> 您有权以结构化、常用的格式获取您的数据</li>
              <li><strong>反对权:</strong> 您有权反对我们处理您的个人信息</li>
            </ul>
            <p class="section-content">
              如需行使上述权利,请通过本政策末尾提供的联系方式与我们联系。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">8. 未成年人保护</h2>
            <p class="section-content">
              我们的服务面向成年人。如果您未满18周岁,请在监护人的陪同下使用我们的服务。
              我们不会故意收集未成年人的个人信息。如果我们发现在未经监护人同意的情况下收集了未成年人的信息,
              我们将采取措施尽快删除相关数据。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">9. 政策更新</h2>
            <p class="section-content">
              我们可能会不时更新本隐私政策。更新后的政策将在本页面发布,并更新"最后更新时间"。
              重大变更时,我们会通过站内通知或电子邮件的方式告知您。
            </p>
            <p class="section-content">
              您继续使用我们的服务将被视为接受更新后的隐私政策。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">10. 联系我们</h2>
            <p class="section-content">
              如果您对本隐私政策有任何疑问、意见或投诉,请通过以下方式联系我们:
            </p>
            <ul class="section-list">
              <li>电子邮件: privacy@${config.brandName.toLowerCase()}.h7ml.cn</li>
              <li>GitHub: <a href="https://github.com/halolight/halolight-lit" target="_blank" class="highlight">github.com/halolight/halolight-lit</a></li>
            </ul>
            <p class="section-content">
              我们将在收到您的请求后尽快(通常在30天内)给予回复。
            </p>
          </div>
        </div>

        <button class="back-btn" @click=${this.handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          返回
        </button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'privacy-page': PrivacyPage
  }
}
