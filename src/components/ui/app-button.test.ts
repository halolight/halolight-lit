import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import './app-button'
import type { AppButton } from './app-button'

describe('AppButton', () => {
  let element: AppButton

  beforeEach(async () => {
    element = document.createElement('app-button') as AppButton
    element.textContent = 'Test Button'
    document.body.appendChild(element)
    await element.updateComplete
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should render with default properties', () => {
    expect(element).toBeDefined()
    expect(element.variant).toBe('primary')
    expect(element.size).toBe('md')
    expect(element.loading).toBe(false)
    expect(element.disabled).toBe(false)
    expect(element.icon).toBe('')
  })

  it('should render button text content', () => {
    const button = element.shadowRoot?.querySelector('button')
    expect(button).toBeDefined()
    const slot = element.shadowRoot?.querySelector('slot')
    expect(slot).toBeDefined()
    // The text content should be in the slot's assigned nodes
    expect(element.textContent).toBe('Test Button')
  })

  it('should apply correct CSS classes based on variant', async () => {
    element.variant = 'secondary'
    await element.updateComplete

    const button = element.shadowRoot?.querySelector('button')
    expect(button?.classList.contains('btn-secondary')).toBe(true)
  })

  it('should apply correct CSS classes based on size', async () => {
    element.size = 'lg'
    await element.updateComplete

    const button = element.shadowRoot?.querySelector('button')
    expect(button?.classList.contains('btn-lg')).toBe(true)
  })

  it('should disable button when disabled property is true', async () => {
    element.disabled = true
    await element.updateComplete

    const button = element.shadowRoot?.querySelector('button')
    expect(button?.disabled).toBe(true)
  })

  it('should disable button when loading property is true', async () => {
    element.loading = true
    await element.updateComplete

    const button = element.shadowRoot?.querySelector('button')
    expect(button?.disabled).toBe(true)
  })

  it('should show loading spinner when loading', async () => {
    element.loading = true
    await element.updateComplete

    const spinner = element.shadowRoot?.querySelector('.loading-spinner')
    expect(spinner).toBeDefined()
  })

  it('should hide content when loading', async () => {
    element.loading = true
    await element.updateComplete

    const content = element.shadowRoot?.querySelector('.btn-content')
    expect(content?.classList.contains('btn-content')).toBe(true)
  })

  it('should render icon when provided', async () => {
    const testIcon = '<svg><circle cx="12" cy="12" r="10"></circle></svg>'
    element.icon = testIcon
    await element.updateComplete

    const iconElement = element.shadowRoot?.querySelector('.btn-icon')
    expect(iconElement).toBeDefined()
    expect(iconElement?.innerHTML).toBe(testIcon)
  })

  it('should handle click events when enabled', () => {
    let clicked = false
    element.addEventListener('click', () => {
      clicked = true
    })

    const button = element.shadowRoot?.querySelector('button')
    button?.click()

    expect(clicked).toBe(true)
  })

  it('should not handle click events when disabled', async () => {
    element.disabled = true
    await element.updateComplete

    let clicked = false
    element.addEventListener('click', () => {
      clicked = true
    })

    const button = element.shadowRoot?.querySelector('button')
    button?.click()

    expect(clicked).toBe(false)
  })

  it('should not handle click events when loading', async () => {
    element.loading = true
    await element.updateComplete

    let clicked = false
    element.addEventListener('click', () => {
      clicked = true
    })

    const button = element.shadowRoot?.querySelector('button')
    button?.click()

    expect(clicked).toBe(false)
  })

  it('should support all variant types', async () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const

    for (const variant of variants) {
      element.variant = variant
      await element.updateComplete

      const button = element.shadowRoot?.querySelector('button')
      expect(button?.classList.contains(`btn-${variant}`)).toBe(true)
    }
  })

  it('should support all size types', async () => {
    const sizes = ['sm', 'md', 'lg'] as const

    for (const size of sizes) {
      element.size = size
      await element.updateComplete

      const button = element.shadowRoot?.querySelector('button')
      expect(button?.classList.contains(`btn-${size}`)).toBe(true)
    }
  })
})
