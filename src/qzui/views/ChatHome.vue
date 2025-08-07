<template>
    <Layout>
        <div class="chat-home">
            <aside class="sidebar">
                <ChatHomeUserGroupList />
            </aside>

            <main class="chat-main">
                <header class="chat-header">
                    <h1>{{ chatTitle }}</h1>
                    <el-icon color="#777" size="18" class="more-icon" @click="drawer = true">
                        <MoreFilled />
                    </el-icon>
                </header>

                <section class="chat-messages">
                    <article v-for="(message, index) in messages" :key="index" :class="['message', { 'message-self': message.isSelf }]">
                        <img :src="message.avatar" :alt="message.name" class="message-avatar" />
                        <div class="message-content">
                            <h3 class="message-name">{{ message.name }}</h3>
                            <p class="message-text">{{ message.text }}</p>
                        </div>
                    </article>
                </section>

                <footer class="chat-input">
                    <textarea v-model="inputMessage" placeholder="文明上网，理性发言" @keyup.enter="sendMessage"></textarea>
                    <button class="send-btn" @click="sendMessage">发送</button>
                </footer>
            </main>

            <el-drawer v-model="drawer" direction="rtl" :with-header="false" size="310px">
                <div class="member-list">
                    <header class="member-header">
                        <h2>聊天室成员</h2>
                        <span class="member-count">{{ members.length }}人</span>
                    </header>

                    <ul class="member-grid">
                        <li v-for="member in members" :key="member.id">
                            <img :src="member.avatar" :alt="member.name" />
                            <span>{{ member.name }}</span>
                        </li>
                    </ul>

                    <footer class="member-actions">
                        <button @click="drawer = false">退出聊天室</button>
                    </footer>
                </div>
            </el-drawer>
        </div>
    </Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '../components/Layout.vue';
import ChatHomeUserGroupList from '../components/ChatHomeUserGroupList.vue';
import { MoreFilled } from '@element-plus/icons-vue';

// 状态管理
const drawer = ref(false);
const inputMessage = ref('');
const chatTitle = ref('A2桌游讨论(35)');

// 消息数据
const messages = ref([
    { name: '请叫我女王', text: 'hello,你好啊！', avatar: '../assets/usr-3.png', isSelf: false },
    { name: '我', text: '你好,请问有事情吗?', avatar: '../assets/usr-1.png', isSelf: true },
    { name: '请叫我女王', text: '没事情，就是随便问问。', avatar: '../assets/usr-3.png', isSelf: false },
    { name: '请叫我女王', text: '怎么不回复我呢？', avatar: '../assets/usr-3.png', isSelf: false },
    { name: '用户A', text: 'hello,你好啊！', avatar: '../assets/usr-2.png', isSelf: false },
    { name: '我', text: '你好,请问有事情吗?', avatar: '../assets/usr-1.png', isSelf: true },
    { name: '请叫我女王', text: '没事情，就是随便问问。', avatar: '../assets/usr-3.png', isSelf: false },
    { name: '请叫我女王', text: '怎么不回复我呢？', avatar: '../assets/usr-3.png', isSelf: false },
]);

// 成员数据
const members = ref([
    { id: 1, name: '你若安好', avatar: '../assets/usr-3.png' },
    { id: 2, name: '小鸟五毛飞得高', avatar: '../assets/usr-2.png' },
    { id: 3, name: '我爱亲亲草原', avatar: '../assets/usr-1.png' },
    { id: 4, name: '老妈（管钱的）', avatar: '../assets/usr-2.png' },
    { id: 5, name: '老爸（爱钓鱼）', avatar: '../assets/usr-3.png' },
    { id: 6, name: '老妹（学习强人）', avatar: '../assets/usr-1.png' },
]);

// 方法
const sendMessage = () => {
    if (inputMessage.value.trim()) {
        messages.value.push({
            name: '我',
            text: inputMessage.value,
            avatar: '../assets/usr-1.png',
            isSelf: true,
        });
        inputMessage.value = '';
        scrollToBottom();
    }
};

const scrollToBottom = () => {
    // 滚动到底部的逻辑
    setTimeout(() => {
        const container = document.querySelector('.chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, 100);
};
</script>

<style lang="scss" scoped>
.chat-home {
    display: flex;
    height: 100vh;
    width: 100%;
    background: #fff;
}

.sidebar {
    width: 250px;
    border-right: 1px solid #eee;
}

.chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    border-bottom: 1px solid #eee;

    h1 {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
    }

    .more-icon {
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
            color: #409eff !important;
        }
    }
}

.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f5f5f5;
}

.message {
    display: flex;
    margin-bottom: 16px;

    &.message-self {
        flex-direction: row-reverse;

        .message-content {
            background: #95ec69;
            margin-right: 12px;
        }
    }

    &:not(.message-self) .message-content {
        background: #fff;
        margin-left: 12px;
    }
}

.message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    flex-shrink: 0;
    overflow: hidden;
}

.message-content {
    max-width: 70%;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-name {
    font-size: 12px;
    color: #999;
    margin: 0 0 4px 0;
}

.message-text {
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
    word-break: break-all;
}

.chat-input {
    display: flex;
    padding: 15px;
    border-top: 1px solid #eee;
    background: #fff;
    gap: 10px;

    textarea {
        flex: 1;
        min-height: 60px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
        font-family: inherit;
        font-size: 14px;
        outline: none;

        &:focus {
            border-color: #409eff;
        }
    }

    .send-btn {
        align-self: flex-end;
        padding: 8px 20px;
        background: #409eff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;

        &:hover {
            background: #66b1ff;
        }

        &:active {
            background: #3a8ee6;
        }
    }
}

.member-list {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.member-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        font-size: 16px;
        margin: 0;
    }

    .member-count {
        font-size: 12px;
        color: #999;
    }
}

.member-grid {
    flex: 1;
    overflow-y: auto;

    li {
        display: flex;

        img {
            width: 36px;
            height: 36px;
            border-radius: 4px;
            margin-bottom: 4px;
            overflow: hidden;
        }

        span {
            font-size: 12px;
            color: #666;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.member-actions {
    margin-top: 20px;

    button {
        width: 100%;
        padding: 10px;
        background: #f56c6c;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;

        &:hover {
            background: #f78989;
        }
    }
}
</style>
