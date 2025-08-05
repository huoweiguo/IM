<template>
  <div class="group-setting">
    <div class="chat-user-list">
      <ul>
        <li>
          <img src="../assets/usr-3.png" class="user-icon" />
        </li>
        <li>
          <img src="../assets/usr-2.png" class="user-icon" />
        </li>
        <li>
          <img src="../assets/usr-1.png" class="user-icon" />
        </li>
        <li>
          <img src="../assets/usr-2.png" class="user-icon" />
        </li>
        <li>
          <img src="../assets/usr-3.png" class="user-icon" />
        </li>
        <li>
          <img src="../assets/usr-1.png" class="user-icon" />
        </li>
        <li>
          <img src="../assets/usr-2.png" class="user-icon" />
        </li>
        <li>
          <div class="add-user" @click="openChatWindow">
            <el-icon>
              <Plus />
            </el-icon>
          </div>
        </li>
      </ul>
    </div>
    <div class="group-item">
      <div>
        <ul>
          <li>
            <span>群聊名称</span>
            <i>喜羊羊、喜羊羊</i>
          </li>
          <li><span>群头像</span><i></i></li>
          <li><span>群二维码</span><i></i></li>
          <li><span>群公告</span><i></i></li>
          <li><span>群备注</span><i></i></li>
          <li><span>群管理</span><i></i></li>
        </ul>

        <ul>
          <li><span>查找聊天记录</span><i></i></li>
          <li><span>文件记录</span><i></i></li>
          <li><span>消息免打扰</span><i></i></li>
          <li><span>置顶聊天</span><i></i></li>
        </ul>

        <ul>
          <li><span>我在本群的昵称</span><i></i></li>
          <li><span>显示群成员昵称</span><i></i></li>
        </ul>
      </div>
    </div>
    <div class="group-btns">
      <span>清空聊天记录</span>
      <span>解散并删除</span>
    </div>
  </div>
</template>

<script setup>
const openChatWindow = () => {
  // 检查是否在 Electron 环境中
  if (window.electronAPI) {
    window.electronAPI.openNewSecondWindow({
      width: 604,
      height: 440,
      url: `/#/groupChat`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}
</script>

<style lang="scss" scoped>
.group-setting {
  position: relative;
  width: 375px;
  height: 100vh;
  background-color: #efefef;
  box-sizing: border-box;
  padding-bottom: 104px;

  .group-btns {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 104px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      height: 52px;
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      font-size: 14px;
      color: #FF5555;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .chat-user-list {
    padding: 16px;
    background-color: #fff;
    min-height: auto !important;

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding: 20px;
      box-sizing: border-box;
      padding: 0;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
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

  .group-item {
    width: 100%;
    overflow: hidden;

    &>div {
      overflow-y: scroll;
      height: calc(100vh - 174px);
      width: calc(100% + 20px);
    }

    ul {
      background-color: #fff;
      margin: 10px 0;

      li {
        cursor: pointer;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;

        span {
          font-size: 14px;
          color: #333;
        }

        i {
          font-size: 14px;
          background: url('../assets/right-arrow.png') no-repeat right center;
          background-size: 12px 12px;
          font-style: normal;
          padding-right: 20px;
          color: #777;
          min-height: 12px;
          min-width: 12px;
        }
      }
    }
  }
}
</style>
