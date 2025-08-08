<template>
    <div class="community-feed">
        <header class="feed-header">
            <div class="chat-room">
                <div class="avatars">
                    <!-- <img v-for="(avatar, index) in chatAvatars" :key="index" :src="avatar" :style="{ marginLeft: index > 0 ? '-10px' : 0 }" /> -->
                    <img src="../assets/el1.png" />
                    <img src="../assets/el2.png" />
                    <img src="../assets/el3.png" />
                </div>
                <span class="title">聊天室</span>
            </div>
            <button class="enter-btn" @click="enterChatRoom">点击进入</button>
        </header>

        <nav class="feed-nav">
            <div class="nav-tabs">
                <span v-for="(tab, index) in navTabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">
                    {{ tab }}
                </span>
            </div>
            <div class="nav-actions">
                <el-button type="primary" :icon="Help" size="small" @click="openFocusWindow">圈友</el-button>
                <el-button type="primary" :icon="Check" size="small" @click="openMyPosts">已发布</el-button>
                <el-button type="primary" :icon="EditPen" size="small" @click="openPostEditor">新发布</el-button>
            </div>
        </nav>

        <main class="feed-content">
            <article v-for="post in posts" :key="post.id" class="post-card">
                <img class="avatar" :src="post.avatar" @click="openUserProfile(post.userId)" />

                <div class="post-content">
                    <header class="post-header">
                        <h3 class="username" @click="openUserProfile(post.userId)">{{ post.name }}</h3>
                        <el-dropdown placement="bottom">
                            <img :src="moreIcon" class="more-btn" />
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="reportUser(post.id)">举报身份</el-dropdown-item>
                                    <el-dropdown-item @click="reportContent(post.id)">举报内容</el-dropdown-item>
                                    <el-dropdown-item @click="blockUser(post.userId)">屏蔽TA的圈</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </header>

                    <p class="post-text">{{ post.content }}</p>

                    <div v-if="post.imgs.length" class="post-images">
                        <img v-for="(img, index) in post.imgs" :key="index" :src="img" @click="previewImage(img)" />
                    </div>

                    <footer class="post-footer">
                        <time class="post-time">{{ post.time }}</time>
                        <div class="post-actions">
                            <img :src="deleteIcon" @click="confirmDelete(post.id)" class="delete-btn" />
                            <el-dropdown placement="left">
                                <span class="action-menu">···</span>
                                <template #dropdown>
                                    <el-dropdown-item> <img src="../assets/comment.png" />评论 </el-dropdown-item>
                                    <el-dropdown-item> <img src="../assets/like.png" />点赞 </el-dropdown-item>
                                </template>
                            </el-dropdown>
                        </div>
                    </footer>
                </div>
            </article>
        </main>

        <el-dialog v-model="showDeleteDialog" title="删除确认" width="300" center>
            <p style="text-align: center">确定要删除这条动态吗？</p>
            <template #footer>
                <div class="dialog-footer">
                    <button @click="showDeleteDialog = false">取消</button>
                    <button @click="deletePost" class="confirm-btn">确定</button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { EditPen, Help, Check } from '@element-plus/icons-vue';
import { createNewWindow } from '@/qzui/util/electronHelper';

// 图标导入
import deleteIcon from '../assets/delete_icon.png';
import moreIcon from '../assets/down-icon.png';
import headerImg from '../assets/header1.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';

// 头像图片
const chatAvatars = ['../assets/el1.png', '../assets/el2.png', '../assets/el3.png'];

// 状态管理
const activeTab = ref(0);
const showDeleteDialog = ref(false);
const deletingPostId = ref(null);

// 导航标签
const navTabs = ['最新', '热门', '关注'];

// 帖子数据
const posts = ref([
    {
        id: 1,
        userId: 101,
        name: '张三',
        avatar: headerImg,
        content: '我是一只小肥羊，每天在草原上快乐的奔跑',
        time: '01-01 12:00',
        imgs: [img1, img2, img3, img2],
    },
    {
        id: 2,
        userId: 102,
        name: '李四',
        avatar: headerImg,
        content: '我是一只小肥羊，每天在草原上快乐的奔跑',
        time: '刚刚',
        imgs: [img1, img2, img3],
    },
    {
        id: 3,
        userId: 103,
        name: '王五',
        avatar: headerImg,
        content: '我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑。',
        time: '23小时前',
        imgs: [],
    },
    {
        id: 4,
        userId: 104,
        name: '赵六',
        avatar: headerImg,
        content: '今天天气真好',
        time: '五分钟前',
        imgs: [img1, img2, img3],
    },
]);

