<template>
    <section style="height: 100%">
        <div v-if="sharedConversationState.currentConversationInfo == null" class="conversation-empty-container window-move">
            <h1 style="font-size: 30px; color: #f0f0f0; text-shadow: 1px 1px 0 #fff">圈子</h1>
        </div>
        <div v-else class="conversation-container">
            <header class="window-move">
                <div class="title-container window-move">
                    <div>
                        <h1 class="single-line">{{ conversationTitle }}</h1>
                        <p class="single-line-text" style="font-size: 12px; color: #999">{{ chatroomDesc }}</p>
                    </div>
                    <div v-bind:style="{ marginTop: sharedMiscState.isElectronWindowsOrLinux ? '30px' : '0' }">
                        <a href="#" @click.prevent>
                            <i
                                class="icon-ion-ios-settings-strong"
                                style="display: inline-block"
                                ref="setting"
                                v-bind:class="{ active: showConversationInfo }"
                                @click.prevent="toggleConversationInfo"
                            />
                        </a>
                    </div>
                </div>
            </header>
            <div
                ref="conversationContentContainer"
                class="conversation-content-container"
                @dragover="dragEvent($event, 'dragover')"
                @dragleave="dragEvent($event, 'dragleave')"
                @dragenter="dragEvent($event, 'dragenter')"
                @drop="dragEvent($event, 'drop')"
            >
                <div v-show="dragAndDropEnterCount > 0" class="drag-drop-container">
                    <div class="drag-drop">
                        <p>拖拽文件发送到 {{ conversationTitle }}</p>
                    </div>
                </div>
                <div ref="conversationMessageList" class="conversation-message-list" v-on:scroll="onScroll" infinite-wrapper>
                    <infinite-loading :identifier="loadingIdentifier" :distance="10" :force-use-infinite-wrapper="true" direction="top" @infinite="infiniteHandler">
                        <template #no-more>没有更多消息</template>
                        <template #no-results>所有消息已加载</template>
                    </infinite-loading>
                    <div v-for="message in sharedConversationState.currentConversationMessageList" :ref="message.messageId" :key="message.messageId">
                        <NotificationMessageContentView :message="message" v-if="isNotificationMessage(message)" />
                        <RecallNotificationMessageContentView :message="message" v-else-if="isRecallNotificationMessage(message)" />
                        <ContextableNotificationMessageContentContainerView
                            v-else-if="isContextableNotificationMessage(message)"
                            @click.native.capture="sharedConversationState.enableMessageMultiSelection ? clickMessageItem($event, message) : null"
                            @openMessageContextMenu="openMessageContextMenu"
                            @openMessageSenderContextMenu="openMessageSenderContextMenu"
                            :message="message"
                        />
                        <NormalOutMessageContentView
                            @click.native.capture="sharedConversationState.enableMessageMultiSelection ? clickMessageItem($event, message) : null"
                            :message="message"
                            @openMessageContextMenu="openMessageContextMenu"
                            @openMessageSenderContextMenu="openMessageSenderContextMenu"
                            v-else-if="message.direction === 0"
                        />
                        <NormalInMessageContentView
                            @click.native.capture="sharedConversationState.enableMessageMultiSelection ? clickMessageItem($event, message) : null"
                            :message="message"
                            @openMessageContextMenu="openMessageContextMenu"
                            @openMessageSenderContextMenu="openMessageSenderContextMenu"
                            v-else
                        />
                    </div>
                </div>
                <div v-if="sharedConversationState.inputtingUser" class="inputting-container">
                    <img class="avatar" :src="sharedConversationState.inputtingUser.portrait" />
                    <ScaleLoader :color="'#d2d2d2'" :height="'15px'" :width="'3px'" />
                </div>
                <div v-if="unreadMessageCount > 0" class="unread-count-tip-container" @click="showUnreadMessage">
                    {{ '' + this.unreadMessageCount + '条新消息' }}
                </div>
                <div v-show="!sharedConversationState.enableMessageMultiSelection" v-on:mousedown="dragStart" class="divider-handler"></div>
                <MessageInputView
                    :conversationInfo="sharedConversationState.currentConversationInfo"
                    v-show="!sharedConversationState.enableMessageMultiSelection"
                    :input-options="inputOptions"
                    :muted="muted"
                    ref="messageInputView"
                />
                <MultiSelectActionView v-show="sharedConversationState.enableMessageMultiSelection" :conversation-info="conversationInfo" />
                <chatRoomInfoView
                    v-if="showConversationInfo"
                    v-v-on-click-outside="hideConversationInfo"
                    :roomInfo="sharedConversationState.currentConversationInfo"
                    v-bind:class="{ active: showConversationInfo }"
                    class="conversation-info-container"
                />
                <vue-context ref="menu" v-slot="{ data: message }" :close-on-scroll="true" v-on:close="onMenuClose">
                    <li v-if="isCopyable(message)">
                        <a @click.prevent="copy(message)">复制</a>
                    </li>
                    <li v-if="isDownloadable(message)">
                        <a @click.prevent="download(message)">保存</a>
                    </li>
                    <li>
                        <a @click.prevent="delMessage(message)">删除</a>
                    </li>
                    <li v-if="isForwardable(message)">
                        <a @click.prevent="_forward(message)">转发</a>
                    </li>
                    <li v-if="isFavable(message)">
                        <a @click.prevent="favMessage(message)">收藏</a>
                    </li>
                    <li v-if="isQuotable(message)">
                        <a @click.prevent="quoteMessage(message)">引用</a>
                    </li>
                    <li v-if="isMulticheckable(message)">
                        <a @click.prevent="multiSelect(message)">多选</a>
                    </li>
                    <li v-if="isRecallable(message)">
                        <a @click.prevent="recallMessage(message)">撤回</a>
                    </li>
                </vue-context>
                <vue-context ref="messageSenderContextMenu" v-slot="{ data: message }" :close-on-scroll="true" v-on:close="onMessageSenderContextMenuClose">
                    <li>
                        <a @click.prevent="mentionMessageSender(message)">{{ mentionMessageSenderTitle(message) }}</a>
                    </li>
                </vue-context>
            </div>
        </div>
    </section>
