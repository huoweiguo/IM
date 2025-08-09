<template>
    <ElectronWindowsControlButtonView style="position: fixed; top: 0; right: 0; z-index: 9999999" :maximizable="false" v-if="store.state?.misc?.isElectronWindowsOrLinux" />
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
import { clear } from '../util/storageHelper';
import wfc from '@/wfc/client/wfc';
import IpcEventType from '@/ipcEventType';
import { ipcRenderer, isElectron } from '@/platform';
import store from '../../store';
import ElectronWindowsControlButtonView from '../common/ElectronWindowsControlButtonView.vue';
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
    if (res.code == -9 || res.code == -11) {
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
        width: 100%;
    }
}
</style>
