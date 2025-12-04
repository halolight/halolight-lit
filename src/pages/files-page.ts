import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

interface FileItem {
  id: string
  name: string
  type: 'folder' | 'image' | 'video' | 'audio' | 'document' | 'archive'
  size: number | null
  items?: number
  path: string
  createdAt: string
  updatedAt: string
  thumbnail?: string
}

@customElement('files-page')
export class FilesPage extends LitElement {
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
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      margin-left: 8px;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .files-layout {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 24px;
    }

    .storage-panel {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .storage-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .storage-progress {
      margin: 16px 0;
    }

    .progress-bar {
      height: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 4px;
      transition: width 1s ease-out;
    }

    .storage-text {
      font-size: 12px;
      color: #6b7280;
      margin-top: 8px;
    }

    .file-types {
      margin-top: 24px;
    }

    .file-type-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-bottom: 12px;
    }

    .type-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .type-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .files-main {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 20px;
      min-height: calc(100vh - 220px);
    }

    .files-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .search-input {
      padding: 6px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
      width: 200px;
    }

    .files-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    .file-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .file-card:hover {
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .file-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin: 0 auto 12px;
    }

    .file-name {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 4px;
    }

    .file-info {
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }

    @media (max-width: 1024px) {
      .files-layout {
        grid-template-columns: 1fr;
      }
      .storage-panel {
        display: none;
      }
    }
  `

  @state()
  private files: FileItem[] = [
    {
      id: '1',
      name: '项目文档',
      type: 'folder',
      size: null,
      items: 12,
      path: '/我的文件',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: '设计稿.psd',
      type: 'image',
      size: 5242880,
      path: '/我的文件',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: '演示视频.mp4',
      type: 'video',
      size: 52428800,
      path: '/我的文件',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  @state()
  private searchQuery = ''

  @state()
  private storageUsed = 15.5

  @state()
  private storageTotal = 100

  private getFileIcon(type: string): string {
    const icons: Record<string, string> = {
      folder: '📁',
      image: '🖼️',
      video: '🎬',
      audio: '🎵',
      document: '📄',
      archive: '🗜️',
    }
    return icons[type] || '📄'
  }

  private getFileIconBg(type: string): string {
    const colors: Record<string, string> = {
      folder: '#FEF3C7',
      image: '#D1FAE5',
      video: '#E9D5FF',
      audio: '#FCE7F3',
      document: '#F3F4F6',
      archive: '#FED7AA',
    }
    return colors[type] || '#F3F4F6'
  }

  private formatFileSize(bytes: number | null): string {
    if (bytes === null) return '-'
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  render() {
    const filteredFiles = this.files.filter(f =>
      f.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
    )

    const storagePercent = (this.storageUsed / this.storageTotal) * 100

    return html`
      <div class="page-header">
        <h1 class="page-title">文件管理</h1>
        <div>
          <button class="btn">+ 新建文件夹</button>
          <button class="btn btn-primary">⬆ 上传文件</button>
        </div>
      </div>

      <div class="files-layout">
        <!-- 存储信息面板 -->
        <div class="storage-panel">
          <div class="storage-title">存储空间</div>
          <div style="text-align: center; margin: 16px 0;">
            <div style="font-size: 24px; font-weight: 600;">${this.storageUsed} GB</div>
            <div style="font-size: 12px; color: #6b7280;">共 ${this.storageTotal} GB</div>
          </div>
          <div class="storage-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${storagePercent}%"></div>
            </div>
            <div class="storage-text">${storagePercent.toFixed(1)}% 已使用</div>
          </div>

          <div class="file-types">
            <div class="storage-title">文件类型</div>
            <div class="file-type-item">
              <div class="type-label">
                <div class="type-dot" style="background: #10b981"></div>
                <span>图片</span>
              </div>
              <span>5.2 GB</span>
            </div>
            <div class="file-type-item">
              <div class="type-label">
                <div class="type-dot" style="background: #8b5cf6"></div>
                <span>视频</span>
              </div>
              <span>8.1 GB</span>
            </div>
            <div class="file-type-item">
              <div class="type-label">
                <div class="type-dot" style="background: #ec4899"></div>
                <span>音频</span>
              </div>
              <span>1.5 GB</span>
            </div>
            <div class="file-type-item">
              <div class="type-label">
                <div class="type-dot" style="background: #f59e0b"></div>
                <span>其他</span>
              </div>
              <span>0.7 GB</span>
            </div>
          </div>
        </div>

        <!-- 文件列表 -->
        <div class="files-main">
          <div class="files-toolbar">
            <div class="breadcrumb">
              <span>🏠</span>
              <span>></span>
              <span>我的文件</span>
            </div>
            <input
              type="text"
              class="search-input"
              placeholder="搜索文件..."
              .value=${this.searchQuery}
              @input=${(e: Event) => {
                this.searchQuery = (e.target as HTMLInputElement).value
              }}
            />
          </div>

          <div class="files-grid">
            ${filteredFiles.map(
              file => html`
                <div class="file-card">
                  <div class="file-icon" style="background: ${this.getFileIconBg(file.type)}">
                    ${this.getFileIcon(file.type)}
                  </div>
                  <div class="file-name">${file.name}</div>
                  <div class="file-info">
                    ${file.type === 'folder' ? `${file.items} 项` : this.formatFileSize(file.size)}
                  </div>
                </div>
              `,
            )}
          </div>
        </div>
      </div>
    `
  }
}
