<template>
  <div class="chat-user">
    <div class="chat-user-container">
      <ul>
        <li :class="{ 'active': 0 === activeIndex }" @click="openFansWindow(0)">
          <img :src="grpImg1" class="user-icon" />
          <div class="user-info">
            <div class="user-name">
              <h2>新的粉丝</h2><span>3月24日 12:00</span>
            </div>
            <div class="user-message">
              <span>您有个好友待验证</span>
              <i>2</i>
            </div>
          </div>
        </li>
        <li :class="{ 'active': 1 === activeIndex }" @click="openKnowWindow(1)">
          <img :src="grpImg4" class="user-icon" />
          <div class="user-info">
            <div class="user-name">
              <h2>可能认识的人</h2><span>3月24日 12:00</span>
            </div>
            <div class="user-message">
              <span>发现你朋友的熟人</span>
              <i>2</i>
            </div>
          </div>
        </li>
        <li v-for="(item, index) in messageInfo" :key="index" :class="{ 'active': index + 2 === activeIndex }"
          @click="changeActive(index + 2, item)">
          <img :src="item.icon" class="user-icon" @click="openOtherInfo(item)" />
          <div class="user-info">
            <div class="user-name">
              <h2>{{ item.name }}</h2><span>{{ item.time }}</span>
            </div>
            <div class="user-message">
              <span>{{ item.message }}</span>
              <i v-if="item.count">{{ item.count }}</i>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="chat-content-container">
      <div class="chat-title-info">
        <span>{{ chatTitle }}</span>
        <el-icon color="#777" size="18" class="more-icon" @click="showDrawer">
          <MoreFilled />
        </el-icon>
      </div>
      <div class="chat-message-content">
        <ul>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" @click="openUserInfo" />
            <span class="user-message">hello,你好啊！</span>
          </li>
          <li class="message-reverse">
            <img src="../assets/usr-1.png" class="user-icon" />
            <span class="user-message">你好,请问有事情吗?</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">没事情，就是随便问问。</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">怎么不回复我呢？</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">hello,你好啊！</span>
          </li>
          <li class="message-reverse">
            <img src="../assets/usr-1.png" class="user-icon" />
            <span class="user-message">你好,请问有事情吗?</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">没事情，就是随便问问。</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">怎么不回复我呢？</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">hello,你好啊！</span>
          </li>
          <li class="message-reverse">
            <img src="../assets/usr-1.png" class="user-icon" />
            <span class="user-message">你好,请问有事情吗?</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">没事情，就是随便问问。</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">怎么不回复我呢？</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">hello,你好啊！</span>
          </li>
          <li class="message-reverse">
            <img src="../assets/usr-1.png" class="user-icon" />
            <span class="user-message">你好,请问有事情吗?</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">没事情，就是随便问问。</span>
          </li>
          <li>
            <img src="../assets/usr-3.png" class="user-icon" />
            <span class="user-message">怎么不回复我呢？</span>
          </li>
        </ul>
      </div>
      <div class="chat-message-input">
        <textarea placeholder="文明上网，理性发言"></textarea>
      </div>
    </div>
    <!--单聊-->
    <el-drawer v-model="chatDrawer" direction="rtl" :with-header="false" size="310px">
      <van-cell title="单元格" name="search" />
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import usrImg1 from '../assets/usr-1.png'
import usrImg2 from '../assets/usr-2.png'
import usrImg3 from '../assets/usr-3.png'
import grpImg1 from '../assets/grp-1.png'
import grpImg2 from '../assets/grp-2.png'
import grpImg3 from '../assets/grp-3.png'
import grpImg4 from '../assets/grp-4.png'
const activeIndex = ref(5)
const chatTitle = ref('相亲相爱一家人(7)')
const groupName = ref('相亲相爱一家人(7)')
const drawer = ref(false)
const chatDrawer = ref(false)
const isGroup = ref(false) // 是否是群聊
const messageInfo = ref([
  {
    name: '系统通知',
    time: '3月24日 12:00',
    message: '请问你还有什么问题吗?',
    count: 50,
    icon: grpImg2,
    isGroup: false
  },
  {
    name: '官方团队',
    time: '3月24日 12:00',
    message: '请问对我们的服务还满意吗?',
    icon: grpImg3,
    isGroup: false
  },
  {
    name: 'anni',
    time: '3月24日 12:00',
    message: '请问你还有什么问题吗?',
    count: 2,
    icon: usrImg1,
    isGroup: false
  },
  {
    name: '小蜜蜂',
    time: '3月24日 12:00',
    message: '你在做什么啊?哈哈',
    count: 1,
    icon: usrImg2,
    isGroup: false
  },
  {
    name: '我是只小小鸟',
    time: '3月24日 12:00',
    message: '怎么不回复我呢?',
    count: 15,
    icon: usrImg3,
    isGroup: true
  },
  {
    name: 'anni',
    time: '3月24日 12:00',
    message: '请问你还有什么问题吗?',
    count: 2,
    icon: usrImg1,
    isGroup: false
  },
  {
    name: '小蜜蜂',
    time: '3月24日 12:00',
    message: '你在做什么啊?哈哈',
    count: 1,
    icon: usrImg2,
    isGroup: false
  },
  {
    name: '我是只小小鸟',
    time: '3月24日 12:00',
    message: '怎么不回复我呢?',
    count: 15,
    icon: usrImg3,
    isGroup: true
  },
  {
    name: 'anni',
    time: '3月24日 12:00',
    message: '请问你还有什么问题吗?',
    count: 2,
    icon: usrImg1,
    isGroup: false
  },
  {
    name: '小蜜蜂',
    time: '3月24日 12:00',
    message: '你在做什么啊?哈哈',
    count: 1,
    icon: usrImg2,
    isGroup: false
  },
  {
    name: '我是只小小鸟',
    time: '3月24日 12:00',
    message: '怎么不回复我呢?',
    count: 15,
    icon: usrImg3,
    isGroup: true
  },

  {
    name: '我是只小小鸟',
    time: '3月24日 12:00',
    message: '怎么不回复我呢?',
    count: 15,
    icon: usrImg3,
    isGroup: true
  },

  {
    name: '我是只小小鸟',
    time: '3月24日 12:00',
    message: '怎么不回复我呢?',
    count: 15,
    icon: usrImg3,
    isGroup: true
  },

  {
    name: '我是只小小鸟',
    time: '3月24日 12:00',
    message: '怎么不回复我呢?',
    count: 15,
    icon: usrImg3,
    isGroup: true
  },
])
const changeActive = (index, item) => {
  activeIndex.value = index
  chatTitle.value = item.name
  isGroup.value = item.isGroup
}

