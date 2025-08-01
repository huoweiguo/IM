<template>
  <div class="example-page">
    <div class="header">
      <h1>WFC SDK 使用示例</h1>
      <div class="status">
        <span>连接状态: {{ getConnectionStatusText() }}</span>
        <span v-if="store.userInfo.name">| 用户: {{ store.userInfo.name }}</span>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <h2>基本操作</h2>
        <div class="buttons">
          <button @click="initWfc" :disabled="store.isWfcInitialized">
            {{ store.isWfcInitialized ? '已初始化' : '初始化 WFC' }}
          </button>
          <button @click="connectWfc" :disabled="!store.isWfcInitialized || store.connectionStatus === 1">
            {{ store.connectionStatus === 1 ? '已连接' : '连接服务器' }}
          </button>
          <button @click="disconnectWfc" :disabled="store.connectionStatus !== 1">
            断开连接
          </button>
        </div>
      </div>

      <div class="section">
        <h2>会话管理</h2>
        <div class="buttons">
          <button @click="loadConversations">加载会话列表</button>
          <button @click="loadFriends">加载好友列表</button>
          <button @click="loadGroups">加载群组列表</button>
        </div>
        <div class="info">
          <p>会话数量: {{ store.conversations.length }}</p>
          <p>好友数量: {{ store.friends.length }}</p>
          <p>群组数量: {{ store.groups.length }}</p>
          <p>未读消息: {{ store.unreadCount }}</p>
        </div>
      </div>

      <div class="section">
        <h2>消息操作</h2>
        <div class="input-group">
          <input v-model="testUserId" placeholder="输入用户ID" />
          <button @click="sendTestMessage" :disabled="!testUserId">
            发送测试消息
          </button>
        </div>
        <div class="input-group">
          <input v-model="searchKeyword" placeholder="搜索关键词" />
          <button @click="searchUsers">搜索用户</button>
        </div>
      </div>

      <div class="section">
        <h2>调试信息</h2>
        <div class="debug-info">
          <p><strong>当前用户ID:</strong> {{ wfcService.getCurrentUserId() || '未获取' }}</p>
          <p><strong>连接状态:</strong> {{ store.connectionStatus }}</p>
          <p><strong>WFC 初始化:</strong> {{ store.isWfcInitialized ? '是' : '否' }}</p>
          <p><strong>是否登录:</strong> {{ store.islogin ? '是' : '否' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '../stores/store'
import wfcService from '../services/wfcService'
import { Conversation } from '../../../wfc/model/conversation'

const store = useStore()
const testUserId = ref('')
const searchKeyword = ref('')

// 获取连接状态文本
const getConnectionStatusText = () => {
  switch (store.connectionStatus) {
    case 0: return '未连接'
    case 1: return '已连接'
    case 2: return '连接中'
    case 3: return '连接失败'
    default: return '未知状态'
  }
}

// 初始化 WFC
const initWfc = async () => {
  try {
    await store.initWfc()
    console.log('WFC 初始化成功')
  } catch (error) {
    console.error('WFC 初始化失败:', error)
    alert('初始化失败: ' + error.message)
  }
}

// 连接 WFC
const connectWfc = async () => {
  if (!store.wfc_userid || !store.wfc_token) {
    alert('请先登录获取用户信息')
    return
  }

  try {
    await wfcService.connect(store.wfc_userid, store.wfc_token)
    console.log('连接成功')
  } catch (error) {
    console.error('连接失败:', error)
    alert('连接失败: ' + error.message)
  }
}

// 断开连接
const disconnectWfc = () => {
  wfcService.disconnect()
  console.log('已断开连接')
}

// 加载会话列表
const loadConversations = () => {
  try {
    wfcService.loadConversations()
    console.log('会话列表已加载')
  } catch (error) {
    console.error('加载会话列表失败:', error)
  }
}

// 加载好友列表
const loadFriends = () => {
  try {
    wfcService.loadFriends()
    console.log('好友列表已加载')
  } catch (error) {
    console.error('加载好友列表失败:', error)
  }
}

// 加载群组列表
const loadGroups = () => {
  try {
    wfcService.loadGroups()
    console.log('群组列表已加载')
  } catch (error) {
    console.error('加载群组列表失败:', error)
  }
}

// 发送测试消息
const sendTestMessage = async () => {
  if (!testUserId.value) {
    alert('请输入用户ID')
    return
  }

  try {
    const conversation = new Conversation(0, testUserId.value, 0)
    await wfcService.sendTextMessage(
      conversation,
      `这是一条测试消息 - ${new Date().toLocaleTimeString()}`
    )
    console.log('测试消息发送成功')
    alert('消息发送成功')
  } catch (error) {
    console.error('发送测试消息失败:', error)
    alert('发送失败: ' + error.message)
  }
}

// 搜索用户
const searchUsers = async () => {
  if (!searchKeyword.value) {
    alert('请输入搜索关键词')
    return
  }

  try {
    const users = await wfcService.searchUsers(searchKeyword.value)
    console.log('搜索结果:', users)
    alert(`找到 ${users.length} 个用户`)
  } catch (error) {
    console.error('搜索用户失败:', error)
    alert('搜索失败: ' + error.message)
  }
}
</script>

<style scoped>
.example-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  background: #007aff;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0 0 10px 0;
}

.status {
  font-size: 14px;
  opacity: 0.9;
}

.section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.section h2 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.buttons button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
}

.buttons button:hover:not(:disabled) {
  background: #f5f5f5;
}

.buttons button:disabled {
  background: #f0f0f0;
  color: #999;
  cursor: not-allowed;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.input-group input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.input-group button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
}

.input-group button:hover:not(:disabled) {
  background: #f5f5f5;
}

.input-group button:disabled {
  background: #f0f0f0;
  color: #999;
  cursor: not-allowed;
}

.info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  margin-top: 15px;
}

.info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.debug-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}

.debug-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.debug-info strong {
  color: #333;
}
</style>