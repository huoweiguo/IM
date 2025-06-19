<template>
  <div class="posting-container">
    <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>
    <div class="posting-content">
      <textarea v-model="params.content" class="posting-area" placeholder="分享思考和感悟，收获更多粉丝" />
    </div>
    <ul class="posting-bottom">
      <li @click="drawer = true">
        <div>
          <el-icon>
            <User />
          </el-icon>谁可以看
        </div>
        <el-icon color="#999">
          <ArrowRight />
        </el-icon>
      </li>
      <!-- <li @click="drawer2 = true">
        <div>
          <el-icon>
            <View />
          </el-icon>对谁可见
        </div>
        <el-icon color="#999">
          <ArrowRight />
        </el-icon>
      </li> -->
    </ul>

    <div class="posting-btn">
      <span @click="handlePublish">发布</span>
    </div>

    <!--谁可以看-->
    <el-drawer v-model="drawer" title="谁可以看" direction="btt" size="60%">
      <div class="drawer-content">
        <el-radio-group v-model="params.resource">
          <el-radio value="1"><span>所有圈友</span><i>对所有圈友可见</i></el-radio>
          <el-radio value="2"><span>关注我的圈友</span><i>仅对已关注我的圈友可见</i></el-radio>
          <el-radio value="3"><span>我关注的圈友</span><i>仅对我关注的圈友可见</i></el-radio>
          <el-radio value="4"><span>仅陌生人可见</span><i>对完全没有互关关系的人可见</i></el-radio>
        </el-radio-group>
        <div class="drawer-button" @click="drawer = false">确定</div>
      </div>
    </el-drawer>

    <!--对谁可见-->
    <el-drawer v-model="drawer2" title="对谁可见" direction="btt" size="60%">
      <div class="drawer-container">
        <ul>
          <li v-for="item in allFriends" :key="item.id" @click="selectLi(item.id)"
            :class="{ active: params.selected.includes(item.id) }">
            <i></i>
            <img :src="item.url" alt="" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <div class="drawer-button" @click="drawer2 = false">确定 ({{ params.selected.length }}/{{ allFriends.length }})
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
const drawer = ref(false)
const drawer2 = ref(false)
import img1 from '../assets/img-preview.png'
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileList = ref([
  { name: 'hshhs', url: img1 },
  { name: 'ttew', url: img1 },
  { name: 'ffdf', url: img1 }
])
const params = reactive({
  content: '',
  resource: '1',
  selected: []
})
const allFriends = ref([
  { id: 1, name: '我是一只小小鸟，飞不动', url: img1 },
  { id: 3, name: 'hshhs', url: img1 },
  { id: 4, name: 'hshhs', url: img1 },
  { id: 2, name: 'hshhs', url: img1 },
  { id: 41, name: 'hshhs', url: img1 },
  { id: 51, name: 'hshhs', url: img1 },
  { id: 43, name: 'hshhs', url: img1 },
  { id: 21, name: 'hshhs', url: img1 },
  { id: 22, name: 'hshhs', url: img1 },
  { id: 23, name: 'hshhs', url: img1 },
  { id: 24, name: 'hshhs', url: img1 },
  { id: 25, name: 'hshhs', url: img1 },
  { id: 26, name: 'hshhs', url: img1 },
  { id: 27, name: 'hshhs', url: img1 },
  { id: 28, name: 'hshhs', url: img1 },
  { id: 29, name: 'hshhs', url: img1 },
  { id: 30, name: 'hshhs', url: img1 },
  { id: 31, name: 'hshhs', url: img1 },
  { id: 32, name: 'hshhs', url: img1 },
  { id: 33, name: 'hshhs', url: img1 },
  { id: 34, name: 'hshhs', url: img1 },
  { id: 35, name: 'hshhs', url: img1 }
])
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
const selectLi = (id) => {
  const index = params.selected.indexOf(id)
  if (index == -1) {
    params.selected.push(id)
  } else {
    params.selected.splice(index, 1)
  }
}

const handlePublish = () => {
  // 发布成功关闭窗口
  ElMessage({
    message: '发布成功',
    type: 'success'
  })
  if (window.electronAPI) {
    setTimeout(() => {
      window.electronAPI.closeNewWindow()
    }, 1500)
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}
</script>

<style lang="scss" scoped>
.posting-container {
  width: 375px;
  height: 100vh;
  padding: 40px 16px;
  box-sizing: border-box;

  :deep(.el-upload--picture-card) {
    width: 78px;
    height: 78px;
  }

  :deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 78px;
    height: 78px;
  }

  .posting-content {
    margin: 20px 0;
  }

  .posting-area {
    height: 300px;
    width: 100%;
    outline: none;
    border: 1px solid #eee;
    padding: 10px;
    resize: none;
    box-sizing: border-box;

    &::placeholder {
      font-size: 14px;
      color: #aaa;
    }
  }

  .posting-bottom {
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 45px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      padding: 0 16px;

      &>div {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 14px;

        i {
          margin-right: 5px;
        }
      }
    }
  }

  :deep(.el-drawer__header) {
    margin-bottom: 16px;
  }

  .drawer-content {
    position: relative;
    width: 100%;
    height: 100%;

    :deep(.el-radio-group) {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }

    :deep(.el-radio) {
      width: 100%;
    }

    :deep(.el-radio__label) {
      font-size: 14px;
      flex: 1;
      display: flex;
      justify-content: space-between;

      span {
        color: #333;
      }

      i {
        font-style: normal;
        color: #777;
        font-size: 14px;
      }
    }
  }

  .drawer-container {
    position: relative;
    overflow: hidden;
    height: 100%;

    ul {
      width: calc(100vw - 15px);
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 7px;
      height: 260px;
      overflow-y: scroll;
      padding-right: 10px;

      li {
        position: relative;
        cursor: pointer;

        span {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 25px;
          line-height: 25px;
          display: block;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.65);
          color: #fff;
          padding: 0 5px;
          box-sizing: border-box;
        }

        i {
          position: absolute;
          right: 3px;
          top: 3px;
          display: flex;
          width: 14px;
          height: 14px;
          background-image: url('../assets/check.png');
          background-position: right top;
          background-size: 14px 14px;
          background-repeat: no-repeat;
          z-index: 100;
        }

        &.active {
          i {
            background-image: url('../assets/check_fill.png');
          }
        }

        img {
          width: 100%;
          display: flex;
        }
      }
    }
  }

  .posting-btn {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 16px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 35px;
      background-color: #5E97FF;
      color: #fff;
      font-size: 14px;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  .drawer-button {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 35px;
    background-color: #5E97FF;
    color: #fff;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
