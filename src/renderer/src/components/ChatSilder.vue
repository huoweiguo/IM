<template>
  <div class="chat-slider">
    <img src="../assets/header.png" class="header-icon" />
    <ul>
      <li class="chat" :class="{ 'chat_active': route.path === '/chat' }" @click="$router.push('/chat')">
        <el-icon class="chat-icon" size="24">
          <ChatDotRound />
        </el-icon>
      </li>
      <li class="community" :class="{ 'community_active': route.path === '/community' }"
        @click="$router.push('/community')">
      </li>
      <!-- <li class="friend" @click="openNewWindow"></li> -->
      <li class="chat" :class="{ 'chat_active': route.path === '/chatHome' }" @click="$router.push('/chatHome')">
        <el-icon class=" chat-icon" size="24">
          <Service />
        </el-icon>
      </li>
    </ul>
    <ul class="bottom_ul">
      <li class="chat" :class="{ 'chat_active': route.path === '/my' }" @click="openMyWindow">
        <el-icon class="chat-icon" size="24">
          <User />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const openMyWindow = () => {
  // 检查是否在 Electron 环境中
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      title: '我的',
      url: `${import.meta.env.VITE_API_BASE_URL}/#/my`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}
</script>

<style lang="scss">
.chat-slider {
  position: relative;
  width: 55px;
  height: 100vh;
  background-color: rgb(46, 46, 46);
  padding: 35px 10px;
  box-sizing: border-box;
  flex-direction: column;

  .bottom_ul {
    position: absolute;
    left: 10px;
    bottom: 30px;

    li {
      display: flex;
      justify-content: center;
    }
  }

  .header-icon {
    display: block;
    width: 35px;
    height: 35px;
    margin-bottom: 30px;
  }

  ul {
    padding: 0;
    margin: 0;
    width: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      list-style: none;
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-size: 24px 24px;
      background-position: center;

      &.chat {

        &:hover,
        &.chat_active {
          .chat-icon {
            color: rgba(7, 193, 96, 1);
          }
        }
      }

      &.community {
        background-image: url(../assets/community.png);

        &:hover,
        &.community_active {
          background-image: url(../assets/community_fill.png);
        }
      }

      &.friend {
        background-image: url(../assets/friend.png);
      }

      .chat-icon {
        color: #777;
      }
    }
  }
}
</style>