</template>

<script>
import MessageInputView from '../../main/conversation/MessageInputView';
import NormalOutMessageContentView from '../../main/conversation/message/NormalOutMessageContentContainerView';
import NormalInMessageContentView from '../../main/conversation/message/NormalInMessageContentContainerView';
import NotificationMessageContentView from '../../main/conversation/message/NotificationMessageContentView';
import RecallNotificationMessageContentView from '../../main/conversation/message/RecallNotificationMessageContentView';
import NotificationMessageContent from '../../../wfc/messages/notification/notificationMessageContent';
import TextMessageContent from '../../../wfc/messages/textMessageContent';
import store from '../../../store';
import wfc from '../../../wfc/client/wfc';
import { numberValue } from '../../../wfc/util/longUtil';
import InfiniteLoading from '@imndx/vue-infinite-loading';
import MultiSelectActionView from '../../main/conversation/MessageMultiSelectActionView';
import ScaleLoader from 'vue-spinner/src/ScaleLoader';
import ForwardType from '../../main/conversation/message/forward/ForwardType';
import { fs, isElectron, shell } from '../../../platform';
import FileMessageContent from '../../../wfc/messages/fileMessageContent';
import ImageMessageContent from '../../../wfc/messages/imageMessageContent';
import { copyImg, copyText } from '../../util/clipboard';
import Message from '../../../wfc/messages/message';
import { downloadFile } from '../../../platformHelper';
import VideoMessageContent from '../../../wfc/messages/videoMessageContent';
import SoundMessageContent from '../../../wfc/messages/soundMessageContent';
import MessageContentType from '../../../wfc/messages/messageContentType';
import BenzAMRRecorder from 'benz-amr-recorder';
import ConversationType from '../../../wfc/model/conversationType';
import MediaMessageContent from '../../../wfc/messages/mediaMessageContent';
import RichNotificationMessageContent from '../../../wfc/messages/notification/richNotificationMessageContent';
import MessageStatus from '../../../wfc/messages/messageStatus';
import ArticlesMessageContent from '../../../wfc/messages/articlesMessageContent';
import ContextableNotificationMessageContentContainerView from './message/ContextableNotificationMessageContentContainerView';
import { currentWindow, ipcRenderer } from '../../../platform';
import appServerApi from '../../../api/appServerApi';
import Config from '../../../config';
import IPCEventType from '../../../ipcEventType';
import { imageThumbnail } from '../../util/imageUtil';
import GroupInfo from '../../../wfc/model/groupInfo';
import { vOnClickOutside } from '@vueuse/components';
import GroupMemberType from '../../../wfc/model/groupMemberType';
import SendMixMediaMessageView from '../view/SendMixMediaMessageView.vue';
import chatRoomInfoView from './chatRoomInfoView.vue';

