<template>
  <div class="help-feedback-container">
    <TopNav title="意见反馈" />
    <div class="question-nav">请选择问题的发生场景</div>
    <div class="question-container">
      <div class="question-list">
        <div v-for="(question, index) in questions" :key="index" class="question-item">
          <span class="question-text">{{ question.text }}</span>
          <div>
            <span class="q_content">{{ question.ask }}</span>
            <el-checkbox :value="question.id" v-model="questionValues" />
          </div>
        </div>
      </div>
      <el-button type="primary" class="submit-btn" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '../components/TopNav.vue'
const router = useRouter()
const questionValues = ref([])

const questions = ref([
  { id: 123, text: '闪退、卡顿或界面错位', ask: '' },
  { id: 124, text: '聊天', ask: '图片、语音发不出' },
  { id: 125, text: '群聊', ask: '无法建立、退出群聊' },
  { id: 126, text: '通讯录', ask: '无法添加朋友、群聊丢失' },
  { id: 127, text: '小视频', ask: '无法拍摄、播放小视频' },
  { id: 128, text: '好友圈', ask: '状态或视频动态、无法刷新' },
  { id: 136, text: '小应用', ask: '黑屏、白屏、无法打开' },
  { id: 137, text: '打开或后台连信', ask: '连不上、无新消息通知' },
  { id: 137, text: '其他', ask: '附近的人、扫一扫' },
  { id: 137, text: '产品建议', ask: '用的不爽、我有建议' },
  { id: 137, text: '会员', ask: '会员权益问题' }
])

const submit = () => { }
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

.question-nav {
  font-size: 14px;
  color: #777;
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

  &>div {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .q_content {
      font-size: 14px;
      color: #777;
      margin-right: 10px;
    }
  }
}

.question-text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.checkbox {
  width: 12px;
  height: 12px;
  background-image: url('../assets/right-arrow.png');
  background-size: 12px 12px;
}

.submit-btn {
  width: 100%;
}
</style>
