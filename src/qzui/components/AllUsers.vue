<template>
    <div class="find-user">
        <div class="top-box">
            <div class="tab-title">找人</div>
            <div class="search-box">
                <input type="text" placeholder="搜索用户昵称或账号" v-model="searchUserKeyword" @keyup.enter="searchUser" />
                <button @click="searchUser">搜索</button>
            </div>
        </div>
        <div class="list-container">
            <div class="group">
                <ul>
                    <li v-for="user in userList" :key="user.id" @click="viewUserDetail(user)">
                        <img :src="user.portrait" @error="(e) => (e.target.src = defaultAvatar)" class="avatar" />
                        <div class="info">
                            <div class="nickname">{{ user.nickname }}</div>
                            <div class="account">{{ user.account }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { searchAllUsersByParams, searchAllUserInfo } from '@/api/index.js';
import defaultAvatar from '@/qzui/assets/user.png';

const userList = ref([]);
const searchUserKeyword = ref('');

const getAllUser = () => {
    searchAllUserInfo({
        page_size: 50,
        start_time: '',
        sort: 0,
    }).then((res) => {
        if (res.code == 0 && res.data) {
            const users = res.data.map((user) => ({
                id: user.id,
                nickname: user.nickname || user.realName || '',
                account: user.account || user.mobile || '',
                portrait: user.avatar || user.realAvatar || '',
            }));
            userList.value = users;
        }
    });
};

const searchUser = () => {
    searchAllUsersByParams({
        page_size: 50,
        start_time: '',
        content: searchUserKeyword.value,
    }).then((res) => {
        if (res.code == 0 && res.data) {
            const users = res.data.map((user) => ({
                id: user.id,
                nickname: user.nickname || user.realName || '',
                account: user.account || user.mobile || '',
                portrait: user.avatar || user.realAvatar || '',
            }));
            userList.value = users;
        }
    });
};

const viewUserDetail = (user) => {
    console.log('查看用户详情:', user);
};

getAllUser();
</script>

<style lang="scss" scoped>
.top-box {
    padding: 10px;
}
.find-user {
    height: 100%;
    width: 100%;
    overflow: auto;
    .tab-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
    }
    .search-box {
        display: flex;
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
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
        .group {
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
