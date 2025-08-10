<template>
    <div class="group-chat-nav window-move">
        <a>私聊</a>
        <a>私域群</a>
        <a @click="openPublicWindow">公域群</a>
        <a title="添加"><img src="../assets/add.png" /></a>
    </div>
</template>

<script setup>
import { createNewWindow } from '@/qzui/util/electronHelper';

const openPublicWindow = () => {
    createNewWindow({
        width: 375,
        height: 780,
        url: `#/publicSphere/list`,
    });
};
</script>

<style lang="scss" scoped>
.group-chat-nav {
    position: relative;
    z-index: 99999;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;

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
