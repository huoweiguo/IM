<template>

  <div class="group-chat-outer">
    <TopNav />
    <div class="group-chat">
      <ChatSilder />
      <ChatUser />
    </div>
  </div>

  <el-dialog v-model="userInfoDialogVisible" title="用户信息" width="300px">
    <div style="text-align:center;">
      <img :src="currentUserInfo.icon" style="width:80px;height:80px;border-radius:50%;" />
      <h3>{{ currentUserInfo.name }}</h3>
      <p>最近消息：{{ currentUserInfo.message }}</p>
      <p>时间：{{ currentUserInfo.time }}</p>
      <p v-if="currentUserInfo.count">未读消息：{{ currentUserInfo.count }}</p>
      <p>群聊：{{ currentUserInfo.isGroup ? '是' : '否' }}</p>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import ChatUser from '../components/ChatUser.vue'
import ChatSilder from '../components/ChatSilder.vue'
import TopNav from '../components/TopNav.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const userInfoDialogVisible = ref(false)
const currentUserInfo = ref({})

const showUserInfo = (item) => {
  currentUserInfo.value = item
  userInfoDialogVisible.value = true
}
</script>

<style lang="scss">
.group-chat {
  width: 100vw;
  display: flex;
}
</style>
