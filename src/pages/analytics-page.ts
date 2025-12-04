import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

interface MetricCard {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}

@customElement('analytics-page')
export class AnalyticsPage extends LitElement {
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

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .metric-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .metric-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .metric-value {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .metric-change {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .metric-change.up {
      color: #10b981;
    }

    .metric-change.down {
      color: #ef4444;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .chart-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .chart-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .chart-placeholder {
      height: 200px;
      background: linear-gradient(to bottom, #eff6ff 0%, #dbeafe 100%);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
    }

    .table-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .table-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      font-size: 12px;
      font-weight: 500;
      color: #6b7280;
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 14px;
    }

    tr:hover {
      background: #f9fafb;
    }

    .progress-bar {
      height: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 4px;
    }

    @media (max-width: 1024px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `

  @state()
  private metrics: MetricCard[] = [
    { label: '总访问量', value: '45,231', change: '+12.5%', trend: 'up' },
    { label: '活跃用户', value: '8,429', change: '+8.2%', trend: 'up' },
    { label: '转化率', value: '3.24%', change: '-2.1%', trend: 'down' },
    { label: '平均停留', value: '4:32', change: '+5.3%', trend: 'up' },
  ]

  @state()
  private topPages = [
    { page: '/dashboard', views: 12453, rate: 85 },
    { page: '/users', views: 8932, rate: 72 },
    { page: '/analytics', views: 6721, rate: 68 },
    { page: '/settings', views: 4521, rate: 55 },
    { page: '/files', views: 3201, rate: 48 },
  ]

  render() {
    return html`
      <div class="page-header">
        <h1 class="page-title">分析报告</h1>
        <p style="color: #6b7280;">数据分析与统计报表</p>
      </div>

      <!-- 核心指标 -->
      <div class="metrics-grid">
        ${this.metrics.map(
          metric => html`
            <div class="metric-card">
              <div class="metric-label">${metric.label}</div>
              <div class="metric-value">${metric.value}</div>
              <div class="metric-change ${metric.trend}">
                <span>${metric.trend === 'up' ? '↑' : '↓'}</span>
                <span>${metric.change}</span>
              </div>
            </div>
          `,
        )}
      </div>

      <!-- 图表 -->
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-title">访问趋势</div>
          <div class="chart-placeholder">📊 访问量趋势图</div>
        </div>

        <div class="chart-card">
          <div class="chart-title">用户分布</div>
          <div class="chart-placeholder">🌍 地域分布图</div>
        </div>

        <div class="chart-card">
          <div class="chart-title">流量来源</div>
          <div class="chart-placeholder">📈 来源渠道图</div>
        </div>

        <div class="chart-card">
          <div class="chart-title">设备统计</div>
          <div class="chart-placeholder">💻 设备类型图</div>
        </div>
      </div>

      <!-- 热门页面表格 -->
      <div class="table-card">
        <div class="table-title">热门页面</div>
        <table>
          <thead>
            <tr>
              <th>页面路径</th>
              <th>访问量</th>
              <th>占比</th>
            </tr>
          </thead>
          <tbody>
            ${this.topPages.map(
              page => html`
                <tr>
                  <td>${page.page}</td>
                  <td>${page.views.toLocaleString()}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div class="progress-bar" style="flex: 1;">
                        <div class="progress-fill" style="width: ${page.rate}%"></div>
                      </div>
                      <span style="color: #6b7280; font-size: 12px;">${page.rate}%</span>
                    </div>
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `
  }
}
