<template>
  <div class="search-sphere">
    <el-tabs v-model="activeTab" class="custom-tabs">
      <el-tab-pane label="找人" name="findUser">
        <div class="search-header">
          <el-input v-model="search" placeholder="搜索" :prefix-icon="Search" />
        </div>
        <div class="user-list">
          <div class="user-item" v-for="user in users" :key="user.id">
            <img :src="user.avatar" class="avatar" />
            <div class="user-info">
              <div class="nickname">{{ user.nickname }}</div>
              <div class="signature">{{ user.signature }}</div>
            </div>
            <el-button class="top-btn" type="primary" plain size="small">置顶</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="找群" name="findGroup">
        <!-- 找群内容 -->
        <div class="public-list" v-if="!findGroupKey">
          <ul>
            <li v-for="item in publicList" :key="item.id" :class="{ 'activeItem': selectedIds.includes(item.id) }"
              @click="selectedItem(item.id)">
              <img :src="item.img" :alt="item.name" />
              <h2>{{ item.name }}</h2>
              <span></span>
            </li>
          </ul>
          <button class="next-btn" @click="findGroupKey = true">开始找群</button>
        </div>

        <div class="search-group" v-else>
          <div class="search-header">
            <el-input v-model="search" placeholder="搜索" :prefix-icon="Search" />
          </div>
          <div class="user-list">
            <div class="user-item" v-for="user in users" :key="user.id">
              <img :src="user.avatar" class="avatar" />
              <div class="user-info">
                <div class="nickname">{{ user.nickname }}</div>
                <div class="signature">{{ user.signature }}</div>
              </div>
              <el-button class="top-btn" type="primary" plain size="small">置顶</el-button>
            </div>
          </div>
          <button class="next-btn" @click="findGroupKey = false">重新选择</button>
        </div>

      </el-tab-pane>
      <el-tab-pane label="分组" name="group">
        <!-- 分组内容 -->
      </el-tab-pane>
      <el-tab-pane label="群组" name="groupList">
        <!-- 群组内容 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import usr1 from '../../assets/usr-1.png'
import usr2 from '../../assets/usr-2.png'
import { useRouter } from 'vue-router'
import gy1 from '../../assets/gy1.png'
import gy2 from '../../assets/gy2.png'
import gy3 from '../../assets/gy3.png'
import gy4 from '../../assets/gy4.png'
import gy5 from '../../assets/gy5.png'
import gy6 from '../../assets/gy6.png'
import gy7 from '../../assets/gy7.png'
const activeTab = ref('findUser')
const search = ref('')
// 找群
const findGroupKey = ref(false)
const users = ref([
  {
    id: 1,
    avatar: usr1,
    nickname: '小蜜蜂',
    signature: '我是一个个性签名'
  },
  // 可以复制多几条模拟数据
  {
    id: 2,
    avatar: usr2,
    nickname: '小蜜蜂',
    signature: '我是一个个性签名'
  }
])

const router = useRouter()
const publicList = ref([
  {
    id: 1,
    name: '工作',
    img: gy1
  },
  {
    id: 2,
    name: '学习',
    img: gy2
  },
  {
    id: 3,
    name: '生活',
    img: gy3
  },
  {
    id: 4,
    name: '娱乐',
    img: gy4
  },
  {
    id: 5,
    name: '情感',
    img: gy5
  },
  {
    id: 6,
    name: '商务',
    img: gy6
  },
  {
    id: 7,
    name: '其他',
    img: gy7
  }
])

const selectedIds = ref([])

const selectedItem = (id) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
  } else {
    selectedIds.value.push(id)
  }
}

const handleFindGroup = () => {
  findGroupKey.value = true
}

</script>

<style lang="scss" scoped>
.search-sphere {
  display: flex;
  width: 375px;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;

  :deep(.el-tabs) {
    width: 100%;
  }

  :deep(.el-tabs__nav-wrap:after) {
    display: none;
  }

  :deep(.el-tabs__item) {
    color: #aaa;
    font-size: 14px;
    font-weight: 500;
    font-family: Source Han Sans CN-Regular;
    padding: 0;
    padding-right: 16px;
  }

  :deep(.el-tabs__item.is-active) {
    font-size: 16px;
    color: #333;
  }

  :deep(.el-tabs__active-bar) {
    height: 0;
  }
}

.public-list {
  position: relative;
  height: calc(100vh - 100px);
  margin-bottom: 50px;

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 0;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 103px;
      height: 140px;
      background-color: #fff;
      border-radius: 8px;
      box-sizing: border-box;
      cursor: pointer;

      img {
        display: block;
        width: 52px;
        height: 52px;
        margin-bottom: 4px;
      }

      h2 {
        font-size: 16px;
        color: #333;
        line-height: 24px;
        margin-bottom: 12px;
      }

      span {
        display: flex;
        width: 28px;
        height: 16px;
        background-image: url('../../assets/gy-plus.png');
        background-size: 28px 16px;
      }

      &.activeItem {
        span {
          background-image: url('../../assets/gy-check.png');
        }
      }
    }
  }
}

.next-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #3478F5;
  border-radius: 16px 16px 16px 16px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin: 10px 0;
  cursor: pointer;
}

.search-header {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  border-radius: 12px;
  background: #f5f7fa;
}

.user-list {
  border-radius: 16px;
  padding: 8px 0;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e4e7ed;
}

.user-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-right: 16px;
}

.user-info {
  flex: 1;
}

.nickname {
  font-weight: bold;
  font-size: 16px;
  color: #222;
}

.signature {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}

.top-btn {
  border-radius: 8px;
  font-size: 14px;
  padding: 4px 16px;
}
</style>
