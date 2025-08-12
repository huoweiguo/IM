# WFC（WildFireChat）客户端管理器功能文档

以下文档基于 `src/wfc/client/wfc.js` 中的 `WfcManager` 导出实例（默认导出 `wfc`）。按功能分类列出方法、参数说明与简短示例调用。示例仅示意常见参数形态，实际值请结合业务与常量枚举（如 `ConversationType`, `MessageContentType` 等）。

---

### 基础与初始化

- **getClientId()**: 获取 clientId
  - 示例: `wfc.getClientId()`
- **getProtoRevision()**: 获取协议栈版本编号
  - 示例: `wfc.getProtoRevision()`
- **init(args)**: 初始化（主窗口调用）
  - 参数: `args`（PC: [node 实例]；Web: Config 对象）
  - 示例: `wfc.init([nodeInstance])` 或 `wfc.init({APP_SERVER: "https://example.com"})`
- **attach()**: 非主窗口附着使用
  - 示例: `wfc.attach()`
- **setAppName(appName)**: 设置应用（目录）名（需在 `getClientId`/`connect` 前调用）
  - 示例: `wfc.setAppName("myapp")`

### 加密与链路

- **useSM4()**: 启用国密 SM4（需服务端支持）
  - 示例: `wfc.useSM4()`
- **useAES256()**: 启用 AES256（需服务端支持）
  - 示例: `wfc.useAES256()`
- **useTcpShortLink() / isTcpShortLink()**: 启/查短连接
  - 示例: `wfc.useTcpShortLink(); wfc.isTcpShortLink()`
- **setHeartBeatInterval(sec)**: 设置心跳秒数（30-300）
  - 示例: `wfc.setHeartBeatInterval(60)`

### 连接与网络

- **connect(userId, token)**: 连接服务器
  - 示例: `wfc.connect("u1", "token-from-server")`
- **disconnect()**: 断开连接
  - 示例: `wfc.disconnect()`
- **isLogin()**: 是否登录
  - 示例: `wfc.isLogin()`
- **getConnectionStatus()**: 获取连接状态
  - 示例: `wfc.getConnectionStatus()`
- **setProxyInfo(host, ip, port, username, password)**: 设置 SOCKS5 代理
  - 示例: `wfc.setProxyInfo("proxy.example.com", "", 1080, "user", "pwd")`
- **setPackageName(packageName)**: 设置包名
  - 示例: `wfc.setPackageName("com.example.app")`
- **getServerDeltaTime()**: 服务器与本地时间差
  - 示例: `wfc.getServerDeltaTime()`
- **screenShot()**: 截图（保存系统剪贴板）
  - 示例: `wfc.screenShot()`
- **setBackupAddressStrategy(strategy)**: 双网策略（0 自动/1 主/2 备）
  - 示例: `wfc.setBackupAddressStrategy(0)`
- **setBackupAddress(host, port)**: 设置备选网络地址
  - 示例: `wfc.setBackupAddress("backup.example.com", 8080)`
- **getConnectedNetworkType()**: 获取连接网络类型（1 主/0 未知/-1 备）
  - 示例: `wfc.getConnectedNetworkType()`
- **connectedToMainNetwork()**: 双网是否连主网
  - 示例: `wfc.connectedToMainNetwork()`
- **setProtoUserAgent(ua)** / **addHttpHeader(h, v)**: 设置短链 UA/自定义 Header
  - 示例: `wfc.setProtoUserAgent("MyUA/1.0"); wfc.addHttpHeader("X-Trace", "abc")`
- **onAppResume() / onAppSuspend()**: 移动端前后台切换
  - 示例: `wfc.onAppResume(); wfc.onAppSuspend()`
- **onForeground()**: 小程序切到前台
  - 示例: `wfc.onForeground()`

### 推送与设备

- **setDeviceToken(pushType, token)**: 设置第三方推送设备 token（0-5 移动端使用）
  - 示例: `wfc.setDeviceToken(0, "apns-token")`

### 用户信息与显示名

- **getUserId()**: 当前用户 ID
  - 示例: `wfc.getUserId()`
- **getUserInfo(userId, refresh=false, groupId='')**: 获取用户信息
  - 示例: `wfc.getUserInfo("u1", true, "g1")`
- **getUserInfoEx(userId, refresh, success, fail)**: 异步获取用户信息
  - 示例: `wfc.getUserInfoEx("u1", true, ui=>{}, err=>{})`
- **getUserInfos(userIds, groupId)**: 批量用户信息
  - 示例: `wfc.getUserInfos(["u1","u2"], "g1")`
- **getUserInfosEx(userIds, successCB, failCB)**: 批量从服务端拉取
  - 示例: `wfc.getUserInfosEx(["u1","u2"], list=>{}, err=>{})`
