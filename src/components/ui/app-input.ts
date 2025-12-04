import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

@customElement('app-input')
export class AppInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .input-group {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      font-size: 14px;
      font-family: inherit;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      color: #1e293b;
      transition: all 0.2s;
      box-sizing: border-box;
    }

    .input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .input::placeholder {
      color: #94a3b8;
    }

    .input:disabled {
      background: #f8fafc;
      color: #94a3b8;
      cursor: not-allowed;
    }

    .input.error {
      border-color: #ef4444;
    }

    .input.error:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    /* 尺寸 */
    .input-sm {
      height: 32px;
      padding: 0 10px;
      font-size: 13px;
    }

    .input-lg {
      height: 48px;
      padding: 0 16px;
      font-size: 16px;
    }

    /* 带前缀/后缀 */
    .input.has-prefix {
      padding-left: 40px;
    }

    .input.has-suffix {
      padding-right: 40px;
    }

    /* 前缀/后缀图标 */
    .input-prefix,
    .input-suffix {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
    }

    .input-prefix {
      left: 12px;
    }

    .input-suffix {
      right: 12px;
    }

    .input-prefix svg,
    .input-suffix svg {
      width: 18px;
      height: 18px;
    }

    /* 标签 */
    .label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .label.required::after {
      content: ' *';
      color: #ef4444;
    }

    /* 错误信息 */
    .error-message {
      font-size: 12px;
      color: #ef4444;
      margin-top: 4px;
    }

    /* 描述信息 */
    .help-text {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }

    /* 深色模式支持 */
    :host-context(.dark) .input {
      background: #1e293b;
      border-color: #334155;
      color: #f1f5f9;
    }

    :host-context(.dark) .input:focus {
      border-color: #3b82f6;
    }

    :host-context(.dark) .input:disabled {
      background: #334155;
      color: #64748b;
    }

    :host-context(.dark) .label {
      color: #f1f5f9;
    }

    :host-context(.dark) .input-prefix,
    :host-context(.dark) .input-suffix {
      color: #94a3b8;
    }
  `

  @property({ type: String })
  type: InputType = 'text'

  @property({ type: String })
  value = ''

  @property({ type: String })
  placeholder = ''

  @property({ type: String })
  label = ''

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md'

  @property({ type: Boolean })
  disabled = false

  @property({ type: Boolean })
  required = false

  @property({ type: String })
  error = ''

  @property({ type: String })
  help = ''

  @property({ type: String })
  prefix = ''

  @property({ type: String })
  suffix = ''

  render() {
    return html`
      <div class="input-group">
        ${this.label
          ? html`<label class="label ${this.required ? 'required' : ''}">${this.label}</label>`
          : ''}
        <div class="input-wrapper">
          ${this.prefix
            ? html`<span class="input-prefix" .innerHTML=${this.prefix}></span>`
            : ''}
          <input
            type="${this.type}"
            class="input input-${this.size} ${this.error ? 'error' : ''} ${this.prefix ? 'has-prefix' : ''} ${this.suffix ? 'has-suffix' : ''}"
            placeholder="${this.placeholder}"
            value="${this.value}"
            ?disabled=${this.disabled}
            ?required=${this.required}
            @input=${(e: Event) => this._handleInput(e)}
            @change=${(e: Event) => this._handleChange(e)}
            part="input"
          />
          ${this.suffix
            ? html`<span class="input-suffix" .innerHTML=${this.suffix}></span>`
            : ''}
        </div>
        ${this.error
          ? html`<div class="error-message">${this.error}</div>`
          : this.help
          ? html`<div class="help-text">${this.help}</div>`
          : ''}
      </div>
    `
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value } }))
  }

  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-input': AppInput
  }
}
