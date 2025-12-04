import type {
  User,
  DashboardSummary,
  ChartData,
  Activity,
  Task,
  Notification,
} from '../types/index.ts'

// 模拟用户数据
export const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 1}`,
  role: (['admin', 'manager', 'editor', 'viewer'] as const)[i % 4],
  status: (['active', 'inactive', 'suspended'] as const)[i % 3],
  department: ['技术部', '产品部', '运营部', '市场部'][i % 4],
  position: ['工程师', '经理', '主管', '专员'][i % 4],
  phone: `1380000${String(i).padStart(4, '0')}`,
  createdAt: new Date(Date.now() - i * 86400000 * 7).toISOString(),
  lastLoginAt: new Date(Date.now() - i * 3600000).toISOString(),
}))

// 仪表盘摘要数据
export const mockDashboardSummary: DashboardSummary = {
  totalUsers: 12580,
  activeUsers: 8432,
  totalOrders: 45678,
  totalRevenue: 1256789.5,
  newUsers: 1256,
  pendingOrders: 234,
  completedOrders: 44890,
  cancelledOrders: 554,
  userGrowth: 12.5,
  orderGrowth: 8.3,
  revenueGrowth: 15.7,
  conversionRate: 3.2,
}

// 访问量图表数据（30天）
export const mockVisitsData: ChartData = {
  labels: Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return `${date.getMonth() + 1}/${date.getDate()}`
  }),
  datasets: [
    {
      label: '页面访问',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000 + 2000)),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      label: '独立访客',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000 + 500)),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
  ],
}

// 销售图表数据（12月）
export const mockSalesData: ChartData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  datasets: [
    {
      label: '销售额',
      data: [65000, 59000, 80000, 81000, 56000, 55000, 72000, 88000, 95000, 110000, 125000, 142000],
      backgroundColor: '#3b82f6',
    },
    {
      label: '订单数',
      data: [2800, 2400, 3200, 3500, 2100, 2300, 2900, 3600, 4100, 4800, 5200, 5800],
      backgroundColor: '#10b981',
    },
  ],
}

// 饼图数据
export const mockPieData: ChartData = {
  labels: ['直接访问', '搜索引擎', '社交媒体', '外链引用'],
  datasets: [
    {
      label: '流量来源',
      data: [35, 30, 20, 15],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    },
  ],
}

// 活动日志
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'user',
    title: '新用户注册',
    description: '张三 完成了账户注册',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    user: { id: '1', name: '张三', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan' },
  },
  {
    id: '2',
    type: 'order',
    title: '订单完成',
    description: '订单 #12345 已完成配送',
    timestamp: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: '3',
    type: 'login',
    title: '用户登录',
    description: '李四 从北京登录系统',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    user: { id: '2', name: '李四', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi' },
  },
  {
    id: '4',
    type: 'system',
    title: '系统更新',
    description: '完成了系统安全补丁更新',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '5',
    type: 'order',
    title: '新订单',
    description: '收到新订单 #12346，金额 ¥2,580',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
]

// 任务列表
export const mockTasks: Task[] = [
  { id: '1', title: '完成产品原型设计', completed: false, priority: 'high', dueDate: '2024-12-20' },
  { id: '2', title: '审核用户反馈报告', completed: true, priority: 'medium' },
  { id: '3', title: '更新 API 文档', completed: false, priority: 'low', dueDate: '2024-12-25' },
  { id: '4', title: '部署新版本', completed: false, priority: 'high', dueDate: '2024-12-18' },
  { id: '5', title: '团队周会', completed: true, priority: 'medium' },
]

// 通知列表
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: '系统通知',
    message: '系统将于今晚 23:00 进行维护更新',
    read: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '2',
    type: 'success',
    title: '任务完成',
    message: '产品上线已完成',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    type: 'warning',
    title: '安全提醒',
    message: '检测到异常登录尝试',
    read: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    type: 'error',
    title: '支付失败',
    message: '订单 #12340 支付处理失败',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]
