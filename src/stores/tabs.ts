export interface Tab {
  id: string
  title: string
  path: string
  closable?: boolean
}

interface TabsState {
  tabs: Tab[]
  activeTabId: string
}

type Listener = (state: TabsState) => void

const DEFAULT_TAB: Tab = { id: 'home', title: '首页', path: '/dashboard', closable: false }

class TabsStore {
  private state: TabsState = { tabs: [DEFAULT_TAB], activeTabId: DEFAULT_TAB.id }
  private listeners = new Set<Listener>()

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    listener({ ...this.state })
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach((cb) => cb({ ...this.state }))
  }

  getState() {
    return { ...this.state }
  }

  add(tab: Tab) {
    if (this.state.tabs.find((t) => t.path === tab.path)) {
      this.setActiveByPath(tab.path)
      return
    }
    this.state.tabs = [...this.state.tabs, tab]
    this.state.activeTabId = tab.id
    this.notify()
  }

  close(id: string) {
    const nextTabs = this.state.tabs.filter((t) => t.id !== id || t.closable === false)
    if (nextTabs.length === this.state.tabs.length) return
    this.state.tabs = nextTabs
    if (this.state.activeTabId === id) {
      this.state.activeTabId = nextTabs[nextTabs.length - 1]?.id ?? DEFAULT_TAB.id
    }
    this.notify()
  }

  setActive(id: string) {
    this.state.activeTabId = id
    this.notify()
  }

  setActiveByPath(path: string) {
    const tab = this.state.tabs.find((t) => t.path === path)
    if (tab) this.setActive(tab.id)
  }
}

export const tabsStore = new TabsStore()
