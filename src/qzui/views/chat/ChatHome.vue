<template>
  <div class="group-chat-outer">
    <TopNav />
    <div class="group-chat">
      <ChatSilder />
      <ChatHomeUserGroupList />

      <div class="chat-user">

        <div class="chat-content-container">
          <div class="chat-title-info">
            <span>{{ chatTitle }}</span>
            <el-icon color="#777" size="18" class="more-icon" @click="drawer = true">
              <MoreFilled />
            </el-icon>
          </div>
          <div class="chat-message-content">
            <ul>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">hello,你好啊！</span>
                </div>
              </li>
              <li class="message-reverse">
                <img src="../../assets/usr-1.png" class="user-icon" />
                <span class="user-message">你好,请问有事情吗?</span>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">没事情，就是随便问问。</span>
                </div>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">怎么不回复我呢？</span>
                </div>
              </li>
              <li>
                <img src="../../assets/usr-2.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">hello,你好啊！</span>
                </div>
              </li>
              <li class="message-reverse">
                <img src="../../assets/usr-1.png" class="user-icon" />
                <span class="user-message">你好,请问有事情吗?</span>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">没事情，就是随便问问。</span>
                </div>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">怎么不回复我呢？</span>
                </div>
              </li>
              <li>
                <img src="../../assets/usr-2.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">hello,你好啊！</span>
                </div>
              </li>
              <li class="message-reverse">
                <img src="../../assets/usr-1.png" class="user-icon" />
                <span class="user-message">你好,请问有事情吗?</span>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">没事情，就是随便问问。</span>
                </div>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">怎么不回复我呢？</span>
                </div>
              </li>
              <li>
                <img src="../../assets/usr-2.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">hello,你好啊！</span>
                </div>
              </li>
              <li class="message-reverse">
                <img src="../../assets/usr-1.png" class="user-icon" />
                <span class="user-message">你好,请问有事情吗?</span>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">没事情，就是随便问问。</span>
                </div>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <div>
                  <h3>请叫我女王</h3>
                  <span class="user-message">怎么不回复我呢？</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="chat-message-input">
            <textarea placeholder="文明上网，理性发言"></textarea>
          </div>
        </div>

        <el-drawer v-model="drawer" direction="rtl" :with-header="false" size="310px">
          <div class="chat-user-list">
            <h2>聊天室成员</h2>
            <ul>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <span>你若安好</span>
              </li>
              <li>
                <img src="../../assets/usr-2.png" class="user-icon" />
                <span>小鸟五毛飞得高</span>
              </li>
              <li>
                <img src="../../assets/usr-1.png" class="user-icon" />
                <span>我爱亲亲草原</span>
              </li>
              <li>
                <img src="../../assets/usr-2.png" class="user-icon" />
                <span>老妈（管钱的）</span>
              </li>
              <li>
                <img src="../../assets/usr-3.png" class="user-icon" />
                <span>老爸（爱钓鱼）</span>
              </li>
              <li>
                <img src="../../assets/usr-1.png" class="user-icon" />
                <span>老妹（学习强人）</span>
              </li>
              <li>
                <img src="../../assets/usr-2.png" class="user-icon" />
                <span>老妹（学习强人）</span>
              </li>
            </ul>
            <div class="user-group-button">
              <span @click="drawer = false">退出聊天室</span>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatSilder from '../../components/ChatSilder.vue'
import ChatHomeUserGroupList from '../../components/ChatHomeUserGroupList.vue'
import TopNav from '../../components/TopNav.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const activeIndex = ref(5)
const chatTitle = ref('A2桌游讨论(35)')
const groupName = ref('A2桌游讨论(35)')
const drawer = ref(false)
const changeActive = index => {
  activeIndex.value = index
}

</script>

<style lang="scss" scoped>
.group-chat {
  width: 100vw;
  display: flex;
}


.chat-user {
  display: flex;
  justify-content: space-between;
  flex: 1;
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
        }

        &>div {
          h3 {
            font-size: 12px;
            color: #999;
            margin-bottom: 5px;
          }
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
  position: relative;
  min-height: calc(100vh - 50px);

  h2 {
    font-size: 16px;
    margin-bottom: 15px;
  }

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

  .user-group-button {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      color: #fff;
      font-size: 14px;
      border-radius: 4px;
      background-color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
