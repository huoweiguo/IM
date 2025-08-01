# WFC SDK 集成指南

## 概述

本指南介绍如何在 Electron + Vue 项目中集成 WildFireChat (WFC) SDK，实现完整的 IM 功能。

## 项目结构

```
src/
├── wfc/                    # WFC SDK 核心文件
│   ├── client/            # 客户端功能
│   ├── model/             # 数据模型
│   ├── messages/          # 消息类型
│   └── ...
├── renderer/src/
│   ├── services/
│   │   └── wfcService.js  # WFC 服务封装
│   ├── stores/
│   │   └── store.js       # 状态管理
│   ├── components/
│   │   └── ChatWindow.vue # 聊天窗口组件
│   └── views/
│       └── Chat.vue       # 聊天页面
└── config.js              # 配置文件
```

## 核心文件说明

### 1. wfcService.js - WFC 服务封装

这是 WFC SDK 的主要封装类，提供以下功能：

- **初始化与连接管理**
  - `init()` - 初始化 SDK
  - `connect(userId, token)` - 连接服务器
  - `disconnect()` - 断开连接

- **消息处理**
  - `sendTextMessage()` - 发送文本消息
  - `sendImageMessage()` - 发送图片消息
  - `sendFileMessage()` - 发送文件消息
  - `getMessages()` - 获取消息列表

- **会话管理**
  - `loadConversations()` - 加载会话列表
  - `setConversationTop()` - 设置会话置顶
  - `setConversationSilent()` - 设置会话免打扰

- **事件监听**
  - 连接状态变化
  - 消息接收
  - 用户信息更新
  - 群组信息更新

### 2. store.js - 状态管理

使用 Pinia 管理 WFC 相关状态：

```javascript
// 主要状态
state: {
  connectionStatus: 0,    // 连接状态
  conversations: [],      // 会话列表
  currentConversation: null, // 当前会话
  messages: {},           // 消息列表
  friends: [],           // 好友列表
  groups: [],            // 群组列表
  users: {},             // 用户信息缓存
  unreadCount: 0,        // 未读数量
}
```

### 3. ChatWindow.vue - 聊天窗口组件

提供完整的聊天界面：

- 会话列表显示
- 消息收发界面
- 文件/图片发送
- 会话设置（置顶、免打扰）

## 使用方法

### 1. 初始化

在应用启动时初始化 WFC：

```javascript
// 在 main.js 或 App.vue 中
import { useStore } from './stores/store'

const store = useStore()
store.init() // 这会自动初始化 WFC
```

### 2. 登录后连接

用户登录成功后，自动连接 WFC：

```javascript
// 在登录成功后
store.setUserInfo(userInfo) // 这会自动连接 WFC
```

### 3. 发送消息

```javascript
import wfcService from './services/wfcService'

// 发送文本消息
await wfcService.sendTextMessage(conversation, '你好')

// 发送图片
await wfcService.sendImageMessage(conversation, imageFile)

// 发送文件
await wfcService.sendFileMessage(conversation, file)
```

### 4. 监听事件

WFC 服务会自动处理各种事件：

- 连接状态变化
- 新消息接收
- 消息状态更新
- 用户/群组信息更新

## 配置说明

### 1. 服务器配置

在 `src/config.js` 中配置服务器地址：

```javascript
static APP_SERVER = 'https://your-server.com'
static ICE_SERVERS = [['turn:your-turn-server.com:3478', 'username', 'password']]
```

### 2. 应用配置

```javascript
// 是否启用音视频通话
static ENABLE_SINGLE_VOIP_CALL = true
static ENABLE_MULTI_VOIP_CALL = true

// 是否启用语音对讲
static ENABLE_PTT = true
```

## 主要功能

### 1. 消息功能

- ✅ 文本消息发送/接收
- ✅ 图片消息发送/接收
- ✅ 文件消息发送/接收
- ✅ 语音消息发送/接收
- ✅ 消息撤回
- ✅ 消息删除
- ✅ 消息搜索

### 2. 会话管理

- ✅ 会话列表显示
- ✅ 会话置顶/取消置顶
- ✅ 会话免打扰设置
- ✅ 未读消息计数
- ✅ 会话搜索

### 3. 用户管理

- ✅ 用户信息获取
- ✅ 用户搜索
- ✅ 好友列表
- ✅ 好友添加/删除

### 4. 群组管理

- ✅ 群组信息获取
- ✅ 群组搜索
- ✅ 群组成员管理
- ✅ 群组设置

### 5. 音视频通话

- ✅ 一对一音视频通话
- ✅ 多人音视频通话
- ✅ 语音对讲功能

## 错误处理

WFC 服务包含完整的错误处理：

```javascript
try {
  await wfcService.sendTextMessage(conversation, text)
} catch (error) {
  console.error('发送失败:', error)
  // 显示错误提示
}
```

## 调试功能

聊天页面包含调试面板，可以：

- 查看连接状态
- 查看会话/好友/群组数量
- 发送测试消息
- 搜索用户
- 刷新数据

## 注意事项

1. **初始化顺序**：必须先初始化 WFC，再连接服务器
2. **事件监听**：WFC 服务会自动绑定事件监听，无需手动处理
3. **状态同步**：所有 WFC 状态都会自动同步到 store
4. **错误处理**：所有 WFC 操作都包含错误处理
5. **内存管理**：退出时会自动断开连接并清理数据

## 扩展功能

可以根据需要扩展以下功能：

- 自定义消息类型
- 消息加密
- 离线消息同步
- 消息转发
- 群组邀请
- 消息提醒设置
