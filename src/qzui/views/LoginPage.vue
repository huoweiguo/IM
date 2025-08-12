<template>
    <div class="login-container window-move">
        <div class="app-name window-move">{{ appName }}</div>
        <div class="welcome-text window-move">{{ welcomeText }}</div>

        <!-- 登录方式选项卡 -->
        <div class="tab-container window-move">
            <div class="tab-item" :class="{ active: loginType === 'password' }" @click="switchToPasswordLogin">密码登录</div>
            <div class="tab-item" :class="{ active: loginType === 'phone' }" @click="switchToPhoneLogin">手机号登录</div>
        </div>

        <!-- 手机号登录表单 -->
        <div class="input-container" v-if="loginType === 'phone'">
            <div class="input-field">
                <input id="phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
            </div>

            <div class="input-field verification-code">
                <input id="code" type="text" v-model="verificationCode" placeholder="请输入验证码" />
                <button class="send-code-btn" @click="sendVerificationCode" :disabled="isCountingDown">
                    {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
                </button>
            </div>
        </div>

        <!-- 密码登录表单 -->
        <div class="input-container" v-else>
            <div class="input-field">
                <input id="password-phone" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号码" />
            </div>

            <div class="input-field password-input">
                <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码" />
                <span class="forget-password" @click="handleForgetPassword">忘记密码</span>
                <span class="toggle-password" @click="togglePasswordVisibility">
                    {{ showPassword ? '隐藏' : '显示' }}
                </span>
            </div>
        </div>

        <div class="login-options">
            <span class="no-account">还没有账号？<span class="register" @click="switchToRegister">注册账号</span></span>
        </div>

        <button class="login-btn" @click="handleLogin">{{ loginType === 'phone' ? '登录' : '登录' }}</button>

        <div class="agreement">
            <input type="checkbox" id="agree" v-model="agreed" />
            <label for="agree">我已阅读并同意<a href="#" @click.prevent="showUserAgreement">《用户协议》</a>和<a href="#" @click.prevent="showPrivacyPolicy">《隐私政策》</a></label>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { loginAccount, sendSmsCode } from '../../api/index.js';
import { ElMessage } from 'element-plus';
import wfc from '../../wfc/client/wfc';
import Config from '../../config';
import store from '../../store';
import { clear, getItem, setItem } from '../../qzui/util/storageHelper';
import ConnectionStatus from '../../wfc/client/connectionStatus';
import EventType from '../../wfc/client/wfcEvent';
import { ipcRenderer, isElectron } from '../../platform';
import IpcEventType from '../../ipcEventType';

const router = useRouter();

// 页面基本信息
const appName = '圈子';
const welcomeText = '你好，欢迎来到圈子';

// 登录类型切换
const loginType = ref('password'); // 'phone' 或 'password'

// 表单数据
const phoneNumber = ref('');
const verificationCode = ref('');
const password = ref('');
const agreed = ref(false);
const showPassword = ref(false);

// 验证码相关
const countdown = ref(0);
const isCountingDown = ref(false);

// IM 客户端相关
const clientId = wfc.getClientId();
const enableAutoLogin = ref(Config.ENABLE_AUTO_LOGIN);
let connectionStatusListener = null;

// 切换到手机号登录
const switchToPhoneLogin = () => {
    loginType.value = 'phone';
};

// 切换到密码登录
const switchToPasswordLogin = () => {
    loginType.value = 'password';
};

// 发送验证码
const sendVerificationCode = () => {
    if (isCountingDown.value) {
        ElMessage.error('请稍后再获取验证码');
        return;
    }

    if (!phoneNumber.value || !/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
        ElMessage.error('请输入正确的手机号码');
        return;
    }
    sendSmsCode({
        mobile: phoneNumber.value,
        scene: 'YZMDL',
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

// 处理登录
const handleLogin = () => {
    if (!agreed.value) {
        ElMessage.error('请先阅读并同意用户协议和隐私政策');
        return;
    }

    if (loginType.value === 'phone') {
        // 手机号验证码登录
        if (!phoneNumber.value || !verificationCode.value) {
            ElMessage.error('请输入手机号和验证码');
            return;
        }

        loginAccount({
            account: phoneNumber.value,
            clientId: clientId,
            code: verificationCode.value,
            password: '',
            scene: 2, // 手机验证码登录
            terminal: Config.getWFCPlatform(),
        }).then(handleLoginResponse);
    } else {
        // 密码登录
        if (!phoneNumber.value || !password.value) {
            ElMessage.error('请输入手机号和密码');
            return;
        }

        loginAccount({
            account: phoneNumber.value,
            clientId: clientId,
            code: '',
            password: password.value,
            scene: 1, // 账号密码登录
            terminal: Config.getWFCPlatform(),
        }).then(handleLoginResponse);
    }
};

// 处理登录响应
const handleLoginResponse = (res) => {
    if (res.code !== 0) {
        ElMessage.error(res.msg || '登录失败，请重试');
        return;
    }

    console.log('登录成功:', res);
    ElMessage.success('登录成功');

    // 存储用户信息
    const userId = res.data.serviceId;
    const apptoken = res.data.token;
    const servicetoken = res.data.serviceToken;
    const portrait = res.data.id;
    const userinfo = res.data;

    setItem('userId', userId);
    setItem('token', servicetoken);
    setItem('apptoken', apptoken);
    setItem('userPortrait', portrait);
    setItem('userinfo', JSON.stringify(userinfo));

    // 连接IM服务器
    wfc.connect(userId, servicetoken);

    // 登录成功后操作
    if (isElectron()) {
        ipcRenderer.send(IpcEventType.LOGIN, {
            userId: wfc.getUserId(),
            closeWindowToExit: getItem(wfc.getUserId() + '-' + 'closeWindowToExit') === '1',
        });
    }

    // 登录成功后跳转到聊天页面
    router.push('/home');
};

// 忘记密码
const handleForgetPassword = () => {
    router.push('/forget');
};

// 注册账号
const switchToRegister = () => {
    router.push('/register');
};

// 显示用户协议
const showUserAgreement = () => {
    window.open('https://www.baidu.com', '_blank');
};

// 显示隐私政策
const showPrivacyPolicy = () => {
    window.open('https://www.baidu.com', '_blank');
};

// 连接状态处理
const onConnectionStatusChange = (status) => {
    if (status === ConnectionStatus.ConnectionStatusLogout || status === ConnectionStatus.ConnectionStatusRejected || status === ConnectionStatus.ConnectionStatusTokenIncorrect) {
        ElMessage.error('连接失败: ' + ConnectionStatus.desc(status));
        clear();
    }

    if (status === ConnectionStatus.ConnectionStatusConnected) {
        // 登录成功后操作
        if (isElectron()) {
            ipcRenderer.send(IpcEventType.LOGIN, {
                userId: wfc.getUserId(),
            });
        }

        // 保存自动登录状态
        if (enableAutoLogin.value) {
            store.setEnableAutoLogin(true);
        }

        // 跳转到首页
        router.push('/home');
    }
};

// 组件挂载时添加监听
onMounted(() => {
    connectionStatusListener = onConnectionStatusChange;
    wfc.eventEmitter.on(EventType.ConnectionStatusChanged, connectionStatusListener);

    // 检查是否有保存的用户信息，实现自动登录
    let userId = getItem('userId');
    let token = getItem('token');
    let apptoken = getItem('apptoken');

    if (userId && apptoken && token) {
        // 自动登录
        // let autoLogin = store.state.misc.enableAutoLogin;
        let autoLogin = true;

        if (autoLogin && token) {
            router.push('/home');
        } else {
            isElectron() && ipcRenderer.send(IpcEventType.RESIZE_LOGIN_WINDOW);
        }
    } else {
        isElectron() && ipcRenderer.send(IpcEventType.RESIZE_LOGIN_WINDOW);
    }
});

// 组件卸载时移除监听
onUnmounted(() => {
    if (connectionStatusListener) {
        wfc.eventEmitter.removeListener(EventType.ConnectionStatusChanged, connectionStatusListener);
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
    margin-bottom: 20px;
    color: #666;
    text-align: center;
}

.tab-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.tab-item {
    padding: 10px 20px;
    cursor: pointer;
    color: #666;
    font-size: 16px;
    position: relative;
}

.tab-item.active {
    color: #1890ff;
    font-weight: bold;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #1890ff;
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
    color: #1890ff;
    font-size: 14px;
    cursor: pointer;
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

.register {
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
