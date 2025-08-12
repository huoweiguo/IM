<template>
    <Layout>
        <section id="conversation-content" class="conversation-page">
            <ConversationListPanel class="conversation-list-panel" />
            <ConversationView class="conversation-view" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue';
import ConversationView from '../main/conversation/ConversationView.vue';
import ConversationListPanel from '../main/ConversationListPanel.vue';
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
