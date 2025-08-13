# Store.js 说明文档

## 概述
`store.js` 是一个基于 Vue 的状态管理文件，负责管理 IM 应用中的各种核心状态，包括会话、联系人、搜索、选择状态等。它通过 `wfc` (WildFire Chat) 客户端 SDK 与后端服务器进行交互，并监听各种事件来实时更新应用状态，确保界面与后端数据同步。

## 主要功能模块

### 1. 状态定义
文件中定义了以下核心状态对象：

#### `conversationState` - 会话状态管理
- `conversationInfoList`: 会话信息列表，包含所有用户参与的会话
- `currentConversationInfo`: 当前选中的会话信息
- `shouldAutoScrollToBottom`: 是否自动滚动到最新消息
- `floatingConversations`: 悬浮窗口中的会话列表
- `conversationLoading`: 会话加载状态标志

#### `contactState` - 联系人状态管理
- `friendList`: 好友列表
- `groupList`: 群组列表
- `channelList`: 频道列表
- `favContactList`: 收藏联系人列表
- `favGroupList`: 收藏群组列表
- `friendRequestList`: 好友请求列表
- `unreadFriendRequestCount`: 未读好友请求数量
- `selfUserInfo`: 当前用户信息
- `expandGroup`: 是否展开群组列表
- `expandChanel`: 是否展开频道列表
- `expandFriendRequestList`: 是否展开好友请求列表

#### `searchState` - 搜索状态管理
- `query`: 当前搜索关键词
- `contactSearchResult`: 联系人搜索结果
- `groupSearchResult`: 群组搜索结果
- `conversationSearchResult`: 会话搜索结果
- `userSearchResult`: 用户搜索结果
- `channelSearchResult`: 频道搜索结果
- `searchDomainInfo`: 搜索的域名信息

#### `pickState` - 选择状态管理
- `users`: 已选择的用户列表
- `organizations`: 已选择的组织列表
- `conversations`: 已选择的会话列表

#### `miscState` - 杂项状态管理
- `enableNotification`: 是否启用通知
- `enableNotificationMessageDetail`: 是否启用通知消息详情
- `enableCloseWindowToExit`: 是否启用关闭窗口即退出
- `enableAutoLogin`: 是否启用自动登录
- `enableMinimize`: 是否启用最小化功能
- `isPageHidden`: 页面是否隐藏
- `isMainWindow`: 是否为主窗口
- `isVoipOngoing`: 是否正在进行语音通话
- `linuxUpdateTitleInterval`: Linux 系统标题更新定时器

### 2. 初始化
- `init()`: 初始化 store，设置用户信息、加载会话和联系人列表、注册事件监听器等
  - 调用流程：设置当前用户信息 → 加载会话列表 → 加载好友列表 → 加载群组列表 → 加载频道列表 → 注册事件监听器

### 3. 会话管理
- `loadConversationList()`: 加载会话列表
  - 功能：从本地数据库加载所有会话信息并更新到 `conversationInfoList`

- `setCurrentConversation(conversation)`: 设置当前会话
  - 参数：`conversation` (Conversation) - 要设置的会话对象
  - 功能：更新 `currentConversationInfo` 并加载该会话的消息

- `setConversationDraft(conversation, draft)`: 更新会话草稿
  - 参数：
    - `conversation` (Conversation) - 会话对象
    - `draft` (string) - 草稿内容
  - 功能：保存用户输入的草稿内容

- `removeConversation(conversation)`: 删除会话
  - 参数：`conversation` (Conversation) - 要删除的会话对象
  - 功能：从本地数据库和界面中移除指定会话

- `clearConversationUnreadStatus(conversation)`: 清除会话未读状态
  - 参数：`conversation` (Conversation) - 会话对象
  - 功能：将指定会话的未读计数清零

### 4. 联系人管理
- `loadFriendList()`: 加载好友列表
  - 功能：从服务器加载好友列表并更新到 `friendList`

- `loadGroupList()`: 加载群组列表
  - 功能：从服务器加载群组列表并更新到 `groupList`

- `loadChannelList()`: 加载频道列表
  - 功能：从服务器加载频道列表并更新到 `channelList`

- `_loadFavContactList()`: 加载收藏联系人
  - 功能：从服务器加载收藏联系人并更新到 `favContactList`

- `_loadFavGroupList()`: 加载收藏群组
  - 功能：从服务器加载收藏群组并更新到 `favGroupList`

- `_loadFriendRequest()`: 处理好友请求
  - 功能：从服务器加载好友请求并更新到 `friendRequestList` 和 `unreadFriendRequestCount`

### 5. 消息处理
- `sendTextMessage(conversation, text, successCB, failCB)`: 发送文本消息
  - 参数：
    - `conversation` (Conversation) - 会话对象
    - `text` (string) - 消息内容
    - `successCB` (function) - 发送成功回调
    - `failCB` (function) - 发送失败回调
  - 功能：向指定会话发送文本消息

- `deleteMessage(message)`: 删除消息
  - 参数：`message` (Message) - 要删除的消息对象
  - 功能：从本地数据库删除指定消息

- `recallMessage(message)`: 撤回消息
  - 参数：`message` (Message) - 要撤回的消息对象
  - 功能：撤回已发送的消息

- `downloadMedia(message, callback)`: 下载媒体消息
  - 参数：
    - `message` (Message) - 包含媒体的消息对象
    - `callback` (function) - 下载进度回调
  - 功能：下载消息中的媒体文件（图片、语音、视频等）

- `searchMessage(conversation, query)`: 搜索消息
  - 参数：
    - `conversation` (Conversation) - 会话对象
    - `query` (string) - 搜索关键词
  - 功能：在指定会话中搜索包含关键词的消息
  - 返回值：匹配的消息列表

