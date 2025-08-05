<template>
  <div class="other-info-container">
    <!-- 头部信息 -->
    <div class="header">
      <img class="avatar" src="../assets/usr-1.png" alt="头像" />
      <div class="user-info">
        <div class="nickname-row">
          <span class="nickname">爱探险的朵拉</span>
          <img class="gender-icon" src="../assets/female_icon.png" alt="女" />
        </div>
        <div class="desc">昵称：小肥羊</div>
        <div class="desc">个性签名：青青草原</div>
      </div>
    </div>

    <!-- 认证信息 -->
    <div class="section cert-section">
      <div class="cert-title">认证信息</div>
      <div class="cert-list">
        <div class="cert-item">
          <img src="../assets/sj.png" alt="手机认证" />
          <span>手机认证</span>
        </div>
        <div class="cert-item" @click="handleIdAuth">
          <img src="../assets/sm.png" alt="实名认证" />
          <span>实名认证</span>
        </div>
        <div class="cert-item" @click="handleSchoolAuth">
          <img src="../assets/xx.png" alt="学校认证" />
          <span>学校认证</span>
        </div>
      </div>
    </div>

    <!-- 备注名 -->
    <div class="section remark-section">
      <span>备注名</span>
      <span class="remark-value">我是小肥羊</span>
    </div>

    <!-- 共同圈子/群聊 -->
    <div class="section link-section">
      <div class="link-row">
        <span>我和Ta共同的<span class="highlight-yellow">圈子</span></span>
      </div>
      <div class="link-row">
        <span>我和Ta共同的<span class="highlight-blue">群聊</span></span>
      </div>
    </div>

    <!-- 各类开关项 -->
    <div class="section switch-section">
      <div class="switch-row">
        <span>不看他的发圈</span>
        <el-switch v-model="otherInfo.notSee" />
      </div>
      <div class="switch-row">
        <span>把他推荐给好友</span>
      </div>
      <div class="switch-row">
        <span>拉入黑名单</span>
        <el-switch v-model="otherInfo.blacklist" />
      </div>
      <div class="switch-row">
        <span>举报</span>
      </div>
    </div>

    <!-- 添加分组 -->
    <div class="section group-section">
      <span>添加分组</span>
    </div>

    <!-- 底部按钮 -->
    <div class="footer-btns">
      <button class="chat-btn">私聊</button>
      <div class="follow-btn" @click="otherInfo.isFollow = !otherInfo.isFollow">
        <img v-if="otherInfo.isFollow" src="../assets/star-fill.png" alt="关注" />
        <img v-else src="../assets/star-un.png" alt="关注" />
        <span>{{ otherInfo.isFollow ? '已关注' : '关注' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可后续添加逻辑
import { ref, reactive } from 'vue'
const otherInfo = reactive({
  notSee: false,
  blacklist: false,
  isFollow: false
})
const handleIdAuth = () => {
  if (window.electronAPI) {
    window.electronAPI.openNewSecondWindow({
      width: 375,
      height: 800,
      title: '实名认证',
      url: `${import.meta.env.VITE_API_BASE_URL}/#/idAuth?id=111`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}
const handleSchoolAuth = () => {
  if (window.electronAPI) {
    window.electronAPI.openNewSecondWindow({
      width: 375,
      height: 800,
      title: '学校认证',
      url: `${import.meta.env.VITE_API_BASE_URL}/#/schoolAuth?id=111`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}
</script>

<style scoped>
.other-info-container {
  background: #f7f6ff;
  width: 375px;
  height: 100vh;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  padding: 16px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
}
.user-info {
  flex: 1;
}
.nickname-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: bold;
}
.gender-icon {
  width: 18px;
  height: 18px;
}
.desc {
  color: #888;
  font-size: 13px;
  margin-top: 2px;
}
.section {
  background: #fff;
  margin-bottom: 12px;
}
.cert-section {
  padding-bottom: 8px;
}
.cert-title {
  padding: 6px 16px 0;
  margin-bottom: 10px;
}
.cert-list {
  display: flex;
  justify-content: space-around;
  gap: 24px;
}
.cert-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}
.cert-item img {
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
}
.remark-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  height: 52px;
  padding: 0 16px;
}
.remark-value {
  color: #888;
}
.link-section {
  font-size: 15px;
}
.link-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 52px;
  background-image: url(../assets/right-arrow.png);
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) center;
  background-size: 14px 14px;
  cursor: pointer;
}
.highlight-yellow {
  color: #e6b200;
}
.highlight-blue {
  color: #4a90e2;
}
.switch-section {
  font-size: 15px;
}
.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 52px;
  background-image: url(../assets/right-arrow.png);
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) center;
  background-size: 14px 14px;
  cursor: pointer;
}
.group-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  height: 52px;
  padding: 0 16px;
  background-image: url(../assets/right-arrow.png);
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) center;
  background-size: 14px 14px;
  cursor: pointer;
}
.footer-btns {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 10px;
}
.chat-btn {
  width: 290px;
  flex: 1;
  background: #357aff;
  color: #fff;
  border: none;
  border-radius: 8px;
  height: 42px;
  font-size: 16px;
  margin-right: 12px;
  cursor: pointer;
}
.follow-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 42px;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
}

.follow-btn img {
  width: 24px;
  height: 24px;
}
.follow-btn span {
  font-size: 12px;
  color: #777;
}
</style>
