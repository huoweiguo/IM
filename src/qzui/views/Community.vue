<template>
    <Layout>
        <div class="community-container">
            <aside class="sidebar">
                <div class="header">
                    <input v-model="searchText" type="text" class="search-input" placeholder="搜索社区..."
                        @input="filterCommunities" />
                    <el-dropdown placement="bottom">
                        <img src="../assets/user.png" class="action-btn" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="openChatWindow">
                                    <el-icon>
                                        <UserFilled />
                                    </el-icon>发起群聊
                                </el-dropdown-item>
                                <el-dropdown-item @click="openScanWindow">
                                    <el-icon>
                                        <StarFilled />
                                    </el-icon>关注我
                                </el-dropdown-item>
                                <el-dropdown-item @click="openHelpWindow">
                                    <el-icon>
                                        <QuestionFilled />
                                    </el-icon>帮助
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <img src="../assets/plus.png" class="action-btn" @click="createCommunity" />
                </div>

                <nav class="community-nav">
                    <ul>
                        <li v-for="community in filteredList" :key="community.id"
                            :class="{ active: activeId === community.id }" @click="selectCommunity(community.id)">
                            <span class="community-icon" :class="`icon-${(community.id % 7) + 1}`"></span>
                            {{ community.name }}
                        </li>
                    </ul>
                </nav>
            </aside>

            <main class="content">
                <CommunityComp />
            </main>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import Layout from '../components/Layout.vue';
import CommunityComp from '../components/CommunityComp.vue';
import { createNewWindow } from '@/qzui/utils/electronHelper';

const searchText = ref('');
const activeId = ref(1);

const communities = ref([
    { name: 'A22社区群', id: 1 },
    { name: 'A23一家人', id: 2 },
    { name: 'A24节日福利', id: 3 },
    { name: 'B22闺蜜群', id: 4 },
    { name: 'C22美妆群', id: 5 },
    { name: 'D22干饭群', id: 6 },
    { name: 'B52旅游结伴群', id: 7 },
    { name: 'J20撸猫社区', id: 8 },
]);

const filteredList = computed(() => {
    if (!searchText.value) return communities.value;
    return communities.value.filter((c) => c.name.toLowerCase().includes(searchText.value.toLowerCase()));
});

const selectCommunity = (id) => {
    activeId.value = id;
};

const createCommunity = () => {
    // TODO: 创建社区功能
    console.log('创建社区');
};

const openChatWindow = () => {
    createNewWindow({
        width: 604,
        height: 440,
        url: '#/groupChat',
    });
};

const openScanWindow = () => {
    createNewWindow({
        width: 375,
        height: 600,
        title: '扫码关注',
        url: '#/publicSphere/scanFocus',
    });
};

const openHelpWindow = () => {
    createNewWindow({
        width: 375,
        height: 720,
        url: '#/help',
    });
};
</script>

<style lang="scss" scoped>
.community-container {
    display: flex;
}

.sidebar {
    width: 250px;
    background: #efefef;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
}

.search-input {
    flex: 1;
    width: 160px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ddd;
    padding: 0 12px;
    outline: none;
    font-size: 14px;

    &:focus {
        border-color: #409eff;
    }
}

.action-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }
}

.community-nav {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: flex;
        align-items: center;
        height: 52px;
        padding: 0 10px 0 44px;
        cursor: pointer;
        font-size: 14px;
        position: relative;
        transition: background-color 0.2s;

        &:hover {
            background: #e8e8e8;
        }

        &.active {
            background: rgba(202, 221, 255, 0.8);
        }
    }
}

.community-icon {
    position: absolute;
    left: 10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-size: contain;

    &.icon-1 {
        background-image: url(../assets/radio-1.png);
    }

    &.icon-2 {
        background-image: url(../assets/radio-2.png);
    }

    &.icon-3 {
        background-image: url(../assets/radio-3.png);
    }

    &.icon-4 {
        background-image: url(../assets/radio-4.png);
    }

    &.icon-5 {
        background-image: url(../assets/radio-5.png);
    }

    &.icon-6 {
        background-image: url(../assets/radio-6.png);
    }

    &.icon-7 {
        background-image: url(../assets/radio-7.png);
    }
}

.content {
    flex: 1;
    overflow: hidden;
}
</style>
