<template>
  <div class="invite-container">
    <div class="invite-header">
      <h1 class="app-name">邀请加入圈子APP</h1>
      <p class="invite-subtitle">邀请好友，加入A2社区</p>
    </div>

    <div class="qr-code-section">
      <div class="qr-code-box">
        <!-- 这里替换为实际的二维码图片 -->
        <img src="../assets/qrcode-invite.png" alt="长按扫码添加" class="qr-code-image" />
      </div>
      <p class="qr-code-tip">长按扫码添加</p>
      <p class="invite-text">您的邀请码</p>
      <p class="invite-code">B3H4C5D6</p>
    </div>

    <div class="share-section">
      <div class="share-buttons">
        <button class="share-btn" @click="share('download')">
          <img src="../assets/download.png" alt="下载" class="share-icon">
          <span>下载</span>
        </button>
        <button class="share-btn" @click="share('wechat')">
          <img src="../assets/wechat-icon.png" alt="微信" class="share-icon">
          <span>微信</span>
        </button>
        <button class="share-btn" @click="share('moments')">
          <img src="../assets/wechat-friend.png" alt="朋友圈" class="share-icon">
          <span>朋友圈</span>
        </button>
        <button class="share-btn" @click="share('qq')">
          <img src="../assets/qq.png" alt="QQ" class="share-icon">
          <span>QQ</span>
        </button>
        <button class="share-btn" @click="share('qzone')">
          <img src="../assets/qq-zone.png" alt="QQ空间" class="share-icon">
          <span>QQ空间</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const inviteCode = ref('B3H4C5D6')
const { copy } = useClipboard()

const copyInviteCode = async () => {
  try {
    await copy(inviteCode.value)
    alert('邀请码已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    alert('复制失败，请手动复制')
  }
}

const share = (platform) => {
  // 这里可以添加分享逻辑
  console.log(`分享到${platform}`)
  // 实际项目中可以调用各平台的分享API
};
</script>

<style scoped>
.invite-container {
  max-width: 100%;
  padding: 20px;
  text-align: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-image: linear-gradient(181deg,
      rgba(101, 139, 254, 1) 0,
      rgba(56, 164, 255, 1) 5.819093%,
      rgba(125, 168, 254, 1) 83.542585%,
      rgba(102, 162, 254, 1) 100%);
  color: white;
  height: 100%;
  box-sizing: border-box;
}

.invite-header {
  margin-bottom: 20px;
}

.app-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}

.invite-subtitle {
  font-size: 24px;
  opacity: 0.9;
}

.qr-code-section {
  margin: 25px 0;
  padding: 15px 0;
  border-radius: 16px;
  background-color: white;
}

.qr-code-box {
  width: 230px;
  height: 230px;
  margin: 0 auto;
  padding: 15px;
  border-radius: 12px;
}

.qr-code-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  padding: 10px;
  border: 1px solid #e1e1e1;
}

.qr-code-tip,
.invite-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 16px;
}

.invite-text {
  padding-top: 8px;
  border-top: 1px solid #e1e1e1;
  margin-bottom: 12px;
}

.invite-code {
  color: #3478F5;
  font-size: 20px;
  font-weight: bold;
}

.share-section {
  margin-top: 40px;
}

.share-title {
  font-size: 16px;
  margin-bottom: 15px;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.share-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  min-width: 60px;
}

.share-icon {
  width: 55px;
  height: 55px;
  border-radius: 8px;
  margin-bottom: 5px;
}

.share-btn span {
  font-size: 12px;
}
</style>
