<template>
    <div class="fans-container">
        <div class="fans-list" ref="scrollableDiv">
            <div v-for="fan in fans" :key="fan.id" class="fan-item">
                <div class="fan-avatar">
                    <img :src="fan.avatar" alt="粉丝头像" />
                </div>
                <div class="fan-info-container">
                    <div class="fan-info">
                        <h3>{{ fan.name }}</h3>
                        <!-- <span>{{ fan.createTime }}</span> -->
                    </div>
                    <div class="fan-time">
                        <p class="message-content">{{ formatCommentTime(fan.createTime) }}</p>
                        <button class="follow-btn followed" v-if="fan.isFollow">已关注</button>
                        <button class="follow-btn" v-else @click="toggleFollow(fan.id)">关注TA</button>
                    </div>
                </div>
            </div>

            <el-empty :image-size="80" v-if="fans.length === 0" description="暂无粉丝" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFansNoticeList } from '../../api/follow';
import { getItem, setItem } from '../../ui/util/storageHelper';
import { formatCommentTime } from '../util/timeformat.js';
import { throttle } from 'lodash-es';
const fans = ref([]);
const scrollableDiv = ref(null);

const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
};

const getFollowList = async () => {
    const userId = getItem('userPortrait') ? getItem('userPortrait') : '';
    const res = await getFansNoticeList(userId);
    fans.value = res.data || [];
};

const toggleFollow = (id) => {};

const handleScroll = throttle((event) => {
    const element = event.target;
    // 判断是否滚动到底部
    const isBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (isBottom) {
        console.log('已经滚动到底部scroll');
    }
}, 100);

onMounted(() => {
    // 获取新的粉丝通知
    getFollowList();
    scrollableDiv.value.addEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.fans-container {
    width: 375px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

.fans-list {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 30px);
    overflow-y: auto;
    scrollbar-width: none;
}

.fans-list::-webkit-scrollbar {
    display: none;
}

.fan-item {
    display: flex;
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    transition: all 0.3s;

    .fan-info-container {
        flex: 1;
    }
}

.fan-avatar {
    width: 43px;
    height: 43px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 8px;
}

.fan-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.fan-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    span {
        font-size: 12px;
        color: #999;
    }
}

.fan-info h3 {
    font-size: 14px;
    color: #636b89;
}

.fan-time {
    position: relative;
    display: flex;
}

.message-time {
    margin: 0;
    font-size: 12px;
    color: #666;
}

.message-content {
    padding-right: 60px;
    color: #777;
    font-size: 12px;
}

.follow-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 20px;
    background-color: #3478f5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 12px;
    white-space: nowrap;
}

.follow-btn.followed {
    background-color: #e7e7e7;
    color: #666;
}
</style>