var amr;
export default {
    name: 'ChatroomConversationView',
    components: {
        ContextableNotificationMessageContentContainerView,
        MultiSelectActionView,
        NotificationMessageContentView,
        RecallNotificationMessageContentView,
        NormalInMessageContentView,
        NormalOutMessageContentView,
        MessageInputView,
        InfiniteLoading,
        ScaleLoader,
        chatRoomInfoView,
    },
    props: {
        inputOptions: {
            type: Object,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            conversationInfo: null,
            showConversationInfo: false,
            sharedConversationState: store.state.conversation,
            sharedContactState: store.state.contact,
            sharedPickState: store.state.pick,
            sharedMiscState: store.state.misc,
            isHandlerDragging: false,
            savedMessageListViewHeight: -1,
            saveMessageListViewFlexGrow: -1,
            dragAndDropEnterCount: 0,
            messageInputViewResized: false,
            unreadMessageCount: 0,
            isWindowAlwaysTop: currentWindow && currentWindow.isAlwaysOnTop(),
            enableLoadRemoteHistoryMessage: !store.state.misc.isElectron,
        };
    },

    methods: {
        async dragEvent(e, v) {
            if (v === 'dragenter') {
                this.dragAndDropEnterCount++;
            } else if (v === 'dragleave') {
                this.dragAndDropEnterCount--;
            } else if (v === 'drop') {
                this.dragAndDropEnterCount--;

                let length = e.dataTransfer.files.length;
                if (length > 0 && length <= 5) {
                    for (let i = 0; i < length; i++) {
                        this.$eventBus.$emit('uploadFile', e.dataTransfer.files[i]);
                        store.sendFile(this.sharedConversationState.currentConversationInfo.conversation, e.dataTransfer.files[i]);
                    }
                } else if (length > 5) {
                    this.$notify({
                        text: '一次最多发送5个文件',
                        type: 'warn',
                    });
                }
            } else if (v === 'dragover') {
                e.dataTransfer.dropEffect = 'copy';
            }
        },

        toggleConversationInfo() {
            this.showConversationInfo = !this.showConversationInfo;
        },

        clickMessageItem(event, message) {
            if (message.messageContent instanceof NotificationMessageContent) {
                return;
            }
            if (this.sharedConversationState.enableMessageMultiSelection) {
                store.selectOrDeselectMessage(message);
                event.stopPropagation();
            }
        },

        hideConversationInfo() {
            this.showConversationInfo && (this.showConversationInfo = false);
        },

        isNotificationMessage(message) {
            return (
                message &&
                message.messageContent instanceof NotificationMessageContent &&
                message.messageContent.type !== MessageContentType.RecallMessage_Notification &&
                message.messageContent.type !== MessageContentType.Rich_Notification
            );
        },

        isContextableNotificationMessage(message) {
            return message && (message.messageContent instanceof RichNotificationMessageContent || message.messageContent instanceof ArticlesMessageContent);
        },

        isRecallNotificationMessage(message) {
            return message && message.messageContent.type === MessageContentType.RecallMessage_Notification;
        },

        onScroll(e) {
            for (const popper of document.querySelectorAll('.tippy-popper')) {
                const instance = popper._tippy;
                if (instance.state.isVisible) {
                    instance.hide();
                }
            }
            this.$refs.menu && this.$refs.menu.close();

            if (e.target.scrollHeight > e.target.clientHeight + e.target.scrollTop + e.target.clientHeight / 2) {
                store.setShouldAutoScrollToBottom(false);
            } else {
                store.setShouldAutoScrollToBottom(true);
                this.clearConversationUnreadStatus();
            }
        },

        dragStart() {
            if (this.muted) {
                return;
            }
            this.isHandlerDragging = true;
        },

        drag(e) {
            if (!this.isHandlerDragging) {
                return false;
            }

            let containerOffsetTop = this.$refs['conversationContentContainer'].offsetTop;
            let pointerRelativeYpos = e.clientY - containerOffsetTop;
            let boxAminHeight = 150;

            this.$refs['conversationMessageList'].style.height = Math.max(boxAminHeight, pointerRelativeYpos) + 'px';
            this.$refs['conversationMessageList'].style.flexGrow = 0;
            this.messageInputViewResized = true;
        },

        dragEnd() {
            this.isHandlerDragging = false;
        },

        onMenuClose() {
            this.$eventBus.$emit('contextMenuClosed');
        },

        onMessageSenderContextMenuClose() {
            console.log('onMessageSenderContextMenuClose');
        },

        isCopyable(message) {
            return (
                message &&
                (message.messageContent instanceof TextMessageContent ||
                    message.messageContent instanceof ImageMessageContent ||
                    ((message.messageContent instanceof VideoMessageContent || message.messageContent instanceof FileMessageContent) && this.isLocalFile(message)))
            );
        },

        isDownloadable(message) {
            return message && (message.messageContent instanceof ImageMessageContent || message.messageContent instanceof FileMessageContent || message.messageContent instanceof VideoMessageContent);
        },

        isForwardable(message) {
            if (message && message.messageContent instanceof SoundMessageContent) {
                return false;
            }
            return true;
        },

        isFavable(message) {
            if (!message) {
                return false;
            }
            return [MessageContentType.VOIP_CONTENT_TYPE_START, MessageContentType.CONFERENCE_CONTENT_TYPE_INVITE].indexOf(message.messageContent.type) <= -1;
        },

        isRecallable(message) {
            if (message) {
                let delta = wfc.getServerDeltaTime();
                let now = new Date().getTime();
                if (message.direction === 0 && now - (numberValue(message.timestamp) - delta) < 60 * 1000) {
                    return true;
                }
            }
            return false;
        },

        isLocalFile(message) {
            if (message && isElectron()) {
                let media = message.messageContent;
                let localPath = media.localPath;
                if (localPath) {
                    return fs.existsSync(localPath);
                }
            }
            return false;
        },

        isQuotable(message) {
            if (!message) {
                return false;
            }
            return (
                [
                    MessageContentType.VOIP_CONTENT_TYPE_START,
                    MessageContentType.Voice,
                    MessageContentType.Video,
                    MessageContentType.Composite_Message,
                    MessageContentType.Articles,
                    MessageContentType.CONFERENCE_CONTENT_TYPE_INVITE,
                ].indexOf(message.messageContent.type) === -1
            );
        },

        isMulticheckable(message) {
            if (!message) {
                return false;
            }
            return [MessageContentType.Voice, MessageContentType.VOIP_CONTENT_TYPE_START].indexOf(message.messageContent.type) === -1;
        },

        copy(message) {
            let content = message.messageContent;
            if (content instanceof TextMessageContent) {
                let selectedText = window.getSelection().toString();
                if (selectedText) {
                    copyText(selectedText);
                } else {
                    copyText(content.content);
                }
            } else if (content instanceof ImageMessageContent) {
                copyImg(content.remotePath);
            } else if (content instanceof MediaMessageContent) {
                if (isElectron()) {
                    ipcRenderer.send(IPCEventType.FILE_COPY, { path: content.localPath });
                }
            }
        },

        download(message) {
            if (!store.isDownloadingMessage(message.messageId)) {
                downloadFile(message);
                store.addDownloadingMessage(message.messageUid);
            } else {
                console.log('file isDownloading');
            }
        },

        recallMessage(message) {
            wfc.recallMessage(message.messageUid, null, null);
        },

        delMessage(message) {
            this.$alert({
                title: '删除消息',
                content: '确定删除消息？',
                confirmText: this.sharedMiscState.isElectron ? '本地删除' : '删除',
                cancelText: '取消',
                confirmCallback: () => {
                    if (this.sharedMiscState.isElectron) {
                        wfc.deleteMessage(message.messageId);
                    } else {
                        wfc.deleteRemoteMessageByUid(message.messageUid, null, null);
                    }
                },
            });
        },

        forward(message) {
            return this.$forwardMessage({
                forwardType: ForwardType.NORMAL,
                messages: [message],
            });
        },

        _forward(message) {
            this.forward(message).catch((reason) => {
                console.log('forward error', reason);
            });
        },

        quoteMessage(message) {
            store.quoteMessage(message);
        },

        favMessage(message) {
            appServerApi
                .favMessage(message)
                .then((data) => {
                    this.$notify({
                        text: '收藏成功',
                        type: 'info',
                    });
                })
                .catch((err) => {
                    console.log('fav error', err);
                    this.$notify({
                        text: '收藏失败',
                        type: 'error',
                    });
                });
        },

        multiSelect(message) {
            store.toggleMessageMultiSelection(message);
        },

        infiniteHandler($state) {
            console.log('to load more message');
            store.loadConversationHistoryMessages(
                () => {
                    console.log('loaded', this.enableLoadRemoteHistoryMessage);
                    $state.loaded(!this.enableLoadRemoteHistoryMessage);
                    this.enableLoadRemoteHistoryMessage = true;
                },
                () => {
                    console.log('complete');
                    $state.complete();
                    this.enableLoadRemoteHistoryMessage = true;
                },
                this.enableLoadRemoteHistoryMessage
            );
        },

        playVoice(message) {
            if (amr) {
                amr.stop();
            }
            amr = new BenzAMRRecorder();
            let voice = message.messageContent;
            amr.initWithUrl(voice.remotePath).then(() => {
                message._isPlaying = true;
                amr.play();
            });
            amr.onEnded(() => {
                message._isPlaying = false;
                store.playVoice(null);
                if (message.status === MessageStatus.Unread) {
                    wfc.updateMessageStatus(message.messageId, MessageStatus.Played);
                }
            });
        },

        mentionMessageSenderTitle(message) {
            if (!message) {
                return '';
            }
            let displayName = wfc.getGroupMemberDisplayName(message.conversation.target, message.from);
            return '@' + displayName;
        },

        mentionMessageSender(message) {
            this.$refs.messageInputView.mention(message.conversation.target, message.from);
        },

        showUnreadMessage() {
            let messageListElement = this.$refs['conversationMessageList'];
            messageListElement.scroll({ top: messageListElement.scrollHeight, left: 0, behavior: 'auto' });
            this.unreadMessageCount = 0;
        },

        clearConversationUnreadStatus() {
            let info = this.sharedConversationState.currentConversationInfo;
            if (info.unreadCount.unread + info.unreadCount.unreadMention + info.unreadCount.unreadMentionAll > 0) {
                store.clearConversationUnreadStatus(info.conversation);
            }
        },

        openMessageContextMenu(event, message) {
            this.$refs.menu.open(event, message);
        },

        openMessageSenderContextMenu(event, message) {
            if (message.conversation.type === ConversationType.Group) {
                this.$refs.messageSenderContextMenu.open(event, message);
            }
        },
    },

    mounted() {
        this.popupItem = this.$refs['setting'];
        document.addEventListener('mouseup', this.dragEnd);
        document.addEventListener('mousemove', this.drag);

        this.$eventBus.$on('send-file', (args) => {
            let fileMessageContent = new FileMessageContent(null, args.remoteUrl, args.name, args.size);
            let message = new Message(null, fileMessageContent);
            this.forward(message);
        });

        this.$eventBus.$on('forward-fav', (args) => {
            let favItem = args.favItem;
            let message = favItem.toMessage();
            this.forward(message);
        });
    },

    beforeUnmount() {
        document.removeEventListener('mouseup', this.dragEnd);
        document.removeEventListener('mousemove', this.drag);
        this.$eventBus.$off('send-file');
        this.$eventBus.$off('forward-fav');
    },

    updated() {
        if (!this.sharedConversationState.currentConversationInfo) {
            return;
        }
        this.popupItem = this.$refs['setting'];

        if (this.sharedConversationState.shouldAutoScrollToBottom && !this.sharedMiscState.isPageHidden) {
            let messageListElement = this.$refs['conversationMessageList'];
            messageListElement.scroll({ top: messageListElement.scrollHeight, left: 0, behavior: 'auto' });
            this.clearConversationUnreadStatus();
        }

        if (this.sharedConversationState.currentConversationInfo) {
            let unreadCount = this.sharedConversationState.currentConversationInfo.unreadCount;
            if (unreadCount.unread > 0) {
                if (this.sharedMiscState.isPageHidden) {
                    this.unreadMessageCount = unreadCount.unread;
                }
            } else {
                this.unreadMessageCount = 0;
            }
        }

        if (
            this.conversationInfo &&
            this.sharedConversationState.currentConversationInfo &&
            !this.conversationInfo.conversation.equal(this.sharedConversationState.currentConversationInfo.conversation)
        ) {
            this.showConversationInfo = false;
        }
        this.conversationInfo = this.sharedConversationState.currentConversationInfo;
        this.enableLoadRemoteHistoryMessage = !isElectron() || this.conversationInfo.conversation.type === ConversationType.ChatRoom;
    },

    computed: {
        conversationTitle() {
            if (this.title) {
                return this.title;
            }
            let info = this.sharedConversationState.currentConversationInfo;
            if (info.conversation._target) {
                if (info.conversation.type === ConversationType.ChatRoom) {
                    return info.conversation._target.title || '聊天室';
                } else {
                    return info.conversation._target._displayName;
                }
            } else {
                return '会话';
            }
        },

        chatroomDesc() {
            let info = this.sharedConversationState.currentConversationInfo;
            if (info.conversation.type === ConversationType.ChatRoom) {
                let target = info.conversation._target;
                if (target && target.memberCount) {
                    return `${target.memberCount}人在线`;
                }
                return '聊天室';
            }
            return '';
        },

        loadingIdentifier() {
            let conversation = this.sharedConversationState.currentConversationInfo.conversation;
            return conversation.type + '-' + conversation.target + '-' + conversation.line;
        },

        muted() {
            if (!this.conversationInfo) {
                return false;
            }
            let target = this.conversationInfo.conversation._target;
            if (target instanceof GroupInfo) {
                let groupInfo = target;
                let groupMember = wfc.getGroupMember(groupInfo.target, wfc.getUserId());
                if (groupInfo.mute === 1) {
                    return [GroupMemberType.Owner, GroupMemberType.Manager, GroupMemberType.Allowed].indexOf(groupMember.type) < 0;
                } else if (groupInfo.deleted) {
                    return true;
                } else {
                    return groupMember && groupMember.type === GroupMemberType.Muted;
                }
            }
            return false;
        },
    },

    directives: {
        vOnClickOutside,
    },
};
</script>

