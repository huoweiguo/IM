<template>
    <div class="login-container window-move">
        <div class="app-name">{{ appName }}</div>
        <div class="welcome-text">{{ welcomeText }}</div>

        <div class="input-container">
            <div class="input-field">
                <input id="phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
            </div>

            <div class="input-field verification-code">
                <input id="code" type="text" v-model="verificationCode" placeholder="请输入验证码" />
                <button class="send-code-btn" @click="getVerificationCode" :disabled="isCountingDown">
                    {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
                </button>
            </div>

            <div class="input-field password-input">
                <input id="new-password" :type="showPassword ? 'text' : 'password'" v-model="newPassword" placeholder="请输入新密码" />
                <span class="toggle-password" @click="togglePasswordVisibility">
                    {{ showPassword ? '隐藏' : '显示' }}
                </span>
            </div>
        </div>

        <div class="login-options">
            <span class="no-account">返回登录？<span class="password-login" @click="switchToPasswordLogin">密码登录</span></span>
        </div>

        <button class="login-btn" @click="handleReset">重置密码</button>

        <div class="agreement">
            <input type="checkbox" id="agree" v-model="agreed" />
            <label for="agree">我已阅读并同意<a href="#" @click.prevent="showUserAgreement">《用户协议》</a>和<a href="#" @click.prevent="showPrivacyPolicy">《隐私政策》</a></label>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { forgotPassword, sendSmsCode } from '../../api/index.js';
import { ElMessage } from 'element-plus';
import { isElectron } from '../../platform';
import IpcEventType from '../../ipcEventType';

const router = useRouter();

// 页面基本信息
const appName = '圈子';
const welcomeText = '忘记密码';

// 表单数据
const phoneNumber = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const showPassword = ref(false);
const agreed = ref(false);

// 验证码相关
const countdown = ref(0);
const isCountingDown = ref(false);

// 获取验证码
const getVerificationCode = () => {
    if (isCountingDown.value) {
        ElMessage.error('请稍后再获取验证码');
        return;
    }

    if (!phoneNumber.value || !/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
        alert('请输入正确的手机号码');
        return;
    }

    sendSmsCode({
        mobile: phoneNumber.value,
        scene: 'ZHDLMM',
    }).then((res) => {
        if (res.code !== 0) {
            ElMessage.error(res.msg || '发送验证码失败，请重试');
            return;
        }

        ElMessage.success('验证码发送成功');

        // 开始倒计时
        isCountingDown.value = true;
        countdown.value = 60;
        const timer = setInterval(() => {
            countdown.value--;
            if (countdown.value <= 0) {
                clearInterval(timer);
                isCountingDown.value = false;
            }
        }, 1000);
    });
};

// 切换密码可见性
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// 处理重置密码
const handleReset = () => {
    if (!agreed.value) {
        alert('请先阅读并同意用户协议和隐私政策');
        return;
    }

    if (!phoneNumber.value || !verificationCode.value || !newPassword.value) {
        alert('请填写完整信息');
        return;
    }

    if (newPassword.value.length < 6) {
        alert('密码长度不能少于6位');
        return;
    }

    forgotPassword({
        code: verificationCode.value,
        mobile: phoneNumber.value,
        password: newPassword.value,
    }).then((res) => {
        if (res.code !== 0) {
            ElMessage.error(res.msg || '重置密码失败，请重试');
            return;
        }

        ElMessage.success('重置密码成功，正在跳转登录页面...');
        switchToPasswordLogin();
    });
};

// 切换到密码登录
const switchToPasswordLogin = () => {
    router.push('/');
};

// 显示用户协议
const showUserAgreement = () => {
    window.open('https://www.baidu.com', '_blank');
};

// 显示隐私政策
const showPrivacyPolicy = () => {
    window.open('https://www.baidu.com', '_blank');
};

// 组件挂载时
onMounted(() => {
    if (isElectron()) {
        const { ipcRenderer } = require('electron');
        ipcRenderer.send(IpcEventType.RESIZE_LOGIN_WINDOW);
    }
});

// 组件卸载时
onUnmounted(() => {
    // 清理定时器
    if (isCountingDown.value) {
        clearInterval(window.resetPasswordTimer);
    }
});
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    box-sizing: border-box;
    margin: auto;
    padding: 0 36px;
}

.app-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
}

.welcome-text {
    font-size: 18px;
    margin-bottom: 40px;
    color: #666;
    text-align: center;
}

.input-container {
    border: 1px solid rgba(170, 170, 170, 0.4);
    border-radius: 8px;
    overflow: hidden;
}

.input-field {
    width: 100%;
    max-width: 500px;
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

.password-input {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #1890ff;
    font-size: 14px;
    cursor: pointer;
}

.login-options {
    width: 100%;
    max-width: 500px;
    margin-bottom: 30px;
    margin-top: 12px;
    font-size: 14px;
    color: #666;
    text-align: right;
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
