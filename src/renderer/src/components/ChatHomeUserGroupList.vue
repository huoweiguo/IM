<template>
  <div class="chat-home-user-group-list">
    <h3>我的聊天室</h3>
    <ul>
      <li v-for="(item, index) in chatList" :class="{ 'active': currentIndex === index }" @click="currentIndex = index"
        :key="index">
        <span>{{ item.name }}</span>
        <i>{{ item.online }}人在线</i>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const currentIndex = ref(0)
const chatList = ref([
  { name: 'A2桌游讨论', online: 35 },
  { name: 'A1干饭', online: 6 },
  { name: 'B1公司团建', online: 150 },
  { name: 'C2周末去哪儿', online: 16 },
  { name: 'C3黄山周末游', online: 8 }
])
</script>

<style lang="scss" scoped>
.chat-home-user-group-list {
  width: 250px;
  height: 100vh;
  background-color: #efefef;
  overflow: hidden;
  border-right: 1px solid #ddd;

  h3 {
    font-size: 16px;
    font-weight: 500;
    padding: 0 10px;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
  }

  ul {
    padding: 10px 0;

    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;
      height: 50px;
      cursor: pointer;

      &.active {
        background-color: rgb(202, 221, 255);
      }

      span {
        font-size: 14px;
        color: #333;
      }

      i {
        font-size: 12px;
        color: rgb(7, 193, 96);
        font-style: normal;
      }
    }
  }
}
</style>
