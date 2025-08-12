<template>
    <div class="layout">
        <view class="chat-silder">
            <ChatSilder />
        </view>
        <div class="chat-content window-move">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getUserCenter } from '@/api/index.js';
import ChatSilder from '../components/ChatSilder.vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { clear } from '../util/storageHelper';
import wfc from '@/wfc/client/wfc';
import IpcEventType from '@/ipcEventType';
import { ipcRenderer, isElectron } from '@/platform';
import { getItem } from '../../qzui/util/storageHelper';

const router = useRouter();

const logout = () => {
    clear();
    wfc.disconnect();
    if (isElectron()) {
        ipcRenderer.send(IpcEventType.LOGOUT);
    }
};

onMounted(() => {
    getUserCenter().then((res) => {
        if (res.code == -9 || res.code == -11) {
            ElMessage.error('登录过期，请重新登录');
            logout();
            router.push('/');
            return;
        }

        // 检查是否有保存的用户信息，实现自动登录
        let userId = getItem('userId');
        let token = getItem('token');

        if (userId && token) {
            wfc.connect(userId, token);
            // isElectron() && ipcRenderer.send(IpcEventType.LOGIN);
        } else {
            isElectron() && ipcRenderer.send(IpcEventType.RESIZE_LOGIN_WINDOW);
        }
    });
});
</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 1;
    .chat-silder {
        width: 63px;
    }
    .chat-content {
        flex: 1;
        display: flex;
        width: 100%;
    }
}
</style>
