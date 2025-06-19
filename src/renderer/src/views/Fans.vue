<template>
  <div class="fans-container">
    <div class="fans-list">
      <div v-for="fan in fans" :key="fan.id" class="fan-item">
        <div class="fan-avatar">
          <img :src="fan.avatar" alt="粉丝头像">
        </div>
        <div class="fan-info-container">
          <div class="fan-info">
            <h3>{{ fan.name }}</h3>
            <span>{{ fan.lastMessageTime }}</span>
          </div>
          <div class="fan-time">
            <p class="message-content">{{ fan.lastMessage }}</p>
            <button class="follow-btn" :class="{ 'followed': fan.isFollowed }" @click="toggleFollow(fan.id)">
              {{ fan.isFollowed ? '已关注' : '关注TA' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import avator from '../assets/header1.png'
import avator2 from '../assets/usr-1.png'
const fans = ref([
  {
    id: 1,
    name: '张三',
    avatar: avator,
    lastMessage: '你好，我很喜欢你的内容！',
    lastMessageTime: '15分钟前',
    isFollowed: false
  },
  {
    id: 2,
    name: '李四',
    avatar: avator2,
    lastMessage: '期待你的下一期视频！',
    lastMessageTime: '1小时前',
    isFollowed: true
  },
  {
    id: 3,
    name: '王五',
    avatar: avator,
    lastMessage: '这个问题怎么解决？',
    lastMessageTime: '05月8日',
    isFollowed: false
  }
])

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}
</script>

<style lang="scss" scoped>
.fans-container {
  width: 375px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.fans-list {
  display: flex;
  flex-direction: column;
}

.fan-item {
  display: flex;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s;

  .fan-info-container {
    flex: 1;
  }
}

.fan-avatar {
  width: 43px;
  height: 43px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 8px;
}

.fan-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fan-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-bottom: 5px;

  span {
    font-size: 12px;
    color: #999;
  }
}

.fan-info h3 {
  font-size: 14px;
  color: #636B89;
}

.fan-time {
  position: relative;
  display: flex;
}

.message-time {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.message-content {
  padding-right: 60px;
  color: #777;
  font-size: 12px;
}

.follow-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 20px;
  background-color: #3478F5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
  white-space: nowrap;
}

.follow-btn.followed {
  background-color: #e7e7e7;
  color: #666;
}
</style>
