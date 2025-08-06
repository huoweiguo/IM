<template>
    <div class="window-move" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100vh">
        <a @click="router.push('/habbyQuestion')">兴趣爱好问题</a> | <a @click="router.push('/community')">社区</a>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
