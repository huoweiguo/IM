<template>
  <div class="help-feedback-container">
    <h2 class="title">热点问题</h2>

    <div class="question-container">
      <div class="question-list">
        <div v-for="(question, index) in questions" :key="index" class="question-item"
          @click="toggleQuestion(question.id)">
          <span class="question-text">{{ question.text }}</span>
          <span class="checkbox"></span>
        </div>
      </div>
    </div>

    <div class="contact-us">
      <div @click="router.push('/allquestion')"><img src="../assets/help.png" />全部问题</div>
      <div @click="router.push('/feedback')"><img src="../assets/note.png" />意见反馈</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const questions = ref([

  { id: 123, text: '连信访换账号登录方法' },
  { id: 124, text: '连信添加好友的方法' },
  { id: 125, text: '连信会员相关问题' },
  { id: 126, text: '连小信会员相关问题' },
  { id: 127, text: '我怎么查看拉黑了哪些好友连信群聊名称' },
  { id: 128, text: '设置的方法如何解除连信后台权限？' },
  { id: 136, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 137, text: '设置的方法如何解除连信后台权限？' },
  { id: 138, text: '设置的方法如何解除连信后台权限？' },
  { id: 146, text: '如何投诉营销账号？' },
  { id: 165, text: '附近的人使用操作方法' },
  { id: 168, text: '附近的人使用操作方法' },
  { id: 178, text: '附近的人使用操作方法' },
  { id: 171, text: '附近的人使用操作方法' },
  { id: 130, text: '附近的人使用操作方法' },
  { id: 115, text: '连信设置方式' },
  { id: 120, text: '联系我们' }
])

const toggleQuestion = (index) => {
  questions.value[index].checked = !questions.value[index].checked;
}
</script>

<style lang="scss" scoped>
.help-feedback-container {
  width: 375px;
  margin: 0 auto;
  padding: 20px;
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

  &>div {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    height: 35px;
    cursor: pointer;
    padding-right: 50px;
    border-right: 1px solid rgba(170, 170, 170, 0.4);

    img {
      width: 14px;
      height: 14px;
      margin-right: 3px;
    }

    &:last-child {
      border-right: none;
      padding-left: 50px;
      padding-right: 0;
    }
  }
}
</style>