- **getUserDisplayName(userId)** / **getUserDisplayNameEx(userInfo)**: 显示名
  - 示例: `wfc.getUserDisplayName("u1")`
- **getGroupMemberDisplayName(groupId, userId, ignoreFriendAlias=false)** / **getGroupMemberDisplayNameEx(userInfo, ignoreFriendAlias=false)**
  - 示例: `wfc.getGroupMemberDisplayName("g1","u1",false)`

### 用户搜索与本地搜索

- **searchUser(keyword, searchType, page, successCB, failCB)** / **searchUserEx(domainId, keyword, searchType, page, successCB, failCB)**
  - 示例: `wfc.searchUser("张三", 0, 1, (k, list)=>{}, code=>{})`
- **searchFriends(keyword)**: 本地搜索好友
  - 示例: `wfc.searchFriends("张")`
- **searchGroups(keyword)**: 本地搜索群
  - 示例: `wfc.searchGroups("技术")`
- **searchChannel(keyword, fuzzy, successCB, failCB)**: 搜索频道
  - 示例: `wfc.searchChannel("新闻", true, (k, list)=>{}, code=>{})`

### 好友与黑名单

- 好友请求/处理/删除
  - **getIncommingFriendRequest()** / **getOutgoingFriendRequest()** / **getOneFriendRequest(userId, incoming=true)**
    - 示例: `wfc.getIncommingFriendRequest()`
  - **loadFriendRequestFromRemote()** / **getUnreadFriendRequestCount()** / **clearUnreadFriendRequestStatus()**
    - 示例: `wfc.loadFriendRequestFromRemote()`
  - **clearFriendRequest(direction, beforeTime)** / **deleteFriendRequest(userId, direction)**
    - 示例: `wfc.clearFriendRequest(1, 0)`
  - **sendFriendRequest(userId, reason, extra, successCB, failCB)**
    - 示例: `wfc.sendFriendRequest("u2","加个好友","{}", ()=>{}, code=>{})`
  - **handleFriendRequest(userId, accept, extra, successCB, failCB)**
    - 示例: `wfc.handleFriendRequest("u2", true, "{}", ()=>{}, code=>{})`
  - **deleteFriend(userId, successCB, failCB)**
    - 示例: `wfc.deleteFriend("u2", ()=>{}, code=>{})`
- 好友列表/别名/Extra
  - **getMyFriendList(fresh=false)** / **getFriendList(fresh=false)** / **getFriendAlias(userId)** / **getFriendExtra(userId)**
    - 示例: `wfc.getFriendList(true)`
  - **setFriendAlias(userId, alias, successCB, failCB)**
    - 示例: `wfc.setFriendAlias("u2","老王", ()=>{}, code=>{})`
- 黑名单
  - **isBlackListed(userId)** / **getBlackList()** / **setBlackList(userId, block, successCB, failCB)**
    - 示例: `wfc.setBlackList("u2", true, ()=>{}, code=>{})`
- 星标用户
  - **getFavUsers()** / **isFavUser(userId)** / **setFavUser(userId, fav, successCB, failCB)**
    - 示例: `wfc.setFavUser("u2", true, ()=>{}, code=>{})`

### 群组管理

- 收藏群与列表
  - **getMyGroupList() [deprecated]** / **getFavGroupList()** / **getFavGroups()** / **isFavGroup(groupId)** / **setFavGroup(groupId, fav, successCB, failCB)**
    - 示例: `wfc.setFavGroup("g1", true, ()=>{}, code=>{})`
  - **getMyGroups(successCB, failCB)** / **getCommonGroups(userId, successCB, failCB)**
    - 示例: `wfc.getMyGroups(ids=>{}, code=>{})`
- 群资料
  - **createGroup(groupId, groupType, name, portrait, groupExtra, memberIds, memberExtra, lines, notifyContent, successCB, failCB)**
    - 示例: `wfc.createGroup(null,1,"技术群","","",["u1","u2"],"",[0],null, id=>{}, code=>{})`
  - **getGroupInfo(groupId, refresh=false)** / **getGroupInfos(groupIds, refresh=false)** / **getGroupInfoEx(groupId, refresh, successCB, failCB)**
    - 示例: `wfc.getGroupInfo("g1", true)`
  - **modifyGroupInfo(groupId, type, newValue, lines, notifyMessageContent, successCB, failCB)**
    - 示例: `wfc.modifyGroupInfo("g1", 1, "新群名", [0], null, ()=>{}, code=>{})`
  - **setGroupRemark(groupId, remark, successCB, failCB)** / **getGroupRemark(groupId)**
    - 示例: `wfc.setGroupRemark("g1", "内部群", ()=>{}, code=>{})`
