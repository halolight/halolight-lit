import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { tabsStore, type Tab } from '../../stores/tabs.ts'

@customElement('tab-bar')
export class TabBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      border-bottom: 1px solid var(--border-color, #e2e8f0);
      background: var(--card-bg, #fff);
    }
    .tabs {
      display: flex;
      gap: 8px;
      padding: 8px 12px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tabs::-webkit-scrollbar {
      display: none;
    }
    .tab {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      color: var(--text-color, #0f172a);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .tab:hover {
      background: color-mix(in srgb, var(--primary-color) 20%, transparent);
    }
    .tab.active {
      background: var(--primary-color, #3b82f6);
      color: white;
    }
    button.close-btn {
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      padding: 0;
      margin-left: 4px;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }
    button.close-btn:hover {
      opacity: 1;
    }
  `

  @state() private tabs: Tab[] = []
  @state() private activeId = ''

  private unsubscribe?: () => void

  connectedCallback() {
    super.connectedCallback()
    this.unsubscribe = tabsStore.subscribe((state) => {
      this.tabs = state.tabs
      this.activeId = state.activeTabId
    })
  }

  disconnectedCallback() {
    this.unsubscribe?.()
    super.disconnectedCallback()
  }

  private onSelect(tab: Tab) {
    tabsStore.setActive(tab.id)
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: { path: tab.path } }))
  }

  private onClose(e: Event, tab: Tab) {
    e.stopPropagation()
    tabsStore.close(tab.id)
  }

  render() {
    return html`
      <div class="tabs">
        ${this.tabs.map(
          (tab) => html`
            <div
              class="tab ${tab.id === this.activeId ? 'active' : ''}"
              data-tab-id=${tab.id}
              @click=${() => this.onSelect(tab)}
            >
              <span>${tab.title}</span>
              ${tab.closable === false
                ? null
                : html`<button class="close-btn" @click=${(e: Event) => this.onClose(e, tab)}>×</button>`}
            </div>
          `,
        )}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tab-bar': TabBar
  }
}
