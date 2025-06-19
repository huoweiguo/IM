<template>
  <div>
    <a @click="router.push('/habbyQuestion')">兴趣爱好问题</a> |
    <a @click="router.push('/community')">社区</a>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
