import wfc from '../wfc/client/wfc'
import EventType from '../wfc/client/wfcEvent'
import TextMessageContent from '../wfc/messages/textMessageContent'
import ImageMessageContent from '../wfc/messages/imageMessageContent'
import FileMessageContent from '../wfc/messages/fileMessageContent'
import Config from '../config'
import { useStore } from '../stores/store'

class WfcService {
  constructor() {
    this.isInitialized = false
    this.isConnected = false
    this.eventEmitter = wfc.eventEmitter
    this.store = useStore()

    // 绑定事件监听
    this.bindEvents()
  }

  /**
   * 初始化 WFC SDK
   */
  init() {
    if (this.isInitialized) {
      console.log('WFC 已经初始化')
      return
    }

    try {
      wfc.init()
      this.isInitialized = true
      console.log('WFC 初始化成功')
    } catch (error) {
      console.error('WFC 初始化失败:', error)
      throw error
    }
  }

  /**
   * 连接到服务器
   * @param {string} userId - 用户ID
   * @param {string} token - 用户token
   */
  connect(userId, token) {
    if (!this.isInitialized) {
      throw new Error('请先初始化 WFC')
    }

    const clientId = wfc.getClientId()
    const appId = 'appId' // 根据实际情况配置
    const appKey = 'appKey' // 根据实际情况配置
    const host = Config.APP_SERVER.replace('https://', '').replace('http://', '')
    const port = 80

    try {
      wfc.connect(appId, appKey, host, port, userId, clientId, token)
      console.log('正在连接到服务器...')
    } catch (error) {
      console.error('连接失败:', error)
      throw error
    }
  }

  /**
   * 断开连接
   */
  disconnect() {
    if (this.isConnected) {
      wfc.disconnect()
      this.isConnected = false
      console.log('已断开连接')
    }
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    // 连接状态变化
    this.eventEmitter.on(EventType.ConnectionStatusChanged, (status) => {
      console.log('连接状态变化:', status)
      this.isConnected = status === 1 // 1 表示已连接
      this.store.setConnectionStatus(status)

      if (this.isConnected) {
        console.log('连接成功')
        this.loadInitialData()
      }
    })

    // 接收消息
    this.eventEmitter.on(EventType.ReceiveMessage, (message) => {
      console.log('收到消息:', message)
      this.handleReceivedMessage(message)
    })

    // 消息状态更新
    this.eventEmitter.on(EventType.MessageStatusUpdate, (message) => {
      console.log('消息状态更新:', message)
      this.store.updateMessageStatus(message)
    })

    // 用户信息更新
    this.eventEmitter.on(EventType.UserInfosUpdate, (userInfos) => {
      console.log('用户信息更新:', userInfos)
      this.store.updateUserInfos(userInfos)
    })

    // 群组信息更新
    this.eventEmitter.on(EventType.GroupInfosUpdate, (groupInfos) => {
      console.log('群组信息更新:', groupInfos)
      this.store.updateGroupInfos(groupInfos)
    })

    // 会话信息更新
    this.eventEmitter.on(EventType.ConversationInfoUpdate, (conversationInfo) => {
      console.log('会话信息更新:', conversationInfo)
      this.store.updateConversationInfo(conversationInfo)
    })
  }

  /**
   * 处理接收到的消息
   */
  handleReceivedMessage(message) {
    // 更新会话列表
    this.store.addOrUpdateConversation(message.conversation)

    // 添加消息到会话
    this.store.addMessage(message)

    // 更新未读计数
    this.store.updateUnreadCount()

    // 触发消息通知
    this.triggerMessageNotification(message)
  }

  /**
   * 触发消息通知
   */
  triggerMessageNotification(message) {
    // 可以在这里添加桌面通知、声音提醒等
    if (Notification && Notification.permission === 'granted') {
      const content = this.getMessagePreview(message)
      new Notification('新消息', {
        body: content,
        icon: '/path/to/icon.png'
      })
    }
  }

  /**
   * 获取消息预览
   */
  getMessagePreview(message) {
    const content = message.messageContent
    switch (content.type) {
      case 1: // 文本消息
        return content.text
      case 2: // 图片消息
        return '[图片]'
      case 3: // 语音消息
        return '[语音]'
      case 4: // 文件消息
        return '[文件]'
      default:
        return '[未知消息类型]'
    }
  }

  /**
   * 加载初始数据
   */
  loadInitialData() {
    // 加载会话列表
    this.loadConversations()

    // 加载好友列表
    this.loadFriends()

    // 加载群组列表
    this.loadGroups()
  }

  /**
   * 加载会话列表
   */
  loadConversations() {
    try {
      const conversations = wfc.getConversationList([0, 1, 2], [0, 1])
      this.store.setConversations(conversations)
      console.log('会话列表加载完成:', conversations.length)
    } catch (error) {
      console.error('加载会话列表失败:', error)
    }
  }

