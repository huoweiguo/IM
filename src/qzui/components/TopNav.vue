<template>
    <div class="group-chat-nav window-move">
        <!-- <a @click="router.push('/passwordLogin')">登录</a> -->
        <a>私域</a>
        <a>私域群</a>
        <a class="active" @click="openPublicWindow">公域群</a>
        <a title="添加"><img src="../assets/add.png" /></a>
    </div>
</template>

<script setup>
import { createNewWindow } from '@/qzui/utils/electronHelper';
const openPublicWindow = () => {
    if (window.electronAPI) {
        createNewWindow({
            width: 375,
            height: 780,
            url: `#/publicSphere/list`,
        });
    } else {
        console.warn('Electron API 不可用，可能在浏览器环境中运行');
    }
};
</script>

<style lang="scss" scoped>
.group-chat-nav {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 40px;
    padding: 0 5px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    padding-left: 80px;

    a {
        font-size: 14px;
        margin-right: 20px;
        color: #333;
        cursor: pointer;

        &.active {
            color: rgb(24, 168, 255);
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
