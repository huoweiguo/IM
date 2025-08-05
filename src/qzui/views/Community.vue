<template>
    <div class="group-chat-outer">
        <div class="group-chat-nav">
            <!-- <a @click="router.push('/passwordLogin')">登录</a> -->
            <a>私聊</a>
            <a>私域群</a>
            <a class="active">公域群</a>
            <a title="添加"><img src="../assets/add.png" /></a>
        </div>
        <div class="group-chat">
            <ChatSilder />

            <div class="community-chat">
                <div class="community-search">
                    <input type="text" class="search-input" placeholder="请输入搜索内容" />
                    <el-dropdown placement="bottom">
                        <img src="../assets/user.png" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="openChatWindow">
                                    <el-icon> <UserFilled /> </el-icon>发起群聊
                                </el-dropdown-item>
                                <el-dropdown-item @click="openScanWindow"
                                    ><el-icon> <StarFilled /> </el-icon>关注我</el-dropdown-item
                                >
                                <el-dropdown-item @click="openHelpWindow">
                                    <el-icon>
                                        <QuestionFilled />
                                    </el-icon>
                                    帮助
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <img src="../assets/plus.png" />
                </div>
                <div class="community-list">
                    <ul>
                        <li v-for="item in list" :key="item.id" :class="{ activeItem: activeId === item.id }" @click="toCommunity(item.id)">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>

            <!--社区圈-->
            <CommunityComp />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { createNewWindow } from '@/qzui/utils/electronHelper';
import ChatSilder from '../components/ChatSilder.vue';
import CommunityComp from '../components/CommunityComp.vue';
const activeId = ref(1);
const list = ref([
    { name: 'A22社区群', id: 1 },
    { name: 'A23一家人', id: 2 },
    { name: 'A24节日福利', id: 3 },
    { name: 'B22闺蜜群', id: 4 },
    { name: 'C22美妆群', id: 5 },
    { name: 'D22干饭群', id: 6 },
    { name: 'B52旅游结伴群', id: 7 },
    { name: 'J20撸猫社区', id: 8 },
]);
const openChatWindow = () => {
    createNewWindow({
        width: 604,
        height: 440,
        url: `#/groupChat`,
    });
};

const openScanWindow = () => {
    createNewWindow({
        width: 375,
        height: 600,
        title: '扫码关注',
        url: `#/publicSphere/scanFocus`,
    });
};

const openHelpWindow = () => {
    createNewWindow({
        width: 375,
        height: 720,
        url: `#/help`,
    });
};

const toCommunity = (id) => {
    activeId.value = id;
};
</script>

<style lang="scss">
.group-chat-nav {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 40px;
    padding: 0 5px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;

    a {
        font-size: 14px;
        margin-right: 20px;
        color: #333;
        cursor: pointer;

        &.active {
            color: rgb(24, 168, 255);
            font-weight: bold;
        }

        img {
            width: 15px;
            height: 15px;
            display: block;
        }
    }
}

.group-chat {
    width: 100vw;
    display: flex;

    .chat-slider {
        width: 60px;
        height: 100vh;
        background-color: rgb(46, 46, 46);
        padding: 35px 10px;
        box-sizing: border-box;
        flex-direction: column;

        .header-icon {
            display: block;
            margin-bottom: 30px;
        }

        ul {
            padding: 0;
            margin: 0;
            width: 36px;

            li {
                list-style: none;
                display: flex;
                justify-content: center;
                margin-bottom: 30px;
                cursor: pointer;

                img {
                    display: flex;
                    width: 28px;
                    height: 28px;
                }
            }
        }
    }

    .community-chat {
        width: 250px;
        height: 100vh;
        flex-shrink: 0;
        background-color: #efefef;
        overflow: hidden;
        border-right: 1px solid #ddd;

        .community-search {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            background-color: #fff;

            .search-input {
                width: 160px;
                height: 32px;
                border-radius: 18px;
                background-color: #fff;
                border: 1px solid #ddd;
                outline: none;
                padding: 0 10px;
                margin-right: 5px;
                box-sizing: border-box;
            }

            img {
                width: 24px;
                height: 24px;
                margin: 0 3px;
                outline: none;
                cursor: pointer;
            }
        }

        .community-list {
            padding-bottom: 40px;
            padding-top: 10px;

            ul {
                width: 290px;
                padding: 0;
                margin: 0;
                padding-right: 20px;
                height: calc(100vh - 56px);
                overflow-y: scroll;
                box-sizing: border-box;

                li {
                    display: flex;
                    align-items: center;
                    height: 52px;
                    background-repeat: no-repeat;
                    background-position: center left;
                    background-size: 28px 28px;
                    padding-left: 44px;
                    font-size: 14px;
                    background-image: url(../assets/radio-1.png);
                    background-position: 10px center;
                    cursor: pointer;

                    &:nth-child(2n) {
                        background-image: url(../assets/radio-2.png);
                    }

                    &:nth-child(3n) {
                        background-image: url(../assets/radio-3.png);
                    }

                    &:nth-child(4n) {
                        background-image: url(../assets/radio-4.png);
                    }

                    &:nth-child(5n) {
                        background-image: url(../assets/radio-5.png);
                    }

                    &:nth-child(6n) {
                        background-image: url(../assets/radio-6.png);
                    }

                    &:nth-child(7n) {
                        background-image: url(../assets/radio-7.png);
                    }

                    &.activeItem {
                        background-color: rgba(202, 221, 255, 1);
                    }
                }
            }
        }
    }
}
</style>
