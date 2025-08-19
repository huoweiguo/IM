<template>
    <div class="fans-container">
        <div class="nodata" v-if="fans.length < 1">暂无数据</div>
        <div class="fans-list">
            <div v-for="fan in fans" :key="fan.id" class="fan-item" :class="{ active: selectedId.includes(fan.id) }" @click="selectFan(fan.id)">
                <div class="fan-avatar">
                    <img :src="fan.avatar" alt="粉丝头像" />
                </div>
                <div class="fan-info-container">
                    <div class="fan-info">
                        <h3>{{ fan.name }}</h3>
                        <span>{{ fan.No }}</span>
                    </div>
                    <span class="fan-introduce">{{ fan.introduce }}</span>
                </div>
            </div>
        </div>

        <div class="fans-btns" v-if="fans.length">
            <div class="fans-btns-set" @click="changeNext"><img src="../assets/refresh.png" :class="{ skewActive: isSkew }" />换一换</div>
            <div class="fans-times">今日剩余次数{{ times }}次</div>
            <div class="submit-btn">关注这些圈友</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import avator from '../assets/header1.png';
import avator2 from '../assets/usr-1.png';
const times = ref(5);
const isSkew = ref(false);
const fans = ref([
    // {
    //   id: 1,
    //   name: '张三',
    //   avatar: avator,
    //   No: 'UID142595414',
    //   introduce: '请叫我女王大人'
    // },
]);
const selectedId = ref([]);
const selectFan = (id) => {
    const index = selectedId.value.indexOf(id);
    if (index > -1) {
        selectedId.value.splice(index, 1);
    } else {
        selectedId.value.push(id);
    }
};
const changeNext = () => {
    if (times.value > 0 && !isSkew.value) {
        isSkew.value = true;
        setTimeout(() => {
            times.value--;
            isSkew.value = false;
        }, 3000);
    }
};
</script>

<style lang="scss" scoped>
.fans-container {
    width: 375px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

.fans-list {
    display: flex;
    flex-direction: column;
    width: calc(100vw + 5px);
    padding-right: 10px;
    height: calc(100vh - 160px);
    overflow-y: scroll;
}

.fan-item {
    display: flex;
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    transition: all 0.3s;
    background-image: url('../assets/check-gray.png');
    background-position: calc(100% - 15px) center;
    background-size: 14px 14px;
    background-repeat: no-repeat;
    cursor: pointer;

    &.active {
        background-image: url('../assets/check_fill.png');
    }

    .fan-info-container {
        flex: 1;

        .fan-introduce {
            font-size: 12px;
            color: #777;
        }
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
    align-items: center;
    flex: 1;

    span {
        font-size: 12px;
        color: #999;
        margin-left: 5px;
    }
}

.fan-info h3 {
    font-size: 14px;
    color: #636b89;
}

.message-time {
    margin: 0;
    font-size: 12px;
    color: #666;
}

.fans-btns {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .fans-btns-set {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #3478f5;
        margin: 0 auto 10px;
        cursor: pointer;

        img {
            width: 14px;
            height: 14px;
            margin-right: 5px;

            &.skewActive {
                animation: rotate 1s linear infinite;
            }
        }
    }

    .fans-times {
        font-size: 12px;
        color: #333;
    }

    .submit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: calc(100% - 32px);
        margin: 0 auto;
        background: #3478f5;
        border-radius: 16px;
        font-size: 16px;
        color: #fff;
        margin-top: 10px;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 10px;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.nodata {
    text-align: center;
    font-size: 14px;
    color: #999;
    margin-top: 20px;
}
</style>
