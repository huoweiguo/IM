<template>
    <Layout>
        <div class="chat-home">
            <aside class="sidebar window-move">
                <ChatHomeUserGroupList />
            </aside>

            <ChatroomConversationView :key="chatroomKey" class="chat-main" />
        </div>
    </Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '../components/Layout.vue';
import ChatHomeUserGroupList from '../components/ChatHomeUserGroupList.vue';
import ChatroomConversationView from '../main/conversation/ChatroomConversationView.vue';
</script>

<style lang="scss" scoped>
.chat-home {
    display: flex;
    height: 100vh;
    width: 100%;
    background: #fff;
}

.sidebar {
    width: 250px;
    border-right: 1px solid #eee;
}

.chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>
