import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { config } from '../config/index.ts'

@customElement('terms-page')
export class TermsPage extends LitElement {
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

    .warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 16px 0;
      border-radius: 4px;
    }
  `

  private handleBack() {
    window.history.back()
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <h1 class="title">服务条款</h1>
          <p class="subtitle">最后更新时间: ${new Date().toLocaleDateString('zh-CN')}</p>
        </div>

        <div class="content">
          <div class="section">
            <h2 class="section-title">1. 服务条款的接受</h2>
            <p class="section-content">
              欢迎使用 <span class="highlight">${config.brandName}</span>。这些服务条款("条款")构成您与我们之间具有法律约束力的协议。
              通过访问或使用我们的服务,您表示同意受这些条款的约束。
            </p>
            <div class="warning">
              <strong>重要提示:</strong> 如果您不同意这些条款,请不要使用我们的服务。
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">2. 服务说明</h2>
            <p class="section-content">
              ${config.brandName} 提供一个现代化的后台管理系统解决方案,包括但不限于:
            </p>
            <ul class="section-list">
              <li>用户认证和授权管理</li>
              <li>数据可视化和报表功能</li>
              <li>文件管理和存储服务</li>
              <li>消息通知和实时通讯</li>
              <li>系统设置和配置管理</li>
            </ul>
            <p class="section-content">
              我们保留随时修改、暂停或终止服务的任何部分的权利,恕不另行通知。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">3. 用户账户</h2>
            <p class="section-content">
              为了使用某些功能,您需要创建一个账户。您同意:
            </p>
            <ul class="section-list">
              <li>提供准确、完整和最新的注册信息</li>
              <li>维护账户信息的准确性</li>
              <li>对账户安全负责,包括密码保护</li>
              <li>对账户下发生的所有活动负责</li>
              <li>如发现未经授权使用账户,立即通知我们</li>
            </ul>
            <p class="section-content">
              我们保留随时拒绝服务、终止账户或删除内容的权利。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">4. 用户行为规范</h2>
            <p class="section-content">
              您同意不会:
            </p>
            <ul class="section-list">
              <li>违反任何适用的法律法规</li>
              <li>侵犯他人的知识产权或其他权利</li>
              <li>上传、发布或传输恶意软件、病毒或有害代码</li>
              <li>进行任何可能损害、禁用或破坏服务的行为</li>
              <li>未经授权访问其他用户的账户或数据</li>
              <li>使用自动化工具(如机器人、爬虫)访问服务</li>
              <li>干扰或中断服务或服务器</li>
              <li>从事欺诈、虚假陈述或误导性行为</li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">5. 知识产权</h2>
            <p class="section-content">
              服务及其所有内容、功能和特性(包括但不限于所有信息、软件、文本、显示、图像、视频和音频,
              以及设计、选择和排列)归我们或我们的许可方所有,受版权、商标、专利和其他知识产权法律的保护。
            </p>
            <p class="section-content">
              您被授予有限的、非独占的、不可转让的许可来访问和使用服务,但不得:
            </p>
            <ul class="section-list">
              <li>修改、复制、分发或创建衍生作品</li>
              <li>反向工程、反编译或试图提取源代码</li>
              <li>删除或更改任何版权、商标或其他所有权声明</li>
              <li>将服务用于商业目的而未获得我们的书面许可</li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">6. 内容责任</h2>
            <p class="section-content">
              您对通过服务上传、发布或传输的所有内容("用户内容")负全部责任。您声明并保证:
            </p>
            <ul class="section-list">
              <li>您拥有用户内容或有权使用它</li>
              <li>用户内容不违反这些条款或任何法律</li>
              <li>用户内容不侵犯任何第三方权利</li>
            </ul>
            <p class="section-content">
              您授予我们非独占、全球性、免版税的许可,以使用、复制、修改和展示用户内容,用于提供和改进服务。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">7. 免责声明</h2>
            <p class="section-content">
              服务按"原样"和"可用"基础提供,不提供任何明示或暗示的保证,包括但不限于:
            </p>
            <ul class="section-list">
              <li>适销性、特定用途适用性的保证</li>
              <li>服务的准确性、可靠性或完整性</li>
              <li>服务不中断或无错误</li>
              <li>缺陷将被纠正</li>
              <li>服务或服务器无病毒或有害组件</li>
            </ul>
            <p class="section-content">
              您使用服务的风险由您自行承担。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">8. 责任限制</h2>
            <p class="section-content">
              在法律允许的最大范围内,我们不对任何间接、偶然、特殊、后果性或惩罚性损害承担责任,包括但不限于:
            </p>
            <ul class="section-list">
              <li>利润损失、数据丢失或业务中断</li>
              <li>使用或无法使用服务</li>
              <li>未经授权访问或更改您的传输或数据</li>
              <li>第三方在服务上的陈述或行为</li>
            </ul>
            <p class="section-content">
              我们的总责任不超过您在过去12个月内为服务支付的金额,或人民币100元,以较高者为准。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">9. 赔偿</h2>
            <p class="section-content">
              您同意赔偿、辩护并使我们及我们的关联公司、合作伙伴、管理人员、董事、员工和代理人免受因以下原因产生的任何索赔、责任、损害、损失和费用:
            </p>
            <ul class="section-list">
              <li>您违反这些条款</li>
              <li>您违反任何法律或第三方权利</li>
              <li>您使用服务</li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">10. 终止</h2>
            <p class="section-content">
              我们可以立即终止或暂停您的账户和访问服务,无需事先通知,原因包括但不限于:
            </p>
            <ul class="section-list">
              <li>违反这些条款</li>
              <li>应执法或其他政府机构的要求</li>
              <li>因技术或安全问题</li>
              <li>长期不活跃</li>
              <li>参与欺诈或非法活动</li>
            </ul>
            <p class="section-content">
              终止后,您使用服务的权利将立即停止。我们保留删除您的账户和内容的权利。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">11. 争议解决</h2>
            <p class="section-content">
              这些条款受中华人民共和国法律管辖并按其解释,不考虑法律冲突规定。
            </p>
            <p class="section-content">
              因这些条款引起的或与之相关的任何争议应首先通过友好协商解决。
              如果协商失败,争议应提交至我们所在地有管辖权的人民法院。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">12. 条款变更</h2>
            <p class="section-content">
              我们保留随时修改这些条款的权利。修改后的条款将在本页面发布,并更新"最后更新时间"。
            </p>
            <p class="section-content">
              重大变更时,我们会通过电子邮件或服务内通知告知您。您在变更后继续使用服务,即表示接受修改后的条款。
            </p>
          </div>

          <div class="section">
            <h2 class="section-title">13. 其他条款</h2>
            <ul class="section-list">
              <li><strong>完整协议:</strong> 这些条款构成您与我们之间关于服务的完整协议</li>
              <li><strong>可分割性:</strong> 如果这些条款的任何部分被认定为无效,其余部分仍然有效</li>
              <li><strong>弃权:</strong> 我们未行使任何权利不构成对该权利的放弃</li>
              <li><strong>不可转让:</strong> 您不得转让这些条款下的权利或义务</li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">14. 联系我们</h2>
            <p class="section-content">
              如果您对这些条款有任何疑问,请通过以下方式联系我们:
            </p>
            <ul class="section-list">
              <li>电子邮件: legal@${config.brandName.toLowerCase()}.h7ml.cn</li>
              <li>GitHub: <a href="https://github.com/halolight/halolight-lit" target="_blank" class="highlight">github.com/halolight/halolight-lit</a></li>
              <li>文档: <a href="https://halolight.docs.h7ml.cn/" target="_blank" class="highlight">halolight.docs.h7ml.cn</a></li>
            </ul>
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
    'terms-page': TermsPage
  }
}
