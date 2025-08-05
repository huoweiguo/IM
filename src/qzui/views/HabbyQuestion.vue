<template>
  <div class="profile-setup-container">
    <!-- 顶部导航 -->
    <TopNav title="问题测试" />

    <!-- 兴趣爱好选择 -->
    <div class="habby-container">
      <ul>
        <li class="habby-item" v-for="(habby, index) in habbies" :class="{ selected: habby.selected }"
          @click="toggleHabby(index)">
          {{ habby.name }}
        </li>
      </ul>

      <div class="habby-description">用于找到您的兴趣</div>
    </div>

    <!-- 确认按钮 -->
    <div class="submit-button">
      <img src="../assets/submit.png" :disabled="!nickname || (!avatarPreview && !selectedAvatar)"
        @click="saveProfile" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '../components/TopNav.vue'
const router = useRouter()

const habbies = ref([
  { name: '宠物', selected: false },
  { name: '学习', selected: false },
  { name: '绘画', selected: false },
  { name: '社交', selected: false },
  { name: '垂钓', selected: false },
  { name: '冒险', selected: false },
  { name: '收藏', selected: false },
  { name: '唱歌', selected: false },
  { name: '机车', selected: false }
])

const toggleHabby = (index) => {
  habbies.value[index].selected = !habbies.value[index].selected
}

const saveProfile = () => {
  // 跳转到下一个页面
  router.push('/community')
}
</script>

<style scoped>
.profile-setup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  padding-top: 60px;
  background-color: #fff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 22px;
  color: #333;
}

.habby-container {
  margin-bottom: 24px;
}

.habby-container ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 75px;
}

.habby-container ul li {
  display: flex;
  width: 80px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  font-family: Source Han Sans CN-Medium;
  font-weight: 500;
  color: #777;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  border-radius: 16px;
}

.habby-container ul li.selected {
  background-color: #3478F5;
  color: #fff;
}

.habby-description {
  font-family: Source Han Sans CN-Medium;
  font-weight: 500;
  font-size: 14px;
  color: #777;
  text-align: center;
}

.submit-button {
  display: flex;
  justify-content: center;
}

.submit-button img {
  width: 140px;
  height: 52px;
  cursor: pointer;
}
</style>
