<template>
    <Layout>
        <div class="group-chat">
            <TopNav />
            <ConversationPage style="flex: 1" />
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue';
import ConversationPage from '../main/ConversationPage.vue';
import TopNav from '../components/TopNav.vue';
</script>

<style lang="scss">
.group-chat {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
