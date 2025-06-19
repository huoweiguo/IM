<template>
  <div class="calender-container">
    <div class="calender-content">
      <el-calendar></el-calendar>
      <div class="todo-list">
        <div v-for="(item, index) in todos" :key="index">
          <div class="date-title">{{ item.date }}</div>
          <div class="todo-item" v-for="(child, idx) in item.children" :key="idx">
            <div class="todo-time">
              <span>{{ child.timeStart }}</span>
              <span>{{ child.timeEnd }}</span>
            </div>
            <span class="todo-content">{{ child.content }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="add-todo">点击创建日程</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  { date: '5月12日 周一', children: [{ timeStart: '09:00', timeEnd: '10:00', content: '青青草原聚餐' }] },
  { date: '5月18日 周一', children: [{ timeStart: '09:00', timeEnd: '10:00', content: '上海出差,一定要带上身份证,还有合同,还有充电器' }] },
  { date: '5月19日 周二', children: [{ timeStart: '09:00', timeEnd: '10:00', content: '正式签订合同' }] },
  { date: '5月20日 周三', children: [{ timeStart: '09:00', timeEnd: '10:00', content: '返回北京' }] },
  { date: '5月21日 周四', children: [{ timeStart: '09:00', timeEnd: '10:00', content: '哈尔滨出差，准备一件外套，雨伞，充电器' }] }
])
</script>

<style lang="scss" scoped>
.calender-container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;

  .calender-content {
    width: calc(100% + 32px);
    height: calc(100% - 60px);
    overflow-y: scroll;
    padding-right: 10px;
  }

  :deep(.el-calendar__body) {
    padding: 20px 0;
  }

  :deep(.el-calendar__header) {
    padding: 10px 0;
  }

  :deep(.el-calendar-table thead th) {
    font-size: 14px;
  }

  :deep(.el-calendar-table .el-calendar-day) {
    height: 40px;
    text-align: center;
    line-height: 40px;
    padding: 0;
    font-size: 14px;
    color: #333;
  }

  :deep(.el-calendar-table td.is-selected .el-calendar-day) {
    color: #5E97FF;
  }

  .add-todo {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: center;
    background: #F5F5F5;
    border-radius: 8px 8px 8px 8px;
    z-index: 1000;
    font-size: 14px;
    color: #5E97FF;
    cursor: pointer;
  }
}

.todo-list {
  margin-top: 24px;

  &>div {
    margin-bottom: 15px;
  }

  .date-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .todo-time {
      display: flex;
      flex-direction: column;
      width: 48px;
      color: #666;
      font-family: monospace;
      margin-right: 15px;
      text-align: right;
      padding-right: 15px;
      border-right: 2px solid #5E97FF;
    }

    .todo-content {
      color: #444;
      font-size: 14px;
    }
  }
}
</style>
