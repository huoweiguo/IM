<template>
  <div class="password-login-container">
    <TopNav title="密码登录" />

    <div class="app-name">{{ appName }}</div>
    <div class="welcome-text">{{ welcomeText }}</div>

    <div class="input-container">
      <div class="input-field">
        <input id="phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码">
      </div>

      <div class="input-field password-input">
        <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码">
        <span class="forget-password" @click="handleForgetPassword">忘记密码</span>
      </div>
    </div>

    <div class="login-options">
      <span class="no-account">还没有账号？<span class="register" @click="switchToRegister">注册账号</span></span>
      <span class="code-login" @click="switchToCodeLogin">验证码登录</span>
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
const password = ref('')
const agreed = ref(false)
const showPassword = ref(false)

const handleLogin = () => {
  if (!agreed.value) {
    alert('请先阅读并同意用户协议和隐私政策')
    return
  }

  if (!phoneNumber.value || !password.value) {
    alert('请输入手机号和密码')
    return
  }

  console.log('登录信息:', {
    phone: phoneNumber.value,
    password: password.value
  })

  // 这里添加实际登录逻辑
  // router.push('/home')
}

const handleForgetPassword = () => {
  router.push('/forget') // 假设有忘记密码路由
}

const switchToRegister = () => {
  router.push('/register') // 假设有注册路由
}

const switchToCodeLogin = () => {
  router.push('/phoneLogin') // 切换到验证码登录
}

const showUserAgreement = () => {
  router.push('/user-agreement')
}

const showPrivacyPolicy = () => {
  router.push('/privacy-policy')
}
</script>

<style scoped>
.password-login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 500px;
  padding-top: 60px;
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

.input-container {
  border: 1px solid rgba(170, 170, 170, 0.4);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.input-field {
  position: relative;
  width: 100%;
  width: 500px;
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

.forget-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.toggle-password {
  position: absolute;
  right: 90px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
}

.login-options {
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: 14px;
}

.no-account {
  color: #666;
}

.register {
  color: #1890ff;
  cursor: pointer;
}

.code-login {
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
