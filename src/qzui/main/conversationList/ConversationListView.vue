<template>
    <section class="conversation-list">
        <virtual-list
            v-if="true"
            :data-component="conversationItemView"
            :data-sources="conversationInfoList"
            :data-key="conversationInfoKey"
            ref="virtualList"
            :onScroll="onScroll"
            :estimate-size="30"
            style="height: 100%; overflow-y: auto"
        />

        <div v-else style="height: 100%; overflow-y: auto">
            <ConversationItemView v-for="conversationInfo in conversationInfoList" :source="conversationInfo" :key="conversationInfoKey(conversationInfo)" />
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
            <li>
                <a @click.prevent="moveConversationToGroup(conversationInfo)">移动到分组</a>
            </li>
        </vue-context>

        <el-dialog v-model="visible" title="Tips" width="500">
            <el-select v-model="selectUserInfo.groupId" placeholder="请选择分组">
                <el-option v-for="item in groupList" :label="item.groupName" :value="item.groupId" />
            </el-select>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="moveConversationToGroupSubmit"> 确认 </el-button>
                </div>
            </template>
        </el-dialog>
    </section>
</template>

<script>
import ConversationItemView from './ConversationItemView.vue';
import { getCustomChatGroupList, addChatInCustomGroup } from '../../../api/customGroup.js';
import { getItem } from '../../../qzui/util/storageHelper';
import store from '../../../store';
import wfc from '../../../wfc/client/wfc';
import IpcEventType from '../../../ipcEventType';
import { ipcRenderer } from '../../../platform';
import { markRaw } from 'vue';
import { ElMessage } from 'element-plus';
import Conversation from '../../../wfc/model/conversation';
import ConversationType from '../../../wfc/model/conversationType';

export default {
    name: 'ConversationListView',
    props: {
        activeId: {
            type: String,
            default: 'private',
        },
        groupListItems: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            visible: false,
            sharedConversationState: store.state.conversation,
            sharedMiscState: store.state.misc,
            conversationItemView: markRaw(ConversationItemView),
            currentConversationIndex: 0,
            userinfo: JSON.parse(getItem('userinfo')) || {},
            groupList: [],
            selectUserInfo: null,
        };
    },

    created() {
        this.$eventBus.$on('showConversationContextMenu', ([event, conversationInfo]) => {
            this.showConversationItemContextMenu(event, conversationInfo);
        });
        this.$eventBus.$on('scrollToNextUnreadConversation', this.scrollToNextUnreadConversation);
    },

    unmounted() {
        this.$eventBus.$off('showConversationContextMenu');
        this.$eventBus.$off('scrollToNextUnreadConversation');
    },

    methods: {
        setConversationTop(conversationInfo) {
            store.setConversationTop(conversationInfo.conversation, conversationInfo.top > 0 ? 0 : 1);
        },

        setConversationSilent(conversationInfo) {
            store.setConversationSilent(conversationInfo.conversation, !conversationInfo.isSilent);
        },

        removeConversation(conversationInfo) {
            store.removeConversation(conversationInfo.conversation);
        },

        conversationInfoKey(conversationInfo) {
            let conv = conversationInfo.conversation;
            return conv.target + '-' + conv.type + '-' + conv.line;
        },
        scrollActiveElementCenter() {
            let el = this.$el.getElementsByClassName('active')[0];
            el && el.scrollIntoView({ behavior: 'instant', block: 'center' });
        },

        showConversationItemContextMenu(event, conversationInfo) {
            if (!this.$refs.menu) {
                return;
            }
            this.sharedConversationState.contextMenuConversationInfo = conversationInfo;
            this.$refs.menu.open(event, conversationInfo);
        },

        onConversationItemContextMenuClose() {
            this.sharedConversationState.contextMenuConversationInfo = null;
        },

        clearConversationUnreadStatus(conversation) {
            wfc.clearConversationUnreadStatus(conversation);
        },

        markConversationAsUnread(conversation) {
            wfc.markConversationAsUnread(conversation, true);
        },

        moveConversationToGroup(conversationInfo) {
            console.log(123, conversationInfo);

            this.visible = true;
            this.selectUserInfo = conversationInfo;
            getCustomChatGroupList({
                userId: this.userinfo.id,
            }).then((res) => {
                this.groupList = res.data || [];
            });
        },
        moveConversationToGroupSubmit() {
            if (!this.selectUserInfo.groupId) {
                ElMessage.error('请选择分组');
                return;
            }
            let data = {
                groupId: this.selectUserInfo.groupId,
                serviceGroupId: '',
                sourceChatId: '',
                type: 3, // 群类型 1-私域群,2-公域群 3-单聊
                userId: this.userinfo.id,
            };
            if (this.selectUserInfo.conversation.type == 0) {
                data.type = 3;
                data.sourceChatId = 1 || this.selectUserInfo.target;
            }
            if (this.selectUserInfo.conversation.type == 1) {
                data.type = 1;
                data.serviceGroupId = this.selectUserInfo.target;
            }
            addChatInCustomGroup(data).then((res) => {
                if (res.code == 0) {
                    ElMessage.success('移动成功');
                    this.visible = false;
                } else {
                    ElMessage.error('移动失败');
                }
            });
        },

        showConversationFloatPage(conversation) {
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
            if (this.sharedConversationState.currentConversationInfo && this.sharedConversationState.currentConversationInfo.conversation.equal(conversation)) {
                store.setCurrentConversation(null);
            }
        },

        onScroll(e, params) {
            if (params) {
                this.currentConversationIndex = params.end;
            }
        },

        // 滑动到下一个未读会话
        scrollToNextUnreadConversation() {
            let currentConversationIndex = this.currentConversationIndex;
            let nextUnreadConversationIndex = this.conversationInfoList.findIndex((ci, index) => {
                if (index <= currentConversationIndex) {
                    return false;
                }
                return !ci.isSilent && ci._unread > 0;
            });

            if (nextUnreadConversationIndex === -1 && currentConversationIndex > -1) {
                nextUnreadConversationIndex = this.conversationInfoList.findIndex((ci, index) => {
                    return !ci.isSilent && ci._unread > 0;
                });
            }

            console.log('scrollToNextUnreadConversation', this.currentConversationIndex, nextUnreadConversationIndex, this.$refs['virtualList'].getOffset());
            if (nextUnreadConversationIndex > -1) {
                this.$refs['virtualList'].scrollToIndex(nextUnreadConversationIndex);
            }
        },
    },
    activated() {
        this.scrollActiveElementCenter();
    },
    computed: {
        conversationInfoList() {
            if (this.activeId !== 'private') {
                let list = [];
                this.groupListItems.forEach((item) => {
                    // item.type 0 单聊 1 群聊
                    let conversation = new Conversation(ConversationType.Single, item.uid, 0);
                    if (item.type == 1) {
                        conversation = new Conversation(ConversationType.Group, item.target, 0);
                    }
                    let conversationInfo = store.getConversationInfo(conversation);
                    list.push(conversationInfo);
                });

                return list;
            }
            const list = this.sharedConversationState.conversationInfoList.filter((ci) => {
                const index = this.sharedConversationState.floatingConversations.findIndex((c) => c.equal(ci.conversation));
                return index === -1;
            });
            return list;
        },
    },

    components: { ConversationItemView },
};
</script>

<style lang="css" scoped>
.conversation-list {
    height: 100%;
    overflow: auto;
}
</style>
