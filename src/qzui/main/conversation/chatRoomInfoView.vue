<template>
    <div class="chatroom-conversation-info-view">
        <UserListView :users="userInfos" :show-category-label="false" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserListView from '../user/UserListView.vue';
import wfc from '../../../wfc/client/wfc';

const props = defineProps({
    roomInfo: {
        type: Object,
        required: true,
    },
});

const userInfos = ref([]);

const getChatRoomInfo = () => {
    console.log('props.roomInfo', props.roomInfo);
};

onMounted(() => {
    getChatRoomInfo();
    wfc.getChatroomMemberInfo(props.roomInfo?.conversation?.target, 100, (chatRoomMemberInfo) => {
        console.log('chatRoomMemberInfo', chatRoomMemberInfo);
        userInfos.value = wfc.getUserInfos(chatRoomMemberInfo.members);
        userInfos.value.forEach((user) => {
            user._displayName = user.displayName || user.name;
        });
    });
});
</script>

<style lang="scss" scoped>
.chatroom-conversation-info-view {
    padding: 10px;
    height: 100%;
    overflow: auto;
}
</style>
