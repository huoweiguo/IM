<template>
  <div class="phone-login-container">
    <TopNav title="手机号登录" />

    <div class="app-name">{{ appName }}</div>
    <div class="welcome-text">{{ welcomeText }}</div>
    <div class="input-container">
      <div class="input-field">
        <input id="phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码">
      </div>

      <div class="input-field verification-code">
        <input id="code" type="text" v-model="verificationCode" placeholder="请输入验证码">
        <button class="send-code-btn" @click="sendVerificationCode" :disabled="isCountingDown">
          {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
        </button>
      </div>
    </div>

    <div class="login-options">
      <span class="no-account">还没有账号？</span>
      <span class="password-login" @click="switchToPasswordLogin">密码登录</span>
    </div>

    <button class="login-btn" @click="handleLogin">登录</button>

    <div class="agreement">
      <input type="checkbox" id="agree" v-model="agreed">
      <label for="agree">我已阅读并同意<a href="#" @click.prevent="showUserAgreement">《用户协议》</a>和<a href="#"
          @click.prevent="showPrivacyPolicy">《隐私政策》</a></label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '../../components/TopNav.vue'

const router = useRouter()

const appName = '这是一个名字'
const welcomeText = '你好，欢迎来到'
const phoneNumber = ref('')
const verificationCode = ref('')
const agreed = ref(false)
const countdown = ref(0)
const isCountingDown = ref(false)

const sendVerificationCode = () => {
  if (!phoneNumber.value || !/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    alert('请输入正确的手机号码')
    return
  }

  // 模拟发送验证码
  console.log('发送验证码到:', phoneNumber.value)

  // 开始倒计时
  isCountingDown.value = true
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCountingDown.value = false
    }
  }, 1000)
}

const handleLogin = () => {
  if (!agreed.value) {
    alert('请先阅读并同意用户协议和隐私政策')
    return
  }

  if (!phoneNumber.value || !verificationCode.value) {
    alert('请输入手机号和验证码')
    return
  }

  console.log('登录信息:', {
    phone: phoneNumber.value,
    code: verificationCode.value
  })

  // 这里添加实际登录逻辑
  // router.push('/home')
}

const switchToPasswordLogin = () => {
  router.push('/passwordLogin') // 假设有密码登录路由
}

const showUserAgreement = () => {
  router.push('/user-agreement')
}

const showPrivacyPolicy = () => {
  router.push('/privacy-policy')
}
</script>

<style scoped>
.phone-login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px;
  width: 500px;
  height: 100vh;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.welcome-text {
  font-size: 18px;
  margin-bottom: 40px;
  color: #666;
}

.input-field {
  width: 100%;
  max-width: 500px;
}

.input-container {
  border: 1px solid rgba(170, 170, 170, 0.4);
  border-radius: 8px;
  overflow: hidden;
}

.input-field label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.input-field input {
  width: 100%;
  height: 52px;
  font-size: 14px;
  padding: 0 16px;
  box-sizing: border-box;
  color: #777;
  border: 0;
  border-bottom: 1px solid rgba(170, 170, 170, 0.4);
  outline: none;
}

.input-container .input-field:last-child input {
  border-bottom: 0;
}

.verification-code {
  position: relative;
}

.send-code-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.send-code-btn:disabled {
  color: #999;
  cursor: not-allowed;
}

.login-options {
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}

.no-account {
  color: #666;
}

.password-login {
  color: #1890ff;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  max-width: 500px;
  height: 50px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #40a9ff;
}

.agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
}

.agreement input {
  margin-right: 8px;
}

.agreement a {
  color: #1890ff;
  text-decoration: none;
}
</style>
