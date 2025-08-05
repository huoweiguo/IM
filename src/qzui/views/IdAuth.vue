<template>
  <div class="id-auth-container">
    <div class="auth-list">
      <!-- 人脸认证-未认证 -->
      <div class="auth-card face-card">
        <div class="auth-card-content">
          <div class="auth-icon">
            <img src="../assets/id-face.png" alt="人脸认证" />
          </div>
          <div class="auth-info">
            <div class="auth-title">人脸认证</div>
            <div class="auth-desc">手动输入身份信息后扫描人脸</div>
          </div>
        </div>
        <button class="auth-btn auth-btn-dark">立即认证</button>
      </div>
      <!-- 支付宝认证-未认证 -->
      <div class="auth-card alipay-card">
        <div class="auth-card-content">
          <div class="auth-icon">
            <img src="../assets/id-alipay.png" alt="支付宝认证" />
          </div>
          <div class="auth-info">
            <div class="auth-title">支付宝认证</div>
            <div class="auth-desc">采用支付宝的实名认证</div>
          </div>
        </div>
        <button class="auth-btn auth-btn-dark">立即认证</button>
      </div>
      <!-- 人脸认证-已认证 -->
      <div class="auth-card face-card">
        <div class="auth-card-content">
          <div class="auth-icon">
            <img src="../assets/id-face.png" alt="人脸认证" />
          </div>
          <div class="auth-info">
            <div class="auth-title">人脸认证</div>
            <div class="auth-desc">手动输入身份信息后扫描人脸</div>
          </div>
        </div>
        <div class="auth-btn auth-btn-checked">
          <span class="check-icon"><img src="../assets/id-check.png" alt="已认证" /></span>
          已认证
        </div>
      </div>
      <!-- 支付宝认证-已认证 -->
      <div class="auth-card alipay-card">
        <div class="auth-card-content">
          <div class="auth-icon">
            <img src="../assets/id-alipay.png" alt="支付宝认证" />
          </div>
          <div class="auth-info">
            <div class="auth-title">支付宝认证</div>
            <div class="auth-desc">采用支付宝的实名认证</div>
          </div>
        </div>
        <div class="auth-btn auth-btn-checked auth-btn-checked-blue">
          <span class="check-icon"><img src="../assets/id-check.png" alt="已认证" /></span>
          已认证
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.id-auth-container {
  background: #fff;
  height: 100vh;
  padding: 16px;
}
.id-auth-header {
  padding: 32px 0 24px 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #222;
}
.auth-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
}
.auth-card {
  width: 340px;
  min-height: 72px;
  background: #f5f7fa;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  position: relative;
}
.auth-card-content {
  display: flex;
  margin-bottom: 16px;
}
.face-card {
  background: #F7F0EE;
}
.alipay-card {
  background: #E3EDFF;
}
.auth-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}
.auth-icon img {
  width: 46px;
  height: 46px;
}
.auth-info {
  flex: 1;
}
.auth-title {
  font-size: 16px;
  font-weight: 600;
  color: #222;
}
.auth-desc {
  font-size: 13px;
  color: #888;
  margin-top: 2px;
}
.auth-btn {
  min-width: 110px;
  height: 36px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.auth-btn-dark {
  background: #232c36;
  color: #fff;
}
.auth-btn-checked {
  background: #f7c6a0;
  color: #fff;
  cursor: default;
  font-weight: 500;
  position: relative;
}
.auth-btn-checked-blue {
  background: #6ea8ff;
}
.check-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
}
.check-icon img {
  width: 16px;
  height: 16px;
}
</style>
