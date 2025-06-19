<template>
  <div class="friend-container">
    <div class="friend-list">
      <div class="friend-header">
        <div>
          <img src="../assets/el1.png" />
          <img src="../assets/el2.png" />
          <img src="../assets/el3.png" />
        </div>
        <span>聊天室</span>
      </div>
      <span class="link-btn" @click="toChatList">点击进入</span>
    </div>
    <div class="friend-type">
      <div class="friend-type-title">
        <span v-for="(item, index) in navItem" :key="index" :class="{ 'active': curIndex === index }"
          @click="curIndex = index"> {{ item }} </span>
      </div>
      <div class="friend-type-fatie">
        <el-button type="primary" :icon="Help" size="small" @click="openFocusWindow">圈友</el-button>
        <el-button type="primary" :icon="Check" size="small" @click="openMyPublishWindow">已发布</el-button>
        <el-button type="primary" :icon="EditPen" size="small" @click="openPostingWindow">新发布</el-button>
      </div>
    </div>
    <div class="friend-content">
      <ul>
        <li v-for="item in list" :key="item.id">
          <img class="header-img" :src="item.avatar" />
          <div class="friend-info">
            <div class="friend-name">
              <h2>{{ item.name }}</h2>
              <el-dropdown placement="bottom">
                <img :src="downIcon" class="down-icon" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="reportIdentity(item.id)">举报身份</el-dropdown-item>
                    <el-dropdown-item>举报内容</el-dropdown-item>
                    <el-dropdown-item>屏蔽TA的圈</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="friend-text">{{ item.content }}</div>
            <div class="friend-imgs" v-if="item.imgs.length > 0">
              <img v-for="(img, index) in item.imgs" :key="index" :src="img" />
            </div>
            <div class="friend-time">
              <div>{{ item.time }} <img :src="deleteIcon" @click="deletePost(item.id)" /></div>
              <div class="friend-circle">
                <el-tooltip class="box-item" effect="dark" placement="left">
                  <template #content>
                    <span class="friend-icon"><img src="../assets/comment.png" />评论</span>
                    <span class="friend-icon"><img src="../assets/like.png" />点赞</span>
                  </template>
                  &middot;&middot;&middot;
                </el-tooltip>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>


    <el-dialog v-model="centerDialogVisible" title="提示" width="300" center>
      <span style="display: flex; justify-content: center;">确定要删除该发圈吗？</span>
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
import { ref } from 'vue'
import { EditPen, Help, Check } from '@element-plus/icons-vue'
import deleteIcon from '../assets/delete_icon.png'
import downIcon from '../assets/down-icon.png'
import headerImg from '../assets/header1.png'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'

const centerDialogVisible = ref(false)
const curIndex = ref(0)
const navItem = ref(['最新', '热门', '关注'])
const list = ref([
  {
    id: 1,
    name: '张三',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '01-01 12:00',
    imgs: [img1, img2, img3, img2]
  },
  {
    id: 2,
    name: '李四',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '刚刚',
    imgs: [img1, img2, img3]
  },
  {
    id: 3,
    name: '王五',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑。',
    time: '23小时前',
    imgs: []
  },
  {
    id: 4,
    name: '赵六',
    avatar: headerImg,
    content: '今天天气真好',
    time: '五分钟前',
    imgs: [img1, img2, img3]
  },
  {
    id: 5,
    name: '张三',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '01-01 12:00',
    imgs: [img1, img2, img3]
  },
  {
    id: 6,
    name: '李四',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '刚刚',
    imgs: [img1, img2, img3]
  },
  {
    id: 7,
    name: '王五',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑。',
    time: '23小时前',
    imgs: []
  },
  {
    id: 8,
    name: '赵六',
    avatar: headerImg,
    content: '今天天气真好',
    time: '五分钟前',
    imgs: [img1, img2, img3]
  }
])

console.log(import.meta.env.VITE_API_BASE_URL, 'import.meta.env.VUE_APP_API_BASE_URL')

const reportIdentity = id => {
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 600,
      url: `${import.meta.env.VITE_API_BASE_URL}/#/tipoff?id=${id}`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const openPostingWindow = (id) => {
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      title: '发贴',
      url: `${import.meta.env.VITE_API_BASE_URL}/#/posting?id=${id}`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const openMyPublishWindow = (id) => {
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      title: '我的发布',
      url: `${import.meta.env.VITE_API_BASE_URL}/#/myPublish?id=${id}`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const openFocusWindow = () => {
  // 检查是否在 Electron 环境中
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      url: `${import.meta.env.VITE_API_BASE_URL}/#/focusme`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const toChatList = (doorId) => {
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      title: '聊天室列表',
      url: `${import.meta.env.VITE_API_BASE_URL}/#/chatList?id=${doorId}`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const deletePost = (id) => {
  console.log(id)
  centerDialogVisible.value = true
}
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
    background-image: linear-gradient(to right, #DBEBF9, #E3F0FF, #D8F3FF);
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
      color: #5E97FF;
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
        background-color: #F0F0F0;
        border-radius: 11px;
        margin-right: 16px;
        cursor: pointer;

        &:hover,
        &.active {
          color: #fff;
          background-color: #5E97FF;
        }
      }
    }

    .friend-type-fatie {
      display: flex;
      font-size: 14px;
      color: #5E97FF;
      align-items: center;
      cursor: pointer;
      margin-right: 20px;
    }
  }

  .friend-content {
    width: calc(100% + 40px);
    height: calc(100% - 126px);
    overflow-y: auto;
    padding-right: 30px;
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
            width: 105px;
            height: 105px;
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
      color: #5E97FF;
    }
  }
}
</style>
