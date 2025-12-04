// Registry for configurable dashboard widgets (chart-bar, chart-pie, recent-users, tasks, calendar)
// Each entry should render the corresponding widget component.
import { html } from 'lit'
import './chart-card.ts'
import './activity-list.ts'
import './task-list.ts'

export const widgetRenderers: Record<
  'chart-bar' | 'chart-pie' | 'recent-users' | 'tasks' | 'calendar',
  (data: any) => unknown
> = {
  'chart-bar': (data) => html`<chart-card title="销售统计" type="bar" .data=${data}></chart-card>`,
  'chart-pie': (data) => html`<chart-card title="流量占比" type="pie" .data=${data}></chart-card>`,
  'recent-users': (data) => html`<activity-list .activities=${data}></activity-list>`,
  tasks: (data) => html`<task-list .tasks=${data}></task-list>`,
  calendar: (_data) => html`<div class="card" style="padding: 20px; min-height: 300px;">
    <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">今日日程</h3>
    <p style="color: #64748b; font-size: 14px;">日历组件开发中...</p>
  </div>`,
}