- 群成员
  - **addGroupMembers(groupId, memberIds, extra, notifyLines, notifyMessageContent, successCB, failCB)**
    - 示例: `wfc.addGroupMembers("g1", ["u3"], "", [0], null, ()=>{}, code=>{})`
  - **getGroupMemberIds(groupId, fresh=false)** / **getGroupMembers(groupId, fresh=false)** / **getGroupMembersByType(groupId, memberType)** / **getGroupMembersEx(groupId, fresh, successCB, failCB)** / **getGroupMember(groupId, memberId)**
    - 示例: `wfc.getGroupMembers("g1", false)`
  - **kickoffGroupMembers(groupId, memberIds, notifyLines, notifyMsg, successCB, failCB)**
    - 示例: `wfc.kickoffGroupMembers("g1", ["u3"], [0], null, ()=>{}, code=>{})`
  - **muteGroupMembers(groupId, isSet, memberIds=[], notifyLines=[], notifyMsg, successCB, failCB)**
    - 示例: `wfc.muteGroupMembers("g1", true, ["u3"], [0], null, ()=>{}, code=>{})`
  - **allowGroupMembers(groupId, isSet, memberIds=[], notifyLines=[], notifyMsg, successCB, failCB)**
    - 示例: `wfc.allowGroupMembers("g1", true, ["u3"], [0], null, ()=>{}, code=>{})`
  - **modifyGroupAlias(groupId, alias, lines, notifyMessageContent, successCB, failCB)**
    - 示例: `wfc.modifyGroupAlias("g1","我在群的别名",[0],null, ()=>{}, code=>{})`
  - **modifyGroupMemberAlias(groupId, memberId, alias, lines, notifyMessageContent, successCB, failCB)**
    - 示例: `wfc.modifyGroupMemberAlias("g1","u2","小王",[0],null, ()=>{}, code=>{})`
  - **modifyGroupMemberExtra(groupId, memberId, extra, lines, notifyMessageContent, successCB, failCB)**
    - 示例: `wfc.modifyGroupMemberExtra("g1","u2","{\"title\":\"讲师\"}",[0],null, ()=>{}, code=>{})`
- 权限/所有权
  - **setGroupManager(groupId, isSet, memberIds, lines, notifyContent, successCB, failCB)**
    - 示例: `wfc.setGroupManager("g1", true, ["u2"], [0], null, ()=>{}, code=>{})`
  - **transferGroup(groupId, newOwner, lines, notifyMessageContent, successCB, failCB)**
    - 示例: `wfc.transferGroup("g1", "u2", [0], null, ()=>{}, code=>{})`
  - **quitGroup(groupId, lines, notifyMessageContent, successCB, failCB)** / **dismissGroup(groupId, lines, notifyMessageContent, successCB, failCB)**
    - 示例: `wfc.quitGroup("g1", [0], null, ()=>{}, code=>{})`

### 频道（Channel）

- **createChannel(name, portrait, desc, extra, successCB, failCB)**
  - 示例: `wfc.createChannel("资讯", "", "每日资讯", "", id=>{}, code=>{})`
- **getChannelInfo(channelId, refresh)** / **modifyChannelInfo(channelId, type, newValue, successCB, failCB)**
  - 示例: `wfc.getChannelInfo("c1", true)`
- **isListenedChannel(channelId)** / **listenChannel(channelId, listen, successCB, failCB)**
  - 示例: `wfc.listenChannel("c1", true, ()=>{}, code=>{})`
- **getMyChannels()** / **getListenedChannels() [deprecated]** / **getRemoteListenedChannels(successCB, failCB)**
  - 示例: `wfc.getRemoteListenedChannels(list=>{}, code=>{})`
- **destoryChannel(channelId, successCB, failCB)**
  - 示例: `wfc.destoryChannel("c1", ()=>{}, code=>{})`

### 聊天室（Chatroom）

- **joinChatroom(chatroomId, successCB, failCB)** / **quitChatroom(chatroomId, successCB, failCB)**
  - 示例: `wfc.joinChatroom("room1", ()=>{}, code=>{})`
- **getChatroomInfo(chatroomId, updateDt, successCB, failCB)**
  - 示例: `wfc.getChatroomInfo("room1", Date.now(), info=>{}, code=>{})`
- **getChatroomMemberInfo(chatroomId, maxCount, successCB, failCB)**
  - 示例: `wfc.getChatroomMemberInfo("room1", 50, list=>{}, code=>{})`

### 密聊（Secret Chat）

- **getSecretChatInfo(targetId)** / **destroySecretChat(targetId, successCB, failCB)**
  - 示例: `wfc.getSecretChatInfo("u2")`
