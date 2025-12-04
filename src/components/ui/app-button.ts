import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

@customElement('app-button')
export class AppButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
      font-weight: 500;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      white-space: nowrap;
      overflow: hidden;
    }

    .btn:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* 尺寸 */
    .btn-sm {
      height: 32px;
      padding: 0 12px;
      font-size: 13px;
    }

    .btn-md {
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
    }

    .btn-lg {
      height: 48px;
      padding: 0 24px;
      font-size: 16px;
    }

    /* 主题变体 */
    .btn-primary {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
      transform: translateY(-1px);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    .btn-secondary {
      background: #f8fafc;
      color: #1e293b;
      border: 1px solid #e2e8f0;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .btn-outline {
      background: transparent;
      color: #3b82f6;
      border: 1px solid #3b82f6;
    }

    .btn-outline:hover:not(:disabled) {
      background: #3b82f6;
      color: white;
    }

    .btn-ghost {
      background: transparent;
      color: #64748b;
    }

    .btn-ghost:hover:not(:disabled) {
      background: #f1f5f9;
      color: #1e293b;
    }

    .btn-danger {
      background: #ef4444;
      color: white;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }

    .btn-danger:hover:not(:disabled) {
      background: #dc2626;
      box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
      transform: translateY(-1px);
    }

    /* 加载状态 */
    .btn-loading {
      pointer-events: none;
    }

    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    .btn-loading .btn-content {
      opacity: 0;
    }

    .btn-icon {
      width: 16px;
      height: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn-icon svg {
      width: 100%;
      height: 100%;
    }
  `

  @property({ type: String })
  variant: ButtonVariant = 'primary'

  @property({ type: String })
  size: ButtonSize = 'md'

  @property({ type: Boolean })
  loading = false

  @property({ type: Boolean })
  disabled = false

  @property({ type: String })
  icon = ''

  render() {
    return html`
      <button
        class="btn btn-${this.size} btn-${this.variant} ${this.loading ? 'btn-loading' : ''}"
        ?disabled=${this.disabled || this.loading}
        part="button"
      >
        ${this.loading ? html`<div class="loading-spinner"></div>` : ''}
        <span class="btn-content">
          ${this.icon
            ? html`<span class="btn-icon" .innerHTML=${this.icon}></span>`
            : ''}
          <slot></slot>
        </span>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-button': AppButton
  }
}
