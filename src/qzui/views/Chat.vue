<template>
    <Layout>
        <section id="conversation-content" class="conversation-page">
            <ChatUser :activeId="activeId" class="conversation-list-panel" />
            <ConversationView class="conversation-view" />
        </section>
    </Layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Layout from '../components/Layout.vue';
import ChatUser from '../components/ChatUser.vue';
import ConversationView from '../main/conversation/ConversationView.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const activeId = ref(route.query.activeId);
watch(
    () => route.query.activeId,
    (newVal) => {
        activeId.value = newVal;
    }
);
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
