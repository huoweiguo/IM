<template>
    <div class="friend-container">
        <div class="friend-content" ref="scrollableDiv">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <img class="header-img" :src="item.avatar" />
                    <div class="friend-info">
                        <div class="friend-name">
                            <h2>{{ item.realName ? item.realName : item.nickName }}</h2>
                            <!-- <el-dropdown placement="bottom">
                <img :src="downIcon" class="down-icon" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="reportIdentity(item.id)">举报身份</el-dropdown-item>
                    <el-dropdown-item>举报内容</el-dropdown-item>
                    <el-dropdown-item>屏蔽TA的圈</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
</el-dropdown> -->
                        </div>
                        <div class="friend-text">{{ item.content }}</div>
                        <div class="friend-imgs" v-if="item.mediaResourcesList?.length > 0">
                            <img v-for="(img, index) in item.mediaResourcesList" :key="index" :src="img.fileUrl" />
                        </div>
                        <div class="friend-time">
                            <div>{{ formatCommentTime(item.createTime) }} <img :src="deleteIcon"
                                    @click="deletePost(item.id)" /></div>
                            <!-- <div class="friend-circle">
                <el-tooltip class="box-item" effect="dark" placement="left">
                  <template #content>
                    <span class="friend-icon"><img src="../assets/comment.png" />评论</span>
                    <span class="friend-icon"><img src="../assets/like.png" />点赞</span>
                  </template>
                  &middot;&middot;&middot;
                </el-tooltip>
              </div> -->
                        </div>
                    </div>
                </li>
            </ul>

            <div class="no-data" v-if="nodata">没有更多数据了...</div>
            <div class="no-data" v-if="isEmpty">
                <el-empty image-size="80" description="暂无数据" />
            </div>
        </div>

        <el-dialog v-model="centerDialogVisible" title="提示" width="300" center>
            <span style="display: flex; justify-content: center">确定要删除该发圈吗？</span>
            <template #footer>
                <div class="dialog-footer">
                    <span @click="centerDialogVisible = false">取消</span>
                    <span @click="centerDialogVisible = false">确定</span>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createNewWindow } from '@/qzui/util/electronHelper';
import { dynamicListByUserId } from '@/api/community';
import { throttle } from 'lodash-es';
import { formatCommentTime } from '@/qzui/util/timeformat';
import deleteIcon from '../assets/delete_icon.png';
import headerImg from '../assets/header1.png';
const scrollableDiv = ref(null);
const startTime = ref('');
const nodata = ref(false);
const isEmpty = ref(false);
const pageSize = ref(10);

const centerDialogVisible = ref(false);
const curIndex = ref(0);
const list = ref([]);
const reportIdentity = (id) => {
    createNewWindow({
        width: 375,
        height: 600,
        url: `#/tipoff?id=${id}`,
    });
};

const deletePost = (id) => {
    centerDialogVisible.value = true;
};

const getMyPublishList = async (start_time = '') => {
    if (nodata.value) return;
    const res = await dynamicListByUserId(pageSize.value, start_time);
    if (res.code === 0) {
        console.log(res.data, 'res.data');
        list.value = [...list.value, ...res.data];
        if (res.data.length > 0) {
            startTime.value = res.data[res.data.length - 1].createTime;
        }

        if (res.data.length < pageSize.value) {
            nodata.value = true;
        } else if (res.data.length === 0 && list.value.length === 0) {
            isEmpty.value = true;
        }
    }
}

const handleScroll = throttle((event) => {
    const element = event.target;
    // 判断是否滚动到底部
    const isBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (isBottom) {
        console.log('已经滚动到底部scroll');
        getMyPublishList(startTime.value)
    }
}, 100);

onMounted(() => {
    getMyPublishList(startTime.value);
    scrollableDiv.value.addEventListener('scroll', handleScroll);
})
</script>

