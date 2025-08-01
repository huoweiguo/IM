import { defineStore } from 'pinia'
import wfcService from '../services/wfcService'
import pathPolyfill from '../utils/pathPolyfill'

// 确保 path polyfill 在全局可用
if (typeof window !== 'undefined') {
  window.path = pathPolyfill
}

export const useStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      os: '',
      islogin: false, // 是否登录
      token: '',
      userInfo: {}, // 用户信息
      wfc_userid: '',
      wfc_token: '',

      // WFC 相关状态
      connectionStatus: 0, // 连接状态
      conversations: [], // 会话列表
      currentConversation: null, // 当前会话
      messages: {}, // 消息列表，按会话ID分组
      friends: [], // 好友列表
      groups: [], // 群组列表
      users: {}, // 用户信息缓存
      unreadCount: 0, // 总未读数量
      isWfcInitialized: false // WFC 是否已初始化
    }
  },
  actions: {
    // 初始化本地数据的方法
    init() {
      this.os = window.electronAPI.platform
      this.token = localStorage.getItem('token') || ''
      this.wfc_userid = localStorage.getItem('wfc_userid') || ''
      this.wfc_token = localStorage.getItem('wfc_token') || ''
      this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}

      if (this.token) {
        this.islogin = true
        // 初始化 WFC
        this.initWfc()
      } else {
        this.logout()
      }
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('wfc_userid')
      localStorage.removeItem('wfc_token')

      this.islogin = false
      this.token = ''
      this.wfc_userid = ''
      this.wfc_token = ''

      // 断开 WFC 连接
      if (this.isWfcInitialized) {
        wfcService.disconnect()
        this.isWfcInitialized = false
      }

      // 清空数据
      this.conversations = []
      this.messages = {}
      this.friends = []
      this.groups = []
      this.users = {}
      this.unreadCount = 0
      this.connectionStatus = 0
    },

    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.token = userInfo.token
      this.wfc_userid = userInfo.serviceId
      this.wfc_token = userInfo.serviceToken
      this.islogin = true

      // 将用户信息存储到本地
      localStorage.setItem('token', userInfo.token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      localStorage.setItem('wfc_userid', this.userInfo.serviceId)
      localStorage.setItem('wfc_token', this.userInfo.serviceToken)

      // 初始化 WFC
      this.initWfc()
    },

    // 初始化 WFC
    async initWfc() {
      try {
        if (!this.isWfcInitialized) {
          wfcService.init()
          this.isWfcInitialized = true
        }

        if (this.wfc_userid && this.wfc_token) {
          await wfcService.connect(this.wfc_userid, this.wfc_token)
        }
      } catch (error) {
        console.error('WFC 初始化失败:', error)
      }
    },

    // 设置连接状态
    setConnectionStatus(status) {
      this.connectionStatus = status
    },

    // 设置会话列表
    setConversations(conversations) {
      this.conversations = conversations
    },

    // 添加或更新会话
    addOrUpdateConversation(conversation) {
      const index = this.conversations.findIndex(
        (c) =>
          c.type === conversation.type &&
          c.target === conversation.target &&
          c.line === conversation.line
      )

      if (index >= 0) {
        this.conversations[index] = conversation
      } else {
        this.conversations.unshift(conversation)
      }
    },

    // 设置当前会话
    setCurrentConversation(conversation) {
      this.currentConversation = conversation
    },

    // 添加消息
    addMessage(message) {
      const conversationKey = this.getConversationKey(message.conversation)

      if (!this.messages[conversationKey]) {
        this.messages[conversationKey] = []
      }

      // 检查消息是否已存在
      const existingIndex = this.messages[conversationKey].findIndex(
        (m) => m.messageId === message.messageId
      )
      if (existingIndex >= 0) {
        this.messages[conversationKey][existingIndex] = message
      } else {
        this.messages[conversationKey].push(message)
      }

      // 按时间排序
      this.messages[conversationKey].sort((a, b) => a.timestamp - b.timestamp)
    },

    // 获取会话消息
    getConversationMessages(conversation) {
      const conversationKey = this.getConversationKey(conversation)
      return this.messages[conversationKey] || []
    },

    // 更新消息状态
    updateMessageStatus(message) {
      const conversationKey = this.getConversationKey(message.conversation)
      if (this.messages[conversationKey]) {
        const index = this.messages[conversationKey].findIndex(
          (m) => m.messageId === message.messageId
        )
        if (index >= 0) {
          this.messages[conversationKey][index] = message
        }
      }
    },

    // 删除消息
    removeMessage(messageId) {
      Object.keys(this.messages).forEach((key) => {
        this.messages[key] = this.messages[key].filter((m) => m.messageId !== messageId)
      })
    },

    // 设置好友列表
    setFriends(friends) {
      this.friends = friends
    },

    // 设置群组列表
    setGroups(groups) {
      this.groups = groups
    },

    // 更新用户信息
    updateUserInfos(userInfos) {
      userInfos.forEach((userInfo) => {
        this.users[userInfo.uid] = userInfo
      })
    },

    // 更新群组信息
    updateGroupInfos(groupInfos) {
      groupInfos.forEach((groupInfo) => {
        const index = this.groups.findIndex((g) => g.target === groupInfo.target)
        if (index >= 0) {
          this.groups[index] = groupInfo
        }
      })
    },

    // 更新会话信息
    updateConversationInfo(conversationInfo) {
      const index = this.conversations.findIndex(
        (c) =>
          c.type === conversationInfo.type &&
          c.target === conversationInfo.target &&
          c.line === conversationInfo.line
      )

      if (index >= 0) {
        this.conversations[index] = { ...this.conversations[index], ...conversationInfo }
      }
    },

    // 更新未读数量
    updateUnreadCount() {
      this.unreadCount = wfcService.getUnreadCount()
    },

    // 获取会话键值
    getConversationKey(conversation) {
      return `${conversation.type}_${conversation.target}_${conversation.line}`
    },

    // 获取用户信息
    getUserInfo(userId) {
      return this.users[userId] || null
    },

    // 获取群组信息
    getGroupInfo(groupId) {
      return this.groups.find((g) => g.target === groupId) || null
    },

    // 获取会话显示名称
    getConversationDisplayName(conversation) {
      if (conversation.type === 0) {
        // 单聊
        const userInfo = this.getUserInfo(conversation.target)
        return userInfo ? userInfo.displayName : conversation.target
      } else if (conversation.type === 1) {
        // 群聊
        const groupInfo = this.getGroupInfo(conversation.target)
        return groupInfo ? groupInfo.name : conversation.target
      }
      return conversation.target
    },

    // 获取会话头像
    getConversationPortrait(conversation) {
      if (conversation.type === 0) {
        // 单聊
        const userInfo = this.getUserInfo(conversation.target)
        return userInfo ? userInfo.portrait : ''
      } else if (conversation.type === 1) {
        // 群聊
        const groupInfo = this.getGroupInfo(conversation.target)
        return groupInfo ? groupInfo.portrait : ''
      }
      return ''
    }
  }
})
