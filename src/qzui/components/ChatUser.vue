<template>
    <div class="chat-user-container">
        <ul>
            <li @click="openFansWindow()">
                <img :src="grpImg1" class="user-icon" />
                <div class="user-info">
                    <div class="user-name">
                        <h2>新的粉丝</h2>
                        <span>12:00</span>
                    </div>
                    <div class="user-message">
                        <span>您有个好友待验证</span>
                        <!-- <i></i> -->
                    </div>
                </div>
            </li>
            <li @click="openKnowWindow()">
                <img :src="grpImg4" class="user-icon" />
                <div class="user-info">
                    <div class="user-name">
                        <h2>可能认识的人</h2>
                        <span>12:00</span>
                    </div>
                    <div class="user-message">
                        <span>发现你朋友的熟人</span>
                        <!-- <i>2</i> -->
                    </div>
                </div>
            </li>
            <li>
                <img :src="grpImg2" class="user-icon" />
                <div class="user-info">
                    <div class="user-name">
                        <h2>系统通知</h2>
                        <span>12:00</span>
                    </div>
                    <div class="user-message">
                        <span>请问你还有什么问题吗？</span>
                        <!-- <i>2</i> -->
                    </div>
                </div>
            </li>
        </ul>
        <ConversationListView class="conversation-list-container" />
    </div>
</template>

<script setup>
import grpImg1 from '../assets/grp-1.png';
import grpImg2 from '../assets/grp-2.png';
import grpImg4 from '../assets/grp-4.png';
import ConversationListView from '../main/conversationList/ConversationListView.vue';
import { createNewWindow } from '@/qzui/util/electronHelper';

const openFansWindow = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '我的粉丝',
        url: `#/fans?id=1`,
    });
};

const openKnowWindow = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '可能认识的人',
        url: `#/know?id=1`,
    });
};
</script>

<style lang="scss" scoped>
.conversation-list-container {
    height: auto !important;
}
.context-menu {
    min-width: 150px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2000;
    position: absolute;
    list-style: none;

    ul {
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    a {
        display: block;
        padding: 8px 16px;
        color: #333;
        text-decoration: none;
        white-space: nowrap;
        font-size: 14px;

        &:hover {
            background-color: #f5f5f5;
        }
    }
}

.chat-user-container {
    width: 250px;
    height: 100vh;
    background-color: #efefef;
    overflow: auto;
    border-right: 1px solid #ddd;
    /* 设置滚动条背景透明 */
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    ul {
        margin: 0;
        padding: 0;

        li {
            list-style: none;
            display: flex;
            align-items: center;
            padding: 15px 10px;
            cursor: pointer;

            &.active {
                background-color: #dfdfdf;
            }

            .user-icon {
                width: 44px;
                height: 44px;
                overflow: hidden;
                margin-right: 10px;
            }

            .user-info {
                display: flex;
                flex: 1;
                flex-direction: column;

                .user-name {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 5px;

                    h2 {
                        font-size: 14px;
                        padding: 0;
                        margin: 0;
                        color: #333;
                        font-weight: 500;
                    }

                    span {
                        font-size: 12px;
                        color: #777;
                    }
                }

                .user-message {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;

                    span {
                        color: #777;
                        font-size: 12px;
                    }

                    i {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 12px;
                        height: 12px;
                        background-color: rgb(253, 58, 58);
                        color: #fff;
                        font-size: 10px;
                        border-radius: 50%;
                        font-style: normal;
                    }
                }
            }
        }
    }
}
</style>
