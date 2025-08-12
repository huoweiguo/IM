<template>
    <div class="group-chat-nav window-move" :class="{ pr140: sharedMiscState.isElectronWindowsOrLinux }">
        <template v-for="(item, index) in navlist" :key="item.id">
            <span class="line" v-if="item.id === 'line'"></span>
            <div class="nav-item" v-else>
                <a :class="{ active: activeId === item.id && route.path === '/home' }" @click="switchTab(item.id)">{{ item.name }}</a>
                <el-icon v-if="index > 3" class="icon" @click="deleteGroup(item.id)"><Close /></el-icon>
            </div>
        </template>
        <a @click="addGroup"><img src="../assets/add.png" /></a>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import store from '../../store';
import { getItem } from '../../qzui/util/storageHelper';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getCustomPersonGroupList, createCustomPersonGroup, deleteCustomPersonGroup } from '../../api/customGroup.js';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const activeId = ref(Number(route.query.activeId) || 0);
const navlist = ref([]);
const userinfo = JSON.parse(getItem('userinfo')) || {};
const sharedMiscState = store.state.misc;
const defaultNavlist = [
    { name: '私聊', id: 'private' },
    { name: '私域群', id: 'custom' },
    { name: '公域群', id: 'public' },
    { name: '', id: 'line' },
];

const switchTab = (index) => {
    activeId.value = index;
    router.push(`/home?activeId=${index}`);
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
            navlist.value = [...defaultNavlist, ...groupList];
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
    padding: 10px 20px;
    height: 40px;
    border-bottom: 1px solid #ccc;
    overflow-x: auto;
    gap: 20px;

    &.pr140 {
        padding-right: 140px;
    }

    a {
        font-size: 14px;
        color: #333;
        cursor: pointer;

        &.active {
            color: #07c160;
            font-weight: bold;
        }

        img {
            width: 15px;
            height: 15px;
            display: block;
        }
    }

    .line {
        width: 1px;
        height: 10px;
        background-color: #ccc;
    }

    .nav-item {
        display: flex;
        align-items: center;
        .icon {
            font-size: 12px;
            color: #f00;
            cursor: pointer;
        }
    }
}
</style>
