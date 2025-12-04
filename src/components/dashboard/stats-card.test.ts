import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import './stats-card'
import type { StatsCard } from './stats-card'

describe('StatsCard', () => {
  let element: StatsCard

  beforeEach(async () => {
    element = document.createElement('stats-card') as StatsCard
    element.title = 'Test Title'
    element.value = '1,234'
    element.change = 12.5
    element.icon = 'users'
    element.color = 'blue'
    document.body.appendChild(element)
    await element.updateComplete
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should render with default properties', () => {
    expect(element).toBeDefined()
    expect(element.title).toBe('Test Title')
    expect(element.value).toBe('1,234')
    expect(element.change).toBe(12.5)
    expect(element.icon).toBe('users')
    expect(element.color).toBe('blue')
  })

  it('should render title and value', () => {
    const titleElement = element.shadowRoot?.querySelector('.card-title')
    const valueElement = element.shadowRoot?.querySelector('.card-value')

    expect(titleElement?.textContent).toBe('Test Title')
    expect(valueElement?.textContent).toBe('1,234')
  })

  it('should render icon wrapper with correct color class', () => {
    const iconWrapper = element.shadowRoot?.querySelector('.icon-wrapper')
    expect(iconWrapper?.classList.contains('blue')).toBe(true)
  })

  it('should render positive change with correct styling', () => {
    const changeElement = element.shadowRoot?.querySelector('.card-change')
    expect(changeElement?.classList.contains('positive')).toBe(true)
    expect(changeElement?.textContent).toContain('+12.5% 较上月')
  })

  it('should render negative change with correct styling', async () => {
    element.change = -8.3
    await element.updateComplete

    const changeElement = element.shadowRoot?.querySelector('.card-change')
    expect(changeElement?.classList.contains('negative')).toBe(true)
    expect(changeElement?.textContent).toContain('-8.3% 较上月')
  })

  it('should render zero change as positive', async () => {
    element.change = 0
    await element.updateComplete

    const changeElement = element.shadowRoot?.querySelector('.card-change')
    expect(changeElement?.classList.contains('positive')).toBe(true)
    expect(changeElement?.textContent).toContain('+0% 较上月')
  })

  it('should support all color variants', async () => {
    const colors = ['blue', 'green', 'purple', 'orange'] as const

    for (const color of colors) {
      element.color = color
      await element.updateComplete

      const iconWrapper = element.shadowRoot?.querySelector('.icon-wrapper')
      expect(iconWrapper?.classList.contains(color)).toBe(true)
    }
  })

  it('should render correct icons for different icon names', async () => {
    const testCases = [
      { icon: 'users', expectedSvg: 'circle cx="9" cy="7" r="4"' },
      { icon: 'user-check', expectedSvg: 'polyline points="16 11 18 13 22 9"' },
      { icon: 'shopping-cart', expectedSvg: 'circle cx="9" cy="21" r="1"' },
      { icon: 'dollar-sign', expectedSvg: 'line x1="12" y1="1" x2="12" y2="23"' },
    ]

    for (const testCase of testCases) {
      element.icon = testCase.icon
      await element.updateComplete

      const iconElement = element.shadowRoot?.querySelector('.icon-wrapper span')
      expect(iconElement?.innerHTML).toContain(testCase.expectedSvg)
    }
  })

  it('should fallback to users icon for unknown icon names', async () => {
    element.icon = 'unknown-icon'
    await element.updateComplete

    const iconElement = element.shadowRoot?.querySelector('.icon-wrapper span')
    expect(iconElement?.innerHTML).toContain('circle cx="9" cy="7" r="4"')
  })

  it('should render card structure correctly', () => {
    const card = element.shadowRoot?.querySelector('.card')
    const cardHeader = element.shadowRoot?.querySelector('.card-header')
    const cardTitle = element.shadowRoot?.querySelector('.card-title')
    const cardValue = element.shadowRoot?.querySelector('.card-value')
    const cardChange = element.shadowRoot?.querySelector('.card-change')

    expect(card).toBeDefined()
    expect(cardHeader).toBeDefined()
    expect(cardTitle).toBeDefined()
    expect(cardValue).toBeDefined()
    expect(cardChange).toBeDefined()
  })
})
