import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { ChartData } from '../../types/index.ts'

@customElement('chart-card')
export class ChartCard extends LitElement {
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

    .chart-container {
      height: 250px;
      display: flex;
      align-items: flex-end;
      gap: 8px;
      padding: 20px 0;
    }

    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      height: 100%;
      width: 100%;
    }

    .bar-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .bars {
      display: flex;
      gap: 4px;
      height: 200px;
      align-items: flex-end;
    }

    .bar {
      width: 20px;
      border-radius: 4px 4px 0 0;
      transition: height 0.3s ease;
    }

    .bar.primary {
      background: #3b82f6;
    }

    .bar.secondary {
      background: #10b981;
    }

    .bar-label {
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }

    .line-chart {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .line-chart svg {
      width: 100%;
      height: 100%;
    }

    .pie-chart {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }

    .pie-svg {
      width: 160px;
      height: 160px;
    }

    .pie-legend {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .legend-label {
      font-size: 13px;
      color: #64748b;
    }

    .legend-value {
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
      margin-left: auto;
    }

    .no-data {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: #94a3b8;
    }
  `

  @property({ type: String })
  title = ''

  @property({ type: String })
  type: 'line' | 'bar' | 'pie' = 'line'

  @property({ type: Object })
  data: ChartData | null = null

  private renderBarChart() {
    if (!this.data) return html`<div class="no-data">暂无数据</div>`

    // Type guard to ensure data is not null
    const data = this.data
    const maxValue = Math.max(...data.datasets.flatMap((d) => d.data))
    const labels = data.labels.filter((_, i) => i % 2 === 0) // 显示部分标签

    return html`
      <div class="bar-chart">
        ${data.labels.map(
          (label, i) => html`
            <div class="bar-group">
              <div class="bars">
                ${data.datasets.map(
                  (dataset, j) => html`
                    <div
                      class="bar ${j === 0 ? 'primary' : 'secondary'}"
                      style="height: ${(dataset.data[i] / maxValue) * 100}%"
                    ></div>
                  `,
                )}
              </div>
              ${labels.includes(label) ? html`<span class="bar-label">${label}</span>` : ''}
            </div>
          `,
        )}
      </div>
    `
  }

  private renderLineChart() {
    if (!this.data) return html`<div class="no-data">暂无数据</div>`

    const dataset = this.data.datasets[0]
    const maxValue = Math.max(...dataset.data) * 1.1
    const width = 100
    const height = 100

    const points = dataset.data.map((value, i) => {
      const x = (i / (dataset.data.length - 1)) * width
      const y = height - (value / maxValue) * height
      return `${x},${y}`
    })

    const areaPoints = `0,${height} ${points.join(' ')} ${width},${height}`

    return html`
      <div class="line-chart">
        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: #3b82f6; stop-opacity: 0.3" />
              <stop offset="100%" style="stop-color: #3b82f6; stop-opacity: 0" />
            </linearGradient>
          </defs>
          <polygon points="${areaPoints}" fill="url(#gradient)" />
          <polyline
            points="${points.join(' ')}"
            fill="none"
            stroke="#3b82f6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    `
  }

  private renderPieChart() {
    if (!this.data) return html`<div class="no-data">暂无数据</div>`

    // Type guard to ensure data is not null
    const data = this.data
    const dataset = data.datasets[0]
    const total = dataset.data.reduce((a, b) => a + b, 0)
    const colors = dataset.backgroundColor as string[]

    let currentAngle = -90 // 从顶部开始

    const segments = dataset.data.map((value, i) => {
      const percentage = value / total
      const angle = percentage * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle = endAngle

      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      const x1 = 50 + 40 * Math.cos(startRad)
      const y1 = 50 + 40 * Math.sin(startRad)
      const x2 = 50 + 40 * Math.cos(endRad)
      const y2 = 50 + 40 * Math.sin(endRad)

      const largeArc = angle > 180 ? 1 : 0

      return {
        path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
        color: colors[i],
        label: data.labels[i],
        value: value,
        percentage: (percentage * 100).toFixed(1),
      }
    })

    return html`
      <div class="pie-chart">
        <svg class="pie-svg" viewBox="0 0 100 100">
          ${segments.map(
            (segment) => html`
              <path d="${segment.path}" fill="${segment.color}" />
            `,
          )}
        </svg>
        <div class="pie-legend">
          ${segments.map(
            (segment) => html`
              <div class="legend-item">
                <span class="legend-dot" style="background: ${segment.color}"></span>
                <span class="legend-label">${segment.label}</span>
                <span class="legend-value">${segment.percentage}%</span>
              </div>
            `,
          )}
        </div>
      </div>
    `
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${this.title}</h3>
        </div>
        <div class="chart-container">
          ${this.type === 'bar'
            ? this.renderBarChart()
            : this.type === 'pie'
            ? this.renderPieChart()
            : this.renderLineChart()}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chart-card': ChartCard
  }
}