<style lang="scss" scoped>
.friend-container {
    background-color: #fff;
    padding: 16px;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;

    .friend-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 64px;
        background-image: linear-gradient(to right, #dbebf9, #e3f0ff, #d8f3ff);
        padding: 0 12px;
        box-sizing: border-box;
        margin-bottom: 20px;
        border-radius: 8px;

        .friend-header {
            display: flex;
            align-items: center;

            &>div {
                display: flex;
                align-items: center;
                margin-right: 8px;
                font-size: 20px;
                color: #333;

                img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-left: -10px;

                    &:nth-child(1) {
                        margin-left: 0;
                    }
                }
            }
        }

        .link-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 29px;
            color: #5e97ff;
            font-size: 14px;
            background-color: #fff;
            border-radius: 15px;
            font-weight: 500;
            cursor: pointer;
        }
    }

    .friend-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 22px;
        margin-bottom: 20px;
        overflow: visible !important;

        .friend-type-title {
            display: flex;
            align-items: center;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 44px;
                height: 22px;
                font-size: 12px;
                color: #aaa;
                background-color: #f0f0f0;
                border-radius: 11px;
                margin-right: 16px;
                cursor: pointer;

                &:hover,
                &.active {
                    color: #fff;
                    background-color: #5e97ff;
                }
            }
        }

        .friend-type-fatie {
            display: flex;
            font-size: 14px;
            color: #5e97ff;
            align-items: center;
            cursor: pointer;
            margin-right: 20px;
        }
    }

    .friend-content {
        width: 100%;
        height: calc(100vh - 20px);
        overflow-y: auto;
        scrollbar-width: none;
        padding-right: 0;

        .no-data {
            display: flex;
            justify-content: center;
            font-size: 14px;
            color: #777;
            padding: 10px 0;
        }
    }

    .friend-content::-webkit-scrollbar {
        display: none;
    }

    ul {
        padding: 0;

        li {
            display: flex;
            margin-bottom: 32px;

            .header-img {
                width: 43px;
                height: 43px;
                border-radius: 8px;
                margin-right: 8px;
                overflow: hidden;
            }

            .friend-info {
                flex: 1;

                .friend-name {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 21px;
                    margin-bottom: 4px;

                    h2 {
                        font-size: 14px;
                        color: rgba(99, 107, 137, 1);
                        font-family: Source Han Sans CN-Medium;
                        font-weight: 500;
                    }

                    img {
                        width: 16px;
                        height: 16px;
                        outline: none;
                        cursor: pointer;
                    }
                }

                .friend-text {
                    font-family: Source Han Sans CN-Regular;
                    color: rgba(51, 51, 51, 1);
                    font-size: 14px;
                    margin-bottom: 8px;
                }

                .friend-imgs {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 8px;

                    img {
                        max-width: 80px;
                        height: 80px;
                        display: block;
                        margin-right: 8px;
                        margin-bottom: 8px;
                    }
                }

                .friend-time {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-family: Source Han Sans CN-Regular;
                    color: rgba(170, 170, 170, 1);
                    font-size: 14px;

                    &>div {
                        display: flex;
                        align-items: center;

                        img {
                            width: 14px;
                            height: 14px;
                            cursor: pointer;
                            margin-left: 8px;
                        }
                    }

                    .friend-circle {
                        font-size: 20px;
                    }
                }
            }
        }
    }
}

.friend-icon {
    display: inline-block;
    margin: 0 8px;
    cursor: pointer;

    img {
        width: 12px;
        height: 12px;
        margin-right: 3px;
    }
}

.dialog-footer {
    display: flex;
    border-top: 1px solid rgba(238, 238, 238, 1);
    margin: 0 -16px -16px;
    height: 40px;

    span {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex: 1;
        border-right: 1px solid rgba(238, 238, 238, 1);
        cursor: pointer;
        font-size: 14px;

        &:last-child {
            border-right: none;
            color: #5e97ff;
        }
    }
}
</style>
