<template>
    <div class="page-container">
        <div class="search-sphere">
            <div class="tabs">
                <div class="tabs-item" :class="{ active: activeTab === 'findUser' }" @click="activeTab = 'findUser'">找人</div>
                <div class="tabs-item" :class="{ active: activeTab === 'group' }" @click="activeTab = 'group'">分组</div>
                <div class="tabs-item" :class="{ active: activeTab === 'groupList' }" @click="activeTab = 'groupList'">群组</div>
            </div>
            <div class="tabs-content">
                <ContactListPanel class="contact-list-panel" v-if="activeTab === 'findUser'" />
                <!-- 分组内容 -->
                <div class="group-list" v-if="activeTab === 'group'">
                    <el-tree :data="treeData" :props="defaultProps" node-key="id">
                        <!-- 使用 scoped slot 自定义节点内容 -->
                        <template #default="{ node, data }">
                            <div class="custom-tree-node">
                                <!-- 图片 -->
                                <img v-if="data.icon" :src="data.icon" class="node-icon" />
                                <!-- 标签 -->
                                <span class="node-label">{{ node.label }}</span>
                            </div>
                        </template>
                    </el-tree>
                </div>
                <!-- 群组内容 -->
                <div class="group-list" v-if="activeTab === 'groupList'">
                    <el-tree :data="groupList" :props="defaultProps" node-key="id">
                        <!-- 使用 scoped slot 自定义节点内容 -->
                        <template #default="{ node, data }">
                            <div class="custom-tree-node">
                                <!-- 图片 -->
                                <img v-if="data.icon" :src="data.icon" class="node-icon" />
                                <!-- 标签 -->
                                <span class="node-label">{{ node.label }}</span>
                            </div>
                        </template>
                    </el-tree>
                </div>
            </div>
        </div>
        <div class="right-content">1</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ContactListPanel from '../../main/ContactListPanel.vue';
import usr1 from '../../assets/usr-1.png';
const activeTab = ref('findUser');
const treeData = ref([
    {
        id: 1,
        label: '分组一',
        children: [
            {
                id: 4,
                label: '爱探险的朵拉',
                icon: usr1,
            },
            {
                id: 3,
                label: '爱探险的朵拉',
                icon: usr1,
            },
        ],
    },
    {
        id: 2,
        label: '分组二',
        children: [
            {
                id: 2,
                label: '爱探险的朵拉',
                icon: usr1,
            },
            {
                id: 6,
                label: '爱探险的朵拉',
                icon: usr1,
            },
        ],
    },
]);
const defaultProps = ref({
    children: 'children',
    label: 'label',
});
const groupList = ref([
    {
        id: 1,
        label: '我创建的群',
        children: [
            // {
            //     id: 4,
            //     label: '爱探险的朵拉',
            //     icon: usr1,
            // },
        ],
    },
    {
        id: 2,
        label: '我管理的群',
        children: [],
    },
    {
        id: 3,
        label: '我加入的私域群',
        children: [],
    },
    {
        id: 4,
        label: '我加入的公域群',
        children: [],
    },
]);
</script>

<style lang="scss" scoped>
.page-container {
    display: flex;
    width: 100%;
    height: calc(100vh - 40px);
}
.search-sphere {
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 100%;
    background-color: #f9f9f9;
    border-right: 1px solid #e1e1e1;
}
.tabs {
    display: flex;
    align-items: center;
    padding: 10px;
    height: 40px;

    .tabs-item {
        padding: 0 10px;
        font-size: 14px;
        color: #333;
        &.active {
            font-size: 16px;
            font-weight: bold;
        }
    }
}
.avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    margin-right: 16px;
}

.group-list {
    padding: 10px;
    :deep(.el-tree-node__content) {
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 0 !important;
    }
}
.custom-tree-node {
    display: flex;
    align-items: center;
}
.node-icon {
    width: 43px;
    height: 43px;
    margin-right: 10px;
    display: block;
}
.node-label {
    font-size: 14px;
    color: #333;
}
</style>
