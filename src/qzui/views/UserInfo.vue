<template>
  <div class="user-info-setting">

    <!-- 用户信息 -->
    <div class="user-section">
      <img class="avatar" src="../assets/usr-1.png" alt="头像" />
      <span class="nickname">爱探险的朵拉</span>
    </div>

    <!-- 创建私域群 -->
    <div class="create-group">
      <el-icon class="plus-icon">
        <CirclePlus />
      </el-icon>
      <span>创建私域群</span>
    </div>

    <!-- 聊天相关设置 -->
    <div class="setting-list">
      <div class="setting-item">
        <span>查看聊天记录</span>
        <el-icon color="#777">
          <ArrowRightBold />
        </el-icon>
      </div>
      <div class="setting-item">
        <span>消息免打扰</span>
        <el-switch v-model="disturb" />
      </div>
      <div class="setting-item">
        <span>消息置顶</span>
        <el-switch v-model="isTop" />
      </div>
      <div class="setting-item" @click="dialogVisible = true">
        <span>设置当前聊天背景</span>
        <el-icon color="#777">
          <ArrowRightBold />
        </el-icon>
      </div>
    </div>
    <div class="setting-list">
      <div class="setting-item" @click="recordVisible = true">
        <span>清空聊天记录</span>
        <el-icon color="#777">
          <ArrowRightBold />
        </el-icon>
      </div>
    </div>

    <!-- 权限管理 -->
    <div class="permission-list">
      <div class="setting-item" @click="handleCancelFollow">
        <span>取消关注</span>
        <el-icon color="#777">
          <ArrowRightBold />
        </el-icon>
      </div>
      <div class="setting-item" @click="handleBlackList">
        <span>拉黑</span>
        <el-icon color="#777">
          <ArrowRightBold />
        </el-icon>
      </div>
      <div class="setting-item" @click="handleTipOff">
        <span>举报</span>
        <el-icon color="#777">
          <ArrowRightBold />
        </el-icon>
      </div>
    </div>

    <!--弹框-->
    <el-dialog v-model="centerDialogVisible" :title="dialogTitle" width="300" center>
      <span style="display: flex; justify-content: center">{{ warningMessage }}</span>
      <template #footer>
        <div class="dialog-footer">
          <span @click="centerDialogVisible = false">取消</span>
          <span @click="centerDialogVisible = false">确定</span>
        </div>
      </template>
    </el-dialog>

    <!-- 设置当前聊天背景 -->·
    <el-drawer v-model="dialogVisible" :with-header="false" size="50%" direction="btt">
      <div class="chat-background-list">
        <ul>
          <li>设置聊天背景</li>
          <li>恢复默认背景</li>
          <li>设置全部聊天框背景</li>
        </ul>
        <span class="cancel-btn" @click="dialogVisible = false">取消</span>
      </div>
    </el-drawer>

    <!--清空聊天记录-->
    <el-drawer v-model="recordVisible" :with-header="false" size="50%" direction="btt">
      <div class="chat-background-list">
        <ul>
          <li @click="handleClearRecord">清空聊天记录</li>
          <li @click="handleRestoreRecord">恢复被清空记录</li>
          <li @click="handleDeleteRecord">清空并彻底删除聊天记录</li>
        </ul>
        <span class="cancel-btn" @click="dialogVisible = false">取消</span>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const disturb = ref(false)
const isTop = ref(false)
const dialogTitle = ref('')
const warningMessage = ref('')
const centerDialogVisible = ref(false)
const dialogVisible = ref(false)
const recordVisible = ref(false)
const handleBlackList = () => {
  warningMessage.value = '确定将对方拉黑？'
  centerDialogVisible.value = true
}
const handleCancelFollow = () => {
  warningMessage.value = '确定不在关注？'
  centerDialogVisible.value = true
}
const handleClearRecord = () => {
  dialogTitle.value = '提示'
  warningMessage.value = '清空后这里的所有聊天记录将无法显示(以后可“恢复清空记录"来重新显示)，确定继续吗?'
  centerDialogVisible.value = true
}
const handleRestoreRecord = () => {
  dialogTitle.value = '提示'
  warningMessage.value = '确定恢复被清空记录？'
  centerDialogVisible.value = true
}
const handleDeleteRecord = () => {
  dialogTitle.value = '提示'
  warningMessage.value = '一旦删除，将再也无法恢复被清空记录(聊天中的他人仍然可以查看这些记录)。该操作无法撒销，确定继续吗?'
  centerDialogVisible.value = true
}
const handleTipOff = () => {
  // 检查是否在 Electron 环境中
  if (window.electronAPI) {
    window.electronAPI.openNewSecondWindow({
      width: 375,
      height: 720,
      title: '举报',
      url: `${import.meta.env.VITE_API_BASE_URL}/#/tipOffUser`
    })
  } else {
    console.warn('Electron API 不可用，可能在浏览器环境中运行')
  }
}
</script>

<style lang="scss" scoped>
.user-info-setting {
  background: #eaf3fc;
  width: 375px;
  min-height: 100vh;
  padding: 16px;
}
.chat-background-list {
  position: relative;
  height: 100%;
  ul {
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 52px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 16px;
      color: #333;
      cursor: pointer;
    }
  }
  span {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    background: #5E97FF;
    text-align: center;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 8px;
  }
}
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  font-size: 18px;
  font-weight: bold;
  color: #222;
}

.icon {
  width: 24px;
  height: 24px;
  display: inline-block;
}

.user-section {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin: 16px 0 8px 0;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
}

.nickname {
  flex: 1;
  color: #2a6fd6;
  font-weight: 500;
}

.create-group {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
}

.plus-icon {
  margin-right: 5px;
}

.setting-list,
.permission-list {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 8px 0;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  cursor: pointer;
}

.setting-item:last-child {
  border-bottom: none;
}

.dialog-footer {
  display: flex;
  border-top: 1px solid rgba(238, 238, 238, 1);
  margin: 0 -16px -16px;
  height: 40px;
}

.dialog-footer span {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-right: 1px solid rgba(238, 238, 238, 1);
  cursor: pointer;
  font-size: 14px;
}

.dialog-footer span:last-child {
  border-right: none;
  color: #5E97FF;

}
</style>
