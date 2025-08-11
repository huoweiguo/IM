<template>
    <div class="register-container window-move">
        <div class="app-name">{{ appName }}</div>
        <div class="welcome-text">{{ welcomeText }}</div>

        <div class="input-container">
            <div class="input-field">
                <input id="phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
            </div>

            <div class="input-field verification-code">
                <input id="code" type="text" v-model="verificationCode" placeholder="请输入验证码" maxlength="6" />
                <button class="send-code-btn" @click="getVerificationCode" :disabled="isCountingDown">
                    {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
                </button>
            </div>

            <div class="input-field password-input">
                <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请设置6-20位密码" />
                <div class="password-strength" :class="passwordStrengthClass">
                    {{ passwordStrengthText }}
                </div>
                <span class="toggle-password" @click="togglePasswordVisibility">
                    {{ showPassword ? '隐藏' : '显示' }}
                </span>
            </div>

            <div class="input-field">
                <input id="invite-code" type="text" v-model="inviteCode" placeholder="请输入邀请码（选填）" />
            </div>
        </div>

        <div class="login-options">
            <span class="no-account">已有账号？<span class="login" @click="switchToLogin">登录</span></span>
        </div>

        <button class="login-btn" @click="handleRegister" :disabled="!agreed || isLoading">
            {{ isLoading ? '注册中...' : '注册' }}
        </button>

        <div class="agreement">
            <input type="checkbox" id="agree" v-model="agreed" />
            <label for="agree">我已阅读并同意<a href="#" @click.prevent="showUserAgreement">《用户协议》</a>和<a href="#" @click.prevent="showPrivacyPolicy">《隐私政策》</a></label>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { registerAccount, sendSmsCode } from '../../api/index.js';
import { ElMessage } from 'element-plus';
import wfc from '../../wfc/client/wfc';
import Config from '../../config';

const router = useRouter();

const appName = '圈子';
const welcomeText = '你好，欢迎来到圈子';
const phoneNumber = ref('');
const verificationCode = ref('');
const password = ref('');
const inviteCode = ref('');
const agreed = ref(false);
const showPassword = ref(false);
const countdown = ref(0);
const isCountingDown = ref(false);
const isLoading = ref(false);

// 密码强度计算
const passwordStrength = computed(() => {
    if (!password.value) return 0;
    let strength = 0;
    if (password.value.length >= 6) strength++;
    if (password.value.length >= 8) strength++;
    if (/[A-Z]/.test(password.value)) strength++;
    if (/[0-9]/.test(password.value)) strength++;
    if (/[^A-Za-z0-9]/.test(password.value)) strength++;
    return Math.min(strength, 4);
});

const passwordStrengthClass = computed(() => {
    return ['weak', 'medium', 'strong', 'very-strong'][passwordStrength.value - 1] || '';
});

const passwordStrengthText = computed(() => {
    if (!password.value) return '';
    const texts = ['弱', '中', '强', '非常强'];
    return `密码强度: ${texts[passwordStrength.value - 1] || ''}`;
});

// 切换密码可见性
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// 发送验证码
const getVerificationCode = () => {
    const purePhone = phoneNumber.value.replace(/\D/g, '');
    if (!purePhone || !/^1[3-9]\d{9}$/.test(purePhone)) {
        ElMessage.error('请输入正确的手机号码');
        return;
    }

    if (isCountingDown.value) {
        ElMessage.error('请稍后再获取验证码');
        return;
    }

    sendSmsCode({
        mobile: purePhone,
        scene: 'BDSJHM', // 注册验证码场景
    })
        .then((res) => {
            if (res.code !== 0) {
                ElMessage.error(res.msg || '发送验证码失败，请重试');
                isCountingDown.value = false;
                countdown.value = 0;
                return;
            }

            ElMessage.success('验证码发送成功');
            isCountingDown.value = true;
            countdown.value = 60;
            const timer = setInterval(() => {
                countdown.value--;
                if (countdown.value <= 0) {
                    clearInterval(timer);
                    isCountingDown.value = false;
                }
            }, 1000);
        })
        .catch(() => {
            ElMessage.error('发送验证码失败，请重试');
            isCountingDown.value = false;
            countdown.value = 0;
        });
};

// 切换到登录页面
const switchToLogin = () => {
    router.push('/');
};

// 处理注册
const handleRegister = () => {
    if (!agreed.value) {
        ElMessage.error('请先阅读并同意用户协议和隐私政策');
        return;
    }

    const purePhone = phoneNumber.value.replace(/\D/g, '');

    if (!purePhone || !/^1[3-9]\d{9}$/.test(purePhone)) {
        ElMessage.error('请输入正确的手机号码');
        return;
    }

    if (!verificationCode.value || verificationCode.value.length !== 4) {
        ElMessage.error('请输入4位验证码');
        return;
    }

    if (!password.value || password.value.length < 6) {
        ElMessage.error('密码长度不能少于6位');
        return;
    }

    isLoading.value = true;

    registerAccount({
        account: purePhone,
        code: verificationCode.value,
        password: password.value,
        terminal: Config.getWFCPlatform(),
    })
        .then((res) => {
            isLoading.value = false;

            if (res.code !== 0) {
                ElMessage.error(res.msg || '注册失败，请重试');
                return;
            }

            console.log('注册成功:', res);
            ElMessage.success('注册成功');

            router.push('/login');
        })
        .catch((error) => {
            isLoading.value = false;
            console.error('注册失败:', error);
            ElMessage.error('注册失败，请重试');
        });
};

// 显示用户协议
const showUserAgreement = () => {
    window.open('https://www.baidu.com', '_blank');
};

// 显示隐私政策
const showPrivacyPolicy = () => {
    window.open('https://www.baidu.com', '_blank');
};
</script>

<style scoped>
.register-container {
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
    margin-bottom: 20px;
    color: #666;
    text-align: center;
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

.password-strength {
    position: absolute;
    right: 90px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
    font-size: 14px;
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

.login-options {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
    margin-top: 12px;
    font-size: 14px;
    color: #666;
}

.no-account {
    color: #666;
}

.login {
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

.login-btn:hover:not(:disabled) {
    background-color: #40a9ff;
}

.login-btn:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
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
