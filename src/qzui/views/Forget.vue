<template>
  <div class="password-reset-container">
    <div class="app-name">忘记密码</div>

    <div class="input-container">
      <div class="input-field">
        <input
          id="phone"
          type="tel"
          v-model="phoneNumber"
          maxlength="11"
          placeholder="请输入手机号码"
        />
      </div>

      <div class="input-field verification-code">
        <input id="code" type="text" v-model="verificationCode" placeholder="请输入验证码" />
        <button class="get-code-btn" @click="getVerificationCode" :disabled="isCountingDown">
          {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
        </button>
      </div>

      <div class="input-field">
        <input
          id="new-password"
          :type="showPassword ? 'text' : 'password'"
          v-model="newPassword"
          placeholder="请输入新密码"
        />
        <span
          class="toggle-password"
          @click="showPassword = !showPassword"
          :class="{ visible: showPassword }"
        >
          {{ showPassword ? '👁️' : '👁️‍🗨️' }}
        </span>
      </div>
    </div>
    <div class="login-options">
      <span class="password-login" @click="switchToPasswordLogin">密码登录</span>
    </div>

    <button class="reset-btn" @click="handleReset">重置密码</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { forgotPassword, sendSmsCode } from '../api/index.js'
import { ElMessage } from 'element-plus'

const router = useRouter()

const phoneNumber = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const showPassword = ref(false)
const countdown = ref(0)
const isCountingDown = ref(false)

const getVerificationCode = () => {
  if (isCountingDown.value) {
    ElMessage.error('请稍后再获取验证码')
    return
  }

  if (!phoneNumber.value || !/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    ElMessage.error('请输入正确的手机号码')
    return
  }

  sendSmsCode({
    mobile: phoneNumber.value,
    scene: 'ZHDLMM'
  }).then((res) => {
    if (res.code !== 0) {
      ElMessage.error(res.msg || '发送验证码失败，请重试')
      return
    }

    ElMessage.success('验证码发送成功')

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
  })
}

const handleReset = () => {
  if (!phoneNumber.value || !verificationCode.value || !newPassword.value) {
    ElMessage.error('请填写完整信息')
    return
  }

  if (newPassword.value.length < 6) {
    ElMessage.error('密码长度不能少于6位')
    return
  }

  forgotPassword({
    code: verificationCode.value,
    mobile: phoneNumber.value,
    password: newPassword.value
  }).then((res) => {
    if (res.code !== 0) {
      ElMessage.error(res.msg || '重置密码失败，请重试')
      return
    }

    ElMessage.success('重置密码成功')
    // 跳转到首页或其他页面
    switchToPasswordLogin()
  })
}

const switchToPasswordLogin = () => {
  router.push('/passwordLogin') // 假设有密码登录路由
}
</script>

<style scoped>
.password-reset-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 100vh;
  padding-top: 60px;
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

.verification-code {
  position: relative;
}

.get-code-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.get-code-btn:disabled {
  color: #999;
  cursor: not-allowed;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
}

.reset-btn {
  width: 100%;
  max-width: 500px;
  height: 50px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin: 20px 0;
  cursor: pointer;
}

.reset-btn:hover {
  background-color: #40a9ff;
}

.agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

.agreement input {
  margin-right: 8px;
}

.agreement a {
  color: #1890ff;
  text-decoration: none;
}

.login-options {
  width: 100%;
  max-width: 500px;
  margin-top: 12px;
  font-size: 14px;
  color: #1890ff;
  cursor: pointer;
  text-align: right;
}
</style>
