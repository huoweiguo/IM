<template>
    <div class="group-chat-nav" :class="{ pr140: sharedMiscState.isElectronWindowsOrLinux }">
        <view class="tabs-box">
            <el-tabs class="tabs" v-model="activeId" @tab-click="switchTab" @edit="addGroup">
                <template #add-icon>
                    <el-icon><Plus /></el-icon>
                </template>
                <el-tab-pane v-for="(item, index) in defaultNavlist" :key="index" :label="item.name" :name="item.id"></el-tab-pane>
                <el-tab-pane v-for="(item, index) in navlist" :key="index" :label="item.name" :name="`${item.id}`">
                    <template #label>
                        <el-dropdown trigger="contextmenu">
                            <span class="group-name"> {{ item.name }} </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="deleteGroup(item.id)">删除分组</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </view>
        <view class="window-move" style="flex: 1; height: 100%"></view>
        <a class="addbtn" @click="addGroup"><img src="../assets/add.png" /></a>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import store from '../../store';
import { getItem } from '../../qzui/util/storageHelper';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getCustomChatGroupList, createCustomChatGroup, deleteCustomChatGroup } from '../../api/customGroup.js';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeId = ref(route.query.activeId || 'private');
const navlist = ref([]);
const userinfo = JSON.parse(getItem('userinfo')) || {};
const sharedMiscState = store.state.misc;
const defaultNavlist = [
    { name: '私聊', id: 'private' },
    { name: '私域群', id: 'custom' },
    { name: '公域群', id: 'public' },
];

const switchTab = (data) => {
    activeId.value = data.paneName;
    router.push(`/home?activeId=${data.paneName}`);
};

const getCustomGroupList = () => {
    getCustomChatGroupList({
        userId: userinfo.id,
    }).then((res) => {
        if (res.code == 0) {
            let groupList = [];
            res.data.forEach((item) => {
                groupList.push({
                    name: item.groupName,
                    id: item.groupId,
                });
            });
            navlist.value = groupList;
        }
    });
};

const addGroup = () => {
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

            if (groupName.length > 8) {
                ElMessage.error('分组名称最多8个字符');
                return;
            }

            createCustomChatGroup({
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

const deleteGroup = (id) => {
    ElMessageBox.confirm('确定删除该分组吗？', '删除分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            deleteCustomChatGroup({
                groupId: id,
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

onMounted(() => {
    getCustomGroupList();
});
</script>

<style lang="scss" scoped>
.group-chat-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    gap: 20px;
    padding: 0 10px;
    width: calc(100vw - 63px);

    &.pr140 {
        padding-right: 140px;
    }
}
.tabs-box {
    overflow: hidden;
}
.tabs {
    max-width: 100%;
    margin: 0;
    :deep(.el-tabs__header) {
        margin: 0;
    }
    :deep(.el-tabs__item) {
        padding: 0 10px;
        .group-name {
            color: #333;
            // max-width: 6em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        &.is-active {
            .group-name {
                color: #5a9cf8;
            }
        }
    }
    :deep(.el-tabs__nav-wrap:after) {
        display: none;
    }
}
.addbtn {
    display: block;
    width: 15px;
    height: 15px;
    img {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}
</style>
