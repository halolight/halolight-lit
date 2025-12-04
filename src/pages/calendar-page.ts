import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  type: 'meeting' | 'task' | 'reminder' | 'holiday'
  location?: string
}

@customElement('calendar-page')
export class CalendarPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 24px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 30px;
      font-weight: 700;
      margin: 0;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      background: #3b82f6;
      color: white;
      cursor: pointer;
      font-size: 14px;
    }

    .btn:hover {
      background: #2563eb;
    }

    .calendar-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    .calendar-panel {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .calendar-title {
      font-size: 18px;
      font-weight: 600;
    }

    .calendar-nav {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .nav-btn {
      width: 32px;
      height: 32px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-btn:hover {
      background: #f3f4f6;
    }

    .today-btn {
      padding: 6px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
    }

    .today-btn:hover {
      background: #f3f4f6;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }

    .weekday {
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      color: #6b7280;
      padding: 8px 0;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .calendar-day {
      aspect-ratio: 1;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .calendar-day:hover {
      background: #f9fafb;
    }

    .calendar-day.other-month {
      color: #d1d5db;
    }

    .calendar-day.today {
      border-color: #3b82f6;
      border-width: 2px;
    }

    .calendar-day.selected {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .day-number {
      font-size: 14px;
      font-weight: 500;
    }

    .day-events {
      margin-top: 4px;
      display: flex;
      gap: 2px;
      flex-wrap: wrap;
    }

    .event-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
    }

    .event-dot.meeting {
      background: #3b82f6;
    }

    .event-dot.task {
      background: #10b981;
    }

    .event-dot.reminder {
      background: #f59e0b;
    }

    .event-dot.holiday {
      background: #8b5cf6;
    }

    .events-panel {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .events-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .event-item {
      border-left: 3px solid #3b82f6;
      padding: 12px;
      margin-bottom: 12px;
      background: #f9fafb;
      border-radius: 4px;
    }

    .event-item.task {
      border-left-color: #10b981;
    }

    .event-item.reminder {
      border-left-color: #f59e0b;
    }

    .event-item.holiday {
      border-left-color: #8b5cf6;
    }

    .event-title {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .event-time {
      font-size: 12px;
      color: #6b7280;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .event-location {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .legend {
      display: flex;
      gap: 16px;
      margin-top: 16px;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    @media (max-width: 1024px) {
      .calendar-layout {
        grid-template-columns: 1fr;
      }
    }
  `

  @state()
  private currentDate = new Date()

  @state()
  private selectedDate = new Date()

  @state()
  private events: CalendarEvent[] = [
    {
      id: '1',
      title: '团队周会',
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(),
      type: 'meeting',
      location: '会议室A',
    },
    {
      id: '2',
      title: '项目评审',
      start: new Date(Date.now() + 86400000).toISOString(),
      end: new Date(Date.now() + 90000000).toISOString(),
      type: 'meeting',
      location: '线上会议',
    },
    {
      id: '3',
      title: '完成设计稿',
      start: new Date(Date.now() + 172800000).toISOString(),
      end: new Date(Date.now() + 176400000).toISOString(),
      type: 'task',
    },
  ]

  private get year() {
    return this.currentDate.getFullYear()
  }

  private get month() {
    return this.currentDate.getMonth()
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  private formatTime(dateStr: string): string {
    const date = new Date(dateStr)
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  private getCalendarDays() {
    const firstDay = new Date(this.year, this.month, 1)
    const lastDay = new Date(this.year, this.month + 1, 0)
    const firstDayWeekday = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    const days = []
    const prevMonthDays = new Date(this.year, this.month, 0).getDate()

    // 上个月的日期
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(this.year, this.month - 1, prevMonthDays - i),
      })
    }

    // 当前月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(this.year, this.month, i),
      })
    }

    // 下个月的日期
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(this.year, this.month + 1, i),
      })
    }

    return days
  }

  private getEventsForDate(date: Date): CalendarEvent[] {
    const dateStr = this.formatDate(date)
    return this.events.filter(event => event.start.startsWith(dateStr))
  }

  private prevMonth() {
    this.currentDate = new Date(this.year, this.month - 1, 1)
  }

  private nextMonth() {
    this.currentDate = new Date(this.year, this.month + 1, 1)
  }

  private goToday() {
    const today = new Date()
    this.currentDate = today
    this.selectedDate = today
  }

  private selectDay(date: Date) {
    this.selectedDate = date
  }

  render() {
    const days = this.getCalendarDays()
    const todayStr = this.formatDate(new Date())
    const selectedStr = this.formatDate(this.selectedDate)
    const selectedEvents = this.getEventsForDate(this.selectedDate)

    return html`
      <div class="page-header">
        <h1 class="page-title">日程安排</h1>
        <button class="btn">+ 新建日程</button>
      </div>

      <div class="calendar-layout">
        <!-- 日历主面板 -->
        <div class="calendar-panel">
          <div class="calendar-header">
            <div class="calendar-title">${this.year}年 ${this.month + 1}月</div>
            <div class="calendar-nav">
              <button class="today-btn" @click=${this.goToday}>今天</button>
              <button class="nav-btn" @click=${this.prevMonth}>◀</button>
              <button class="nav-btn" @click=${this.nextMonth}>▶</button>
            </div>
          </div>

          <div class="weekdays">
            ${['日', '一', '二', '三', '四', '五', '六'].map(day => html`<div class="weekday">${day}</div>`)}
          </div>

          <div class="calendar-grid">
            ${days.map(({ day, isCurrentMonth, date }) => {
              const dateStr = this.formatDate(date)
              const isToday = dateStr === todayStr
              const isSelected = dateStr === selectedStr
              const dayEvents = this.getEventsForDate(date)

              return html`
                <div
                  class="calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
                  @click=${() => this.selectDay(date)}
                >
                  <span class="day-number">${day}</span>
                  ${dayEvents.length > 0
                    ? html`
                        <div class="day-events">
                          ${dayEvents.slice(0, 3).map(
                            event => html`<div class="event-dot ${event.type}"></div>`,
                          )}
                        </div>
                      `
                    : ''}
                </div>
              `
            })}
          </div>

          <div class="legend">
            <div class="legend-item">
              <div class="legend-dot meeting"></div>
              <span>会议</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot task"></div>
              <span>任务</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot reminder"></div>
              <span>提醒</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot holiday"></div>
              <span>假日</span>
            </div>
          </div>
        </div>

        <!-- 日程列表面板 -->
        <div class="events-panel">
          <div class="events-title">
            ${this.selectedDate.getMonth() + 1}月${this.selectedDate.getDate()}日 日程
          </div>

          ${selectedEvents.length > 0
            ? selectedEvents.map(
                event => html`
                  <div class="event-item ${event.type}">
                    <div class="event-title">${event.title}</div>
                    <div class="event-time">
                      🕐 ${this.formatTime(event.start)} - ${this.formatTime(event.end)}
                    </div>
                    ${event.location
                      ? html`<div class="event-location">📍 ${event.location}</div>`
                      : ''}
                  </div>
                `,
              )
            : html`
                <div style="text-align: center; color: #9ca3af; padding: 40px 0;">
                  <div style="font-size: 48px; margin-bottom: 8px;">📅</div>
                  <p>今日暂无日程</p>
                </div>
              `}
        </div>
      </div>
    `
  }
}
