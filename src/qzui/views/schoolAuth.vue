<template>
  <div class="school-auth-container">
    <div>
      <!-- 认证状态栏 -->
      <div class="auth-status-bar">
        <span class="status-btn">未认证</span>
        <div class="auth-status-info">
          <span>认证有效期: 还未认证</span>
        </div>
        <div class="auth-status-desc">
          <div class="auth-tip">
            <span class="tip-dot" />长期（学生/学校），一年（社团/老师），半年（职工）
          </div>
          <div class="auth-tip">
            <span class="tip-dot" />认证有效期从认证通过当日起算
          </div>
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="base-info-section">
        <div class="section-title">基本信息</div>
        <div class="info-list">
          <div class="info-item">
            <span class="item-label">身份证：</span>
            <span class="item-value">未填写</span>
            <span class="item-edit" />
          </div>
          <div class="info-item">
            <span class="item-label">学校全称：</span>
            <span class="item-value">未填写</span>
            <span class="item-edit" />
          </div>
          <div class="info-item">
            <span class="item-label">院系全称：</span>
            <span class="item-value">未填写</span>
            <span class="item-edit" />
          </div>
          <div class="info-item">
            <span class="item-label">专业全称：</span>
            <span class="item-value">未填写</span>
            <span class="item-edit" />
          </div>
          <div class="info-item">
            <span class="item-label">证件类型：</span>
            <span class="item-value">未填写</span>
            <span class="item-edit" />
          </div>
          <div class="info-item">
            <span class="item-label">证件编号：</span>
            <span class="item-value">未填写</span>
            <span class="item-edit" />
          </div>
        </div>
      </div>

      <!-- 认证材料 -->
      <div class="auth-material-section">
        <div class="section-title">认证材料</div>
        <div class="material-tip-box">
          <div class="tip-title">温馨提示</div>
          <ul class="tip-list">
            <li>1.学生证、校园卡、学信网、毕业证、学位证、录取书、学籍在线验证报告等材料均可</li>
            <li>2.社团/老师/职工认证，只接受身份+学校相关材料上传认证</li>
            <li>3.认证照片需信息完整</li>
            <li>4.认证编号等重要信息可遮挡照片以保证隐私，加密存储，仅用于认证流程</li>
          </ul>
        </div>
        <div class="reference-section">
          <div class="reference-title">有效参考认证</div>
          <div class="reference-boxes">
            <div class="reference-box" />
            <div class="reference-box" />
          </div>
        </div>
        <div class="reference-section">
          <div class="reference-title">无效参考认证</div>
          <div class="reference-boxes">
            <div class="reference-box" />
            <div class="reference-box" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 暂无逻辑，后续可补充
</script>

<style scoped>
.school-auth-container {
  background: #fff;
  height: 100vh;
  width: 375px;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  overflow: hidden;
}

.school-auth-container>div {
  width: calc(100% + 28px);
  padding: 16px 26px 16px 16px;
  padding-bottom: 30px;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: scroll;
}

.auth-status-bar {
  position: relative;
  background: #eaf2ff;
  border-radius: 8px;
  padding: 12px;
  overflow: hidden;
  margin-bottom: 12px;
}

.auth-status-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
}

.auth-status-info span {
  color: #333;
  font-size: 16px;
}

.status-btn {
  position: absolute;
  right: 0;
  top: 0;
  background: #338aff;
  color: #fff;
  border: none;
  padding: 2px 12px;
  font-size: 14px;
  cursor: default;
  border-radius: 0 0 0 8px;
}

.auth-status-desc {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.auth-tip {
  color: #777;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.tip-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #338aff;
  border-radius: 50%;
  margin-right: 4px;
}

.base-info-section {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(51, 138, 255, 0.04);
  margin-bottom: 12px;
}

.section-title {
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 12px 0;
  color: #222;
}

.info-list {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  height: 52px;
  font-size: 15px;
  padding-left: 16px;
  background-image: url(../assets/right-arrow.png);
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) center;
  background-size: 14px 14px;
  cursor: pointer;
}

.item-label {
  color: #333;
  min-width: 90px;
  font-size: 14px;
}

.item-value {
  color: #a0a0a0;
  flex: 1;
  text-align: right;
  padding-right: 8px;
}

.item-edit {
  width: 18px;
  height: 18px;
  margin-left: 8px;
}

.auth-material-section {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(51, 138, 255, 0.04);
  margin-bottom: 12px;
}

.material-tip-box {
  background: #E4EEFF;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
}

.tip-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  margin-bottom: 6px;
  width: 72px;
  height: 26px;
  background: #3478F5;
  border-radius: 4px;
}

.tip-list {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.tip-list li {
  font-size: 14px;
  color: #777;
  line-height: 24px;
  margin-bottom: 5px;
}

.reference-title {
  color: #338aff;
  font-size: 14px;
  margin-bottom: 8px;
  margin-top: 8px;
}

.reference-boxes {
  display: flex;
  gap: 12px;
}

.reference-box {
  flex: 1;
  height: 64px;
  background: #f0f0f0;
  border-radius: 6px;
  border: 1px dashed #d0d0d0;
}
</style>
