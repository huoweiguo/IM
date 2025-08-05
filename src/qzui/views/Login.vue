<template>
  <div class="login-container">
    <div class="app-name">{{ appName }}</div>
    <div class="phone-number">{{ maskedPhoneNumber }}</div>
    <div class="auth-provider">认证服务由联通统一认证提供</div>

    <button class="login-btn" @click="handleOneClickLogin">本机号码一键登录</button>
    <button class="other-login" @click="handleOtherLogin">其他手机号登录</button>

    <div class="agreement">
      <input type="checkbox" id="agree" v-model="agreed" />
      <label for="agree"
        >我已阅读并同意<a href="#" @click.prevent="showUserAgreement">《用户协议》</a>和<a
          href="#"
          @click.prevent="showPrivacyPolicy"
          >《隐私政策》</a
        ></label
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const appName = 'APP名称'
const maskedPhoneNumber = '156****2345'
const agreed = ref(false)

const handleOneClickLogin = () => {
  if (!agreed.value) {
    alert('请先阅读并同意用户协议和隐私政策')
    return
  }
  console.log('执行一键登录逻辑')
  // 这里可以添加实际的登录逻辑
}

const handleOtherLogin = () => {
  if (!agreed.value) {
    alert('请先阅读并同意用户协议和隐私政策')
    return
  }
  console.log('跳转到其他登录方式')
  router.push('/phoneLogin')
  // 这里可以添加跳转逻辑
}

const showUserAgreement = () => {
  console.log('显示用户协议')
  // 这里可以添加显示用户协议的逻辑
}

const showPrivacyPolicy = () => {
  console.log('显示隐私政策')
  // 这里可以添加显示隐私政策的逻辑
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #333;
}

.phone-number {
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
}

.auth-provider {
  font-size: 12px;
  color: #999;
  margin-bottom: 40px;
}

.login-btn {
  width: 100%;
  max-width: 300px;
  height: 50px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #40a9ff;
}

.other-login {
  width: 100%;
  max-width: 300px;
  height: 50px;
  background-color: transparent;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 25px;
  font-size: 16px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.other-login:hover {
  background-color: #e6f7ff;
}

.agreement {
  display: flex;
  align-items: center;
  font-size: 14px;
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
