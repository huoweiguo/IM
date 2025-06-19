<template>
  <div class="focus-me">
    <div class="focus-me__nav">
      <span></span>
      <div>
        <span @click="setIndex(0)" :class="{ active: curIndex === 0 }">已关注</span>
        <span @click="setIndex(1)" :class="{ active: curIndex === 1 }">找圈友</span>
      </div>
      <span v-show="curIndex === 0"></span>

      <div v-show="curIndex === 1">
        <el-tooltip class="box-item" effect="dark" placement="bottom">
          <el-icon color="#33333" size="20px" style="cursor: pointer">
            <MoreFilled />
          </el-icon>
          <template #content>
            <span class="friend-icon" @click="quitCommunity">退出圈子</span>
          </template>
        </el-tooltip>
      </div>
    </div>

    <div class="focus-me__content" v-show="curIndex === 0">
      <ul>
        <li v-for="item in list" :key="item.id">
          <img :src="item.img" />
          <div>{{ item.name }}</div>
        </li>
      </ul>
    </div>

    <div class="focus-me__quan" v-show="curIndex === 1">
      <div class="search-box"><el-input v-model="searchValue" style="width: 100%" placeholder="请输入搜索内容"
          :suffix-icon="Search" /></div>
      <div class="focus-me__content">
        <ul>
          <li v-for="item in list" :key="item.id">
            <img :src="item.img" />
            <div>{{ item.name }} <el-tag type="primary" class="tag" effect="dark">实名认证</el-tag></div>
          </li>
        </ul>
      </div>
      <div class="btn-box">
        <span @click="drawer = true">邀请好友加入圈子</span>
      </div>
    </div>

    <!--邀请加入-->
    <el-drawer v-model="drawer" direction="btt" size="100%" :with-header="false">
      <div class="drawer-box">
        <el-icon class="close-btn" size="26" color="#fff" @click="drawer = false">
          <CircleClose />
        </el-icon>
        <ScanInvite />
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import ScanInvite from '../components/ScanInvite.vue'
const curIndex = ref(0)
const searchValue = ref('')
const drawer = ref(false)
import usr1 from '../assets/usr-1.png'
import usr2 from '../assets/usr-2.png'
import usr3 from '../assets/usr-3.png'
const list = ref([
  { id: 1, name: '青青草原懒洋洋', img: usr1 },
  { id: 2, name: '青青草原懒洋洋', img: usr2 },
  { id: 3, name: '青青草原懒洋洋', img: usr3 },
  { id: 4, name: '青青草原懒洋洋', img: usr1 },
  { id: 5, name: '青青草原懒洋洋', img: usr2 },
  { id: 6, name: '青青草原懒洋洋', img: usr3 },
  { id: 7, name: '青青草原懒洋洋', img: usr1 },
  { id: 8, name: '青青草原懒洋洋', img: usr2 },
  { id: 9, name: '青青草原懒洋洋', img: usr3 },
  { id: 10, name: '青青草原懒洋洋', img: usr3 },
  { id: 11, name: '青青草原懒洋洋', img: usr3 },
  { id: 12, name: '青青草原懒洋洋', img: usr3 },
  { id: 13, name: '青青草原懒洋洋', img: usr3 },
  { id: 14, name: '青青草原懒洋洋', img: usr3 },
  { id: 15, name: '青青草原懒洋洋1', img: usr3 }
])
const setIndex = (index) => {
  curIndex.value = index
}

const quitCommunity = () => {
  ElMessageBox.confirm('退出后将自动为您删除个人信息中的对应信息字段，后续通过个人信息变更维护可重新加回。', '是否退出该圈子', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    console.log('退出社区')
  }).catch(() => {
    // catch error
  })
}
</script>

<style lang="scss" scoped>
.focus-me {
  width: 375px;
  height: 100vh;
  padding: 60px 16px 16px;
  box-sizing: border-box;
  overflow: hidden;

  .focus-me__nav {
    position: fixed;
    left: 16px;
    right: 16px;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;

    &>div {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #aaa;

      span {
        display: flex;
        margin: 0 8px;
        cursor: pointer;

        &.active {
          color: #333;
          font-weight: 600;
          font-size: 16px;
          cursor: default;
        }
      }
    }
  }

  .focus-me__quan {

    .search-box {
      margin-bottom: 10px;
    }

    .focus-me__content {
      height: calc(100vh - 170px);
    }
  }

  .focus-me__content {
    height: 100%;
    overflow: hidden;

    ul {
      width: 375px;
      height: 100%;
      overflow-y: scroll;
      padding: 0;
      padding-right: 10px;

      li {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        margin-bottom: 10px;

        img {
          width: 43px;
          height: 43px;
          border-radius: 8px;
          margin-right: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        &>div {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          height: 54px;
          display: flex;
          align-items: center;
          flex: 1;
          border-bottom: 1px solid #e1e1e1;

          .tag {
            margin-left: 10px;
          }
        }
      }
    }
  }

  .btn-box {
    margin-top: 10px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #5E97FF;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      height: 50px;
      border-radius: 10px;
      cursor: pointer;
    }
  }

  .drawer-box {
    position: relative;
    height: 100%;

    .close-btn {
      position: absolute;
      left: 12px;
      top: 18px;
      cursor: pointer;
    }
  }

  :deep(.el-drawer__body) {
    padding: 0 !important;
  }
}
</style>
