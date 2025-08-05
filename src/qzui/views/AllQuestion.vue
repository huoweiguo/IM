<template>
  <div class="help-feedback-container">
    <TopNav title="全部问题" />

    <div class="question-container">
      <div class="question-list">
        <div v-for="(question, index) in questions" :key="index" class="question-item">
          <div class="question-text"><img :src="question.icon" /><span>{{ question.text }}</span></div>
          <span class="checkbox"></span>
        </div>
      </div>
    </div>

    <div class="contact-us">
      <a @click="router.push('/contact-us')">意见反馈</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '../components/TopNav.vue'
import video from '../assets/video.png'
import qun from '../assets/qun.png'
import addFriend from '../assets/addFriend.png'
import other from '../assets/other.png'
import msg from '../assets/msg.png'
import vip from '../assets/vip.png'
import account from '../assets/account.png'
const router = useRouter()

const questions = ref([
  { id: 123, icon: account, text: '账号设置' },
  { id: 124, icon: addFriend, text: '好友添加' },
  { id: 125, icon: msg, text: '收发消息' },
  { id: 126, icon: vip, text: '会员' },
  { id: 127, icon: qun, text: '连信群聊' },
  { id: 128, icon: video, text: '小视频' },
  { id: 136, icon: other, text: '其他' }
])
</script>

<style lang="scss" scoped>
.help-feedback-container {
  width: 375px;
  margin: 0 auto;
  padding: 60px 20px 20px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #fff;
  box-sizing: border-box;
}

.title {
  font-size: 14px;
  color: #666;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.question-container {
  width: 100%;
  padding-bottom: 80px;
  overflow: hidden;
}

.question-list {
  width: 365px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
}

.question-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #eee;
  height: 52px;
}

.question-text {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex: 1;

  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}

.checkbox {
  width: 12px;
  height: 12px;
  background-image: url('../assets/right-arrow.png');
  background-size: 12px 12px;
}

.contact-us {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 10;

  a {
    color: #3478F5;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
