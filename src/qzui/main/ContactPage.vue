<template>
    <div class="contact-page">
        <ContactListPanel class="contact-list-panel" />
        <GroupDetailView v-if="sharedContactState.currentGroup" :group="sharedContactState.currentGroup" class="contact-detail-container" />
        <ChannelDetailView v-else-if="sharedContactState.currentChannel" :channel="sharedContactState.currentChannel" class="contact-detail-container" />
        <OrganizationDetailView v-else-if="sharedContactState.currentOrganization" class="contact-detail-container" />
        <DomainInfoView v-else-if="sharedContactState.currentExternalDomain" class="contact-detail-container" />
        <ChatroomDetailView v-else-if="sharedContactState.currentChatroom" class="contact-detail-container" />
        <UserDetailView v-else-if="sharedContactState.currentFriend" :user="sharedContactState.currentFriend" class="contact-detail-container" />
        <FriendRequestDetailView
            v-else-if="sharedContactState.currentFriendRequest"
            :user="sharedContactState.currentFriendRequest._target"
            :friend-request="sharedContactState.currentFriendRequest"
            class="contact-detail-container"
        />
        <div v-else class="contact-empty-container">
            <AllUsers />
        </div>
        <div
            class="close-btn"
            @click="close"
            v-if="
                sharedContactState.currentGroup ||
                sharedContactState.currentChannel ||
                sharedContactState.currentOrganization ||
                sharedContactState.currentExternalDomain ||
                sharedContactState.currentChatroom ||
                sharedContactState.currentFriend ||
                sharedContactState.currentFriendRequest
            "
        >
            <el-icon><Close /></el-icon>
        </div>
    </div>
</template>

<script>
import ContactListPanel from './ContactListPanel.vue';
import GroupDetailView from './contact/GroupDetailView.vue';
import AllUsers from '@/qzui/components/AllUsers.vue';
import store from '../../store';
import UserDetailView from './contact/UserDetailView.vue';
import FriendRequestDetailView from './contact/FrienRequestDetailView.vue';
import ChannelListView from './contact/ChannelListView.vue';
import ChannelDetailView from './contact/ChannelDetailView.vue';
import OrganizationDetailView from './contact/OrganizationTreeView.vue';
import ChatroomListView from './contact/ChatroomListView.vue';
import ChatroomDetailView from './contact/ChatroomDetailView.vue';
import DomainInfoView from './contact/DomainInfoView.vue';

export default {
    name: 'ContactPage',
    data() {
        return {
            sharedContactState: store.state.contact,
        };
    },
    components: {
        DomainInfoView,
        ChatroomDetailView,
        ChatroomListView,
        ChannelDetailView,
        ChannelListView,
        FriendRequestDetailView,
        UserDetailView,
        GroupDetailView,
        ContactListPanel,
        OrganizationDetailView,
        AllUsers,
    },
    methods: {
        close() {
            this.sharedContactState.currentGroup = null;
            this.sharedContactState.currentChannel = null;
            this.sharedContactState.currentOrganization = null;
            this.sharedContactState.currentExternalDomain = null;
            this.sharedContactState.currentChatroom = null;
            this.sharedContactState.currentFriend = null;
            this.sharedContactState.currentFriendRequest = null;
        },
    },
};
</script>

<style lang="css" scoped>
.contact-page {
    display: flex;
    flex: 1;
    height: 100%;
}

.contact-list-panel {
    background-color: #fafafa;
    width: 261px;
    height: 100%;
}

ul {
    list-style: none;
}

.contact-detail-container {
    flex: 1;
    background-color: white;
}

.contact-empty-container {
    flex: 1;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: var(--main-border-radius);
    border-bottom-right-radius: var(--main-border-radius);
}

.contact-empty-container h1 {
    font-size: 17px;
    font-weight: normal;
}
.close-btn {
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
}
.close-btn:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