- **encodeSecretChatMediaData(targetId, mediaDataBuffer)** / **decodeSecretChatMediaData(targetId, mediaDataBuffer)**
  - 示例: `wfc.encodeSecretChatMediaData("u2", bin)`
- **setSecretChatBurnTime(targetId, ms)**
  - 示例: `wfc.setSecretChatBurnTime("u2", 30000)`
- **isEnableSecretChat() / isUserEnableSecretChat() / setUserEnableSecretChat(enable, successCB, failCB)**
  - 示例: `wfc.setUserEnableSecretChat(true, ()=>{}, code=>{})`

### 会话（Conversation）

- 列表与详情
  - **getConversationList(types, lines)** / **getConversationInfo(conversation)**
    - 示例: `wfc.getConversationList([0,1,2], [0])`
- 搜索
  - **searchConversation(keyword, types=[0,1,2], lines=[0,1,2])**
  - **searchConversationEx(keyword, types, lines, startTime, endTime, desc, limit, offset)**
  - **searchConversationEx2(keyword, types, lines, cntTypes, startTime, endTime, desc, limit, offset, onlyMentionedMsg)**
    - 示例: `wfc.searchConversation("项目", [0,1,2], [0])`
- 置顶/免打扰/草稿/时间戳
  - **setConversationTop(conversation, top, successCB, failCB)**
  - **setConversationSlient(conversation, silent, successCB, failCB)**
  - **setConversationDraft(conversation, draft='')**
  - **setConversationTimestamp(conversation, timestamp)**
    - 示例: `wfc.setConversationTop(conv, 1, ()=>{}, code=>{})`
- 未读
  - **getUnreadCount(types=[0,1,2], lines=[0])** / **getConversationUnreadCount(conversation)**
  - **clearConversationUnreadStatus(conversation)** / **clearUnreadStatusBeforeMessage(conversation, messageId)**
  - **markConversationAsUnread(conversation, syncToOtherClient)** / **clearAllUnreadStatus()**
    - 示例: `wfc.getUnreadCount([0,1,2],[0])`
- 删除会话
  - **removeConversation(conversation, clearMsg)**
    - 示例: `wfc.removeConversation(conv, true)`

### 消息（Message）

- 获取（V2 推荐）
  - 会话：**getMessagesV2(conversation, fromIndex, before, count, withUser, successCB, failCB)**
  - 提醒：**getMentionedMessages(conversation, fromIndex, before, count, successCB, failCB)**
  - 综合：**getMessagesExV2(conversationTypes, lines, fromIndex, before, count, withUser, contentTypes, successCB, failCB)**
  - 按状态：**getMessagesEx2V2(conversationTypes, lines, messageStatus, fromIndex, before, count, withUser, successCB, failCB)**
  - 按时间：**getMessagesByTimestampV2(conversation, contentTypes, timestamp, before, count, withUser, successCB, failCB)**
  - 按状态（会话）：**getMessagesByStatusV2(conversation, statuses, fromIndex, before, count, withUser, successCB, failCB)**
  - 示例: `wfc.getMessagesV2(conv, 0, true, 20, "", list=>{}, code=>{})`
- 旧版（deprecated）
  - **getMessages / getMessagesEx / getMessagesEx2 / getMessagesByTimestamp / getUserMessages / getUserMessagesEx**
- 远程历史
  - **loadRemoteConversationMessages(conversation, contentTypes, beforeUid, count, successCB, failCB)**
  - **loadRemoteConversationMessagesEx(conversation, contentTypes, beforeUid, count, filterLocalMessage, successCB, failCB)**
  - **loadRemoteLineMessages(line, contentTypes, beforeUid, count, filterLocalMessage, successCB, failCB)**
  - **loadRemoteMessage(messageUid, successCB, failCB)**
    - 示例: `wfc.loadRemoteConversationMessages(conv, [1], Long.fromString("1000"), 50, list=>{}, code=>{})`
- 搜索
  - **searchMessage(conversation, keyword, withUser='')** / **searchMessageEx(conversation, keyword, desc, limit, offset, withUser='')**
  - **searchMentionedMessages(conversation, keyword, desc, limit, offset)**
  - **searchMessageByTypes(conversation, keyword, contentTypes, desc, limit, offset, withUser='')**
  - **searchMessageByTypesAndTimes(conversation, keyword, contentTypes, startTime, endTime, desc, limit, offset, withUser='')**
  - **searchMessageEx2(conversationTypes, lines, contentTypes, keyword, fromIndex, desc, count, withUser='')**
  - **searchMentionedMessageEx(conversationTypes, lines, keyword, desc, limit, offset)**
    - 示例: `wfc.searchMessage(conv, "会议", "")`
