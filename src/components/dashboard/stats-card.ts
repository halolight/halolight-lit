import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('stats-card')
export class StatsCard extends LitElement {
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
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    .icon-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-wrapper.blue {
      background: #dbeafe;
      color: #3b82f6;
    }

    .icon-wrapper.green {
      background: #d1fae5;
      color: #10b981;
    }

    .icon-wrapper.purple {
      background: #ede9fe;
      color: #8b5cf6;
    }

    .icon-wrapper.orange {
      background: #ffedd5;
      color: #f97316;
    }

    .icon-wrapper svg {
      width: 20px;
      height: 20px;
    }

    .card-value {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px;
    }

    .card-change {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
    }

    .card-change.positive {
      color: #10b981;
    }

    .card-change.negative {
      color: #ef4444;
    }

    .card-change svg {
      width: 14px;
      height: 14px;
    }
  `

  @property({ type: String })
  title = ''

  @property({ type: String })
  value = ''

  @property({ type: Number })
  change = 0

  @property({ type: String })
  icon = 'users'

  @property({ type: String })
  color: 'blue' | 'green' | 'purple' | 'orange' = 'blue'

  private getIcon(name: string): string {
    const icons: Record<string, string> = {
      users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      'user-check': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>',
      'shopping-cart': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
      'dollar-sign': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    }
    return icons[name] || icons.users
  }

  render() {
    const isPositive = this.change >= 0

    return html`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${this.title}</h3>
          <div class="icon-wrapper ${this.color}">
            <span .innerHTML=${this.getIcon(this.icon)}></span>
          </div>
        </div>
        <p class="card-value">${this.value}</p>
        <div class="card-change ${isPositive ? 'positive' : 'negative'}">
          ${isPositive
            ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`
            : html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>`}
          <span>${isPositive ? '+' : ''}${this.change}% 较上月</span>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stats-card': StatsCard
  }
}
