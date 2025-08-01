
# wfc目录分析与使用方法

## 目录结构

wfc目录是IM客户端的核心SDK目录，包含以下主要子目录：

- **av/**: 音视频通话功能模块
  - engine/: 音视频引擎实现
  - internal/: 内部音视频相关代码
  - messages/: 音视频相关消息类型
  - model/: 音视频数据模型

- **client/**: 客户端核心功能
  - wfc.js: 核心SDK入口文件
  - wfc_cli.js: 命令行工具示例
  - wfcEvent.js: 事件类型定义
  - errorCode.js: 错误码定义

- **messages/**: 消息类型定义
  - messageContent.js: 消息内容基类
  - 各种具体消息类型(文本、图片、文件等)
  - notification/: 通知类消息

- **model/**: 数据模型
  - userInfo.js: 用户信息模型
  - conversation.js: 会话模型
  - groupInfo.js: 群组信息模型
  - 其他数据模型定义

- **ptt/**: 语音对讲功能

- **util/**: 工具函数

## 核心功能

1. **初始化与连接**
   - 初始化SDK: `wfc.init()`
   - 连接服务器: `wfc.connect(clientId, token)`

2. **消息处理**
   - 发送消息: `wfc.sendConversationMessage(conversation, messageContent)`
   - 接收消息: 通过监听`EventType.ReceiveMessage`事件
   - 搜索消息: `wfc.searchMessage(conversation, keyword)`

3. **会话管理**
   - 获取会话列表: `wfc.getConversationList()`
   - 设置会话置顶: `wfc.setConversationTop(conversation, isTop)`
   - 设置会话免打扰: `wfc.setConversationSilent(conversation, isSilent)`
   - 清除会话未读状态: `wfc.clearConversationUnreadStatus(conversation)`

4. **用户与群组管理**
   - 搜索好友: `wfc.searchFriends(keyword)`
   - 搜索群组: `wfc.searchGroups(keyword)`
   - 获取用户信息: `wfc.getUserInfo(userId)`

5. **音视频通话**
   - 由`AvEngineKitProxy`类处理
   - 支持一对一和多人音视频通话

## 使用示例

### 1. 初始化与登录

```javascript
import wfc from './wfc/client/wfc'
import Config from './config'

// 初始化SDK
wfc.init()

// 登录
const clientId = wfc.getClientId()
wfc.connect(clientId, token)

// 监听连接状态变化
wfc.eventEmitter.on('ConnectionStatusChanged', (status) => {
  console.log('连接状态变化:', status)
})
```

### 2. 发送消息

```javascript
import { Conversation } from './wfc/model/conversation'
import { TextMessageContent } from './wfc/messages/textMessageContent'

// 创建会话对象
const conversation = new Conversation(0, 'userId', 0)  // 0表示单聊

// 创建文本消息
const textContent = new TextMessageContent('你好，这是一条测试消息')

// 发送消息
wfc.sendConversationMessage(conversation, textContent, [],
  (messageId, timestamp) => {
    console.log('消息已插入本地:', messageId)
  },
  (uploaded, total) => {
    console.log('上传进度:', uploaded/total*100+'%')
  },
  (messageUid, timestamp) => {
    console.log('消息发送成功:', messageUid)
  },
  (errorCode) => {
    console.log('消息发送失败:', errorCode)
  }
)
```

### 3. 接收消息

```javascript
// 监听消息接收事件
wfc.eventEmitter.on('ReceiveMessage', (message) => {
  console.log('收到消息:', message)
  const content = message.messageContent
  // 根据消息类型处理
  switch(content.type) {
    case 1:  // 文本消息
      console.log('文本内容:', content.text)
      break
    case 2:  // 图片消息
      console.log('图片URL:', content.remoteUrl)
      break
    // 其他消息类型处理...
  }
})
```

### 4. 会话管理

```javascript
// 获取会话列表
const conversations = wfc.getConversationList([0, 1, 2], [0, 1])
console.log('会话列表:', conversations)

// 设置会话置顶
const conversation = new Conversation(0, 'userId', 0)
wfc.setConversationTop(conversation, true, 
  () => console.log('置顶成功'),
  (err) => console.log('置顶失败:', err)
)
```

## 配置说明

配置文件`config.js`包含SDK的重要配置参数：

- `APP_SERVER`: 应用服务器地址
- `ICE_SERVERS`: 音视频通话的TURN服务器配置
- `USE_WSS`: 是否使用WSS协议
- `ENABLE_MULTI_VOIP_CALL`: 是否启用多人音视频通话
- `ENABLE_PTT`: 是否启用语音对讲功能

可以通过`Config.config(options)`方法修改配置。
