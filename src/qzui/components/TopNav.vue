<template>
    <div class="group-chat-nav window-move" :class="{ pr140: sharedMiscState.isElectronWindowsOrLinux }">
        <a :class="{ active: activeIndex === 0 && route.path === '/home' }" @click="switchTab(0)">私聊</a>
        <a :class="{ active: activeIndex === 1 && route.path === '/home' }" @click="switchTab(1)">私域群</a>
        <a :class="{ active: activeIndex === 2 && route.path === '/home' }" @click="switchTab(2)">公域群</a>
        <a @click="addGroup"><img src="../assets/add.png" /></a>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../../store';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeIndex = ref(Number(route.query.activeIndex) || 0);

const sharedMiscState = store.state.misc;

const switchTab = (index) => {
    activeIndex.value = index;
    router.push(`/home?activeIndex=${index}`);
};
</script>

<style lang="scss" scoped>
.group-chat-nav {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    height: 40px;
    border-bottom: 1px solid #ccc;
    overflow-x: auto;

    &.pr140 {
        padding-right: 140px;
    }

    a {
        font-size: 14px;
        margin-right: 20px;
        color: #333;
        cursor: pointer;

        &.active {
            color: #07c160;
            font-weight: bold;
        }

        img {
            width: 15px;
            height: 15px;
            display: block;
        }
    }
}
</style>
