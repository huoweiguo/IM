<template>
  <div class="profile-setup-container">
    <!-- 顶部导航 -->
    <TopNav title="实名认证" />

    <!-- 昵称设置区域 -->
    <div class="section">
      <h1>完成实名认证，享受建群特权</h1>
      <div class="nickname-input">
        <span>真实姓名</span>
        <input type="text" v-model="actualName" placeholder="请输入您的真实姓名" />
      </div>
      <div class="nickname-input">
        <span>身份证号</span>
        <input type="text" v-model="actualIntro" placeholder="仅支持二代身份证" />
      </div>
    </div>
    <div class="auth-info mb100">实名信息受到严格保密</div>
    <button class="next-btn" @click="router.push('/publicSphere/authorizationSet')">下一步</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopNav from '../../../components/TopNav.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 昵称相关
const actualName = ref('')
const actualIntro = ref('')

</script>

<style lang="scss" scoped>
.profile-setup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 375px;
  padding: 60px 20px 0;
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 22px;
  color: #333;
}

.section h1 {
  font-family: Source Han Sans CN-Bold;
  font-size: 22px;
  color: #333333;
  font-weight: 500;
  margin-bottom: 8px;
}


.section h2 {
  font-family: Source Han Sans CN-Medium;
  font-size: 16px;
  font-weight: Medium;
  color: #777;
  margin-bottom: 15px;
}

.nickname-input-group {
  position: relative;
  margin-bottom: 15px;
}

.nickname-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  span {
    display: flex;
    align-items: center;
    font-weight: 500;
    height: 68px;
    font-family: Source Han Sans CN-Medium;
    padding: 0 10px;
    font-size: 16px;
  }

  input {
    flex: 1;
    height: 66px;
    font-size: 14px;
    border: none;
    outline: none;
    color: #666;
  }
}

.actual-name {
  font-family: Source Han Sans CN-Regular;
  font-size: 14px;
  color: #777;
  margin: 24px 0;
  padding: 0 15px;
  text-align: center;
}

.next-btn {
  width: 100%;
  height: 50px;
  background: #3478F5;
  border-radius: 16px 16px 16px 16px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.auth-info {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 24px;
}

.mb100 {
  margin-bottom: 100px;
}
</style>
