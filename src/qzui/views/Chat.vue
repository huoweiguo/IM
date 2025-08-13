<template>
    <Layout>
        <section id="conversation-content" class="conversation-page">
            <ChatUser class="conversation-list-panel" />
            <ConversationView class="conversation-view" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue';
import ChatUser from '../components/ChatUser.vue';
import ConversationView from '../main/conversation/ConversationView.vue';
</script>

<style lang="scss" scoped>
.conversation-page {
    flex: 1;
    display: flex;
    height: 100%;
}

.conversation-list-panel {
    width: 261px;
    height: 100%;
}

.conversation-view {
    flex: 1;
}
</style>
