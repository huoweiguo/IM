<template>
  <div class="group-setting">
    <div class="group-item">
      <div>
        <ul>
          <li>
            <span>虚拟头像</span>
            <i><img src="../../assets/usr-1.png" /></i>
          </li>
          <li @click="showDrawer('nickName')"><span>昵称</span><i>{{ params.nickName }}</i></li>
          <li><span>真实头像</span><i><img src="../../assets/usr-1.png" /></i></li>
          <li><span>真实姓名</span><i>JSON</i></li>
          <li @click="showDrawer('tel')"><span>手机号码</span><i>{{ params.tel }}</i></li>
          <li @click="showDrawer('sex')"><span>性别</span><i>{{ params.sex === 'male' ? '男' : '女' }}</i></li>
        </ul>

        <ul>
          <li><span>测试问题一</span><i>A168</i></li>
          <li><span>测试问题二</span><i>A168</i></li>
          <li><span>测试问题三</span><i>A168</i></li>
          <li><span>测试问题四</span><i>A168</i></li>
          <li @click="showDrawer('signName')"><span>个性签名</span><i>{{ params.signName }}</i></li>
        </ul>

        <ul>
          <li @click="showDrawer('gift')"><span>自定义见面礼物门槛</span><i></i></li>
          <li @click="showDrawer('tags')"><span>自定义标签</span><i>{{ params.tags.join(',') }}</i></li>
        </ul>
      </div>
    </div>

    <!-- 昵称 -->
    <el-drawer v-model="drawer" :with-header="false" size="50%" direction="btt">
      <div class="drawer-content">
        <el-input v-if="showType === 'nickName'" v-model="nickName" placeholder="请输入昵称" clearable />
        <el-input v-if="showType === 'tel'" v-model="tel" placeholder="请输入手机号" clearable />
        <el-input v-if="showType === 'signName'" v-model="signName" placeholder="请输入个性签名" clearable />
        <el-radio-group v-if="showType === 'sex'" v-model="sex">
          <el-radio value="male">男</el-radio>
          <el-radio value="female">女</el-radio>
        </el-radio-group>
        <div v-if="showType === 'tags'">
          <el-tag style="margin-right: 5px;" v-for="tag in dynamicTags" :key="tag" @close="handleClose(tag)" closable>
            {{ tag }}
          </el-tag>
          <el-input v-if="inputVisible" v-model="inputValue" class="w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">
            +新增标签
          </el-button>
        </div>
        <div v-if="showType === 'gift'" class="gift-list">
          <ul>
            <li><img src="../../assets/gift-yellow.png" /><span>礼物</span><i>10圈币</i></li>
            <li><img src="../../assets/gift-green.png" /><span>礼物</span><i>50圈币</i></li>
            <li><img src="../../assets/gift-sky.png" /><span>礼物</span><i>100圈币</i></li>
            <li><img src="../../assets/gift-pink.png" /><span>礼物</span><i>200圈币</i></li>
            <li><img src="../../assets/gift-red.png" /><span>礼物</span><i>500圈币</i></li>
            <li><img src="../../assets/gift-orange.png" /><span>礼物</span><i>1000圈币</i></li>
            <li><img src="../../assets/gift-purple.png" /><span>礼物</span><i>2000圈币</i></li>
          </ul>
          <div class="gift-desc"><span>*</span>我未关注的人需赠送该级别及以上礼物才能与我发起对话</div>
        </div>
        <div class="drawer-btns" v-if="showType !== 'gift'">
          <span>保存</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const drawer = ref(false)
const showType = ref('')
const nickName = ref('')
const signName = ref('')
const sex = ref('')
const tel = ref('')
const inputValue = ref('')
const inputVisible = ref(false)
const dynamicTags = ref([])
const showInput = () => {
  inputVisible.value = true
}
const showDrawer = (type) => {
  drawer.value = true
  showType.value = type
  switch (type) {
    case 'nickName':
      nickName.value = params.nickName
      break
    case 'signName':
      signName.value = params.signName
      break
    case 'sex':
      sex.value = params.sex
      break
    case 'tags':
      dynamicTags.value = params.tags
      break
    case 'tel':
      tel.value = params.tel
      break
    case 'gift':
      break
  }
}
const params = reactive({
  nickName: '小小霍',
  signName: '我就是我，看谁都上火',
  sex: 'male',
  tags: ['睡觉', '音乐'],
  tel: '18721586596'
})
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style lang="scss" scoped>
.group-setting {
  position: relative;
  width: 375px;
  height: 100vh;
  background-color: #efefef;
  box-sizing: border-box;
  .w-20 {
    width: 80px;
  }
  .group-btns {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 104px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      height: 52px;
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      font-size: 14px;
      color: #FF5555;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .chat-user-list {
    padding: 16px;
    background-color: #fff;
    min-height: auto !important;

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding: 20px;
      box-sizing: border-box;
      padding: 0;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        .add-user {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        img {
          width: 36px;
          height: 36px;
        }

        span {
          width: 100%;
          height: 25px;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          text-align: center;
        }
      }
    }
  }

  .group-item {
    width: 100%;
    overflow: hidden;

    &>div {
      overflow-y: scroll;
      height: calc(100vh - 10px);
      width: calc(100% + 20px);
    }

    ul {
      background-color: #fff;
      margin: 10px 0;

      li {
        cursor: pointer;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;

        span {
          font-size: 14px;
          color: #333;
        }

        i {
          display: flex;
          align-items: center;
          font-size: 14px;
          background: url('../../assets/right-arrow.png') no-repeat right center;
          background-size: 12px 12px;
          font-style: normal;
          padding-right: 20px;
          color: #777;
          min-height: 12px;
          min-width: 12px;
          img {
            display: block;
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }

  .drawer-content {
    height: 100%;
    position: relative;
    .drawer-btns {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      span {
        display: flex;
        height: 40px;
        width: 100%;
        background-color: #5E97FF;
        color: #fff;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 8px;
      }
    }
  }
  .gift-list {
    height: 100%;
    position: relative;
    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 30px;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        img {
          width: 44px;
          height: 44px;
        }
        span {
          display: flex;
          font-size: 14px;
          color: #333;
          margin-bottom: 8px;
        }
        i {
          font-style: normal;
          font-size: 12px;
          color: #777;
        }
      }
    }
    .gift-desc {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #777;
      span {
        color: #FA6F6F;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
}
</style>
