<template>
    <div class="find-group">
        <div class="tab-title">找群</div>
        <div class="search-box">
            <input type="text" placeholder="搜索群昵称或账号" v-model="searchGroupKeyword" @keyup.enter="searchGroup" />
            <button @click="searchGroup">搜索</button>
        </div>
        <div class="list-container">
            <div class="group">
                <ul>
                    <li v-for="group in groupList" :key="group.id" @click="viewGroupDetail(group)">
                        <img :src="group.portrait" class="avatar" />
                        <div class="info">
                            <div class="nickname">{{ group.nickname }}</div>
                            <div class="account">{{ group.account }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// 假设存在搜索群组的API，此处使用占位符
import { searchGroupsByParams } from '@/api/index.js';

const groupList = ref([]);
const searchGroupKeyword = ref('');

const searchGroup = () => {
    searchGroupsByParams({
        page_size: 50,
        start_time: '',
        content: searchGroupKeyword.value,
    }).then((res) => {
        if (res.code == 0 && res.data) {
            const groups = res.data.map((group) => ({
                id: group.id,
                nickname: group.nickname || group.name || '',
                account: group.account || group.groupId || '',
                portrait: group.avatar || group.groupAvatar || '',
            }));
            groupList.value = groups;
        }
    });
};

const viewGroupDetail = (group) => {
    console.log('查看群详情:', group);
};
</script>

<style lang="scss" scoped>
.find-group {
    .tab-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
    }
    .search-box {
        display: flex;
        margin-bottom: 15px;
        input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            outline: none;
            &:focus {
                border-color: #07c160;
            }
        }
        button {
            padding: 0 20px;
            background-color: #07c160;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            &:hover {
                background-color: #06ad56;
            }
        }
    }
    .list-container {
        height: calc(100% - 100px);
        overflow-y: auto;
        .group {
            margin-bottom: 15px;
            ul {
                list-style: none;
                padding: 0;
                li {
                    display: flex;
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    &:hover {
                        background-color: #f5f5f5;
                    }
                    .avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 6px;
                        margin-right: 12px;
                    }
                    .info {
                        flex: 1;
                        .nickname {
                            font-weight: 600;
                            font-size: 14px;
                            color: #333;
                        }
                        .account {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
}
</style>
