<template>
    <div class="password-login-container">
        <div class="app-name">{{ appName }}</div>
        <div class="welcome-text">{{ welcomeText }}</div>

        <div class="input-container">
            <div class="input-field">
                <input id="phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
            </div>

            <div class="input-field password-input">
                <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码" />
                <span class="forget-password" @click="handleForgetPassword">忘记密码</span>
            </div>
        </div>

        <div class="login-options">
            <span class="no-account">还没有账号？<span class="register" @click="switchToRegister">注册账号</span></span>
            <span class="code-login" @click="switchToCodeLogin">验证码登录</span>
        </div>

        <button class="login-btn" @click="handleLogin">登录</button>

        <div class="agreement">
            <input type="checkbox" id="agree" v-model="agreed" />
            <label for="agree">我已阅读并同意<a href="#" @click.prevent="showUserAgreement">《用户协议》</a>和<a href="#" @click.prevent="showPrivacyPolicy">《隐私政策》</a></label>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginAccount } from '../../api/index.js';
import { ElMessage } from 'element-plus';
import wfc from '../../wfc/client/wfc';

const router = useRouter();

const appName = '圈子';
const welcomeText = '你好，欢迎来到圈子';
const phoneNumber = ref('18685029094');
const password = ref('123456');
const agreed = ref(false);
const showPassword = ref(false);
const clientId = wfc.getClientId();

const handleLogin = () => {
    if (!agreed.value) {
        ElMessage.warning('请先阅读并同意用户协议和隐私政策');
        return;
    }

    if (!phoneNumber.value || !password.value) {
        ElMessage.warning('请输入手机号和密码');
        return;
    }

    loginAccount({
        account: phoneNumber.value,
        clientId: clientId,
        code: '',
        password: password.value,
        scene: 1, // 登录方式: [1-账号密码 2-手机验证码 4-手机号一键登录]
        terminal: 3, // 终端 登录渠道: [1-iOS 2-Android 3-Windows 4-OSX 5-WEB 6-小程序 7-linux]
    }).then((res) => {
        console.log(res);

        if (res.code !== 0) {
            ElMessage.error(res.msg || '登录失败，请重试');
            return;
        }

        console.log('登录成功:', res);
        ElMessage.success('登录成功');
        // 登录成功后可以存储用户信息或 token

        // 跳转到首页或其他页面
        router.push('/chat');
    });
};

const handleForgetPassword = () => {
    router.push('/forget'); // 假设有忘记密码路由
};

const switchToRegister = () => {
    router.push('/register'); // 假设有注册路由
};

const switchToCodeLogin = () => {
    router.push('/phoneLogin'); // 切换到验证码登录
};

const showUserAgreement = () => {
    router.push('/user-agreement');
};

const showPrivacyPolicy = () => {
    router.push('/privacy-policy');
};
</script>

<style scoped>
.password-login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 500px;
    padding-top: 60px;
    box-sizing: border-box;
    margin: auto;
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
