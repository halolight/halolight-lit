import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Activity } from '../../types/index.ts'

@customElement('activity-list')
export class ActivityList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #f1f5f9;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .view-all {
      font-size: 13px;
      color: #3b82f6;
      cursor: pointer;
      text-decoration: none;
    }

    .view-all:hover {
      text-decoration: underline;
    }

    .activity-item {
      display: flex;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .activity-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .activity-item:first-child {
      padding-top: 0;
    }

    .activity-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-icon.user {
      background: #dbeafe;
      color: #3b82f6;
    }

    .activity-icon.order {
      background: #d1fae5;
      color: #10b981;
    }

    .activity-icon.login {
      background: #ede9fe;
      color: #8b5cf6;
    }

    .activity-icon.system {
      background: #fef3c7;
      color: #f59e0b;
    }

    .activity-icon svg {
      width: 18px;
      height: 18px;
    }

    .activity-content {
      flex: 1;
      min-width: 0;
    }

    .activity-title {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
      margin: 0 0 2px;
    }

    .activity-desc {
      font-size: 13px;
      color: #64748b;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .activity-time {
      font-size: 12px;
      color: #94a3b8;
      white-space: nowrap;
    }

    .empty {
      text-align: center;
      padding: 40px 20px;
      color: #94a3b8;
    }
  `

  @property({ type: Array })
  activities: Activity[] = []

  private getIcon(type: Activity['type']): string {
    const icons: Record<string, string> = {
      user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
      order: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
      login: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>',
      system: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    }
    return icons[type] || icons.system
  }

  private formatTime(timestamp: string): string {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const minutes = Math.floor(diff / 60000)
    if (minutes < 60) return `${minutes}分钟前`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}小时前`

    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}天前`

    return date.toLocaleDateString('zh-CN')
  }

  render() {
    if (!this.activities.length) {
      return html`
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">最近活动</h3>
          </div>
          <div class="empty">暂无活动记录</div>
        </div>
      `
    }

    return html`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">最近活动</h3>
          <a class="view-all">查看全部</a>
        </div>
        ${this.activities.map(
          (activity) => html`
            <div class="activity-item">
              <div class="activity-icon ${activity.type}">
                <span .innerHTML=${this.getIcon(activity.type)}></span>
              </div>
              <div class="activity-content">
                <h4 class="activity-title">${activity.title}</h4>
                <p class="activity-desc">${activity.description}</p>
              </div>
              <span class="activity-time">${this.formatTime(activity.timestamp)}</span>
            </div>
          `,
        )}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'activity-list': ActivityList
  }
}
