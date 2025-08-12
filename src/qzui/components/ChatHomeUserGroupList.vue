<template>
    <div class="chat-home-user-group-list">
        <h3 class="window-move">我的聊天室</h3>
        <ul>
            <li v-for="(item, index) in chatList" :class="{ active: curChatRoomId === item.chatRoomId }" @click="showChatroom(item)" :key="index">
                <span>{{ item.name }}</span>
                <i>{{ item.online }}人在线</i>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import store from '../../store';
import { useRouter } from 'vue-router';
import wfc from '../../wfc/client/wfc';
import Conversation from '../../wfc/model/conversation';
import ConversationType from '../../wfc/model/conversationType';
import ConversationInfo from '../../wfc/model/conversationInfo';

const router = useRouter();
const curChatRoomId = ref('');
const chatroomInfo = ref({});

const chatList = ref([
    { name: '聊天室1', online: 35, chatRoomId: 'chatroom1' },
    { name: '聊天室2', online: 6, chatRoomId: 'chatroom2' },
    { name: '聊天室3', online: 150, chatRoomId: 'chatroom3' },
]);

const showChatroom = (item) => {
    curChatRoomId.value = item.chatRoomId;
    getCurrentChatroomInfo(item.chatRoomId);
};

const joinChatroom = (chatRoomId) => {
    wfc.joinChatroom(
        chatRoomId,
        () => {
            // 创建Conversation对象
            let conversation = new Conversation(ConversationType.ChatRoom, chatRoomId, 0);
            conversation._target = chatroomInfo.value;
            conversation._target._displayName = chatroomInfo.value.title;

            // 创建ConversationInfo对象
            let conversationInfo = new ConversationInfo();
            conversationInfo.conversation = conversation;

            // 设置当前会话信息
            store.setCurrentConversationInfo(conversationInfo);

            // 跳转到聊天页面
            router.push('/chatHome');
        },
        (err) => {
            console.error('joinChatRoom error', err);
        }
    );
};

const getCurrentChatroomInfo = (chatroomId) => {
    if (!chatroomId) {
        console.warn('chatRoomId is missing');
        return;
    }

    wfc.getChatroomInfo(
        chatroomId,
        0,
        (info) => {
            chatroomInfo.value = info;
            console.log('getChatroomInfo success', info);
            // 获取聊天室信息成功后，加入聊天室
            joinChatroom(chatroomId);
            store.setCurrentChatroom(info);
        },
        (err) => {
            console.error('getChatroomInfo error', chatroomId, err);
        }
    );
};

onMounted(() => {
    // 组件挂载时，如果有当前聊天室，则获取其信息
    const currentChatroom = store.state.contact.currentChatroom;
    if (currentChatroom?.chatRoomId) {
        curChatRoomId.value = currentChatroom.chatRoomId;
        getCurrentChatroomInfo(currentChatroom.chatRoomId);
    }
});
</script>

<style lang="scss" scoped>
.chat-home-user-group-list {
    width: 250px;
    height: 100vh;
    background-color: #efefef;
    overflow: hidden;
    border-right: 1px solid #ddd;

    h3 {
        font-size: 16px;
        font-weight: 500;
        padding: 0 10px;
        background-color: #fff;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
    }

    ul {
        padding: 10px 0;

        li {
            display: flex;
            align-items: center;
            padding: 0 10px;
            justify-content: space-between;
            height: 50px;
            cursor: pointer;

            &.active {
                background-color: rgb(202, 221, 255);
            }

            span {
                font-size: 14px;
                color: #333;
            }

            i {
                font-size: 12px;
                color: rgb(7, 193, 96);
                font-style: normal;
            }
        }
    }
}
</style>
