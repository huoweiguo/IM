<template>
  <div class="register-container">
    <TopNav title="注册" />

    <div class="app-name">{{ appName }}</div>
    <div class="welcome-text">{{ welcomeText }}</div>

    <div class="input-container">
      <div class="input-field">
        <input id="phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
      </div>

      <div class="input-field verification-code">
        <input id="code" type="text" v-model="verificationCode" placeholder="请输入验证码" maxlength="6">
        <button class="get-code-btn" @click="getVerificationCode" :disabled="isCountingDown">
          {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
        </button>
      </div>

      <div class="input-field password-input">
        <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请设置6-20位密码">
        <div class="password-strength" :class="passwordStrengthClass">
          {{ passwordStrengthText }}
        </div>
      </div>

      <div class="input-field">
        <input id="invite-code" type="text" v-model="inviteCode" placeholder="请输入邀请码（选填）">
      </div>
    </div>

    <button class="register-btn" @click="handleRegister" :disabled="!agreed">
      注册并登录
    </button>

    <div class="agreement">
      <input type="checkbox" id="agree" v-model="agreed">
      <label for="agree">我已阅读并同意<a href="#" @click.prevent="showUserAgreement">《用户协议》</a>和<a href="#"
          @click.prevent="showPrivacyPolicy">《隐私政策》</a></label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '../../components/TopNav.vue'

const router = useRouter()

const appName = '这是一个名字'
const welcomeText = '你好，欢迎来到'
const phoneNumber = ref('')
const verificationCode = ref('')
const password = ref('')
const inviteCode = ref('')
const agreed = ref(false)
const showPassword = ref(false)
const countdown = ref(0)
const isCountingDown = ref(false)


// 密码强度计算
const passwordStrength = computed(() => {
  if (!password.value) return 0
  let strength = 0
  if (password.value.length >= 6) strength++
  if (password.value.length >= 8) strength++
  if (/[A-Z]/.test(password.value)) strength++
  if (/[0-9]/.test(password.value)) strength++
  if (/[^A-Za-z0-9]/.test(password.value)) strength++
  return Math.min(strength, 4)
})

const passwordStrengthClass = computed(() => {
  return ['weak', 'medium', 'strong', 'very-strong'][passwordStrength.value - 1] || ''
})

const passwordStrengthText = computed(() => {
  if (!password.value) return ''
  const texts = ['弱', '中', '强', '非常强']
  return `密码强度: ${texts[passwordStrength.value - 1] || ''}`
})

const getVerificationCode = () => {
  const purePhone = phoneNumber.value.replace(/\D/g, '')
  if (!purePhone || !/^1[3-9]\d{9}$/.test(purePhone)) {
    alert('请输入正确的手机号码')
    return
  }

  console.log('发送验证码到:', purePhone)

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

const handleRegister = () => {
  const purePhone = phoneNumber.value.replace(/\D/g, '')

  if (!purePhone || !/^1[3-9]\d{9}$/.test(purePhone)) {
    alert('请输入正确的手机号码')
    return
  }

  if (!verificationCode.value || verificationCode.value.length !== 6) {
    alert('请输入6位验证码')
    return
  }

  if (!password.value || password.value.length < 6) {
    alert('密码长度不能少于6位')
    return
  }

  router.push('/selectSex')

  console.log('注册信息:', {
    phone: purePhone,
    code: verificationCode.value,
    password: password.value,
    inviteCode: inviteCode.value
  })

  // 这里添加实际注册逻辑
  // 注册成功后可以自动登录并跳转到首页
  // router.push('/home')
}

const showUserAgreement = () => {
  router.push('/user-agreement')
}

const showPrivacyPolicy = () => {
  router.push('/privacy-policy')
}
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 500px;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  margin-right: 10px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0 auto;
  transform: translateX(-12px);
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.welcome-text {
  font-size: 18px;
  margin-bottom: 30px;
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

.password-strength {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.password-strength.weak {
  color: #ff4d4f;
}

.password-strength.medium {
  color: #faad14;
}

.password-strength.strong {
  color: #52c41a;
}

.password-strength.very-strong {
  color: #389e0d;
  font-weight: bold;
}

.register-btn {
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
  transition: background-color 0.3s;
}

.register-btn:hover:not(:disabled) {
  background-color: #40a9ff;
}

.register-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
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
</style>
