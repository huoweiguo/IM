<template>
  <div class="chat-window">
    <!-- 会话列表 -->
    <div class="conversation-list">
      <div class="list-header">
        <h3>会话列表</h3>
        <div class="connection-status" :class="{ connected: store.connectionStatus === 1 }">
          {{ getConnectionStatusText() }}
        </div>
      </div>

      <div class="conversation-items">
        <div v-for="conversation in store.conversations" :key="store.getConversationKey(conversation)"
          class="conversation-item" :class="{ active: isCurrentConversation(conversation) }"
          @click="selectConversation(conversation)">
          <div class="avatar">
            <img :src="getAvatarUrl(conversation)" :alt="store.getConversationDisplayName(conversation)" />
          </div>
          <div class="info">
            <div class="name">{{ store.getConversationDisplayName(conversation) }}</div>
            <div class="last-message">{{ getLastMessage(conversation) }}</div>
          </div>
          <div class="unread" v-if="conversation.unreadCount > 0">
            {{ conversation.unreadCount }}
          </div>
        </div>
      </div>
    </div>

    <!-- 聊天区域 -->
    <div class="chat-area" v-if="store.currentConversation">
      <div class="chat-header">
        <h3>{{ store.getConversationDisplayName(store.currentConversation) }}</h3>
        <div class="actions">
          <button @click="setConversationTop(!isTop)">{{ isTop ? '取消置顶' : '置顶' }}</button>
          <button @click="setConversationSilent(!isSilent)">{{ isSilent ? '取消免打扰' : '免打扰' }}</button>
        </div>
      </div>

      <!-- 消息列表 -->
      <div class="message-list" ref="messageList">
        <div v-for="message in currentMessages" :key="message.messageId" class="message-item"
          :class="{ 'message-mine': message.fromSelf }">
          <div class="message-content">
            <div class="message-text" v-if="message.messageContent.type === 1">
              {{ message.messageContent.text }}
            </div>
            <div class="message-image" v-else-if="message.messageContent.type === 2">
              <img :src="message.messageContent.remoteUrl" alt="图片" />
            </div>
            <div class="message-file" v-else-if="message.messageContent.type === 4">
              <span>📎 {{ message.messageContent.name }}</span>
            </div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <div class="input-toolbar">
          <button @click="selectFile">📎</button>
          <button @click="selectImage">🖼️</button>
        </div>
        <div class="input-container">
          <textarea v-model="inputText" @keydown.enter.prevent="sendMessage" placeholder="输入消息..." rows="3"></textarea>
          <button @click="sendMessage" :disabled="!inputText.trim()">发送</button>
        </div>
      </div>
    </div>

    <!-- 无会话提示 -->
    <div class="no-conversation" v-else>
      <p>请选择一个会话开始聊天</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useStore } from '../stores/store'
import wfcService from '../services/wfcService'

const store = useStore()
const inputText = ref('')
const messageList = ref(null)
const isTop = ref(false)
const isSilent = ref(false)

// 计算当前会话的消息
const currentMessages = computed(() => {
  if (!store.currentConversation) return []
  return store.getConversationMessages(store.currentConversation)
})

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

// 检查是否为当前会话
const isCurrentConversation = (conversation) => {
  if (!store.currentConversation) return false
  return (
    conversation.type === store.currentConversation.type &&
    conversation.target === store.currentConversation.target &&
    conversation.line === store.currentConversation.line
  )
}

// 获取头像URL
const getAvatarUrl = (conversation) => {
  const portrait = store.getConversationPortrait(conversation)
  return portrait || '/default-avatar.png'
}

// 获取最后一条消息
const getLastMessage = (conversation) => {
  const messages = store.getConversationMessages(conversation)
  if (messages.length === 0) return '暂无消息'

  const lastMessage = messages[messages.length - 1]
  const content = lastMessage.messageContent

  switch (content.type) {
    case 1: return content.text
    case 2: return '[图片]'
    case 3: return '[语音]'
    case 4: return '[文件]'
    default: return '[未知消息]'
  }
}

// 选择会话
const selectConversation = (conversation) => {
  store.setCurrentConversation(conversation)

  // 清除未读状态
  wfcService.clearConversationUnreadStatus(conversation)

  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })
}

// 发送消息
const sendMessage = async () => {
  if (!inputText.value.trim() || !store.currentConversation) return

  try {
    await wfcService.sendTextMessage(store.currentConversation, inputText.value)
    inputText.value = ''

    // 滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
  } catch (error) {
    console.error('发送消息失败:', error)
    alert('发送失败: ' + error.message)
  }
}

// 选择文件
const selectFile = () => {
  // 这里可以调用文件选择器
  console.log('选择文件')
}

// 选择图片
const selectImage = () => {
  // 这里可以调用图片选择器
  console.log('选择图片')
}

// 设置会话置顶
const setConversationTop = async (top) => {
  try {
    await wfcService.setConversationTop(store.currentConversation, top)
    isTop.value = top
  } catch (error) {
    console.error('设置置顶失败:', error)
  }
}

// 设置会话免打扰
const setConversationSilent = async (silent) => {
  try {
    await wfcService.setConversationSilent(store.currentConversation, silent)
    isSilent.value = silent
  } catch (error) {
    console.error('设置免打扰失败:', error)
  }
}

// 滚动到底部
const scrollToBottom = () => {
  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  // 监听消息变化，自动滚动到底部
  if (store.currentConversation) {
    nextTick(() => {
      scrollToBottom()
    })
  }
})
</script>

<style scoped>
.chat-window {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}

.conversation-list {
  width: 300px;
  background: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.list-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-header h3 {
  margin: 0;
  color: #333;
}

.connection-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #ff4444;
  color: white;
}

.connection-status.connected {
  background: #44ff44;
  color: #333;
}

.conversation-items {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.conversation-item:hover {
  background: #f8f8f8;
}

.conversation-item.active {
  background: #e3f2fd;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.last-message {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread {
  background: #ff4444;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 20px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  color: #333;
}

.actions button {
  margin-left: 10px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.actions button:hover {
  background: #f5f5f5;
}

.message-list {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f8f8;
}

.message-item {
  margin-bottom: 15px;
  display: flex;
}

.message-item.message-mine {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-mine .message-content {
  background: #007aff;
  color: white;
}

.message-text {
  word-wrap: break-word;
}

.message-image img {
  max-width: 200px;
  border-radius: 8px;
}

.message-file {
  display: flex;
  align-items: center;
  gap: 8px;
}

.message-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}

.message-mine .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.input-area {
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 15px;
}

.input-toolbar {
  margin-bottom: 10px;
}

.input-toolbar button {
  margin-right: 10px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.input-toolbar button:hover {
  background: #f5f5f5;
}

.input-container {
  display: flex;
  gap: 10px;
}

.input-container textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
}

.input-container button {
  padding: 10px 20px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-container button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.no-conversation {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 16px;
}
</style>