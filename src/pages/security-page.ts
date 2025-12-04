import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

interface SecurityLog {
  id: string
  timestamp: string
  action: string
  user: string
  ip: string
  status: 'success' | 'warning' | 'danger'
}

@customElement('security-page')
export class SecurityPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 24px;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 30px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .stat-icon.success {
      background: #d1fae5;
    }

    .stat-icon.warning {
      background: #fef3c7;
    }

    .stat-icon.danger {
      background: #fee2e2;
    }

    .stat-content {
      flex: 1;
    }

    .stat-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
    }

    .logs-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .logs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .logs-title {
      font-size: 18px;
      font-weight: 600;
    }

    .filter-tabs {
      display: flex;
      gap: 8px;
    }

    .filter-tab {
      padding: 6px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }

    .filter-tab:hover {
      background: #f3f4f6;
    }

    .filter-tab.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .logs-table {
      width: 100%;
      border-collapse: collapse;
    }

    .logs-table th {
      text-align: left;
      font-size: 12px;
      font-weight: 500;
      color: #6b7280;
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .logs-table td {
      padding: 12px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 14px;
    }

    .logs-table tr:hover {
      background: #f9fafb;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.success {
      background: #d1fae5;
      color: #065f46;
    }

    .status-badge.warning {
      background: #fef3c7;
      color: #92400e;
    }

    .status-badge.danger {
      background: #fee2e2;
      color: #991b1b;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #9ca3af;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .logs-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .logs-table {
        display: block;
        overflow-x: auto;
      }
    }
  `

  @state()
  private filter: 'all' | 'success' | 'warning' | 'danger' = 'all'

  @state()
  private logs: SecurityLog[] = [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      action: '用户登录',
      user: 'admin@halolight.h7ml.cn',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      action: '修改密码',
      user: 'user@example.com',
      ip: '192.168.1.101',
      status: 'success',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      action: '登录失败',
      user: 'unknown@example.com',
      ip: '192.168.1.102',
      status: 'warning',
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      action: '异常访问',
      user: 'system',
      ip: '192.168.1.103',
      status: 'danger',
    },
  ]

  private get filteredLogs() {
    if (this.filter === 'all') return this.logs
    return this.logs.filter(log => log.status === this.filter)
  }

  private get successCount() {
    return this.logs.filter(log => log.status === 'success').length
  }

  private get warningCount() {
    return this.logs.filter(log => log.status === 'warning').length
  }

  private get dangerCount() {
    return this.logs.filter(log => log.status === 'danger').length
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-CN')
  }

  private getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      success: '成功',
      warning: '警告',
      danger: '危险',
    }
    return labels[status] || status
  }

  render() {
    return html`
      <div class="page-header">
        <h1 class="page-title">安全审计</h1>
        <p style="color: #6b7280;">系统安全日志与监控</p>
      </div>

      <!-- 统计卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon success">✓</div>
          <div class="stat-content">
            <div class="stat-label">成功操作</div>
            <div class="stat-value">${this.successCount}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon warning">⚠</div>
          <div class="stat-content">
            <div class="stat-label">警告事件</div>
            <div class="stat-value">${this.warningCount}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon danger">✕</div>
          <div class="stat-content">
            <div class="stat-label">危险操作</div>
            <div class="stat-value">${this.dangerCount}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #dbeafe;">🛡️</div>
          <div class="stat-content">
            <div class="stat-label">总计日志</div>
            <div class="stat-value">${this.logs.length}</div>
          </div>
        </div>
      </div>

      <!-- 日志列表 -->
      <div class="logs-card">
        <div class="logs-header">
          <div class="logs-title">审计日志</div>
          <div class="filter-tabs">
            <button
              class="filter-tab ${this.filter === 'all' ? 'active' : ''}"
              @click=${() => (this.filter = 'all')}
            >
              全部
            </button>
            <button
              class="filter-tab ${this.filter === 'success' ? 'active' : ''}"
              @click=${() => (this.filter = 'success')}
            >
              成功
            </button>
            <button
              class="filter-tab ${this.filter === 'warning' ? 'active' : ''}"
              @click=${() => (this.filter = 'warning')}
            >
              警告
            </button>
            <button
              class="filter-tab ${this.filter === 'danger' ? 'active' : ''}"
              @click=${() => (this.filter = 'danger')}
            >
              危险
            </button>
          </div>
        </div>

        ${this.filteredLogs.length > 0
          ? html`
              <table class="logs-table">
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>操作</th>
                    <th>用户</th>
                    <th>IP地址</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.filteredLogs.map(
                    log => html`
                      <tr>
                        <td>${this.formatTimestamp(log.timestamp)}</td>
                        <td>${log.action}</td>
                        <td>${log.user}</td>
                        <td>${log.ip}</td>
                        <td>
                          <span class="status-badge ${log.status}">
                            ${this.getStatusLabel(log.status)}
                          </span>
                        </td>
                      </tr>
                    `,
                  )}
                </tbody>
              </table>
            `
          : html`
              <div class="empty-state">
                <div style="font-size: 48px; margin-bottom: 12px;">🔒</div>
                <p>暂无${this.filter !== 'all' ? this.getStatusLabel(this.filter) : ''}日志</p>
              </div>
            `}
      </div>
    `
  }
}
