<template>
  <div class="settings-container">
    <!-- 第一组 -->
    <div class="settings-group">
      <div class="settings-item">
        <span>我的信息</span>
        <el-icon color="#777"><ArrowRight /></el-icon>
      </div>
      <div class="settings-item">
        <span>青少年守护</span>
        <el-icon color="#777"><ArrowRight /></el-icon>
      </div>
    </div>
    <!-- 第二组 -->
    <div class="settings-group">
      <div class="settings-item">
        <span>通用</span>
        <el-icon color="#777"><ArrowRight /></el-icon>
      </div>
      <div class="settings-item">
        <span>消息通知</span>
        <el-icon color="#777"><ArrowRight /></el-icon>
      </div>
    </div>
    <!-- 第三组 -->
    <div class="settings-group">
      <div class="settings-item">
        <span>安全中心</span>
        <span class="settings-status">
          <span class="status-protected">已保护</span>
          <el-icon color="#777"><ArrowRight /></el-icon>
        </span>
      </div>
    </div>
    <!-- 第四组 -->
    <div class="settings-group">
      <div class="settings-item">
        <span>自定义见面礼物门槛</span>
        <span class="settings-status">
          <img src="../../assets/coin.png" class="coin-icon" alt="金币" />
          <span class="gift-text">设置置币与我聊天</span>
          <el-icon color="#777"><ArrowRight /></el-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加后续的逻辑
</script>

<style scoped>
.settings-container {
  width: 375px;
  background: #e6ecf5;
  min-height: 100vh;
}
.settings-group {
  background: #f5f7fa;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 0 0;
}
.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 16px;
  height: 52px;
  color: #333;
  border-bottom: 1px solid #e6ecf5;
}
.settings-item:last-child {
  border-bottom: none;
}
.coin-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
.settings-arrow {
  font-family: 'iconfont', Arial, sans-serif;
  font-size: 18px;
  color: #bfc4cc;
  margin-left: 8px;
}
.settings-status {
  display: flex;
  align-items: center;
}
.status-protected {
  color: #3b8cff;
  font-size: 14px;
  margin-right: 6px;
}
.gift-icon {
  color: #ffc940;
  font-size: 18px;
  margin-right: 4px;
}
.gift-text {
  color: #ffc940;
  font-size: 14px;
  margin-right: 6px;
}
</style>
