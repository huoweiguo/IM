<template>
  <div class="bill-container">
    <!-- 顶部导航栏 -->
    <div class="bill-header">
      <span class="back-btn" @click="router.back()">
        <el-icon>
          <ArrowLeftBold color="#333" />
        </el-icon></span>
      <span class="title">我的账单</span>
    </div>
    <!-- 选项卡 -->
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="充值" name="charge">
        <!-- 账单列表 -->
        <div class="bill-list-container">
          <div class="bill-list">
            <div class="bill-item" v-for="(item, idx) in billList" :key="idx">
              <div>
                <div class="bill-type">{{ item.type }}</div>
                <div class="bill-time">{{ item.time }}</div>
              </div>
              <div class="bill-amount">+{{ item.amount }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="礼物" name="gift">
        <!-- 礼物列表 -->
        <div class="bill-list-container">
          <div class="bill-list">
            <div class="bill-item" v-for="(item, idx) in giftList" :key="idx">
              <div>
                <div class="bill-type">{{ item.type }}</div>
                <div class="bill-time">{{ item.time }}</div>
              </div>
              <div class="bill-amount">+{{ item.amount }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="获取" name="get">
        <!-- 礼物列表 -->
        <div class="bill-list-container">
          <div class="bill-list">
            <div class="bill-item" v-for="(item, idx) in getList" :key="idx">
              <div>
                <div class="bill-type">{{ item.type }}</div>
                <div class="bill-time">{{ item.time }}</div>
              </div>
              <div class="bill-amount">+{{ item.amount }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
const router = useRouter()
const activeName = ref('charge')
const billList = ref([
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 },
  { type: '充值', time: '2025-05-01 9:41', amount: 1 }
])
const getList = ref([
  { type: '看广告', time: '2025-05-01 9:41', amount: 2 },
  { type: '邀请小肥羊', time: '2025-05-01 9:41', amount: 3 },
  { type: '邀请小肥羊', time: '2025-05-01 9:41', amount: 4 },
  { type: '看广告', time: '2025-05-01 9:41', amount: 5 },
  { type: '看广告', time: '2025-05-01 9:41', amount: 2 },
  { type: '邀请小肥羊', time: '2025-05-01 9:41', amount: 3 },
  { type: '看广告', time: '2025-05-01 9:41', amount: 4 },
  { type: '邀请小肥羊', time: '2025-05-01 9:41', amount: 5 },
  { type: '邀请小肥羊', time: '2025-05-01 9:41', amount: 2 },
  { type: '邀请小肥羊', time: '2025-05-01 9:41', amount: 3 },
  { type: '获取', time: '2025-05-01 9:41', amount: 4 },
  { type: '获取', time: '2025-05-01 9:41', amount: 5 },
  { type: '看广告', time: '2025-05-01 9:41', amount: 6 }
])
const giftList = ref([
  { type: '来自小李的礼物', time: '2025-05-01 9:41', amount: 2 },
  { type: '来自小李的礼物', time: '2025-05-01 9:41', amount: 3 },
  { type: '来自小李的礼物', time: '2025-05-01 9:41', amount: 4 },
  { type: '来自小李的礼物', time: '2025-05-01 9:41', amount: 5 },
  { type: '来自小李的礼物', time: '2025-05-01 9:41', amount: 6 }
])
document.title = '账单'
</script>

<style lang="scss" scoped>
.bill-container {
  width: 375px;
  height: 100vh;
  background: #f7faff;
  padding: 16px;
  padding-bottom: 80px;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  box-sizing: border-box;

  .bill-list-container {
    overflow: hidden;
  }

  :deep(.el-tabs__nav) {
    width: 100%;
    justify-content: space-around;
  }

  :deep(.el-tabs__item) {
    font-size: 16px;
    text-align: center;
  }

  :deep(.el-tabs__nav-wrap:after) {
    display: none;
  }

  :deep(.el-tabs__active-bar) {
    display: none;
  }
}

.bill-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  font-size: 18px;
  font-weight: bold;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  font-size: 20px;
  cursor: pointer;
}

.title {
  flex: 1;
  text-align: center;
}

.bill-tabs {
  display: flex;
  justify-content: space-around;
  background: #eaf1fb;
  border-radius: 8px;
  margin: 16px 0;
  padding: 8px 0;
}

.bill-tabs span {
  color: #888;
  font-size: 16px;
  cursor: pointer;
  padding: 0 12px;
}

.bill-tabs .active {
  color: #3a7afe;
  font-weight: bold;
  border-bottom: 2px solid #3a7afe;
}

.bill-list {
  margin-top: 8px;
  padding-bottom: 40px;
  width: calc(100% + 15px);
  height: calc(100vh - 120px);
  padding-left: 10px;
  overflow-y: scroll;
}

.bill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.bill-type {
  font-size: 16px;
  color: #222;
}

.bill-time {
  font-size: 12px;
  color: #aaa;
  margin-top: 4px;
}

.bill-amount {
  color: #3a7afe;
  font-size: 18px;
  font-weight: bold;
}
</style>
