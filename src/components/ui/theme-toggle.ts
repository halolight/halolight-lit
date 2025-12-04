import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { themeStore } from '../../stores/theme.ts'

@customElement('theme-toggle')
export class ThemeToggle extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
      border-radius: 8px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #1e293b;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `

  @state()
  private isDark = false

  private unsubscribe?: () => void

  connectedCallback() {
    super.connectedCallback()
    this.isDark = themeStore.getState().isDark
    this.unsubscribe = themeStore.subscribe((state) => {
      this.isDark = state.isDark
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.unsubscribe?.()
  }

  private handleToggle() {
    themeStore.toggleTheme()
  }

  render() {
    return html`
      <button @click=${this.handleToggle} title="${this.isDark ? '切换到亮色模式' : '切换到暗色模式'}">
        ${this.isDark
          ? html`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            `
          : html`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            `}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'theme-toggle': ThemeToggle
  }
}
