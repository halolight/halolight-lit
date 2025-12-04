import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { mockApi } from '../mock/api.ts'
import type { User } from '../types/index.ts'

@customElement('user-detail-page')
export class UserDetailPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .page-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      cursor: pointer;
      color: #64748b;
      transition: all 0.2s;
    }

    .back-btn:hover {
      background: #f8fafc;
      color: #1e293b;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .content {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 24px;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #f1f5f9;
      padding: 24px;
    }

    .profile-card {
      text-align: center;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 16px;
    }

    .user-name {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .user-email {
      font-size: 14px;
      color: #64748b;
      margin: 0 0 16px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
    }

    .badge.admin {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .badge.manager {
      background: #ede9fe;
      color: #7c3aed;
    }

    .badge.editor {
      background: #d1fae5;
      color: #059669;
    }

    .badge.viewer {
      background: #f1f5f9;
      color: #64748b;
    }

    .divider {
      height: 1px;
      background: #e2e8f0;
      margin: 20px 0;
    }

    .info-list {
      text-align: left;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .info-item:last-child {
      border-bottom: none;
    }

    .info-label {
      font-size: 14px;
      color: #64748b;
    }

    .info-value {
      font-size: 14px;
      color: #1e293b;
      font-weight: 500;
    }

    .tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 12px;
    }

    .tab {
      padding: 8px 16px;
      background: none;
      border: none;
      font-size: 14px;
      color: #64748b;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .tab:hover {
      background: #f1f5f9;
    }

    .tab.active {
      background: #3b82f6;
      color: white;
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

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .content {
        grid-template-columns: 1fr;
      }
    }
  `

  @property({ type: String })
  userId = ''

  @state()
  private user: User | null = null

  @state()
  private loading = true

  @state()
  private activeTab = 'profile'

  async connectedCallback() {
    super.connectedCallback()
    await this.loadUser()
  }

  async updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('userId') && this.userId) {
      await this.loadUser()
    }
  }

  private async loadUser() {
    if (!this.userId) return

    this.loading = true
    try {
      const response = await mockApi.getUserById(this.userId)
      if (response.data) {
        this.user = response.data
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load user:', error)
    }
    this.loading = false
  }

  private getRoleLabel(role: User['role']): string {
    const labels: Record<string, string> = {
      admin: '管理员',
      manager: '经理',
      editor: '编辑',
      viewer: '访客',
    }
    return labels[role]
  }

  private getStatusLabel(status: User['status']): string {
    const labels: Record<string, string> = {
      active: '活跃',
      inactive: '未激活',
      suspended: '已禁用',
    }
    return labels[status]
  }

  private formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('zh-CN')
  }

  private handleBack() {
    window.history.back()
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">加载中...</div>`
    }

    if (!this.user) {
      return html`<div class="loading">用户不存在</div>`
    }

    return html`
      <div class="page-header">
        <button class="back-btn" @click=${this.handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h1 class="page-title">用户详情</h1>
      </div>

      <div class="content">
        <div class="card profile-card">
          <img class="avatar" src=${this.user.avatar} alt=${this.user.name} />
          <h2 class="user-name">${this.user.name}</h2>
          <p class="user-email">${this.user.email}</p>
          <span class="badge ${this.user.role}">${this.getRoleLabel(this.user.role)}</span>

          <div class="divider"></div>

          <div class="info-list">
            <div class="info-item">
              <span class="info-label">状态</span>
              <span class="info-value">${this.getStatusLabel(this.user.status)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">部门</span>
              <span class="info-value">${this.user.department || '-'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">职位</span>
              <span class="info-value">${this.user.position || '-'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间</span>
              <span class="info-value">${this.formatDate(this.user.createdAt)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">最后登录</span>
              <span class="info-value">${this.formatDate(this.user.lastLoginAt)}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="tabs">
            <button
              class="tab ${this.activeTab === 'profile' ? 'active' : ''}"
              @click=${() => (this.activeTab = 'profile')}
            >
              基本信息
            </button>
            <button
              class="tab ${this.activeTab === 'security' ? 'active' : ''}"
              @click=${() => (this.activeTab = 'security')}
            >
              安全设置
            </button>
          </div>

          ${this.activeTab === 'profile'
            ? html`
                <form>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">姓名</label>
                      <input type="text" class="form-input" .value=${this.user.name} />
                    </div>
                    <div class="form-group">
                      <label class="form-label">邮箱</label>
                      <input type="email" class="form-input" .value=${this.user.email} />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">部门</label>
                      <input type="text" class="form-input" .value=${this.user.department || ''} />
                    </div>
                    <div class="form-group">
                      <label class="form-label">职位</label>
                      <input type="text" class="form-input" .value=${this.user.position || ''} />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">电话</label>
                    <input type="tel" class="form-input" .value=${this.user.phone || ''} />
                  </div>
                  <button type="button" class="save-btn">保存修改</button>
                </form>
              `
            : html`
                <form>
                  <div class="form-group">
                    <label class="form-label">当前密码</label>
                    <input type="password" class="form-input" placeholder="请输入当前密码" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">新密码</label>
                    <input type="password" class="form-input" placeholder="请输入新密码" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">确认新密码</label>
                    <input type="password" class="form-input" placeholder="请再次输入新密码" />
                  </div>
                  <button type="button" class="save-btn">修改密码</button>
                </form>
              `}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'user-detail-page': UserDetailPage
  }
}
