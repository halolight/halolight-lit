import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { mockApi } from '../mock/api.ts'
import type { DashboardSummary, Activity, Task, ChartData } from '../types/index.ts'
import '../components/dashboard/stats-card.ts'
import '../components/dashboard/chart-card.ts'
import '../components/dashboard/activity-list.ts'
import '../components/dashboard/task-list.ts'

@customElement('dashboard-page')
export class DashboardPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .page-subtitle {
      color: #64748b;
      margin: 4px 0 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .widgets-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    @media (max-width: 1200px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }

      .widgets-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .widgets-grid {
        grid-template-columns: 1fr;
      }
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
  private summary: DashboardSummary | null = null

  @state()
  private activities: Activity[] = []

  @state()
  private tasks: Task[] = []

  @state()
  private visitsData: ChartData | null = null

  @state()
  private salesData: ChartData | null = null

  @state()
  private pieData: ChartData | null = null

  @state()
  private loading = true

  async connectedCallback() {
    super.connectedCallback()
    await this.loadData()
  }

  private async loadData() {
    this.loading = true
    try {
      const [summaryRes, activitiesRes, tasksRes, visitsRes, salesRes, pieRes] = await Promise.all([
        mockApi.getDashboardSummary(),
        mockApi.getActivities(),
        mockApi.getTasks(),
        mockApi.getVisitsChart(),
        mockApi.getSalesChart(),
        mockApi.getPieChart(),
      ])

      if (summaryRes.data) this.summary = summaryRes.data
      if (activitiesRes.data) this.activities = activitiesRes.data
      if (tasksRes.data) this.tasks = tasksRes.data
      if (visitsRes.data) this.visitsData = visitsRes.data
      if (salesRes.data) this.salesData = salesRes.data
      if (pieRes.data) this.pieData = pieRes.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load dashboard data:', error)
    }
    this.loading = false
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  private formatCurrency(num: number): string {
    return '¥' + num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">加载中...</div>`
    }

    return html`
      <div class="page-header">
        <h1 class="page-title">仪表盘</h1>
        <p class="page-subtitle">欢迎回来，这是您的业务概览</p>
      </div>

      <div class="stats-grid">
        <stats-card
          title="总用户数"
          value=${this.formatNumber(this.summary?.totalUsers || 0)}
          change=${this.summary?.userGrowth || 0}
          icon="users"
          color="blue"
        ></stats-card>
        <stats-card
          title="活跃用户"
          value=${this.formatNumber(this.summary?.activeUsers || 0)}
          change=${8.5}
          icon="user-check"
          color="green"
        ></stats-card>
        <stats-card
          title="总订单数"
          value=${this.formatNumber(this.summary?.totalOrders || 0)}
          change=${this.summary?.orderGrowth || 0}
          icon="shopping-cart"
          color="purple"
        ></stats-card>
        <stats-card
          title="总收入"
          value=${this.formatCurrency(this.summary?.totalRevenue || 0)}
          change=${this.summary?.revenueGrowth || 0}
          icon="dollar-sign"
          color="orange"
        ></stats-card>
      </div>

      <div class="charts-grid">
        <chart-card
          title="访问趋势"
          type="line"
          .data=${this.visitsData}
        ></chart-card>
        <chart-card
          title="销售统计"
          type="bar"
          .data=${this.salesData}
        ></chart-card>
      </div>

      <div class="widgets-grid">
        <activity-list .activities=${this.activities}></activity-list>
        <task-list .tasks=${this.tasks}></task-list>
        <chart-card
          title="流量来源"
          type="pie"
          .data=${this.pieData}
        ></chart-card>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dashboard-page': DashboardPage
  }
}
