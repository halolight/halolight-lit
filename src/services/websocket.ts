import type { Notification } from '../types/index.ts'

type Status = 'connecting' | 'connected' | 'disconnected' | 'error'
type Listener = (payload: Notification) => void

class MockWebSocket {
  status: Status = 'disconnected'
  private listeners = new Set<Listener>()
  private timer?: number

  connect() {
    this.status = 'connecting'
    setTimeout(() => {
      this.status = 'connected'
      this.startMock()
    }, 800)
  }

  private startMock() {
    this.timer = window.setInterval(() => {
      if (Math.random() > 0.2) return

      const notifications: Notification[] = [
        {
          id: `ws-${Date.now()}`,
          type: 'system',
          title: '系统通知',
          content: '模拟实时通知',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: `ws-${Date.now()}-2`,
          type: 'user',
          title: '新用户注册',
          content: '用户张三刚刚完成注册',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: `ws-${Date.now()}-3`,
          type: 'task',
          title: '任务更新',
          content: '您有一个新任务待处理',
          read: false,
          createdAt: new Date().toISOString(),
        },
      ]

      const notification = notifications[Math.floor(Math.random() * notifications.length)]
      this.listeners.forEach((cb) => cb(notification))
    }, 10000) // Send notification every 10 seconds
  }

  onMessage(cb: Listener) {
    this.listeners.add(cb)
    return () => this.listeners.delete(cb)
  }

  close() {
    this.status = 'disconnected'
    if (this.timer) window.clearInterval(this.timer)
  }
}

export const websocket = new MockWebSocket()
