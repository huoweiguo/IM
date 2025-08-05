<template>
  <div class="scan-follow-container">
    <div class="scan-follow-box">
      <div class="scan-header">
        <img src="../../assets/img3.png">
        <div>
          <h1>羊村喜羊羊</h1>
          <p class="subtitle">扫码关注我~</p>
        </div>
      </div>

      <!-- 这里放置二维码图片，实际使用时替换为您的二维码 -->
      <div class="qr-code">
        <img src="../../assets/qrcode.png" alt="扫码关注二维码" class="qr-image">
        <p class="qr-tip">扫描二维码，来圈子APP找我</p>
      </div>

      <div class="share-buttons">
        <div><img src="../../assets/download.png" alt="下载" /><span>下载</span></div>
        <div><img src="../../assets/wechat-icon.png" alt="微信" /><span>微信</span></div>
        <div><img src="../../assets/wechat-friend.png" alt="朋友圈" /><span>朋友圈</span></div>
        <div><img src="../../assets/qq.png" alt="QQ" /><span>QQ</span></div>
        <div><img src="../../assets/qq-zone.png" alt="空间" /><span>空间</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const share = (platform) => {
  // 这里可以添加分享逻辑
  console.log(`分享到${platform}`);
  // 实际项目中可以调用各平台的分享API
}
</script>

<style lang="scss" scoped>
.scan-follow-container {
  width: 375px;
  margin: 0 auto;
  height: 100vh;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: rgba(243, 244, 245, 1);
  border-radius: 12px;
  box-sizing: border-box;
}

.scan-follow-box {
  width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 70px;
  background-color: #fff;
  box-sizing: border-box;
}

.scan-header {
  display: flex;
  width: 200px;
  margin-bottom: 20px;

  img {
    width: 43px;
    height: 43px;
    border-radius: 8px;
    margin-right: 8px;
  }

  &>div {
    h1 {
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }

    p {
      font-size: 12px;
      color: #333;
    }
  }
}

.qr-code {
  padding: 15px;
  border-radius: 8px;
}

.qr-image {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
  border: 1px solid #eee;
}

.qr-tip {
  color: #888;
  font-size: 14px;
  margin-top: 10px;
}

.share-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  gap: 26px;

  &>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48px;

    img {
      width: 48px;
      height: 48px;
    }

    span {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