- 单条获取
  - **getMessageById(messageId)** / **getMessageByUid(messageUid)** / **getFirstUnreadMessageId(conversation)**
    - 示例: `wfc.getMessageById(123)`
- 发送
  - **sendConversationMessage(conversation, messageContent, toUsers=[], preparedCB, progressCB, successCB, failCB)**
  - **sendMessage(message, preparedCB, progressCB, successCB, failCB)** / **sendMessageEx(message, toUsers=[], preparedCB, progressCB, successCB, failCB)** / **sendSavedMessage(message, expireDuration, successCB, failCB)**
    - 示例: `wfc.sendConversationMessage(conv, textContent, [], null, null, (uid, ts)=>{}, code=>{})`
- 操作
  - **cancelSendingMessage(messageId)** / **recallMessage(messageUid, successCB, failCB)** / **deleteMessage(messageId)** / **batchDeleteMessages(messageUids)** / **deleteRemoteMessageByUid(msgUid, successCB, failCB)**
    - 示例: `wfc.recallMessage(Long.fromString("1001"), ()=>{}, code=>{})`
  - **updateRemoteMessageContent(msgUid, messageContent, distribute, updateLocal, successCB, failCB)**
    - 示例: `wfc.updateRemoteMessageContent(Long.fromString("1001"), newContent, true, true, ()=>{}, code=>{})`
  - **insertMessage(conversation, messageContent, status, notify=false, toUsers=[], serverTime=0)** / **insertMessageEx(messageUid, conversation, fromUser, messageContent, status, serverTime, localExtra)**
    - 示例: `wfc.insertMessage(conv, textContent, 0, false, [], Date.now())`
  - **updateMessageContent(messageId, messageContent)** / **updateMessageStatus(messageId, status)** / **setMediaMessagePlayed(messageId)** / **setMessageLocalExtra(messageId, extra)**
    - 示例: `wfc.setMessageLocalExtra(123, "{\"read\":true}")`
- 统计与清理
  - **getMessageCount(conversation)** / **getConversationMessageCount(types, lines)** / **getMessageCountByDay(conversation, contentTypes, startTimeSec, endTimeSec)**
  - **clearMessages(conversation)** / **clearMessagesBefore(conversation, beforeMs)** / **clearMessagesKeepLatest(conversation, count)** / **clearUserMessages(userId, startTimeMs, endTimeMs)** / **clearAllMessages(removeConversation)** / **clearRemoteConversationMessages(conversation, successCB, failCB)**
    - 示例: `wfc.clearMessagesBefore(conv, Date.now()-7*86400000)`
- 已读回执与阅读状态
  - **isReceiptEnabled() / isGroupReceiptEnabled() / isUserReceiptEnabled()**
  - **setUserEnableReceipt(enable, successCB, failCB)**
  - **getConversationRead(conversation)**
    - 示例: `wfc.setUserEnableReceipt(true, ()=>{}, code=>{})`

### 文件与媒体

- 上传
  - **uploadMedia(fileName, fileOrData, mediaType, successCB, failCB, progressCB)**
    - 示例: `wfc.uploadMedia("a.jpg", fileOrBlob, 1, url=>{}, code=>{}, (u,t)=>{})`
  - **isSupportBigFilesUpload()** / **getUploadMediaUrl(fileName, mediaType, contentType, successCB, failCB)**
    - 示例: `wfc.getUploadMediaUrl("big.bin", 3, "application/octet-stream", (putUrl, getUrl)=>{}, code=>{})`
- 下载与鉴权
  - **getAuthorizedMediaUrl(messageUid, mediaType, mediaPath, successCB, failCB)**
    - 示例: `wfc.getAuthorizedMediaUrl(Long.fromString("1001"), 1, "/path", url=>{}, code=>{})`
- 文件记录
  - **getConversationFileRecords(conversation, fromUser, beforeMessageUid, order, count, successCB, failCB)** / **getMyFileRecords(beforeMessageUid, order, count, successCB, failCB)**
  - **deleteFileRecord(messageUid, successCB, failCB)**
  - **searchFiles(keyword, conversation, fromUser, beforeMessageId, order, count, successCB, failCB)** / **searchMyFiles(keyword, beforeMessageUid, order, count, successCB, failCB)**
    - 示例: `wfc.searchFiles("报告", conv, "", 0, 0, 20, list=>{}, code=>{})`

### 设置与偏好

- 用户设置
  - **getUserSetting(scope, key)** / **getUserSettings(scope)** / **setUserSetting(scope, key, value, successCB, failCB)**
    - 示例: `wfc.setUserSetting(1, "notify", "1", ()=>{}, code=>{})`
  - **modifyMyInfo(modifyMyInfoEntries, successCB, failCB)**
    - 示例: `wfc.modifyMyInfo([{type:1, value:"新昵称"}], ()=>{}, code=>{})`
