<template>
    <li><el-button plain size="small" style="margin: 0 20px; display: block; width: 220px" @click="addCustomGroup">添加分组</el-button></li>
    <li v-for="item in groupList" :key="item.id">
        <div @click="isDown = item.id == isDown ? '' : item.id" class="category-item-container">
            <i class="arrow right" :class="{ down: isDown == item.id }"></i>
            <div class="category-item">
                <el-dropdown trigger="contextmenu">
                    <div class="title" style="display: flex; align-items: center; color: #333">{{ item.name }}</div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="deleteGroup(item)">删除分组</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span class="desc">{{ item.personList.length }}</span>
            </div>
        </div>
        <UserListView v-if="isDown == item.id" :enable-pick="false" :users="item.personList" :click-user-item-func="setCurrentUser" :padding-left="'30px'" :enable-contact-context-menu="true" />
    </li>
    <li>
        <div style="border-top: 1px solid #f0f0f0; margin: 0 10px"></div>
    </li>
    <li v-for="item in defaultGroupList" :key="item.id">
        <div @click="isDown = item.id == isDown ? '' : item.id" class="category-item-container">
            <i class="arrow right" :class="{ down: isDown == item.id }"></i>
            <div class="category-item">
                <div>
                    <span class="title">{{ item.name }}</span>
                </div>
                <span class="desc">{{ store.state.contact.favGroupList.length }}</span>
            </div>
        </div>
        <GroupListVue v-if="isDown == item.id" :users="item.personList" />
    </li>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import store from '../../store';
import emitter from '@/qzui/util/eventBus';
import wfc from '../../wfc/client/wfc';
import { getItem } from '../../qzui/util/storageHelper';
import UserListView from '../main/user/UserListView.vue';
import GroupListVue from '../main/contact/GroupListView.vue';
import { getCustomPersonGroupList, getChatInCustomGroup, createCustomPersonGroup, deleteCustomPersonGroup } from '../../api/customGroup.js';
import { getUserById } from '../../api/index.js';
import { ElMessage, ElMessageBox } from 'element-plus';

const isDown = ref('');
const defaultGroupList = ref([
    {
        name: '我创建的群',
        id: 'q0',
        personList: [],
    },
    {
        name: '我管理的群',
        id: 'q1',
        personList: [],
    },
    {
        name: '我加入的私域群',
        id: 'q2',
        personList: [],
    },
    {
        name: '我加入的公域群',
        id: 'q3',
        personList: [],
    },
]);
const groupList = ref([]);
const userinfo = JSON.parse(getItem('userinfo')) || {};

const setCurrentUser = (userInfo) => {
    store.setCurrentFriend(userInfo);
};

const getCustomGroupList = async () => {
    // 获取自定义群
    const res = await getCustomPersonGroupList({
        userId: userinfo.id,
    });

    if (res.code == 0) {
        const list = res.data || [];
        const newList = [];
        for (const item of list) {
            let userServiceId = [];
            for (const item2 of item.personList) {
                const user = await getUserById(item2.userId);
                userServiceId.push(user.data.serviceId);
            }

            newList.push({
                name: item.groupName,
                id: item.groupId,
                personList: store.getUserInfos(userServiceId),
            });
        }

        groupList.value = newList;
    }
};

const addCustomGroup = async () => {
    ElMessageBox.prompt('请输入分组名称', '新建分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: '新分组',
    })
        .then((res) => {
            const groupName = res.value.trim();
            if (!res || !groupName) {
                ElMessage.error('请输入分组名称');
                return;
            }
            createCustomPersonGroup({
                userId: userinfo.id,
                groupName,
            })
                .then((res) => {
                    if (res.code == 0) {
                        ElMessage.success('新建成功');
                        getCustomGroupList();
                    }
                })
                .catch(() => {
                    ElMessage.error('新建失败');
                });
        })
        .catch(() => {});
};

const deleteGroup = (item) => {
    ElMessageBox.confirm('确定删除分组吗？', '删除分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            deleteCustomPersonGroup({
                userId: userinfo.id,
                groupId: item.id,
            })
                .then((res) => {
                    if (res.code == 0) {
                        ElMessage.success('删除成功');
                        getCustomGroupList();
                    }
                })
                .catch(() => {
                    ElMessage.error('删除失败');
                });
        })
        .catch(() => {});
};

getCustomGroupList();
// 监听全局事件
const handleGlobalEvent = (data) => {
    getCustomGroupList();
};

// 组件挂载时注册监听
emitter.on('global-reload-ContactList', handleGlobalEvent);

// 组件卸载时移除监听（避免内存泄漏）
onUnmounted(() => {
    emitter.off('global-reload-ContactList', handleGlobalEvent);
});
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
