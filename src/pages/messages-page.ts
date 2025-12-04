import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '../components/layout/app-layout'

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  content: string
  createdAt: string
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online: boolean
}

@customElement('messages-page')
export class MessagesPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 24px;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 30px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    .messages-layout {
      display: grid;
      grid-template-columns: 280px 1fr 400px;
      gap: 24px;
      height: calc(100vh - 220px);
    }

    .folders-panel {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 16px;
    }

    .folder-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
      margin-bottom: 4px;
    }

    .folder-item:hover {
      background: #f3f4f6;
    }

    .folder-item.active {
      background: #3b82f6;
      color: white;
    }

    .conversations-panel {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
    }

    .search-box {
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px 8px 36px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
    }

    .conversations-list {
      flex: 1;
      overflow-y: auto;
    }

    .conversation-item {
      display: flex;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid #e5e7eb;
      cursor: pointer;
      transition: background 0.2s;
    }

    .conversation-item:hover {
      background: #f9fafb;
    }

    .conversation-item.active {
      background: #f3f4f6;
    }

    .conversation-item.unread {
      background: #eff6ff;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex-shrink: 0;
      position: relative;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .online-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      background: #10b981;
      border: 2px solid white;
      border-radius: 50%;
    }

    .conversation-info {
      flex: 1;
      min-width: 0;
    }

    .conversation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .conversation-name {
      font-weight: 500;
      font-size: 14px;
    }

    .conversation-time {
      font-size: 12px;
      color: #6b7280;
    }

    .conversation-message {
      font-size: 14px;
      color: #6b7280;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .unread-badge {
      display: inline-block;
      background: #3b82f6;
      color: white;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 8px;
    }

    .chat-panel {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
    }

    .chat-header {
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .message {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    .message.sent {
      flex-direction: row-reverse;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .message-content {
      max-width: 70%;
      padding: 12px;
      border-radius: 8px;
      font-size: 14px;
    }

    .message.received .message-content {
      background: #f3f4f6;
    }

    .message.sent .message-content {
      background: #3b82f6;
      color: white;
    }

    .message-time {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 4px;
    }

    .chat-input {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }

    .chat-input input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
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

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #9ca3af;
    }

    @media (max-width: 1024px) {
      .messages-layout {
        grid-template-columns: 1fr;
      }
      .folders-panel,
      .chat-panel {
        display: none;
      }
    }
  `

  @state()
  private conversations: Conversation[] = [
    {
      id: '1',
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
      lastMessage: '下午的会议准备好了吗？',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 2,
      online: true,
    },
    {
      id: '2',
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
      lastMessage: '项目文档已经发给你了',
      lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
      unreadCount: 0,
      online: false,
    },
  ]

  @state()
  private selectedConv: Conversation | null = null

  @state()
  private messages: Message[] = []

  @state()
  private searchQuery = ''

  private formatTime(dateStr: string): string {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)

    if (hours < 24) {
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    }
    return date.toLocaleDateString('zh-CN')
  }

  private handleSelectConv(conv: Conversation) {
    this.selectedConv = conv
    // 模拟加载消息
    this.messages = [
      {
        id: '1',
        sender: { id: conv.id, name: conv.name, avatar: conv.avatar },
        content: conv.lastMessage,
        createdAt: conv.lastMessageTime,
      },
    ]
    // 清除未读
    const index = this.conversations.findIndex(c => c.id === conv.id)
    if (index !== -1) {
      this.conversations[index].unreadCount = 0
      this.requestUpdate()
    }
  }

  render() {
    const filteredConvs = this.conversations.filter(
      c => c.name.includes(this.searchQuery) || c.lastMessage.includes(this.searchQuery),
    )

    return html`
      <div class="page-header">
        <h1 class="page-title">消息中心</h1>
      </div>

      <div class="messages-layout">
        <!-- 文件夹面板 -->
        <div class="folders-panel">
          <div class="folder-item active">
            <span>📥 收件箱</span>
            <span>${this.conversations.length}</span>
          </div>
          <div class="folder-item">
            <span>📤 已发送</span>
          </div>
          <div class="folder-item">
            <span>📝 草稿箱</span>
          </div>
          <div class="folder-item">
            <span>🗂️ 归档</span>
          </div>
        </div>

        <!-- 对话列表 -->
        <div class="conversations-panel">
          <div class="search-box">
            <input
              type="text"
              class="search-input"
              placeholder="搜索消息..."
              .value=${this.searchQuery}
              @input=${(e: Event) => {
                this.searchQuery = (e.target as HTMLInputElement).value
              }}
            />
          </div>
          <div class="conversations-list">
            ${filteredConvs.map(
              conv => html`
                <div
                  class="conversation-item ${conv.id === this.selectedConv?.id ? 'active' : ''} ${conv.unreadCount > 0 ? 'unread' : ''}"
                  @click=${() => this.handleSelectConv(conv)}
                >
                  <div class="avatar">
                    <img src=${conv.avatar} alt=${conv.name} />
                    ${conv.online ? html`<div class="online-indicator"></div>` : ''}
                  </div>
                  <div class="conversation-info">
                    <div class="conversation-header">
                      <span class="conversation-name">${conv.name}</span>
                      <span class="conversation-time">${this.formatTime(conv.lastMessageTime)}</span>
                    </div>
                    <div class="conversation-message">
                      ${conv.lastMessage}
                      ${conv.unreadCount > 0 ? html`<span class="unread-badge">${conv.unreadCount}</span>` : ''}
                    </div>
                  </div>
                </div>
              `,
            )}
          </div>
        </div>

        <!-- 聊天面板 -->
        <div class="chat-panel">
          ${this.selectedConv
            ? html`
                <div class="chat-header">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <img src=${this.selectedConv.avatar} alt=${this.selectedConv.name} style="width: 40px; height: 40px; border-radius: 50%;" />
                    <div>
                      <div style="font-weight: 500;">${this.selectedConv.name}</div>
                      <div style="font-size: 12px; color: #6b7280;">${this.selectedConv.online ? '在线' : '离线'}</div>
                    </div>
                  </div>
                </div>
                <div class="chat-messages">
                  ${this.messages.map(
                    msg => html`
                      <div class="message ${msg.sender.id === 'current-user' ? 'sent' : 'received'}">
                        <img src=${msg.sender.avatar} alt=${msg.sender.name} class="message-avatar" />
                        <div>
                          <div class="message-content">
                            ${msg.content}
                            <div class="message-time">${this.formatTime(msg.createdAt)}</div>
                          </div>
                        </div>
                      </div>
                    `,
                  )}
                </div>
                <div class="chat-input">
                  <input type="text" placeholder="输入消息..." />
                  <button class="btn">发送</button>
                </div>
              `
            : html`
                <div class="empty-state">
                  <div style="font-size: 48px; margin-bottom: 16px;">✉️</div>
                  <p>选择一条消息查看详情</p>
                </div>
              `}
        </div>
      </div>
    `
  }
}
