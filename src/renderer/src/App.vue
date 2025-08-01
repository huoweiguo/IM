<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import wfc from './wfc/client/wfc'
import EventType from './wfc/client/wfcEvent'

onMounted(() => {
  // 监听连接状态变化
  wfc.eventEmitter.on(EventType.ConnectionStatusChanged, (status) => {
    console.log('连接状态变化：', status)
  })

  // 监听新消息
  wfc.eventEmitter.on(EventType.NewMessages, (messages) => {
    console.log('收到新消息：', messages)
  })
})

onUnmounted(() => {
  // 取消所有事件监听（或按需取消特定事件）
  wfc.eventEmitter.removeAllListeners()
})
</script>
