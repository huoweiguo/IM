<template>
  <div class="school-auth-container">
    <!-- 认证有效期与状态 -->
    <div class="auth-status-box">
      <div class="auth-status-left">
        <span>认证有效期: 还未认证</span>
        <el-tag type="info" size="small">未认证</el-tag>
      </div>
      <div class="auth-status-desc">
        <el-checkbox-group disabled>
          <el-checkbox label="长期（学生/学校）" size="small" />
          <el-checkbox label="一年（社团/老师）" size="small" />
          <el-checkbox label="半年（职工）" size="small" />
        </el-checkbox-group>
        <div class="desc-tips">
          <el-checkbox disabled label="认证有效期从认证通过当日起算" size="small" />
        </div>
      </div>
    </div>

    <!-- 基本信息 -->
    <el-card class="base-info-card" shadow="never">
      <div class="base-info-title">基本信息</div>
      <el-form label-width="90px" :model="form">
        <el-form-item label="身份：">
          <span class="info-placeholder">未填写</span>
        </el-form-item>
        <el-form-item label="学校全称：">
          <span class="info-placeholder">未填写</span>
        </el-form-item>
        <el-form-item label="院系全称：">
          <span class="info-placeholder">未填写</span>
        </el-form-item>
        <el-form-item label="专业全称：">
          <span class="info-placeholder">未填写</span>
        </el-form-item>
        <el-form-item label="证件类型：">
          <span class="info-placeholder">未填写</span>
        </el-form-item>
        <el-form-item label="证件编号：">
          <span class="info-placeholder">未填写</span>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 认证材料 -->
    <el-card class="auth-material-card" shadow="never">
      <div class="auth-material-title">认证材料</div>
      <el-alert
        title="温馨提示"
        type="info"
        :closable="false"
        class="tips-alert"
      >
        <template #description>
          <div>1. 学生/生、校园卡、学生证、毕业证、学位证、录取书、学信网截图等材料均可；</div>
          <div>2. 社团/老师/职工认证，只接受带你/学校名称的上任/认证材料；</div>
          <div>3. 认证图片需信息完整清晰；</div>
          <div>4. 认证编号等信息如因隐私可适当遮挡，增加备注说明，仅用于认证流程。</div>
        </template>
      </el-alert>
      <div class="reference-upload-title">有效参考认证</div>
      <div class="reference-upload-box">
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :show-file-list="false"
          disabled
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击或拖拽上传图片</div>
        </el-upload>
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :show-file-list="false"
          disabled
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击或拖拽上传图片</div>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const form = ref({})
</script>

<style scoped>
.school-auth-container {
  padding: 20px;
  background: #f7f9fa;
}
.auth-status-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}
.auth-status-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.auth-status-desc {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.base-info-card,
.auth-material-card {
  margin-bottom: 16px;
}
.base-info-title,
.auth-material-title {
  font-weight: bold;
  margin-bottom: 12px;
}
.info-placeholder {
  color: #bfbfbf;
}
.tips-alert {
  margin-bottom: 16px;
}
.reference-upload-title {
  font-size: 14px;
  margin-bottom: 8px;
  margin-top: 12px;
}
.reference-upload-box {
  display: flex;
  gap: 16px;
}
.upload-demo {
  width: 120px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}
</style>
