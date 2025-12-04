// UI settings store for skin/theme + layout toggles
export type SkinPreset =
  | 'default'
  | 'blue'
  | 'emerald'
  | 'amber'
  | 'violet'
  | 'rose'
  | 'teal'
  | 'slate'
  | 'ocean'
  | 'sunset'
  | 'aurora'

export interface UiSettingsState {
  skin: SkinPreset
  showFooter: boolean
  showTabBar: boolean
  mobileHeaderFixed: boolean
  mobileTabBarFixed: boolean
}

type Listener = (state: UiSettingsState) => void

const STORAGE_KEY = 'ui-settings-storage'

class UiSettingsStore {
  private state: UiSettingsState = {
    skin: 'default',
    showFooter: true,
    showTabBar: true,
    mobileHeaderFixed: true,
    mobileTabBarFixed: true,
  }
  private listeners = new Set<Listener>()

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      this.state = { ...this.state, ...JSON.parse(saved) }
      this.applySkin(this.state.skin)
    }
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))
  }

  private notify() {
    this.listeners.forEach((cb) => cb({ ...this.state }))
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    listener({ ...this.state })
    return () => this.listeners.delete(listener)
  }

  getState() {
    return { ...this.state }
  }

  setSkin(skin: SkinPreset) {
    this.state.skin = skin
    this.applySkin(skin)
    this.persist()
    this.notify()
  }

  toggle<K extends keyof UiSettingsState>(key: K, value: UiSettingsState[K]) {
    this.state[key] = value
    this.persist()
    this.notify()
  }

  reset() {
    this.state = {
      skin: 'default',
      showFooter: true,
      showTabBar: true,
      mobileHeaderFixed: true,
      mobileTabBarFixed: true,
    }
    this.applySkin(this.state.skin)
    this.persist()
    this.notify()
  }

  private applySkin(skin: SkinPreset) {
    document.documentElement.setAttribute('data-skin', skin)
  }
}

export const uiSettingsStore = new UiSettingsStore()
