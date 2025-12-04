import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { config } from '../../config/index.ts'

@customElement('app-footer')
export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .footer {
      border-top: 1px solid #e2e8f0;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(8px);
      padding: 16px 24px;
    }

    .footer-content {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 13px;
      color: #64748b;
    }

    .copyright {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .author {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .heart {
      color: #ef4444;
      fill: #ef4444;
      width: 14px;
      height: 14px;
    }

    .author-link {
      color: #1e293b;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.2s;
    }

    .author-link:hover {
      color: #3b82f6;
    }

    .links {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
    }

    .link {
      color: #64748b;
      text-decoration: none;
      transition: color 0.2s;
    }

    .link:hover {
      color: #3b82f6;
    }

    @media (max-width: 640px) {
      .footer-content {
        flex-direction: column;
        text-align: center;
      }

      .copyright span.separator,
      .author span.hide-mobile {
        display: none;
      }
    }
  `

  private currentYear = new Date().getFullYear()

  private handlePrivacyClick(e: Event) {
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route: 'privacy' },
      bubbles: true,
      composed: true,
    }))
  }

  private handleTermsClick(e: Event) {
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { route: 'terms' },
      bubbles: true,
      composed: true,
    }))
  }

  render() {
    return html`
      <footer class="footer">
        <div class="footer-content">
          <div class="copyright">
            <span>© ${this.currentYear} ${config.brandName}</span>
            <span class="separator">·</span>
            <span class="hide-mobile">All rights reserved</span>
          </div>

          <div class="author">
            <span class="hide-mobile">Made with</span>
            <svg class="heart" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="hide-mobile">by</span>
            <a href="https://github.com/h7ml" target="_blank" rel="noopener noreferrer" class="author-link">
              h7ml
            </a>
          </div>

          <div class="links">
            <a href="/privacy" class="link" @click=${this.handlePrivacyClick}>隐私政策</a>
            <a href="/terms" class="link" @click=${this.handleTermsClick}>服务条款</a>
            <a href="https://halolight.docs.h7ml.cn/" target="_blank" rel="noopener noreferrer" class="link">
              在线文档
            </a>
            <a href="https://github.com/halolight/halolight-lit" target="_blank" rel="noopener noreferrer" class="link">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': AppFooter
  }
}
