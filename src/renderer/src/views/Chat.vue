<template>
  <div class="chat-page">
    <div class="header">
      <h1>IM 聊天</h1>
      <div class="status-info">
        <span class="status-label">连接状态:</span>
        <span class="status-value" :class="{ connected: store.connectionStatus === 1 }">
          {{ getConnectionStatusText() }}
        </span>
        <span class="user-info" v-if="store.userInfo.name">
          | 用户: {{ store.userInfo.name }}
        </span>
      </div>
    </div>

    <!-- 聊天窗口 -->
    <ChatWindow />

    <!-- 调试信息 -->
    <div class="debug-info" v-if="showDebug">
      <h3>调试信息</h3>
      <div class="debug-item">
        <strong>会话数量:</strong> {{ store.conversations.length }}
      </div>
      <div class="debug-item">
        <strong>好友数量:</strong> {{ store.friends.length }}
      </div>
      <div class="debug-item">
        <strong>群组数量:</strong> {{ store.groups.length }}
      </div>
      <div class="debug-item">
        <strong>总未读数:</strong> {{ store.unreadCount }}
      </div>
      <div class="debug-item">
        <strong>当前用户ID:</strong> {{ wfcService.getCurrentUserId() }}
      </div>
    </div>

    <!-- 控制面板 -->
    <div class="control-panel">
      <button @click="showDebug = !showDebug">
        {{ showDebug ? '隐藏' : '显示' }}调试信息
      </button>
      <button @click="testSendMessage" :disabled="!store.currentConversation">
        发送测试消息
      </button>
      <button @click="loadConversations">
        刷新会话列表
      </button>
      <button @click="searchUsers('test')">
        搜索用户
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '../stores/store'
import wfcService from '../services/wfcService'
import ChatWindow from '../components/ChatWindow.vue'

const store = useStore()
const showDebug = ref(false)

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

// 发送测试消息
const testSendMessage = async () => {
  if (!store.currentConversation) {
    alert('请先选择一个会话')
    return
  }

  try {
    await wfcService.sendTextMessage(
      store.currentConversation,
      `这是一条测试消息 - ${new Date().toLocaleTimeString()}`
    )
    console.log('测试消息发送成功')
  } catch (error) {
    console.error('测试消息发送失败:', error)
    alert('发送失败: ' + error.message)
  }
}

// 刷新会话列表
const loadConversations = () => {
  try {
    wfcService.loadConversations()
    console.log('会话列表已刷新')
  } catch (error) {
    console.error('刷新会话列表失败:', error)
  }
}

// 搜索用户
const searchUsers = async (keyword) => {
  try {
    const users = await wfcService.searchUsers(keyword)
    console.log('搜索结果:', users)
    alert(`找到 ${users.length} 个用户`)
  } catch (error) {
    console.error('搜索用户失败:', error)
    alert('搜索失败: ' + error.message)
  }
}

onMounted(() => {
  // 确保 WFC 已初始化
  if (!store.isWfcInitialized) {
    store.initWfc()
  }
})
</script>

<style scoped>
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #007aff;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 20px;
}

.status-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.status-value {
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
}

.status-value.connected {
  background: rgba(76, 175, 80, 0.8);
}

.user-info {
  opacity: 0.8;
}

.debug-info {
  position: fixed;
  top: 80px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
}

.debug-info h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #333;
}

.debug-item {
  margin-bottom: 5px;
  font-size: 12px;
  color: #666;
}

.debug-item strong {
  color: #333;
}

.control-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.control-panel button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
}

.control-panel button:hover {
  background: #f5f5f5;
}

.control-panel button:disabled {
  background: #f0f0f0;
  color: #999;
  cursor: not-allowed;
}
</style>
