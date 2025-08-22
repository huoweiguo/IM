<template>
    <div class="community-feed">
        <header class="feed-header">
            <div class="chat-room">
                <div class="avatars">
                    <!-- <img v-for="(avatar, index) in chatAvatars" :key="index" :src="avatar" :style="{ marginLeft: index > 0 ? '-10px' : 0 }" /> -->
                    <img src="../assets/el1.png" />
                    <img src="../assets/el2.png" :style="{ marginLeft: '-10px' }" />
                    <img src="../assets/el3.png" :style="{ marginLeft: '-10px' }" />
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

        <div class="loading" v-if="loading">
            <el-icon class="is-loading">
                <Loading />
            </el-icon>
        </div>

        <!--最新-->
        <main class="feed-content" v-show="activeTab === 0">
            <article v-for="post in posts" :key="post.id" class="post-card">
                <img class="avatar" :src="post.avatar" @click="openUserProfile(post.userId)" />

                <div class="post-content">
                    <header class="post-header">
                        <h3 class="username" @click="openUserProfile(post.userId)">{{ post.realName ? post.realName : post.nickName }}</h3>
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

                    <div v-if="post.mediaResourcesList?.length" class="post-images">
                        <img v-for="(img, index) in post.mediaResourcesList" :key="index" :src="img.fileUrl" @click="previewImage(img.fileUrl)" />
                    </div>

                    <footer class="post-footer">
                        <div class="post-times">
                            <time class="post-time">{{ formatCommentTime(post.createTime) }}</time>
                            <!-- <img :src="deleteIcon" @click="confirmDelete(post.id)" class="delete-btn" /> -->
                        </div>
                        <div class="post-actions">
                            <el-tooltip class="box-item" effect="dark" placement="left-start">
                                <template #content>
                                    <div class="actions-link">
                                        <span @click="comment(post)"><img src="../assets/gift@2x.png" /> 送礼</span>
                                        <span @click="comment(post)"><img src="../assets/comment.png" /> 评论</span>
                                        <span @click="like(post)" v-if="post.isLike == 0"><img src="../assets/like.png" /> 点赞</span>
                                        <span @click="like(post)" v-if="post.isLike == 1"><img src="../assets/like_fill.png" /> 取消点赞</span>
                                    </div>
                                </template>
                                <span class="action-menu">···</span>
                            </el-tooltip>
                        </div>
                    </footer>

                    <div class="post-like" v-if="post.likeQuantity > 0"><img src="../assets/like@2x.png" />{{ post.likeQuantity }}位圈友觉得很赞</div>
                    <div class="post-gift" v-if="post.giftQuantity > 0"><img src="../assets/gift.png" />收到{{ post.giftQuantity }}个礼物</div>
                    <div class="comment-list" v-if="post.replyList.length > 0">
                        <ul>
                            <li v-for="item in post.replyList" :key="item.id">
                                <div class="post-box">
                                    <div class="post-user-info">
                                        <img :src="item.avatar" class="avatar-reply" />
                                        <div class="post-user-opts">
                                            <div class="post-user-name">
                                                <a>{{ item.realName ? item.realName : item.nickName }}</a>
                                                <span>{{ formatCommentTime(item.createTime) }}</span>
                                            </div>
                                            <div class="post-user-content">
                                                回复<a>{{ item.targetRealName }}</a
                                                >：<span>{{ item.content }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="post-like link-div" v-if="post.commentQuantity - post.replyList.length > 0" @click="loadReply(post)">
                        共{{ post.commentQuantity - post.replyList.length }}条回复
                        <img src="../assets/right-reply.png" />
                    </div>
                </div>
            </article>
        </main>

        <!--热门-->
        <main class="feed-content" v-show="activeTab === 1">
            <article v-for="post in hots" :key="post.id" class="post-card">
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

                    <div v-if="post.imgs?.length" class="post-images">
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
                                    <el-dropdown-item> <img src="../assets/like.png" />点赞</el-dropdown-item>
                                </template>
                            </el-dropdown>
                        </div>
                    </footer>
                </div>
            </article>
        </main>

        <!--关注-->
        <main class="feed-content" v-show="activeTab === 2">
            <article v-for="post in follows" :key="post.id" class="post-card">
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

                    <div v-if="post.imgs?.length" class="post-images">
                        <img v-for="(img, index) in post.imgs" :key="index" :src="img" @click="previewImage(img)" />
                    </div>

                    <footer class="post-footer">
                        <time class="post-time">{{ formatCommentTime(post.createTime) }}</time>
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

        <el-dialog v-model="visibleComment" title="评论" width="400" center>
            <div class="comment-box">
                <el-input v-model="commentParams.content" class="comment-input" :rows="4" type="textarea" :placeholder="commentHolder" />
                <el-button type="primary" @click="submitComment">提交</el-button>
            </div>
        </el-dialog>
    </div>

    <!-- 发布弹窗 -->
    <el-dialog v-model="visible" title="发布动态" width="500">
        <Posting v-if="visible" @close="visible = false" @reload="reloadData()" />
    </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { EditPen, Help, Check } from '@element-plus/icons-vue';
import { createNewWindow } from '@/qzui/util/electronHelper';
import { ElMessage } from 'element-plus';
import emitter from '@/qzui/util/eventBus';
import { dynamicList, interactionComment, interactionList, interactionLike } from '@/api/community';
import { getItem, setItem } from '@/ui/util/storageHelper';
import { formatCommentTime } from '@/qzui/util/timeformat';
import Posting from '@/qzui/views/posting.vue';
const start_time = ref('');
const userId = ref(getItem('userPortrait') ? getItem('userPortrait') : '');

// 图标导入
import deleteIcon from '../assets/delete_icon.png';
import moreIcon from '../assets/down-icon.png';

const props = defineProps({
    communityId: {
        type: String,
        default: '',
    },
});
const loading = ref(false);
const router = useRouter();
const visible = ref(false);
const visibleComment = ref(false);
const commentHolder = ref('');

// 状态管理
const activeTab = ref(0);
const showDeleteDialog = ref(false);
const deletingPostId = ref(null);

// 导航标签
const navTabs = ['最新', '热门', '关注'];

// 帖子数据
const posts = ref([]);
const hots = ref([]);
const follows = ref([]);
const finish = ref(false);
const noData = ref(false);
const finishHot = ref(false);
const noDataHot = ref(false);
const finishFollow = ref(false);
const noDataFollow = ref(false);
const commentInfo = ref({});
const commentParams = reactive({
    content: '',
    dynamicId: '',
    targetUserId: '',
    userId: '',
});
// 方法定义
const enterChatRoom = () => {
    router.push('/chatHome');
};

const comment = (obj) => {
    commentInfo.value = obj;
    visibleComment.value = true;
    commentHolder.value = `回复${obj.realName ? obj.realName : obj.nickName}`;
    console.log(commentInfo.value);
};

const loadReply = async (obj) => {
    let startTime = obj.startTime ? obj.startTime : '';
    const params = {
        dynamicId: obj.id,
        type: 2, // 评论
    };
    const res = await interactionList(3, startTime, params);
    if (res.code === 0) {
        const arrList = res.data.length > 0 ? res.data : [];
        obj.replyList = [...obj.replyList, ...arrList];
        if (res.data.length > 0) {
            obj.startTime = res.data[res.data.length - 1].createTime;
        }
    } else {
        ElMessage.error(res.msg);
    }
};

const like = async (obj) => {
    const params = {
        dynamicId: obj.id,
        isLike: obj.isLike ? 0 : 1,
        userId: userId.value, // 点赞
        targetUserId: obj.userId,
    };
    const res = await interactionLike(params);
    if (res.code === 0) {
        if (params.isLike === 1) {
            obj.likeQuantity++;
        } else {
            obj.likeQuantity--;
        }
        obj.isLike = !obj.isLike;
    } else {
        ElMessage.error(res.msg);
    }
};

const submitComment = async () => {
    if (commentParams.content.replace(/\s+/, '') === '') {
        ElMessage.error('评论内容不能为空!');
        return false;
    }
    commentParams.userId = userId.value;
    commentParams.targetUserId = commentInfo.value.userId;
    commentParams.dynamicId = commentInfo.value.id;
    const res = await interactionComment(commentParams);
    if (res.code === 0) {
        commentParams.content = '';
        visibleComment.value = false;
        ElMessage.success('评论成功!');
    } else {
        ElMessage.error(res.msg);
    }
};

const getCommunityList = async (start_time = '') => {
    loading.value = true;
    const res = await dynamicList(10, start_time, {
        communityId: props.communityId,
        userId: userId.value,
        type: 0,
    });

    loading.value = false;

    if (res.code === 0) {
        let data = res.data || [];
        let newData = data.map((item) => {
            item.isReply = false;
            // 聊天记录列表
            item.replyList = [];
            // 是否还有回复记录
            item.replyStatus = true;
            return item;
        });
        posts.value = [...posts.value, ...newData];
        if (posts.value.length > 0 && data.length === 0) {
            finish.value = true;
            noData.value = false;
        } else if (posts.value.length === 0 && data.length === 0) {
            noData.value = true;
            finish.value = false;
        } else {
            finish.value = false;
            noData.value = false;
        }
    } else {
        ElMessage.error(res.msg);
    }
};

const getCommunityHotList = async (start_time = '') => {
    loading.value = true;
    const res = await dynamicList(10, start_time, {
        communityId: props.communityId,
        userId: userId.value,
        type: 1,
    });

    loading.value = false;
    if (res.code === 0) {
        let data = res.data || [];
        let newData = data.map((item) => {
            item.isReply = false;
            // 聊天记录列表
            item.replyList = [];
            // 是否还有回复记录
            item.replyStatus = true;
            return item;
        });
        hots.value = [...hots.value, ...newData];
        if (hots.value.length > 0 && data.length === 0) {
            finishHot.value = true;
            noDataHot.value = false;
        } else if (hots.value.length === 0 && data.length === 0) {
            noDataHot.value = true;
            finishHot.value = false;
        } else {
            finishHot.value = false;
            noDataHot.value = false;
        }
    } else {
        ElMessage.error(res.msg);
    }
};

const getCommunityFollowList = async (start_time = '') => {
    loading.value = true;
    const res = await dynamicList(10, start_time, {
        communityId: props.communityId,
        userId: userId.value,
        type: 2,
    });

    loading.value = false;
    if (res.code === 0) {
        let data = res.data || [];
        let newData = data.map((item) => {
            item.isReply = false;
            // 聊天记录列表
            item.replyList = [];
            // 是否还有回复记录
            item.replyStatus = true;
            return item;
        });
        follows.value = [...follows.value, ...newData];
        if (follows.value.length > 0 && data.length === 0) {
            finishFollow.value = true;
            noDataFollow.value = false;
        } else if (follows.value.length === 0 && data.length === 0) {
            noDataFollow.value = true;
            finishFollow.value = false;
        } else {
            finishFollow.value = false;
            noDataFollow.value = false;
        }
    } else {
        ElMessage.error(res.msg);
    }
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
    // createNewWindow({
    //     width: 375,
    //     height: 720,
    //     title: '发贴',
    //     url: '#/posting',
    // });
    visible.value = true;
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

const reloadData = () => {
    posts.value = [];
    hots.value = [];
    follows.value = [];
    getCommunityList();
    getCommunityHotList();
    getCommunityFollowList();
};

watch(
    () => props.communityId,
    (id) => {
        if (id) {
            reloadData();
        }
    }
);

reloadData();
</script>

<style lang="scss" scoped>
.loading {
    position: relative;
    text-align: center;
    height: 0;
    .is-loading {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
}
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

    .post-like,
    .post-gift {
        display: flex;
        align-items: center;
        height: 37px;
        font-size: 14px;
        color: #6a7ca1;
        font-family: Source Han Sans CN-Medium;
        border-bottom: 1px solid rgba(170, 170, 170, 0.4);

        img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }

    .link-div {
        cursor: pointer;
    }

    .post-gift {
        color: #387bf6;
    }

    .comment-list {
        font-size: 12px;
        padding: 6px 0;

        ul {
            margin-top: 6px;

            li {
                margin-bottom: 15px;
            }
        }

        span {
            font-size: 14px;
            color: #6a7ca1;
        }

        .avatar-reply {
            width: 38px;
            height: 38px;
            border-radius: 5px;
        }

        .post-box {
            .post-user-info {
                display: flex;
                align-items: flex-start;

                img {
                    margin-right: 10px;
                }

                .post-user-opts {
                    flex: 1;
                }

                .post-user-name {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;

                    a {
                        color: #6a7ca1;
                        font-size: 12px;
                        margin-left: 3px;
                    }

                    span {
                        color: #aaa;
                        font-size: 12px;
                    }
                }

                .post-user-content {
                    display: flex;
                    justify-content: flex-start;
                    font-size: 12px;
                    color: #333;

                    a {
                        color: #6a7ca1;
                        font-size: 12px;
                    }

                    span {
                        flex: 1;
                        font-size: 12px;
                        color: #333;
                    }
                }
            }
        }
    }
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

    .post-times {
        display: flex;
        align-items: center;
    }
}

.post-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.actions-link {
    display: flex;

    span {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin: 0 5px;

        img {
            width: 16px;
            margin-right: 3px;
        }
    }
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

.comment-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .comment-input {
        width: 100%;
        margin-bottom: 20px;
    }
}
</style>
