<template>
    <div class="group-chat-nav window-move" :class="{ pr140: sharedMiscState.isElectronWindowsOrLinux }">
        <el-tabs class="tabs" v-model="activeId" @tab-click="switchTab" @edit="addGroup">
            <template #add-icon>
                <el-icon><Plus /></el-icon>
            </template>
            <el-tab-pane v-for="(item, index) in defaultNavlist" :key="index" :label="item.name" :name="item.id"></el-tab-pane>
            <el-tab-pane v-for="(item, index) in navlist" :key="index" :label="item.name" :name="item.id">
                <template #label>
                    <el-dropdown trigger="contextmenu">
                        <span> {{ item.name }} </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="deleteGroup(item.id)">删除分组</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-tab-pane>
        </el-tabs>
        <a class="addbtn" @click="addGroup"><img src="../assets/add.png" /></a>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import store from '../../store';
import { getItem } from '../../qzui/util/storageHelper';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getCustomPersonGroupList, createCustomPersonGroup, deleteCustomPersonGroup } from '../../api/customGroup.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeId = ref('private');
const navlist = ref([]);
const userinfo = JSON.parse(getItem('userinfo')) || {};
const sharedMiscState = store.state.misc;
const defaultNavlist = [
    { name: '私聊', id: 'private' },
    { name: '私域群', id: 'custom' },
    { name: '公域群', id: 'public' },
];

const switchTab = (id) => {
    console.log(111, id);

    activeId.value = id;
    router.push(`/home?activeId=${id}`);
};

const getGroupList = () => {
    getCustomPersonGroupList({
        userId: userinfo.id,
    }).then((res) => {
        if (res.code == 0) {
            let groupList = [];
            res.data.forEach((item) => {
                groupList.push({
                    name: item.groupName,
                    id: item.groupId,
                    personList: item.personList || [],
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
            createCustomPersonGroup({
                userId: userinfo.id,
                groupName,
            })
                .then((res) => {
                    if (res.code == 0) {
                        ElMessage.success('新建成功');
                        getGroupList();
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
            deleteCustomPersonGroup({
                groupId: id,
            })
                .then((res) => {
                    if (res.code == 0) {
                        ElMessage.success('删除成功');
                        getGroupList();
                    }
                })
                .catch(() => {
                    ElMessage.error('删除失败');
                });
        })
        .catch(() => {});
};

onMounted(() => {
    getGroupList();
});
</script>

<style lang="scss" scoped>
.group-chat-nav {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    gap: 20px;
    padding: 0 20px;

    &.pr140 {
        padding-right: 140px;
    }
}
.tabs {
    flex: 1;
    :deep(.el-tabs__item) {
        padding: 0 10px;
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
