<template>
    <Layout>
        <div class="friend-page">
            <div class="left">
                <div :class="{ active: activeTab === 'findUser' }" @click="switchTab('findUser')">找人</div>
                <div :class="{ active: activeTab === 'findGroup' }" @click="switchTab('findGroup')">找群</div>
                <div :class="{ active: activeTab === 'grouping' }" @click="switchTab('grouping')">分组</div>
                <div :class="{ active: activeTab === 'groupList' }" @click="switchTab('groupList')">群组</div>
            </div>
            <div class="right">
                <FindUser v-if="activeTab === 'findUser'" />
                <FindGroup v-if="activeTab === 'findGroup'" />
                <Grouping v-if="activeTab === 'grouping'" />
                <GroupList v-if="activeTab === 'groupList'" />
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue';
import { ref } from 'vue';
import FindUser from './FriendList/findUser.vue';
import FindGroup from './FriendList/findGroup.vue';
import Grouping from './FriendList/grouping.vue';
import GroupList from './FriendList/groupList.vue';

const activeTab = ref('findUser');

const switchTab = (tab) => {
    activeTab.value = tab;
};
</script>

<style lang="scss" scoped>
.friend-page {
    height: 100%;
    display: flex;
    padding: 10px;

    .left {
        width: 260px;
        height: 100%;
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 10px;
        div {
            padding: 10px 20px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
            border-radius: 8px;
            &.active {
                background-color: #07c160;
                color: #fff;
            }
            &:hover:not(.active) {
                background-color: #e0e0e0;
            }
        }
    }
    .right {
        flex: 1;
        height: 100%;
        background-color: #fff;
        margin-left: 15px;
        padding: 15px;
        border-radius: 8px;
        overflow-y: auto;
    }
}
</style>