- 通知与显示
  - **isGlobalSlient() / setGlobalSlient(silent, successCB, failCB)**
  - **isHiddenNotificationDetail() / setHiddenNotificationDetail(hide, successCB, failCB)**
  - **isHiddenGroupMemberName(groupId) / setHiddenGroupMemberName(groupId, hide, successCB, failCB)**
    - 示例: `wfc.setGlobalSlient(true, ()=>{}, code=>{})`
- 草稿同步
  - **isGlobalDisableSyncDraft() / setDisableSyncDraft(disable, successCB, failCB) / isDisableSyncDraft()**
    - 示例: `wfc.setDisableSyncDraft(true, ()=>{}, code=>{})`

### 在线状态（Presence）

- 开关与订阅
  - **isUserOnlineStateEnabled()**
  - **watchOnlineState(type, targets, durationSec, successCB, failCB)** / **unwatchOnlineState(type, targets, successCB, failCB)**
    - 示例: `wfc.watchOnlineState(0, ["u2","u3"], 3600, list=>{}, code=>{})`
  - **setMyCustomState(customState, customText, successCB, failCB)**
    - 示例: `wfc.setMyCustomState(1, "忙碌", ()=>{}, code=>{})`

### Mesh/域/服务器

- **isEnableMesh()**: 是否开启互联互通
  - 示例: `wfc.isEnableMesh()`
- **getDomainInfo(domainId, refresh=false)** / **loadRemoteDomains(successCB, failCB)** / **reloadDomainInfoFromRemote(domainId, updateDt, successCB, failCB)**
  - 示例: `wfc.loadRemoteDomains(list=>{}, code=>{})`
- **isCommercialServer()**: 是否专业版 IM 服务
  - 示例: `wfc.isCommercialServer()`
- **getHost()**: 获取 host
  - 示例: `wfc.getHost()`
- **getAppPath()**: 获取应用数据目录
  - 示例: `wfc.getAppPath()`
- **getVersion()**: 协议栈版本
  - 示例: `wfc.getVersion()`
- **getEncodedClientId()**: 加密后的 clientId
  - 示例: `wfc.getEncodedClientId()`
- **encodeData(data)** / **decodeData(encodedData)**: 数据加/解密（base64）
  - 示例: `wfc.encodeData("abc"); wfc.decodeData("YWJj")`

### 事务与全局锁

- 事务：**beginTransaction() / commitTransaction() / rollbackTransaction()**
  - 示例: `wfc.beginTransaction(); wfc.commitTransaction()`
- 全局锁：**requireLock(lockId, duration, successCB, failCB) / releaseLock(lockId, successCB, failCB)**
  - 示例: `wfc.requireLock("full-sync", 300, ()=>{}, code=>{})`

### 会议相关（Conference）

- **sendConferenceRequest(sessionId, roomId, request, data, callback)** / **sendConferenceRequestEx(sessionId, roomId, request, data, advance, callback)**
  - 示例: `wfc.sendConferenceRequest("s1","r1","mute", {target:"u2"}, resp=>{})`

### Base64/工具函数

- **utf8_to_b64(str)** / **b64_to_utf8(str)** / **b64_to_arrayBuffer(str)** / **arrayBuffer_to_b64(data)** / **escape(str)** / **unescape(str)**
  - 示例: `wfc.utf8_to_b64("你好"); wfc.b64_to_utf8("5L2g5aW9")`

---

### 常见对象与枚举（参考 SDK/源码）

- Conversation: `{type, target, line}`，类型参考 `ConversationType`（0 单聊/1 群聊/2 频道）。
- MessageContent: 文本/图片/语音等，参考 `MessageContentType`。
- Long: 可使用 `long` 库 `Long.fromString("1001")`。
- 回调约定：`successCB(...); failCB(errorCode)`。

### 备注

- 带有 [deprecated] 的接口为旧版，建议使用对应的 V2 接口。
- 某些功能（如大文件上传、远程消息内容更新、SM4/AES256）需要专业版或服务器端开启配置。
- 默认导出实例：`import wfc from 'src/wfc/client/wfc'`（以项目实际路径为准）。

### 事件与监听（EventType）

