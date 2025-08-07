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
import ChatSilder from '../components/ChatSilder.vue';
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
