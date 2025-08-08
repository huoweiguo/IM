<template>
    <nav class="chat-slider window-move">
        <img :src="store.state.contact?.selfUserInfo?.portrait" class="avatar" alt="用户头像" />

        <ul class="nav-list nav-list--main window-move">
            <li v-for="item in navItems" :key="item.path"
                :class="['nav-item', { 'is-active': route.path === item.path }]" @click="navigate(item.path)">
                <el-icon :size="24">
                    <component :is="item.icon" />
                </el-icon>
            </li>
        </ul>

        <ul class="nav-list nav-list--bottom">
            <li :class="['nav-item', { 'is-active': route.path === '/my' }]" @click="openMyWindow">
                <el-icon :size="24">
                    <Setting />
                </el-icon>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '../../store';
import { createNewWindow } from '@/qzui/utils/electronHelper';

const route = useRoute();
const router = useRouter();

const navItems = computed(() => [
    { path: '/chat', icon: 'ChatDotRound' },
    { path: '/friendlist', icon: 'User' },
    { path: '/community', icon: 'Baseball' },
    { path: '/chatHome', icon: 'Service' },
]);

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
