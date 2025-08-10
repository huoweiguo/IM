<template>
    <div class="elec-container">
        <!-- <TopNav title="公域群权限设置" /> -->
        <div class="authorization-desc">权限管理</div>
        <div class="authorization-list">
            <ul>
                <li @click="changeTypeDrawer('join', '谁可以加入该群')">
                    <h2>谁可以加入该群</h2>
                    <span v-show="params.joinValue == 1">所有人</span>
                    <span v-show="params.joinValue == 2">管理员审核</span>
                </li>
                <li @click="changeTypeDrawer('task', '谁可以发言')">
                    <h2>谁可以发言</h2>
                    <span v-show="params.taskValue == 1">所有人</span>
                    <span v-show="params.taskValue == 2">白名单用户</span>
                </li>
                <li @click="changeTypeDrawer('privateMsg', '谁可以私信群友')">
                    <h2>谁可以私信群友</h2>
                    <span v-show="params.privateValue == 1">所有人</span>
                    <span v-show="params.privateValue == 2">白名单用户</span>
                    <span v-show="params.privateValue == 3">已完成实名认证用户</span>
                </li>
                <li>
                    <h2>设置聊天背景</h2>
                    <span></span>
                </li>
                <li>
                    <h2>机器人助手</h2>
                    <el-switch v-model="params.robot" inline-prompt active-text="是" inactive-text="否" />
                </li>
            </ul>
        </div>
        <button class="next-btn">立即创建</button>

        <el-drawer v-model="drawer" :title="title" :direction="direction" size="45%" header-class="drawer-header">
            <div class="drawer-content">
                <ul class="select-list" v-show="typeDrawer === 'join'">
                    <li v-for="item in joinList" :class="{ activeJoin: item.value === selectValue }" :key="item.value" @click="handleSelect(item, 'join')">
                        {{ item.name }}
                    </li>
                </ul>
                <ul class="select-list" v-show="typeDrawer === 'task'">
                    <li v-for="item in taskList" :class="{ activeJoin: item.value === selectValue }" :key="item.value" @click="handleSelect(item, 'task')">
                        {{ item.name }}
                    </li>
                </ul>
                <ul class="select-list" v-show="typeDrawer === 'privateMsg'">
                    <li v-for="item in privateList" :class="{ activeJoin: item.value === selectValue }" :key="item.value" @click="handleSelect(item, 'privateMsg')">
                        {{ item.name }}
                    </li>
                </ul>
                <button class="next-btn" @click="handleComfirm">确定</button>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const direction = ref('btt');
const title = ref('谁可以加入该群');
const drawer = ref(false);
const typeDrawer = ref('join');
const selectValue = ref(1);
const params = reactive({
    joinValue: 1,
    taskValue: 2,
    privateValue: 3,
    robot: false,
    backgroundImage: '',
});

const joinList = ref([
    { name: '所有人', value: 1 },
    { name: '管理员审核', value: 2 },
]);
const taskList = ref([
    { name: '所有人', value: 1 },
    { name: '白名单用户', value: 2 },
]);
const privateList = ref([
    { name: '所有人', value: 1 },
    { name: '白名单用户', value: 2 },
    { name: '已完成实名认证用户', value: 3 },
]);

const changeTypeDrawer = (type, msg) => {
    if (type === 'join') {
        selectValue.value = params.joinValue;
    } else if (type === 'task') {
        selectValue.value = params.taskValue;
    } else {
        selectValue.value = params.privateValue;
    }
    title.value = msg;
    typeDrawer.value = type;
    drawer.value = true;
};

const handleComfirm = () => {
    if (typeDrawer.value === 'join') {
        params.joinValue = selectValue.value;
    } else if (typeDrawer.value === 'task') {
        params.taskValue = selectValue.value;
    } else {
        params.privateValue = selectValue.value;
    }
    drawer.value = false;
};
const handleSelect = (obj) => {
    selectValue.value = obj.value;
};
</script>
<style>
body {
    width: 100% !important;
}
</style>
<style lang="scss" scoped>
.elec-container {
    width: 375px;
    height: 100vh;
    padding: 60px 16px 0;
    box-sizing: border-box;

    .authorization-desc {
        margin: 24px 0;
        font-size: 14px;
        color: #666;
    }

    .authorization-list {
        margin-bottom: 100px;

        ul {
            padding: 0;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 52px;
                border-bottom: 1px solid rgba(170, 170, 170, 0.4);
                cursor: pointer;

                h2 {
                    font-size: 14px;
                    color: #333;
                    font-weight: 500;
                    font-family: Source Han Sans CN-Medium;
                }

                span {
                    background-image: url(../../assets/right-arrow.png);
                    background-repeat: no-repeat;
                    background-position: center right;
                    background-size: 12px 12px;
                    color: #666;
                    font-size: 14px;
                    padding-right: 15px;
                    min-width: 12px;
                    min-height: 12px;
                }
            }
        }
    }

    .next-btn {
        width: 100%;
        height: 50px;
        background: #3478f5;
        border-radius: 16px 16px 16px 16px;
        border: none;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
    }
}

.drawer-content {
    position: relative;
    height: 100%;

    .next-btn {
        position: absolute;
        left: 0;
        bottom: 0;
    }
}

.select-list {
    padding: 0;

    li {
        font-size: 16px;
        color: #333;
        margin-bottom: 28px;
        font-weight: 500;

        &.activeJoin {
            background-image: url(../../assets/check-icon.png);
            background-size: 16px 11px;
            background-position: center right;
            background-repeat: no-repeat;
        }
    }
}
</style>

<style>
.el-drawer__body {
    border-top: 1px solid rgba(170, 170, 170, 0.4);
}

.drawer-header {
    padding: 15px 15px 0;
    margin-bottom: 15px;
}
</style>