<style lang="css" scoped>
.conversation-empty-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-top-right-radius: var(--main-border-radius);
    border-bottom-right-radius: var(--main-border-radius);
}

.conversation-empty-container h1 {
    font-size: 17px;
    font-weight: normal;
}

.title-container {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 0 0 0 20px;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    position: relative;
}

.title-container h1 {
    font-size: 16px;
    word-wrap: break-word;
    max-width: 500px;
    text-overflow: ellipsis;
    font-weight: normal;
}

.title-container a {
    text-decoration: none;
    padding: 15px;
    color: #181818;
}

.title-container a:active {
    color: #d6d6d6;
}

.conversation-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.conversation-container header {
    border-top-right-radius: var(--main-border-radius);
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e6e6e6;
}

.conversation-content-container {
    flex: 1;
    height: calc(100% - 60px);
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background-color: #f3f3f3;
    border-bottom-right-radius: var(--main-border-radius);
}

.conversation-content-container .drag-drop-container {
    position: absolute;
    background-color: #f2f2f2a5;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    height: 100%;
    padding: 20px 15px 15px 15px;
}

.conversation-content-container .drag-drop {
    border: 2px dashed #b2b2b2;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.conversation-content-container .drag-drop p {
    padding-bottom: 100px;
}

.conversation-message-list {
    flex: 1 1 auto;
    overflow: auto;
}

.unread-count-tip-container {
    margin-left: auto;
    padding: 4px 8px;
    background: white;
    width: auto;
    color: #4168e0;
    border-radius: 4px;
}

.inputting-container {
    display: flex;
    padding: 10px 20px;
    align-items: center;
}

.inputting-container .avatar {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin-right: 20px;
}

.divider-handler::before {
    cursor: row-resize;
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    border-top: 1px solid #e2e2e2;
    margin: 0 auto;
}

.conversation-info-container {
    display: none;
    width: 266px;
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
    background-color: #ffffffe5;
    backdrop-filter: blur(6px);
    border-left: 1px solid #e6e6e6;
}

.conversation-info-container.active {
    display: flex;
}

i:hover {
    color: #1f64e4;
}

i.active {
    color: #3f64e4;
}
</style>