- 所有事件通过 `wfc.eventEmitter` 订阅。以下为事件清单与回调签名：
  - `SendMessage` (`sendMsg`): function(message)
  - `ReceiveMessage` (`receiveMsg`): function(message, hasMore)
  - `MessageReceived` (`msgReceived`): function(mapUserIdToReceiveTime)
  - `MessageRead` (`msgRead`): function(readEntries)
  - `RecallMessage` (`recallMsg`): function(operator, messageUid)
  - `MessageDeleted` (`msgDeleted`): function(messageUid) 远程删除触发
  - `DeleteMessage` (`deleteMsg`): function(messageId) 本地删除触发
  - `MessageStatusUpdate` (`msgStatusUpdate`): function(message)
  - `MessageContentUpdate` (`msgContentUpdate`): function(message)
  - `ConnectionStatusChanged` (`connectionStatusChanged`): function(connectionStatus)
  - `ConnectToServer` (`connectToServer`): function(hostOrIpOrPort)
  - `ConnectedToServer` (`connectedToServer`): function(hostOrIpOrPortOrMainNw)
  - `UserInfosUpdate` (`userInfosUpdate`): function(userInfos)
  - `ChannelInfosUpdate` (`channelInfosUpdate`): function(channelInfos)
  - `GroupInfosUpdate` (`groupInfosUpdate`): function(groupInfos)
  - `FriendListUpdate` (`friendListUpdate`): function(updatedFriendIds)
  - `FriendRequestUpdate` (`friendRequestUpdate`): function(newFriendRequests)
  - `ConversationInfoUpdate` (`conversationInfoUpdate`): function(conversationInfo)
  - `SettingUpdate` (`settingUpdate`): function()
  - `GroupMembersUpdate` (`groupMembersUpdate`): function(groupId, groupMembers)
  - `ConferenceEvent` (`conferenceEvent`): function(event)
  - `UserOnlineEvent` (`onlineEvent`): function(userOnlineStates)
  - `SecretChatStartBurn` (`secretChatStartBurn`): function(targetId, playedMessageId)
  - `SecretChatMessageBurned` (`secretChatMessageBurned`): function(messageIds)
  - `SecretChatStateChange` (`secretChatStateChange`): function(targetId)
  - `DomainInfoUpdate` (`domainInfoUpdate`): function(domainInfo)

示例：

```js
import ConnectionStatus from 'src/wfc/client/connectionStatus';

wfc.eventEmitter.on('receiveMsg', (message, hasMore) => {
  // 更新 UI 或缓存
});

wfc.eventEmitter.on('connectionStatusChanged', (status) => {
  console.log('连接状态:', status, ConnectionStatus.desc(status));
});
```

### 连接状态（ConnectionStatus）枚举与说明

- `-9` TimeInconsistent: 客户端和 IM 服务端时间不同步，请进行时钟同步
- `-8` NotLicensed: IM 服务未授权或已过期；专业版绑定域名/IP，仅能通过绑定域名连接
- `-7` KickedOff: 被踢下线
- `-6` SecretKeyMismatch: 会话密钥错误；请确认 .node 文件版本正确。参考文档第 12 条 FAQ
- `-5` TokenIncorrect: token 错误
- `-4` ServerDown: IM Server 无法连通，检查服务或网络
- `-3` Rejected: 连接被服务器拒绝（例如用户被封禁）
- `-2` Logout: 退出登录
- `-1` Unconnected: 连接失败
- `0` Connecting: 连接中
- `1` Connected: 连接成功，业务可用
- `2` Receiving: 正在同步信息（同步量大时可等待至 1 再统一更新 UI）

### 枚举速查表（补充）

- 会话类型（ConversationType）

  - `0 Single` 单聊
  - `1 Group` 群聊
  - `2 ChatRoom` 聊天室
  - `3 Channel` 频道
  - `5 SecretChat` 密聊

- 消息状态（MessageStatus）

  - `-1 All` 全部
  - `0 Sending` 发送中
  - `1 Sent` 已发送
  - `2 SendFailure` 发送失败
  - `3 Mentioned` 被 @
  - `4 AllMentioned` 全体 @
  - `5 Unread` 未读
  - `6 Readed` 已读
  - `7 Played` 已播放（媒体）

- 群类型（GroupType）

  - `0 Normal` 普通群
  - `1 Free` 自由群
  - `2 Restricted` 限制群
  - `3 Organization` 组织架构群

- 修改群资料类型（ModifyGroupInfoType）

  - `0 Name` 群名
  - `1 Portrait` 头像
  - `2 Extra` 扩展
  - `3 Mute` 全局禁言
  - `4 JoinType` 入群方式
  - `5 PrivateChat` 私聊
  - `6 Searchable` 可搜索

- 修改频道资料类型（ModifyChannelInfoType）

  - `0 Name` 名称
  - `1 Portrait` 头像
  - `2 Desc` 描述
  - `3 Extra` 扩展

