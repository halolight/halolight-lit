export type WidgetType = 'chart-bar' | 'chart-pie' | 'recent-users' | 'tasks' | 'calendar'

export interface DashboardWidget {
  id: string
  type: WidgetType
  title: string
  config?: Record<string, unknown>
}

export interface DashboardLayout {
  i: string
  x: number
  y: number
  w: number
  h: number
}

const defaultWidgets: DashboardWidget[] = [
  { id: 'chart-bar-1', type: 'chart-bar', title: '销售统计' },
  { id: 'chart-pie-1', type: 'chart-pie', title: '流量占比' },
  { id: 'recent-users-1', type: 'recent-users', title: '最近用户' },
  { id: 'tasks-1', type: 'tasks', title: '待办任务' },
  { id: 'calendar-1', type: 'calendar', title: '今日日程' },
]

const defaultLayouts: DashboardLayout[] = [
  { i: 'chart-bar-1', x: 0, y: 0, w: 6, h: 4 },
  { i: 'chart-pie-1', x: 6, y: 0, w: 6, h: 4 },
  { i: 'recent-users-1', x: 0, y: 4, w: 4, h: 4 },
  { i: 'tasks-1', x: 4, y: 4, w: 4, h: 4 },
  { i: 'calendar-1', x: 8, y: 4, w: 4, h: 4 },
]

type Listener = (widgets: DashboardWidget[], layouts: DashboardLayout[]) => void

class DashboardStore {
  widgets = defaultWidgets
  layouts = defaultLayouts
  private listeners = new Set<Listener>()

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    listener(this.widgets, this.layouts)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.widgets, this.layouts))
  }

  setLayouts(layouts: DashboardLayout[]) {
    this.layouts = layouts
    this.notify()
  }

  reset() {
    this.widgets = defaultWidgets
    this.layouts = defaultLayouts
    this.notify()
  }
}

export const dashboardStore = new DashboardStore()
