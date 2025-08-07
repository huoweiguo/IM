<template>
    <Layout>
        <div class="group-chat">
            <TopNav />
            <ChatUser style="flex: 1" />
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue';
import ChatUser from '../components/ChatUser.vue';
import TopNav from '../components/TopNav.vue';
</script>

<style lang="scss">
.group-chat {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
