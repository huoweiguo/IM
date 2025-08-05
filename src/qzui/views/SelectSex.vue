<template>
  <div class="gender-select-container">
    <!-- 顶部导航栏 -->
    <TopNav title="性别选择" />

    <div class="prompt-text">你是男生还是女生？</div>
    <div class="sub-prompt">介绍一下自己的性别吧</div>

    <div class="gender-options">
      <div class="gender-option male" :class="{ 'selected': selectedGender === 'male' }" @click="selectGender('male')">
        <img src="../assets/female.png" alt="male" class="gender-icon" />
        <span><img src="../assets/male_icon.png" />男生</span>
      </div>

      <div class="gender-option female" :class="{ 'selected': selectedGender === 'female' }"
        @click="selectGender('female')">
        <img src="../assets/male.png" alt="male" class="gender-icon" />
        <span><img src="../assets/female_icon.png" />女生</span>
      </div>
    </div>

    <div class="notice-text">性别后续不支持修改，请认真填写</div>
    <div class="submit-button">
      <img src="../assets/submit.png" @click="confirmSelection" :disabled="!selectedGender" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '../components/TopNav.vue'

const router = useRouter()
const selectedGender = ref(null)

// 选择性别
const selectGender = (gender) => {
  selectedGender.value = gender
}

// 确认选择
const confirmSelection = () => {
  if (!selectedGender.value) return
  router.push('/nickname')
  console.log('选择的性别:', selectedGender.value)
}
</script>

<style scoped>
.gender-select-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 100vh;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0 auto;
  transform: translateX(-12px);
}

.prompt-text {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.sub-prompt {
  font-size: 16px;
  margin-bottom: 40px;
  color: #666;
}

.gender-options {
  display: flex;
  justify-content: center;
  gap: 52px;
  margin-bottom: 24px;
  width: 100%;
}

.gender-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 16px;
  background-color: white;
  cursor: pointer;
}

.gender-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
  fill: #666;
}

.gender-option.selected .gender-icon {
  fill: #1890ff;
}

.male .gender-icon {
  fill: #1890ff;
}

.female .gender-icon {
  fill: #ff96cd;
}

.gender-option.selected.male span {
  border-color: #1890ff;
  background-color: #f0f7ff;
}

.gender-option.selected.female span {
  border-color: #ff96cd;
  background-color: #fff0f3;
}

.gender-option span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76px;
  height: 32px;
  font-size: 16px;
  color: #333;
  border: 1px solid rgba(170, 170, 170, 0.4);
  border-radius: 16px;
}

.gender-option span img {
  display: block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.notice-text {
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
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

.confirm-btn {
  width: 100%;
  max-width: 500px;
  height: 50px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #40a9ff;
}

.confirm-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}
</style>
