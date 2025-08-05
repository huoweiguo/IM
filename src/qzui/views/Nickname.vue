<template>
  <div class="profile-setup-container">
    <!-- 顶部导航 -->
    <TopNav title="昵称和头像" />

    <!-- 昵称设置区域 -->
    <div class="section">
      <h1>设置虚拟昵称和头像</h1>
      <h2>起一个你喜欢的昵称</h2>
      <!-- 头像设置区域 -->
      <div class="section">
        <div class="avatar-uploader" @click="triggerFileInput">
          <img v-if="avatarPreview" :src="avatarPreview" class="avatar-preview">
          <div v-else class="avatar-placeholder">
            <img src="../assets/camera.png" alt="上传图片" />
          </div>
          <input type="file" ref="fileInput" accept="image/*" @change="handleFileUpload" style="display: none">
        </div>
      </div>

      <div class="example-row">
        <span class="example-nickname" @click="useExampleNickname">
          {{ nickname }}
        </span>
        <button class="random-btn" @click="generateRandomNickname">
          <img src="../assets/refresh.png" />
          随机
        </button>
      </div>
    </div>

    <!-- 确认按钮 -->
    <div class="submit-button">
      <img src="../assets/submit.png" :disabled="!nickname || (!avatarPreview && !selectedAvatar)"
        @click="saveProfile" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '../../components/TopNav.vue'
const router = useRouter()
// 昵称相关
const nickname = ref('勇敢的心12138')
const exampleNicknames = [
  '我是喜羊羊', '快乐的小蜜蜂', '阳光少年',
  '星空漫游者', '梦想家', '开心果',
  '智慧树', '勇敢的心', '幸运星',
  '小小探险家', '快乐源泉', '阳光彩虹'
]

// 头像相关
const fileInput = ref(null)
const avatarPreview = ref('')
const selectedAvatar = ref(null)

// 使用示例昵称
const useExampleNickname = () => {
  nickname.value = '我是喜羊羊'
}

// 生成随机昵称
const generateRandomNickname = () => {
  const randomIndex = Math.floor(Math.random() * exampleNicknames.length)
  nickname.value = exampleNicknames[randomIndex]
}

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
  console.log('保存资料:', profileData)
  router.push('/actualName')
  // 这里可以添加保存到服务器的逻辑
}
</script>

<style scoped>
.profile-setup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  padding-top: 60px;
  background-color: #fff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 22px;
  color: #333;
}

.section {
  margin-bottom: 30px;
}

.section h1 {
  font-family: Source Han Sans CN-Bold;
  font-size: 24px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 8px;
}


.section h2 {
  font-family: Source Han Sans CN-Medium;
  font-size: 16px;
  font-weight: 500;
  color: #777;
  margin-bottom: 15px;
}

.nickname-input-group {
  position: relative;
  margin-bottom: 15px;
}

.nickname-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

.character-count {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #999;
}

.example-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.example-nickname {
  color: #333;
  font-size: 16px;
  padding: 8px 15px;
  cursor: pointer;
}

.random-btn {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  color: #1890ff;
}

.random-btn img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.random-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
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

.default-avatars h3 {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 25px 0 15px;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.avatar-option {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
}

.avatar-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-option.selected {
  border-color: #1890ff;
  box-shadow: 0 0 10px rgba(24, 144, 255, 0.3);
}

.confirm-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #40a9ff;
}

.confirm-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.submit-button {
  display: flex;
  justify-content: center;
}

.submit-button img {
  width: 140px;
  height: 52px;
  cursor: pointer;
}
</style>
