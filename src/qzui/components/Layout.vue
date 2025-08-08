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
import { getUserCenter } from '@/api/index.js';
import ChatSilder from '../components/ChatSilder.vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { clear } from '../utils/storageHelper';
import wfc from '@/wfc/client/wfc';
import IpcEventType from '@/ipcEventType';
import { ipcRenderer, isElectron } from '@/platform';
const router = useRouter();

const logout = () => {
    clear();
    wfc.disconnect();
    if (isElectron()) {
        ipcRenderer.send(IpcEventType.LOGOUT);
    }
};

getUserCenter().then((res) => {
    console.log(9999, res);
    if (res.code == -9) {
        ElMessage.error('登录过期，请重新登录');
        logout();
        router.push('/');
    }
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
    }
}
</style>