- 用户设置命名空间（UserSettingScope）常用项

  - `1 ConversationSilent` 会话免打扰（请用 API 设置，不推荐直接写入）
  - `2 GlobalSilent` 全局免打扰
  - `3 ConversationTop` 会话置顶（请用 API 设置）
  - `4 HiddenNotificationDetail` 隐藏通知详情
  - `5 GroupHideNickname` 隐藏群内昵称
  - `6 FavoriteGroup` 群收藏
  - `8 My_Channel` 自建频道
  - `9 Listened_Channel` 关注频道
  - `10 UserSettingPCOnline` PC 在线
  - `11 UserSettingConversationReaded` 会话已读
  - `12 WebOnline` Web 在线
  - `13 DisableReceipt` 禁用回执
  - `14 FavoriteUser` 星标用户
  - `15 MuteWhenPCOnline` PC 在线时静音
  - `16 LinesReaded` 线路已读
  - `17 NoDisturbing` 免打扰
  - `18 ConversationClearMessage` 清理会话消息
  - `19 ConversationDraft` 草稿
  - `20 DisableSyncDraft` 禁止草稿同步
  - `21 VoipSilent` 音视频静音
  - `23 CustomState` 自定义状态
  - `24 DisableSecretChat` 关闭密聊
  - `25 PttSilent` 对讲静音
  - `26 GroupRemark` 群备注
  - `>=1000` 自定义范围

- 用户搜索类型（SearchType）

  - `0 General` 模糊 displayName + 精确 name/手机号
  - `1 NameOrMobile` 精确 name 或手机号
  - `2 Name` 精确 name
  - `3 Mobile` 精确手机号

- 消息内容类型（MessageContentType）常用与系统通知（节选，详见源码）
  - `0 Unknown` 未知
  - `1 Text` 文本
  - `2 Voice` 语音
  - `3 Image` 图片
  - `4 Location` 位置
  - `5 File` 文件
  - `6 Video` 视频
  - `7 Sticker` 表情贴纸
  - `8 Link` 链接
  - `9 P_Text` 富文本段
  - `10 UserCard` 名片
  - `11 Composite_Message` 合并转发
  - `12 Rich_Notification` 富通知
  - `13 Articles` 图文
  - `14 Streaming_Text_Generating` 流式生成中
  - `15 Streaming_Text_Generated` 流式生成完毕
  - `31 Mark_Unread_Sync` 未读同步
  - `40 StartSecretChat_Notification` 开启密聊
  - `71 Enter_Channel_Chat` 进入频道
  - `72 Leave_Channel_Chat` 离开频道
  - `73 Channel_Menu_Event` 频道菜单事件
  - `80 RecallMessage_Notification` 撤回通知
  - `81 DeleteMessage_Notification` 删除通知（不存储）
  - `90 Tip_Notification` 提示
  - `91 Typing` 正在输入
  - `92 Friend_Greeting` 打招呼
  - `93 Friend_Added` 成为好友
  - `94 PC_Login_Request` PC 登录请求
  - `104-125` 群系统通知（建群/加人/踢人/退群/解散/转让/改名/改头像/禁言/入群方式/私聊/可搜索/设管/成员禁言/白名单/可见通知/成员扩展/群扩展/群设置变更/拒绝入群 等）
  - `400+` 音视频/会议/远程控制相关
  - `501-502` 社区动态/评论
  - `510-511` 混合图文/文件消息

### 回调与返回规范（约定）

- `successCB(...args)`：成功时回调，参数依接口不同（如返回列表、ID、状态等）
- `failCB(errorCode)`：失败时回调，errorCode 为数值错误码
- 发送消息类回调：
  - `preparedCB(messageId, timestamp)`：本地已入库
  - `progressCB(uploaded, total)`：媒体上传进度（>100K 有效）
  - `successCB(messageUid, timestamp)`：服务端确认

示例：

```js
wfc.sendConversationMessage(
  conv,
  textContent,
  [],
  (mid, ts) => console.log('prepared', mid, ts),
  (u, t) => console.log('progress', u, '/', t),
  (uid, ts) => console.log('sent', uid, ts),
  (code) => console.warn('fail', code)
);
```

### 使用建议与注意事项

- 获取 token 前务必调用 `getClientId()`，并确保服务器签发的 token 与该 clientId 匹配
- 多窗口：仅主窗口 `init()`，其余窗口使用 `attach()`
- 专业版能力：大文件上传、远程消息内容更新、双网策略、SM4/AES256 等需服务端开启对应配置
- 未读清理：`clearAllUnreadStatus()` 仅清底层未读，不会触发 `ConversationInfoUpdate`，UI 未读需自行重置
- 草稿同步：如需禁止多端同步，可用 `setDisableSyncDraft(true)` 并在 UI 层自管