  /**
   * 加载好友列表
   */
  loadFriends() {
    try {
      const friends = wfc.getMyFriendList(true)
      this.store.setFriends(friends)
      console.log('好友列表加载完成:', friends.length)
    } catch (error) {
      console.error('加载好友列表失败:', error)
    }
  }

  /**
   * 加载群组列表
   */
  loadGroups() {
    try {
      const groups = wfc.getMyGroupList()
      this.store.setGroups(groups)
      console.log('群组列表加载完成:', groups.length)
    } catch (error) {
      console.error('加载群组列表失败:', error)
    }
  }

  /**
   * 发送文本消息
   */
  sendTextMessage(conversation, text) {
    const content = new TextMessageContent(text)
    return this.sendMessage(conversation, content)
  }

  /**
   * 发送图片消息
   */
  sendImageMessage(conversation, imageFile) {
    const content = new ImageMessageContent()
    content.localPath = imageFile.path
    content.mediaType = 1
    return this.sendMessage(conversation, content)
  }

  /**
   * 发送文件消息
   */
  sendFileMessage(conversation, file) {
    const content = new FileMessageContent()
    content.localPath = file.path
    content.name = file.name
    content.size = file.size
    return this.sendMessage(conversation, content)
  }

  /**
   * 发送消息
   */
  sendMessage(conversation, messageContent) {
    return new Promise((resolve, reject) => {
      wfc.sendConversationMessage(
        conversation,
        messageContent,
        [],
        (messageId) => {
          console.log('消息已插入本地:', messageId)
        },
        (uploaded, total) => {
          console.log('上传进度:', ((uploaded / total) * 100).toFixed(2) + '%')
        },
        (messageUid) => {
          console.log('消息发送成功:', messageUid)
          resolve({ messageUid })
        },
        (errorCode) => {
          console.error('消息发送失败:', errorCode)
          reject(new Error(`发送失败: ${errorCode}`))
        }
      )
    })
  }

  /**
   * 获取会话消息
   */
  getMessages(conversation, fromIndex = 0, before = true, count = 20) {
    try {
      return wfc.getMessages(conversation, fromIndex, before, count)
    } catch (error) {
      console.error('获取消息失败:', error)
      return []
    }
  }

  /**
   * 搜索消息
   */
  searchMessages(conversation, keyword) {
    try {
      return wfc.searchMessage(conversation, keyword)
    } catch (error) {
      console.error('搜索消息失败:', error)
      return []
    }
  }

  /**
   * 获取用户信息
   */
  getUserInfo(userId, refresh = false) {
    try {
      return wfc.getUserInfo(userId, refresh)
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  /**
   * 获取群组信息
   */
  getGroupInfo(groupId, refresh = false) {
    try {
      return wfc.getGroupInfo(groupId, refresh)
    } catch (error) {
      console.error('获取群组信息失败:', error)
      return null
    }
  }

  /**
   * 设置会话置顶
   */
  setConversationTop(conversation, isTop) {
    return new Promise((resolve, reject) => {
      wfc.setConversationTop(conversation, isTop, resolve, reject)
    })
  }

  /**
   * 设置会话免打扰
   */
  setConversationSilent(conversation, isSilent) {
    return new Promise((resolve, reject) => {
      wfc.setConversationSlient(conversation, isSilent, resolve, reject)
    })
  }

  /**
   * 清除会话未读状态
   */
  clearConversationUnreadStatus(conversation) {
    try {
      wfc.clearConversationUnreadStatus(conversation)
      this.store.updateUnreadCount()
    } catch (error) {
      console.error('清除未读状态失败:', error)
    }
  }

  /**
   * 删除消息
   */
  deleteMessage(messageId) {
    try {
      wfc.deleteMessage(messageId)
      this.store.removeMessage(messageId)
    } catch (error) {
      console.error('删除消息失败:', error)
    }
  }

  /**
   * 撤回消息
   */
  recallMessage(messageUid) {
    return new Promise((resolve, reject) => {
      wfc.recallMessage(messageUid, resolve, reject)
    })
  }

  /**
   * 搜索用户
   */
  searchUsers(keyword) {
    return new Promise((resolve, reject) => {
      wfc.searchUser(keyword, 0, 0, resolve, reject)
    })
  }

  /**
   * 搜索群组
   */
  searchGroups(keyword) {
    try {
      return wfc.searchGroups(keyword)
    } catch (error) {
      console.error('搜索群组失败:', error)
      return []
    }
  }

  /**
   * 获取当前连接状态
   */
  getConnectionStatus() {
    return wfc.getConnectionStatus()
  }

  /**
   * 获取当前用户ID
   */
  getCurrentUserId() {
    return wfc.getUserId()
  }

  /**
   * 获取未读消息数量
   */
  getUnreadCount() {
    try {
      return wfc.getUnreadCount()
    } catch (error) {
      console.error('获取未读数量失败:', error)
      return 0
    }
  }
}

// 创建单例实例
const wfcService = new WfcService()

export default wfcService
