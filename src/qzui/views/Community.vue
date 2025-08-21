<template>
    <Layout>
        <div class="community-container">
            <aside class="sidebar">
                <div class="header">
                    <input v-model="searchText" type="text" class="search-input" placeholder="搜索社区..." @input="filterCommunities" />
                    <img src="../assets/plus.png" class="action-btn" @click="createCommunity" />
                </div>

                <nav class="community-nav">
                    <ul>
                        <li v-for="community in filteredList" :key="community.communityId" :class="{ active: activeId === community.communityId }" @click="selectCommunity(community.communityId)">
                            <span class="community-icon" :class="`icon-${(community.communityId % 7) + 1}`"></span>
                            {{ community.name }}
                        </li>
                    </ul>
                </nav>
            </aside>

            <main class="content">
                <CommunityComp :communityId="activeId" v-if="activeId" />
                <div v-else class="contact-container">
                    <h1 style="font-size: 30px; color: #f0f0f0; text-shadow: 1px 1px 0 #fff">圈子社区</h1>
                </div>
            </main>
        </div>

        <!-- 选择社区弹窗 -->
        <el-dialog v-model="visible" title="选择社区" width="500">
            <el-select v-model="selectedCommunityId" placeholder="请选择社区">
                <el-option v-for="item in shequList" :label="item.name" :value="item.id" />
            </el-select>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="joinCommunity"> 加入社区 </el-button>
                </div>
            </template>
        </el-dialog>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Layout from '../components/Layout.vue';
import CommunityComp from '../components/CommunityComp.vue';
import { getItem, setItem } from '@/ui/util/storageHelper';
import { communityUserList, communityList, communityUserAdd } from '@/api/community';
import emitter from '@/qzui/util/eventBus.js';
import { ElMessage } from 'element-plus';

const router = useRouter();
const searchText = ref('');
const activeId = ref();
const userinfo = JSON.parse(getItem('userinfo')) || {};

const communities = ref([]);
const shequList = ref([]);
const visible = ref(false);
const selectedCommunityId = ref('');

const filteredList = computed(() => {
    if (!searchText.value) return communities.value;
    return communities.value.filter((c) => c.name.toLowerCase().includes(searchText.value.toLowerCase()));
});

const selectCommunity = (id) => {
    activeId.value = id;
    setItem('communityId', id);
};

const createCommunity = () => {
    // TODO: 创建社区功能
    console.log('创建社区');
    visible.value = true;
};
const getCommunityUserList = async () => {
    const res = await communityUserList(userinfo.id);
    if (res.code === 0) {
        communities.value = res.data || [];
        // activeId.value = communities.value[0].communityId;
    }
};

const getCommunityList = async () => {
    const res = await communityList();
    if (res.code === 0) {
        shequList.value = res.data || [];
    }
};

const joinCommunity = async () => {
    if (!selectedCommunityId.value) {
        ElMessage.error('请选择社区');
        return;
    }
    const res = await communityUserAdd(selectedCommunityId.value);
    if (res.code === 0) {
        ElMessage.success('加入成功');
        visible.value = false;
        getCommunityUserList();
    }
};

onMounted(() => {
    getCommunityUserList();
    getCommunityList();
});
</script>

<style lang="scss" scoped>
.community-container {
    display: flex;
    width: 100%;
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
.contact-container {
    height: calc(100vh - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
