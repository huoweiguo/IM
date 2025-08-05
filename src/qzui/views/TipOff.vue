<template>
  <div class="tipoff__container">
    <div class="tipoff__title">举报身份</div>

    <div class="el-dropdown-link">
      <span>{{ dropdownText }}</span>
      <el-dropdown :hide-on-click="false">
        <div class="tipoff__arrow"><img src="../assets/right-arrow.png" /></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, index) in resonList" :key="index" @click="handledrop(item)">
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="tipoff__content">
      <el-input v-model="textarea" maxlength="200" class="textarea-input" placeholder="请输入举报理由， 最少5个字" show-word-limit
        type="textarea" />
    </div>

    <div class="tipoff__upload">
      <h2>上传图片</h2>
      <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </div>

    <div class="tipoff__btn">
      <span @click="submit">提交</span>
    </div>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import previewImge from '../assets/img-preview.png'
const dropdownText = ref('举报原因')
const resonList = ref(['不符合圈子身份', '虚假身份/冒充他人', '其他'])
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const textarea = ref('') // 举报理由
const fileList = ref([
  {
    name: 'food.jpeg',
    url: previewImge
  },
  {
    name: 'plant-1.png',
    url: previewImge
  },
  {
    name: 'food.jpeg',
    url: previewImge
  }
])

const handledrop = (text) => {
  dropdownText.value = text
}

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.tipoff__container {
  position: relative;
  width: 375px;
  min-height: 100vh;
  padding: 20px 20px 70px;
  box-sizing: border-box;

  .tipoff__title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    text-align: center;
  }

  .el-dropdown-link {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    outline: none;
    cursor: pointer;
    margin-bottom: 20px;

    span {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }

    .tipoff__arrow {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 54px;
      height: 54px;
      outline: none;

      img {
        width: 12px;
        height: 12px;
      }
    }
  }

  .tipoff__content {
    margin-bottom: 12px;
  }

  .tipoff__upload {
    h2 {
      font-size: 14px;
      color: #333333;
      font-weight: 500;
      margin-bottom: 10px;
    }

    :deep(.el-upload-list__item) {
      width: 77px;
      height: 77px;
    }

    :deep(.el-upload--picture-card) {
      width: 77px;
      height: 77px;
    }
  }

  .tipoff__btn {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px 20px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #3478F5;
      height: 50px;
      border-radius: 5px;
      font-size: 16px;
    }
  }
}

:deep(.el-textarea__inner) {
  width: 100%;
  height: 110px;
  background-color: #f0f0f0;
  outline: none;
  padding: 10px 15px;
}
</style>
