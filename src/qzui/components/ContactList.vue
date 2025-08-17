<template>
    <li v-for="(item, index) in groupList" :key="index">
        <div @click="isDown = item.id == isDown ? '' : item.id" class="category-item-container">
            <i class="arrow right" :class="{ down: isDown == item.id }"></i>
            <div class="category-item">
                <div>
                    <span class="title">{{ item.name }}</span>
                </div>
                <span class="desc">{{ item.personList.length }}</span>
            </div>
        </div>
        <UserListView v-if="isDown == item.id" :enable-pick="false" :users="item.personList" :click-user-item-func="setCurrentUser" :padding-left="'30px'" :enable-contact-context-menu="true" />
    </li>
</template>

<script setup>
import { ref } from 'vue';
import store from '../../store';
import { getItem } from '../../qzui/util/storageHelper';
import UserListView from '../main/user/UserListView.vue';
import { getCustomChatGroupList } from '../../api/customGroup.js';

const isDown = ref('');
const defaultGroupList = ref([
    {
        name: '我创建的群',
        id: '0',
        personList: [],
    },
    {
        name: '我管理的群',
        id: '1',
        personList: [],
    },
    {
        name: '我加入的私域群',
        id: '2',
        personList: [],
    },
    {
        name: '我加入的公域群',
        id: '3',
        personList: [],
    },
]);
const groupList = ref([]);
const userinfo = JSON.parse(getItem('userinfo')) || {};

const setCurrentUser = (userInfo) => {
    store.setCurrentFriend(userInfo);
};

const getCustomGroupList = () => {
    getCustomChatGroupList({
        userId: userinfo.id,
    }).then((res) => {
        if (res.code == 0) {
            let list = [];
            res.data.forEach((item) => {
                list.push({
                    name: item.groupName,
                    id: item.groupId,
                    personList: item.personList || [],
                });
            });
            groupList.value = [...list, ...defaultGroupList.value];
        }
    });
};

getCustomGroupList();
</script>

<style lang="scss" scoped>
.contact-list {
    height: 100%;
    overflow: auto;
}

.contact-list::-webkit-scrollbar {
    width: 0;
}

.category-item-container {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: #262626;
    font-size: 14px;
    position: sticky;
    background-color: #fafafa;
    top: 0;
}

.category-item {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.category-item span:last-of-type {
    margin-right: 15px;
}

.category-item .tip {
    font-size: 12px;
    padding-left: 5px;
    color: #7f7f7f;
}

.arrow {
    border: solid #b9b9b9;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    margin-right: 10px;
}

.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}

.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}

.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
}

.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
</style>
