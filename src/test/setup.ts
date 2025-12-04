import { beforeAll, afterEach } from 'vitest'

// 设置全局测试环境
beforeAll(() => {
  // 模拟 localStorage
  const localStorageMock = {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
    clear: () => {},
  }
  global.localStorage = localStorageMock as Storage

  // 模拟 matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
  })
})

// 每个测试后清理
afterEach(() => {
  localStorage.clear()
})
