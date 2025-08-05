<template>
  <div class="profile-setup-container">
    <!-- 顶部导航 -->
    <TopNav title="" />

    <!-- 昵称设置区域 -->
    <div class="section mb100">
      <h1>群名称和群头像</h1>
      <!-- 头像设置区域 -->
      <div class="section">
        <div class="avatar-uploader" @click="triggerFileInput">
          <img v-if="avatarPreview" :src="avatarPreview" class="avatar-preview">
          <div v-else class="avatar-placeholder">
            <img src="../../assets/camera.png" alt="上传图片" />
          </div>
          <input type="file" ref="fileInput" accept="image/*" @change="handleFileUpload" style="display: none">
        </div>
      </div>
      <div class="nickname-input">
        <span>群名称</span>
        <input type="text" v-model="actualName" placeholder="填写群名称（2-32）个字" />
      </div>
      <div class="nickname-input">
        <span>群简介</span>
        <input type="text" v-model="actualIntro" placeholder="填写群简介让大家更了解你的群" />
      </div>
    </div>
    <button class="next-btn" @click="router.push('/publicSphere/auth')">下一步</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopNav from '../../components/TopNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 昵称相关
const actualName = ref('')
const actualIntro = ref('')
// 头像相关
const fileInput = ref(null)
const avatarPreview = ref('')
const selectedAvatar = ref(null)

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
      selectedAvatar.value = null // 取消选择默认头像
    }
    reader.readAsDataURL(file)
  }
}

// 选择默认头像
const selectDefaultAvatar = (id) => {
  selectedAvatar.value = id
  avatarPreview.value = '' // 清除上传的头像
}

// 保存资料
const saveProfile = () => {
  const profileData = {
    nickname: nickname.value,
    avatar: avatarPreview.value || defaultAvatars.find(a => a.id === selectedAvatar.value)?.url
  }
  router.push('/question')
  console.log('保存资料:', profileData)
  // 这里可以添加保存到服务器的逻辑
}
</script>

<style lang="scss" scoped>
.profile-setup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 375px;
  padding: 60px 20px 0;
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 22px;
  color: #333;
}

.section h1 {
  font-family: Source Han Sans CN-Bold;
  font-size: 22px;
  color: #333333;
  font-weight: 500;
  margin-bottom: 8px;
}


.section h2 {
  font-family: Source Han Sans CN-Medium;
  font-size: 16px;
  font-weight: Medium;
  color: #777;
  margin-bottom: 15px;
}

.nickname-input-group {
  position: relative;
  margin-bottom: 15px;
}

.nickname-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  span {
    display: flex;
    align-items: center;
    font-weight: 500;
    height: 68px;
    padding: 0 10px;
    font-size: 16px;
  }

  input {
    flex: 1;
    height: 66px;
    font-size: 14px;
    border: none;
    outline: none;
    color: #666;
  }
}

.avatar-uploader {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 48px auto 38px;
  cursor: pointer;
  overflow: hidden;
  border: 1px dashed #ddd;
}

.avatar-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
}

.avatar-placeholder img {
  width: 24px;
  height: 24px;
}

.upload-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}

.actual-name {
  font-family: Source Han Sans CN-Regular;
  font-size: 14px;
  color: #777;
  margin: 24px 0;
  padding: 0 15px;
  text-align: center;
}

.next-btn {
  width: 100%;
  height: 50px;
  background: #3478F5;
  border-radius: 16px 16px 16px 16px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.mb100 {
  margin-bottom: 100px;
}
</style>
