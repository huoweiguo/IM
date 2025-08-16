<template>
    <div style="position: fixed; top: 0; right: 0; z-index: 99999" v-if="sharedMiscState.isElectronWindowsOrLinux">
        <ElectronWindowsControlButtonView style="position: absolute; top: 0; right: 0" :maximizable="false" />
    </div>
    <div class="layout">
        <view class="chat-silder">
            <ChatSilder />
        </view>
        <div class="chat-content">
            <TopNav />
            <div class="chat-content-main">
                <slot></slot>
            </div>
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
import { getItem, setItem } from '../../qzui/util/storageHelper';
import TopNav from '../components/TopNav.vue';
import store from '../../store';
import ElectronWindowsControlButtonView from '../../qzui/common/ElectronWindowsControlButtonView.vue';

const router = useRouter();
const sharedMiscState = store.state.misc;

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

        setItem('userinfo', JSON.stringify(res.data));

        // 检查是否有保存的用户信息，实现自动登录
        let userId = getItem('userId');
        let token = getItem('token');

        if (userId && token) {
            let res = wfc.connect(userId, token);
            if (!res) {
                ElMessage.error('登录过期，请重新登录');
                logout();
                router.push('/');
            }
        } else {
            ElMessage.error('登录过期，请重新登录');
            logout();
            router.push('/');
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
        flex-direction: column;
        width: 100%;
        height: 100%;
        .chat-content-main {
            flex: 1;
            height: calc(100vh - 40px);
        }
    }
}
</style>