// 方法定义
const enterChatRoom = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '聊天室列表',
        url: '#/chatList',
    });
};

const openFocusWindow = () => {
    createNewWindow({
        width: 375,
        height: 720,
        url: '#/focusme',
    });
};

const openMyPosts = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '我的发布',
        url: '#/myPublish',
    });
};

const openPostEditor = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '发贴',
        url: '#/posting',
    });
};

const openUserProfile = (userId) => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '用户资料',
        url: `#/userProfile?id=${userId}`,
    });
};

const previewImage = (imgUrl) => {
    // 图片预览功能
    console.log('预览图片:', imgUrl);
};

const reportUser = (postId) => {
    createNewWindow({
        width: 375,
        height: 600,
        url: `#/tipoff?id=${postId}`,
    });
};

const reportContent = (postId) => {
    console.log('举报内容:', postId);
};

const blockUser = (userId) => {
    console.log('屏蔽用户:', userId);
};

const confirmDelete = (postId) => {
    deletingPostId.value = postId;
    showDeleteDialog.value = true;
};

const deletePost = () => {
    if (deletingPostId.value) {
        posts.value = posts.value.filter((post) => post.id !== deletingPostId.value);
        showDeleteDialog.value = false;
        deletingPostId.value = null;
    }
};
</script>

<style lang="scss" scoped>
.community-feed {
    background: #fff;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.feed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: linear-gradient(to right, #dbebf9, #e3f0ff, #d8f3ff);
    border-radius: 8px;
    margin: 16px 16px 0;
}

.chat-room {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatars {
    display: flex;
}

.avatars img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
}

.enter-btn {
    padding: 6px 16px;
    background: #fff;
    color: #5e97ff;
    border: none;
    border-radius: 15px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #f0f8ff;
        transform: translateY(-1px);
    }
}

.feed-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
}

.nav-tabs {
    display: flex;
    gap: 16px;
}

.nav-tabs span {
    padding: 4px 12px;
    font-size: 14px;
    color: #aaa;
    background: #f0f0f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover,
    &.active {
        color: #fff;
        background: #5e97ff;
    }
}

.nav-actions {
    display: flex;
    gap: 8px;
}

.feed-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px;
}

.post-card {
    display: flex;
    gap: 12px;
    padding: 16px 0;
    border-bottom: 1px solid #f5f5f5;
}

.avatar {
    width: 43px;
    height: 43px;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }
}

.post-content {
    flex: 1;
    min-width: 0;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.username {
    font-size: 14px;
    color: #636b89;
    font-weight: 500;
    cursor: pointer;
    margin: 0;

    &:hover {
        color: #5e97ff;
    }
}

.more-btn {
    width: 16px;
    height: 16px;
    cursor: pointer;
    opacity: 0.6;

    &:hover {
        opacity: 1;
    }
}

.post-text {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    margin-bottom: 8px;
}

.post-images {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
}

.post-images img {
    width: 105px;
    height: 105px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
}

.post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #aaa;
}

.post-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.delete-btn {
    width: 14px;
    height: 14px;
    cursor: pointer;
    opacity: 0.6;

    &:hover {
        opacity: 1;
        color: #ff4d4f;
    }
}

.action-menu {
    font-size: 20px;
    cursor: pointer;
    color: #999;

    &:hover {
        color: #333;
    }
}

.dialog-footer {
    display: flex;
    border-top: 1px solid #eee;
    margin: 0 -20px -20px;
    height: 40px;

    button {
        flex: 1;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;

        &:hover {
            background: #f5f5f5;
        }

        &.confirm-btn {
            color: #5e97ff;

            &:hover {
                background: #f0f8ff;
            }
        }
    }

    button:not(:last-child) {
        border-right: 1px solid #eee;
    }
}
</style>
