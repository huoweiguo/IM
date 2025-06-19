<template>
  <!-- 新增顶部导航栏 -->
  <div class="top-nav">
    <button class="back-button" @click="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h1 class="page-title">{{ props.title }}</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
console.log(props.title, props, 'props')
const router = useRouter()
// 新增返回方法
const goBack = () => {
  router.go(-1) // 返回上一页
}
</script>

<style scoped>
/* 新增顶部导航样式 */
.top-nav {
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: center;
  margin-bottom: 20px;
  position: fixed;
  left: 0;
  top: 0;
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  margin-right: 10px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.page-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 auto;
  transform: translateX(-12px);
  /* 平衡后退按钮的宽度 */
}
</style>
