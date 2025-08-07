<template>
  <div class="chat-user">
    <div class="sidebar">
      <ul class="user-list">
        <li v-for="(item, index) in menuItems" :key="index" :class="{ active: activeIndex === index }" @click="handleMenuClick(index, item)">
          <img :src="item.icon" class="avatar" />
          <div class="info">
            <div class="header">
              <h3>{{ item.name }}</h3>
              <time>{{ item.time }}</time>
            </div>
            <div class="preview">
              <p>{{ item.message }}</p>
              <span v-if="item.count" class="badge">{{ item.count }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="chat-area">
      <div class="chat-header">
        <h2>{{ chatTitle || '选择聊天' }}</h2>
        <el-icon color="#777" size="18" class="more-btn" @click="showDrawer">
          <MoreFilled />
        </el-icon>
      </div>
      
      <div class="messages">
        <div v-for="(msg, index) in messageList" :key="index" :class="['message', msg.type]">
          <img :src="msg.avatar" class="avatar" @click="openUserProfile" />
          <div class="content">{{ msg.content }}</div>
        </div>
      </div>
      
      <div class="input-area">
        <textarea v-model="newMessage" placeholder="文明上网，理性发言" @keyup.enter="sendMessage"></textarea>
      </div>
    </div>

    <el-drawer v-model="chatDrawer" direction="rtl" :with-header="false" size="310px">
      <div class="drawer-content">聊天设置</div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { createNewWindow } from '@/qzui/utils/electronHelper'
import grpImg1 from '../assets/grp-1.png'
import grpImg2 from '../assets/grp-2.png'
import grpImg4 from '../assets/grp-4.png'
import userAvatar from '../assets/usr-3.png'
import myAvatar from '../assets/usr-1.png'

const activeIndex = ref(0)
const chatTitle = ref('')
const chatDrawer = ref(false)
const newMessage = ref('')

const menuItems = ref([
  {
    name: '新的粉丝',
    time: '3月24日 12:00',
    message: '您有个好友待验证',
    count: 2,
    icon: grpImg1,
    action: () => openFansWindow()
  },
  {
    name: '可能认识的人',
    time: '3月24日 12:00',
    message: '发现你朋友的熟人',
    count: 2,
    icon: grpImg4,
    action: () => openKnowWindow()
  },
  {
    name: '系统通知',
    time: '3月24日 12:00',
    message: '请问你还有什么问题吗?',
    count: 50,
    icon: grpImg2,
    isGroup: false
  }
])

const messageList = ref([
  { type: 'received', avatar: userAvatar, content: 'hello,你好啊！' },
  { type: 'sent', avatar: myAvatar, content: '你好,请问有事情吗?' },
  { type: 'received', avatar: userAvatar, content: '没事情，就是随便问问。' },
  { type: 'received', avatar: userAvatar, content: '怎么不回复我呢？' }
])

const handleMenuClick = (index, item) => {
  activeIndex.value = index
  chatTitle.value = item.name
  if (item.action) item.action()
}

const openFansWindow = () => {
  createNewWindow({
    width: 375,
    height: 720,
    title: '我的粉丝',
    url: '#/fans?id=1'
  })
}

const openKnowWindow = () => {
  createNewWindow({
    width: 375,
    height: 720,
    title: '可能认识的人',
    url: '#/know?id=1'
  })
}

const openUserProfile = () => {
  createNewWindow({
    width: 375,
    height: 720,
    title: '个人信息',
    url: '#/userInfo?id=1'
  })
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messageList.value.push({
    type: 'sent',
    avatar: myAvatar,
    content: newMessage.value
  })
  newMessage.value = ''
}

const showDrawer = () => {
  chatDrawer.value = true
}
</script>

<style lang="scss" scoped>
.chat-user {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #efefef;
  border-right: 1px solid #ddd;
  overflow: hidden;
}

.user-list {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  
  li {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    cursor: pointer;
    border-bottom: 1px solid #e5e5e5;
    
    &:hover {
      background: #e8e8e8;
    }
    
    &.active {
      background: #dfdfdf;
    }
  }
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  flex: 1;
  min-width: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  
  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  
  time {
    font-size: 12px;
    color: #999;
  }
}

.preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p {
    margin: 0;
    font-size: 12px;
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.badge {
  background: #fd3a3a;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  border-bottom: 1px solid #ddd;
  
  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
}

.more-btn {
  cursor: pointer;
  padding: 5px;
}

.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
  
  &.sent {
    flex-direction: row-reverse;
    
    .avatar {
      margin-right: 0;
      margin-left: 10px;
    }
    
    .content {
      background: #e2f3ff;
    }
  }
  
  .content {
    max-width: 70%;
    padding: 8px 12px;
    background: white;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
}

.input-area {
  height: 120px;
  border-top: 1px solid #ddd;
  
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 15px;
    font-size: 14px;
    resize: none;
    
    &::placeholder {
      color: #999;
    }
  }
}

.drawer-content {
  padding: 20px;
}
</style>