### 6. 搜索功能
- `searchUser(query, domainId)`: 搜索用户
  - 参数：
    - `query` (string) - 搜索关键词
    - `domainId` (string, 可选) - 域名 ID
  - 功能：搜索符合条件的用户

- `searchChannel(query)`: 搜索频道
  - 参数：`query` (string) - 搜索关键词
  - 功能：搜索符合条件的频道

- `searchFiles(keyword, beforeMessageUid, successCB, failCB)`: 搜索文件
  - 参数：
    - `keyword` (string) - 搜索关键词
    - `beforeMessageUid` (string) - 起始消息 ID
    - `successCB` (function) - 搜索成功回调
    - `failCB` (function) - 搜索失败回调
  - 功能：搜索符合条件的文件消息

- `filterContact(query)`: 过滤联系人
  - 参数：`query` (string) - 搜索关键词
  - 功能：从好友列表中过滤符合条件的联系人
  - 返回值：匹配的联系人列表

- `filterGroupConversation(query)`: 过滤群组
  - 参数：`query` (string) - 搜索关键词
  - 功能：从群组列表中过滤符合条件的群组
  - 返回值：匹配的群组列表

- `filterConversation(query)`: 过滤会话
  - 参数：`query` (string) - 搜索关键词
  - 功能：从会话列表中过滤符合条件的会话
  - 返回值：匹配的会话列表

### 7. 选择功能
- `pickOrUnpickUser(user)`: 选择/取消选择用户
  - 参数：`user` (UserInfo) - 用户信息对象
  - 功能：在 `pickState.users` 中添加或移除用户

- `pickOrUnpickOrganization(org)`: 选择/取消选择组织
  - 参数：`org` (Organization) - 组织信息对象
  - 功能：在 `pickState.organizations` 中添加或移除组织

- `pickOrUnpickConversation(conversation)`: 选择/取消选择会话
  - 参数：`conversation` (Conversation) - 会话对象
  - 功能：在 `pickState.conversations` 中添加或移除会话

### 8. 杂项功能
- `setEnableNotification(enable)`: 通知设置
  - 参数：`enable` (boolean) - 是否启用通知
  - 功能：设置是否接收系统通知

- `setEnableAutoLogin(enable)`: 自动登录设置
  - 参数：`enable` (boolean) - 是否启用自动登录
  - 功能：设置是否在应用启动时自动登录

- `setPageVisibility(visible)`: 页面可见性处理
  - 参数：`visible` (boolean) - 页面是否可见
  - 功能：处理页面可见性变化，控制消息自动滚动等行为

- `updateTray()`: 系统托盘更新
  - 功能：更新系统托盘图标和未读消息计数

## 事件监听器
文件中注册了多个 `wfc` 事件监听器，用于响应后端推送的各种事件：

- `ConnectionStatusChanged()`: 连接状态变化
  - 触发条件：当客户端与服务器的连接状态发生变化时
  - 处理逻辑：更新连接状态，并在连接断开时进行重连尝试

- `UserInfosUpdate()`: 用户信息更新
  - 触发条件：当用户信息发生变化时
  - 处理逻辑：更新本地用户信息缓存

- `SettingUpdate()`: 设置更新
  - 触发条件：当用户设置发生变化时
  - 处理逻辑：更新本地设置并应用变更

- `GroupInfosUpdate()`: 群组信息更新
  - 触发条件：当群组信息发生变化时
  - 处理逻辑：更新本地群组信息缓存

- `ChannelInfosUpdate()`: 频道信息更新
  - 触发条件：当频道信息发生变化时
  - 处理逻辑：更新本地频道信息缓存

- `FriendListUpdate()`: 好友关系更新
  - 触发条件：当好友关系发生变化时
  - 处理逻辑：更新好友列表并重新加载相关会话

- `ConversationInfoUpdate()`: 会话信息更新
  - 触发条件：当会话信息发生变化时
  - 处理逻辑：更新会话列表并刷新界面

- `MessageReceived()`: 消息更新
  - 触发条件：当收到新消息时
  - 处理逻辑：更新会话的消息列表，并在必要时发送通知

- `MediaUploadProgress()`: 媒体上传进度
  - 触发条件：当媒体文件上传进度更新时
  - 处理逻辑：更新上传进度显示

- `FriendRequestUpdate()`: 好友请求
  - 触发条件：当收到新的好友请求或好友请求状态变化时
  - 处理逻辑：更新好友请求列表和未读计数

- `ConferenceInvite()`: 会议邀请
  - 触发条件：当收到会议邀请时
  - 处理逻辑：显示会议邀请通知并提供加入选项

## 调用方法示例
```javascript
// 初始化 store
store.init();

// 设置当前会话
const conversation = new Conversation(ConversationType.Single, 'user123', 0);
store.setCurrentConversation(conversation);

// 发送文本消息
store.sendTextMessage(
  conversation,
  'Hello, World!',
  () => {
    console.log('消息发送成功');
  },
  (error) => {
    console.error('消息发送失败:', error);
  }
);

// 搜索用户
store.searchUser('张三', '');

// 更新通知设置
store.setEnableNotification(true);

// 清除会话未读状态
store.clearConversationUnreadStatus(conversation);

// 下载媒体消息
store.downloadMedia(message, (progress) => {
  console.log(`下载进度: ${progress}%`);
});

// 选择用户
const user = { uid: 'user456', displayName: '李四' };
store.pickOrUnpickUser(user);
```

## 导出
文件最后通过 `export default store` 导出了 `store` 对象，供应用其他部分使用。在应用中，可以通过 `import store from './store'` 来引入并使用这个状态管理对象。