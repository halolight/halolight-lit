import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { mockApi } from '../mock/api.ts'
import type { User } from '../types/index.ts'

@customElement('users-page')
export class UsersPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .add-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .add-btn:hover {
      background: #2563eb;
    }

    .add-btn svg {
      width: 18px;
      height: 18px;
    }

    .toolbar {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    .search-box {
      flex: 1;
      max-width: 320px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }

    .search-box input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #1e293b;
    }

    .search-box input::placeholder {
      color: #94a3b8;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #f1f5f9;
      overflow: hidden;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th,
    .table td {
      padding: 14px 16px;
      text-align: left;
    }

    .table th {
      background: #f8fafc;
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #e2e8f0;
    }

    .table td {
      font-size: 14px;
      color: #1e293b;
      border-bottom: 1px solid #f1f5f9;
    }

    .table tr:last-child td {
      border-bottom: none;
    }

    .table tr:hover td {
      background: #f8fafc;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 500;
      color: #1e293b;
    }

    .user-email {
      font-size: 13px;
      color: #64748b;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
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

    .status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .status.active .status-dot {
      background: #10b981;
    }

    .status.inactive .status-dot {
      background: #94a3b8;
    }

    .status.suspended .status-dot {
      background: #ef4444;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      padding: 6px;
      background: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      color: #64748b;
      transition: all 0.2s;
    }

    .action-btn:hover {
      background: #f1f5f9;
      color: #1e293b;
    }

    .action-btn svg {
      width: 18px;
      height: 18px;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-top: 1px solid #f1f5f9;
    }

    .pagination-info {
      font-size: 14px;
      color: #64748b;
    }

    .pagination-btns {
      display: flex;
      gap: 8px;
    }

    .page-btn {
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background: white;
      font-size: 14px;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
    }

    .page-btn:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #cbd5e1;
    }

    .page-btn.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      color: #64748b;
    }
  `

  @state()
  private users: User[] = []

  @state()
  private loading = true

  @state()
  private page = 1

  @state()
  private totalPages = 1

  @state()
  private total = 0

  @state()
  private searchQuery = ''

  async connectedCallback() {
    super.connectedCallback()
    await this.loadUsers()
  }

  private async loadUsers() {
    this.loading = true
    try {
      const response = await mockApi.getUsers(this.page, 10)
      if (response.data) {
        this.users = response.data.items
        this.totalPages = response.data.totalPages
        this.total = response.data.total
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load users:', error)
    }
    this.loading = false
  }

  private async handlePageChange(newPage: number) {
    this.page = newPage
    await this.loadUsers()
  }

  private handleViewUser(user: User) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route: 'user-detail', params: { id: user.id } },
      bubbles: true,
      composed: true,
    }))
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
    return new Date(dateStr).toLocaleDateString('zh-CN')
  }

  render() {
    return html`
      <div class="page-header">
        <h1 class="page-title">用户管理</h1>
        <button class="add-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          添加用户
        </button>
      </div>

      <div class="toolbar">
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="搜索用户..."
            .value=${this.searchQuery}
            @input=${(e: Event) => (this.searchQuery = (e.target as HTMLInputElement).value)}
          />
        </div>
        <button class="filter-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          筛选
        </button>
      </div>

      <div class="card">
        ${this.loading
          ? html`<div class="loading">加载中...</div>`
          : html`
              <table class="table">
                <thead>
                  <tr>
                    <th>用户</th>
                    <th>角色</th>
                    <th>部门</th>
                    <th>状态</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.users.map(
                    (user) => html`
                      <tr>
                        <td>
                          <div class="user-cell">
                            <img class="avatar" src=${user.avatar} alt=${user.name} />
                            <div class="user-info">
                              <span class="user-name">${user.name}</span>
                              <span class="user-email">${user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="badge ${user.role}">${this.getRoleLabel(user.role)}</span>
                        </td>
                        <td>${user.department || '-'}</td>
                        <td>
                          <span class="status ${user.status}">
                            <span class="status-dot"></span>
                            ${this.getStatusLabel(user.status)}
                          </span>
                        </td>
                        <td>${this.formatDate(user.createdAt)}</td>
                        <td>
                          <div class="actions">
                            <button class="action-btn" @click=${() => this.handleViewUser(user)} title="查看详情">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                            <button class="action-btn" title="编辑">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </button>
                            <button class="action-btn" title="删除">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    `,
                  )}
                </tbody>
              </table>

              <div class="pagination">
                <span class="pagination-info">
                  显示 ${(this.page - 1) * 10 + 1} - ${Math.min(this.page * 10, this.total)} 共 ${this.total} 条
                </span>
                <div class="pagination-btns">
                  <button
                    class="page-btn"
                    ?disabled=${this.page === 1}
                    @click=${() => this.handlePageChange(this.page - 1)}
                  >
                    上一页
                  </button>
                  ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(
                    (p) => html`
                      <button
                        class="page-btn ${p === this.page ? 'active' : ''}"
                        @click=${() => this.handlePageChange(p)}
                      >
                        ${p}
                      </button>
                    `,
                  )}
                  <button
                    class="page-btn"
                    ?disabled=${this.page === this.totalPages}
                    @click=${() => this.handlePageChange(this.page + 1)}
                  >
                    下一页
                  </button>
                </div>
              </div>
            `}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'users-page': UsersPage
  }
}
