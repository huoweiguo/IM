<template>
    <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100vh">
        <a @click="router.push('/habbyQuestion')">兴趣爱好问题</a> | <a @click="router.push('/community')">社区</a> |
        <a @click="open">打开新窗口</a>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createNewWindow } from '@/qzui/utils/electronHelper';
const router = useRouter();

// onMounted(() => {
//   if (!store.islogin) {
//     router.push('/passwordLogin')
//   }
// })

const open = async () => {
    const newWindow = await createNewWindow({
        width: 375,
        height: 720,
        url: `#/my`,
    });
};
</script>
