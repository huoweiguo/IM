<template>
    <nav class="chat-slider window-move">
        <tippy to="#infoTrigger" interactive :animate-fill="false" distant="7" theme="light" animation="fade" trigger="click" :arrow="true">
            <template #content>
                <UserCardView v-if="sharedContactState.selfUserInfo" v-on:close="closeUserCard" :enable-update-portrait="true" :user-info="sharedContactState.selfUserInfo" />
            </template>
        </tippy>
        <img :src="store.state.contact?.selfUserInfo?.portrait" class="avatar" id="infoTrigger" alt="用户头像" @click="onClickPortrait" />

        <ul class="nav-list nav-list--main window-move">
            <li v-for="item in navItems" :key="item.path" :class="['nav-item', { 'is-active': route.path === item.path }]" @click="navigate(item.path)">
                <el-badge :is-dot="(item.icon === 'ChatDotRound' && unread > 0) || (item.icon === 'User' && store.state.contact.unreadFriendRequestCount > 0)">
                    <el-icon :size="24">
                        <component :is="item.icon" />
                    </el-icon>
                </el-badge>
            </li>
        </ul>

        <ul class="nav-list nav-list--bottom">
            <li :class="['nav-item', { 'is-active': route.path === '/my' }]" @click="openMyWindow">
                <el-icon :size="24">
                    <Setting />
                </el-icon>
            </li>
            <li :class="['nav-item']" @click="logout">
                <span style="color: #666; font-size: 14px; white-space: nowrap">退出</span>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import wfc from '../../wfc/client/wfc';
import { useRoute, useRouter } from 'vue-router';
import store from '../../store';
import { clear } from '../util/storageHelper';
import { createNewWindow } from '../util/electronHelper';
import { ipcRenderer, isElectron } from '../../platform';
import IpcEventType from '../../ipcEventType';
import 'tippy.js/dist/tippy.css'; // optional for styling
import UserCardView from '../main/user/UserCardView.vue';

const route = useRoute();
const router = useRouter();
const sharedContactState = store.state.contact;

const unread = computed(() => {
    let count = 0;
    store.state.conversation.conversationInfoList.forEach((info) => {
        if (info.isSilent) {
            return;
        }
        let unreadCount = info.unreadCount;
        count += unreadCount.unread;
    });

    return count;
});

const navItems = computed(() => [
    { path: '/home', icon: 'ChatDotRound' },
    { path: '/friendlist', icon: 'User' },
    { path: '/community', icon: 'Baseball' },
    { path: '/chatHome', icon: 'Service' },
]);

const onClickPortrait = () => {
    wfc.getUserInfo(sharedContactState.selfUserInfo.uid, true);
};

const navigate = (path) => {
    router.push(path);
};

const openMyWindow = () => {
    createNewWindow({
        width: 375,
        height: 720,
        url: '#/my',
    });
};
const logout = () => {
    clear();
    wfc.disconnect();
    if (isElectron()) {
        ipcRenderer.send(IpcEventType.LOGOUT);
    }
    router.push('/');
};
</script>

<style lang="scss" scoped>
.chat-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 63px;
    height: 100vh;
    background-color: #2e2e2e;
    padding: 40px 0;
    box-sizing: border-box;

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        margin-bottom: 30px;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
            opacity: 0.8;
        }
    }

    .nav-list {
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        &--main {
            flex: 1;
        }

        &--bottom {
            margin-top: auto;
        }

        .nav-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            margin-bottom: 30px;
            cursor: pointer;
            transition: all 0.2s ease;

            &:last-child {
                margin-bottom: 0;
            }

            .el-icon {
                color: #777;
                transition: color 0.2s;
            }

            &:hover,
            &.is-active {
                .el-icon {
                    color: #07c160;
                }
            }

            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>
