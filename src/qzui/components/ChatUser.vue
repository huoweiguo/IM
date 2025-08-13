<template>
    <div class="chat-user-container">
        <ul>
            <li>
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
            <li>
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
            <ConversationItemView v-for="conversationInfo in conversationInfoList" :source="conversationInfo" :key="conversationInfoKey(conversationInfo)" />
        </ul>
    </div>
    <vue-context ref="menu" v-slot="{ data: conversationInfo }" v-on:close="onConversationItemContextMenuClose">
        <li>
            <a @click.prevent="setConversationTop(conversationInfo)">{{ conversationInfo && conversationInfo.top ? $t('conversation.cancel_sticky_top') : $t('conversation.sticky_top') }}</a>
        </li>
        <li v-if="sharedMiscState.isElectron">
            <a @click.prevent="showConversationFloatPage(conversationInfo.conversation)">{{ $t('conversation.show_in_float_window') }}</a>
        </li>
        <li>
            <a @click.prevent="setConversationSilent(conversationInfo)">{{
                conversationInfo && conversationInfo.isSilent ? $t('conversation.enable_notification') : $t('conversation.disable_notification')
            }}</a>
        </li>
        <li>
            <a @click.prevent="removeConversation(conversationInfo)">{{ $t('common.delete') }}</a>
        </li>
        <li
            v-show="
                conversationInfo &&
                (!sharedConversationState.currentConversationInfo || !sharedConversationState.currentConversationInfo.conversation.equal(conversationInfo.conversation)) &&
                conversationInfo._unread === 0
            "
            @click.prevent="markConversationAsUnread(conversationInfo.conversation)"
        >
            <a>{{ $t('conversation.mark_as_unread') }}</a>
        </li>
        <li
            v-show="
                conversationInfo &&
                (!sharedConversationState.currentConversationInfo || !sharedConversationState.currentConversationInfo.conversation.equal(conversationInfo.conversation)) &&
                conversationInfo._unread > 0
            "
            @click.prevent="clearConversationUnreadStatus(conversationInfo.conversation)"
        >
            <a>{{ $t('conversation.mark_as_read') }}</a>
        </li>
    </vue-context>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import ConversationItemView from '../main/conversationList/ConversationItemView.vue';
import store from '../../store';
import wfc from '../../wfc/client/wfc';
import IpcEventType from '../../ipcEventType';
import { ipcRenderer } from '../../platform';
import grpImg1 from '../assets/grp-1.png';
import grpImg2 from '../assets/grp-2.png';
import grpImg4 from '../assets/grp-4.png';

// 获取当前组件实例，用于访问全局事件总线
const instance = getCurrentInstance();
const $eventBus = instance.appContext.config.globalProperties.$eventBus;

const sharedMiscState = store.state.misc;
const sharedConversationState = store.state.conversation;
const currentConversationIndex = ref(0);

const conversationInfoList = computed(() => {
    return sharedConversationState.conversationInfoList.filter((ci) => {
        const index = sharedConversationState.floatingConversations.findIndex((c) => c.equal(ci.conversation));
        return index === -1;
    });
});

const conversationInfoKey = (conversationInfo) => {
    let conv = conversationInfo.conversation;
    return conv.target + '-' + conv.type + '-' + conv.line;
};

const setConversationTop = (conversationInfo) => {
    store.setConversationTop(conversationInfo.conversation, conversationInfo.top > 0 ? 0 : 1);
};

const setConversationSilent = (conversationInfo) => {
    store.setConversationSilent(conversationInfo.conversation, !conversationInfo.isSilent);
};

const removeConversation = (conversationInfo) => {
    store.removeConversation(conversationInfo.conversation);
};

const scrollActiveElementCenter = () => {
    const el = document.querySelector('.chat-user-container .active');
    el && el.scrollIntoView({ behavior: 'instant', block: 'center' });
};

const showConversationItemContextMenu = (event, conversationInfo) => {
    if (!document.querySelector('[ref="menu"]')) {
        return;
    }
    sharedConversationState.contextMenuConversationInfo = conversationInfo;
    document.querySelector('[ref="menu"]').open(event, conversationInfo);
};

const onConversationItemContextMenuClose = () => {
    sharedConversationState.contextMenuConversationInfo = null;
};

const clearConversationUnreadStatus = (conversation) => {
    wfc.clearConversationUnreadStatus(conversation);
};

const markConversationAsUnread = (conversation) => {
    wfc.markConversationAsUnread(conversation, true);
};

const showConversationFloatPage = (conversation) => {
    let hash = window.location.hash;
    let url = window.location.origin;
    if (hash) {
        url = window.location.href.replace(hash, '#/conversation-window');
    } else {
        url += '/conversation-window';
    }
    ipcRenderer.send(IpcEventType.showConversationFloatPage, {
        url: url,
        type: conversation.type,
        target: conversation.target,
        line: conversation.line,
    });

    store.addFloatingConversation(conversation);
    if (sharedConversationState.currentConversationInfo && sharedConversationState.currentConversationInfo.conversation.equal(conversation)) {
        store.setCurrentConversation(null);
    }
};

const onScroll = (e, params) => {
    if (params) {
        currentConversationIndex.value = params.end;
    }
};

const scrollToNextUnreadConversation = () => {
    let currentIndex = currentConversationIndex.value;
    let nextUnreadIndex = conversationInfoList.value.findIndex((ci, index) => {
        if (index <= currentIndex) {
            return false;
        }
        return !ci.isSilent && ci._unread > 0;
    });

    if (nextUnreadIndex === -1 && currentIndex > -1) {
        nextUnreadIndex = conversationInfoList.value.findIndex((ci, index) => {
            return !ci.isSilent && ci._unread > 0;
        });
    }

    console.log('scrollToNextUnreadConversation', currentIndex, nextUnreadIndex, document.querySelector('[ref="virtualList"]')?.getOffset());
    if (nextUnreadIndex > -1 && document.querySelector('[ref="virtualList"]')) {
        document.querySelector('[ref="virtualList"]').scrollToIndex(nextUnreadIndex);
    }
};

const activated = () => {
    scrollActiveElementCenter();
};

onMounted(() => {
    $eventBus.$on('showConversationContextMenu', ([event, conversationInfo]) => {
        showConversationItemContextMenu(event, conversationInfo);
    });
    $eventBus.$on('scrollToNextUnreadConversation', scrollToNextUnreadConversation);
});

onUnmounted(() => {
    $eventBus.$off('showConversationContextMenu');
    $eventBus.$off('scrollToNextUnreadConversation');
});
</script>

<style lang="scss" scoped>
.chat-user-container {
    width: 250px;
    height: 100vh;
    padding-bottom: 40px;
    background-color: #efefef;
    overflow: hidden;
    border-right: 1px solid #ddd;

    ul {
        width: 100%;
        margin: 0;
        padding: 0;
        height: 100%;
        overflow-y: scroll;
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