const openOtherInfo = () => {
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 820,
      title: '用户信息',
      url: `/#/otherInfo?id=1`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const openFansWindow = (index) => {
  activeIndex.value = index
  // 检查是否在 Electron 环境中
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      title: '我的粉丝',
      url: `/#/fans?id=1`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const openKnowWindow = (index) => {
  activeIndex.value = index
  // 检查是否在 Electron 环境中
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      title: '可能认识的人',
      url: `/#/know?id=1`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const openUserInfo = () => {
  // 检查是否在 Electron 环境中
  if (window.electronAPI) {
    window.electronAPI.openNewWindow({
      width: 375,
      height: 720,
      title: '个人信息',
      url: `/#/userInfo?id=1`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}

const showDrawer = () => {
  if (isGroup.value) {
    // 群聊
    if (window.electronAPI) {
      window.electronAPI.openNewWindow({
        width: 375,
        height: 720,
        title: '群设置',
        url: `/#/groupSetting`
      })
    } else {
      console.warn('Electron API 不可用，可能在浏览器环境中运行')
    }
  } else {
    // 单聊
    chatDrawer.value = true
  }
}

</script>

<style lang="scss" scoped>
.chat-user {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.chat-user-container {
  width: 250px;
  height: 100vh;
  padding-bottom: 40px;
  background-color: #efefef;
  overflow: hidden;
  border-right: 1px solid #ddd;

  ul {
    width: 265px;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: scroll;

    li {
      list-style: none;
      display: flex;
      align-items: center;
      padding: 15px 10px;
      cursor: pointer;

      &.active {
        background-color: #dfdfdf;
      }

      .user-icon {
        width: 44px;
        height: 44px;
        overflow: hidden;
        margin-right: 10px;
      }

      .user-info {
        display: flex;
        flex: 1;
        flex-direction: column;

        .user-name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;

          h2 {
            font-size: 14px;
            padding: 0;
            margin: 0;
            color: #333;
            font-weight: 500;
          }

          span {
            font-size: 12px;
            color: #777;
          }
        }

        .user-message {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;

          span {
            color: #777;
            font-size: 12px;
          }

          i {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            background-color: rgb(253, 58, 58);
            color: #fff;
            font-size: 10px;
            border-radius: 50%;
            font-style: normal;
          }
        }

      }
    }
  }
}

.chat-content-container {
  display: flex;
  flex-direction: column;
  flex: 1;

  .chat-title-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;

    .more-icon {
      cursor: pointer;
    }
  }

  .chat-message-content {
    height: calc(100vh - 205px);
    box-sizing: border-box;
    padding: 20px 0;
    overflow: hidden;

    ul {
      padding: 0 20px;
      height: 100%;
      box-sizing: border-box;
      overflow-y: scroll;

      li {
        list-style: none;
        display: flex;
        margin-bottom: 15px;

        .user-icon {
          width: 36px;
          height: 36px;
          margin-right: 10px;
          cursor: pointer;
        }

        .user-message {
          padding: 8px;
          font-size: 14px;
          border-radius: 3px;
        }

        &.message-reverse {
          flex-direction: row-reverse;

          .user-icon {
            margin-left: 10px;
            margin-right: 0;
          }

          .user-message {
            background-color: #E2F3FF;
          }
        }
      }
    }
  }

  .chat-message-input {
    height: 200px;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
    overflow: hidden;

    textarea {
      width: 100%;
      height: 100%;
      padding: 15px;
      border: none;
      outline: none;
      box-sizing: border-box;
    }
  }
}

.chat-user-list {
  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
    padding: 20px;
    box-sizing: border-box;
    padding: 0;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50px;
      cursor: pointer;

      .add-user {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      img {
        width: 36px;
        height: 36px;
      }

      span {
        width: 100%;
        height: 25px;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
      }
    }
  }
}
</style>
