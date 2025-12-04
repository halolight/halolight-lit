import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { Task } from '../../types/index.ts'

@customElement('task-list')
export class TaskList extends LitElement {
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

    .add-btn {
      font-size: 13px;
      color: #3b82f6;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }

    .add-btn:hover {
      text-decoration: underline;
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .task-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .task-item:first-child {
      padding-top: 0;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid #cbd5e1;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .checkbox:hover {
      border-color: #3b82f6;
    }

    .checkbox.checked {
      background: #3b82f6;
      border-color: #3b82f6;
    }

    .checkbox svg {
      width: 14px;
      height: 14px;
      color: white;
    }

    .task-content {
      flex: 1;
      min-width: 0;
    }

    .task-title {
      font-size: 14px;
      color: #1e293b;
      margin: 0;
      transition: all 0.2s;
    }

    .task-title.completed {
      text-decoration: line-through;
      color: #94a3b8;
    }

    .task-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .priority {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
    }

    .priority.high {
      background: #fee2e2;
      color: #dc2626;
    }

    .priority.medium {
      background: #fef3c7;
      color: #d97706;
    }

    .priority.low {
      background: #d1fae5;
      color: #059669;
    }

    .due-date {
      font-size: 12px;
      color: #94a3b8;
    }

    .empty {
      text-align: center;
      padding: 40px 20px;
      color: #94a3b8;
    }

    .progress {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #f1f5f9;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .progress-label {
      font-size: 13px;
      color: #64748b;
    }

    .progress-value {
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
    }

    .progress-bar {
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 3px;
      transition: width 0.3s ease;
    }
  `

  @property({ type: Array })
  tasks: Task[] = []

  @state()
  private localTasks: Task[] = []

  connectedCallback() {
    super.connectedCallback()
    this.localTasks = [...this.tasks]
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('tasks')) {
      this.localTasks = [...this.tasks]
    }
  }

  private toggleTask(taskId: string) {
    this.localTasks = this.localTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    )
  }

  private getPriorityLabel(priority: Task['priority']): string {
    const labels: Record<string, string> = {
      high: '高',
      medium: '中',
      low: '低',
    }
    return labels[priority]
  }

  render() {
    const completedCount = this.localTasks.filter((t) => t.completed).length
    const totalCount = this.localTasks.length
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

    if (!this.localTasks.length) {
      return html`
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">待办任务</h3>
            <button class="add-btn">+ 添加任务</button>
          </div>
          <div class="empty">暂无待办任务</div>
        </div>
      `
    }

    return html`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">待办任务</h3>
          <button class="add-btn">+ 添加任务</button>
        </div>
        ${this.localTasks.map(
          (task) => html`
            <div class="task-item">
              <div
                class="checkbox ${task.completed ? 'checked' : ''}"
                @click=${() => this.toggleTask(task.id)}
              >
                ${task.completed
                  ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
                  : ''}
              </div>
              <div class="task-content">
                <h4 class="task-title ${task.completed ? 'completed' : ''}">${task.title}</h4>
                <div class="task-meta">
                  <span class="priority ${task.priority}">${this.getPriorityLabel(task.priority)}</span>
                  ${task.dueDate ? html`<span class="due-date">截止: ${task.dueDate}</span>` : ''}
                </div>
              </div>
            </div>
          `,
        )}
        <div class="progress">
          <div class="progress-header">
            <span class="progress-label">完成进度</span>
            <span class="progress-value">${completedCount}/${totalCount}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'task-list': TaskList
  }
}
