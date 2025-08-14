# WFC（WildFireChat）客户端管理器功能文档

## 概述

本文档详细描述了 WFC（WildFireChat）客户端管理器的所有功能方法，基于 `src/wfc/client/wfc.js` 中的 `WfcManager` 导出实例（默认导出 `wfc`）。文档按功能分类组织，提供了详细的参数说明、返回值解释、使用示例和注意事项。

---

## 基础与初始化

### getClientId()

**功能描述**：获取当前客户端的唯一标识符 clientId。
**返回值**：`string` - 客户端唯一标识符。
**示例**：

```javascript
const clientId = wfc.getClientId();
console.log('客户端ID:', clientId);
```

**注意事项**：clientId 在初始化后生成，通常在连接服务器前调用。

### getProtoRevision()

**功能描述**：获取协议栈的版本编号。
**返回值**：`number` - 协议栈版本号。
**示例**：

```javascript
const revision = wfc.getProtoRevision();
console.log('协议版本:', revision);
```

### init(args)

**功能描述**：初始化 WFC 客户端（主窗口调用）。
**参数**：

- `args`：PC 端为 [node 实例]，Web 端为 Config 对象。
  - Config 对象结构：
    - `APP_SERVER`：应用服务器地址
    - 其他配置项...
**示例**：

```javascript
// PC 端初始化
const nodeInstance = require('node');
wfc.init([nodeInstance]);

// Web 端初始化
wfc.init({
  APP_SERVER: "https://example.com",
  // 其他配置
});
```

**注意事项**：这是客户端初始化的必要步骤，必须在使用其他功能前调用。

### attach()

**功能描述**：非主窗口附着使用 WFC 客户端。
**示例**：

```javascript
// 在非主窗口中调用
wfc.attach();
```

**注意事项**：用于多窗口应用中，非主窗口需要调用此方法来共享主窗口的 WFC 实例。

### setAppName(appName)

**功能描述**：设置应用（目录）名，用于存储数据的目录命名。
**参数**：

- `appName`：`string` - 应用名称。
**示例**：

```javascript
wfc.setAppName("myapp");
```

**注意事项**：必须在 `getClientId` 和 `connect` 方法之前调用。

---

## 加密与链路

### useSM4()

**功能描述**：启用国密 SM4 加密算法（需服务端支持）。
**示例**：

```javascript
wfc.useSM4();
```

**注意事项**：启用后，通信将使用 SM4 算法加密，需要服务端也支持该算法。

### useAES256()

**功能描述**：启用 AES256 加密算法（需服务端支持）。
**示例**：

```javascript
wfc.useAES256();
```

**注意事项**：启用后，通信将使用 AES256 算法加密，需要服务端也支持该算法。

### useTcpShortLink()

**功能描述**：启用 TCP 短连接模式。
**示例**：

```javascript
wfc.useTcpShortLink();
```

### isTcpShortLink()

**功能描述**：检查当前是否使用 TCP 短连接模式。
**返回值**：`boolean` - 是否启用短连接。
**示例**：

```javascript
const isShortLink = wfc.isTcpShortLink();
console.log('是否使用短连接:', isShortLink);
```

### setHeartBeatInterval(sec)

**功能描述**：设置心跳间隔秒数。
**参数**：

- `sec`：`number` - 心跳间隔（30-300 秒）。
**示例**：

```javascript
wfc.setHeartBeatInterval(60); // 设置 60 秒心跳间隔
```

**注意事项**：心跳间隔过短会增加网络负担，过长可能导致连接被判定为超时。

---

## 连接与网络

### connect(userId, token)

**功能描述**：连接到 WFC 服务器。
**参数**：

- `userId`：`string` - 用户 ID。
- `token`：`string` - 用户令牌，从服务端获取。
**示例**：

```javascript
wfc.connect("u1", "token-from-server")
  .then(() => {
    console.log('连接成功');
  })
  .catch(error => {
    console.error('连接失败:', error);
  });
```

**注意事项**：连接前需确保已初始化客户端。

### disconnect()

**功能描述**：断开与服务器的连接。
**示例**：

```javascript
wfc.disconnect();
```

### isLogin()

**功能描述**：检查用户是否已登录。
**返回值**：`boolean` - 是否已登录。
**示例**：

```javascript
const isLoggedIn = wfc.isLogin();
console.log('是否已登录:', isLoggedIn);
```

### getConnectionStatus()

**功能描述**：获取当前连接状态。
**返回值**：`number` - 连接状态码（具体含义参考 WFC 文档）。
**示例**：

```javascript
const status = wfc.getConnectionStatus();
console.log('连接状态:', status);
```

### setProxyInfo(host, ip, port, username, password)

**功能描述**：设置 SOCKS5 代理信息。
**参数**：

- `host`：`string` - 代理服务器主机名。
- `ip`：`string` - 代理服务器 IP 地址（可选，与 host 二选一）。
- `port`：`number` - 代理服务器端口。
- `username`：`string` - 代理认证用户名（可选）。
- `password`：`string` - 代理认证密码（可选）。
**示例**：

```javascript
wfc.setProxyInfo("proxy.example.com", "", 1080, "user", "pwd");
```

### setPackageName(packageName)

**功能描述**：设置应用包名，用于推送等功能。
**参数**：

- `packageName`：`string` - 应用包名。
**示例**：

```javascript
wfc.setPackageName("com.example.app");
```

### getServerDeltaTime()

**功能描述**：获取服务器时间与本地时间的差值（毫秒）。
**返回值**：`number` - 时间差值。
**示例**：

```javascript
const delta = wfc.getServerDeltaTime();
const serverTime = Date.now() + delta;
console.log('服务器时间:', new Date(serverTime));
```

### screenShot()

**功能描述**：截取屏幕并保存到系统剪贴板。
**示例**：

```javascript
wfc.screenShot();
```

**注意事项**：此功能可能需要系统权限。

### setBackupAddressStrategy(strategy)

**功能描述**：设置双网策略。
**参数**：

- `strategy`：`number` - 策略类型（0: 自动切换，1: 只使用主网，2: 只使用备网）。
**示例**：

```javascript
wfc.setBackupAddressStrategy(0); // 自动切换
```

### setBackupAddress(host, port)

**功能描述**：设置备选网络地址。
**参数**：

- `host`：`string` - 备选服务器主机名。
- `port`：`number` - 备选服务器端口。
**示例**：

```javascript
wfc.setBackupAddress("backup.example.com", 8080);
```

### getConnectedNetworkType()

**功能描述**：获取当前连接的网络类型。
**返回值**：`number` - 网络类型（1: 主网，0: 未知，-1: 备网）。
**示例**：

```javascript
const networkType = wfc.getConnectedNetworkType();
console.log('网络类型:', networkType);
```

### connectedToMainNetwork()

**功能描述**：检查当前是否连接到主网。
**返回值**：`boolean` - 是否连接到主网。
**示例**：

```javascript
const isMainNetwork = wfc.connectedToMainNetwork();
console.log('是否连接主网:', isMainNetwork);
```

### setProtoUserAgent(ua)

**功能描述**：设置短链请求的 User-Agent。
**参数**：

- `ua`：`string` - User-Agent 字符串。
**示例**：

```javascript
wfc.setProtoUserAgent("MyUA/1.0");
```

### addHttpHeader(h, v)

**功能描述**：添加自定义 HTTP 头。
**参数**：

- `h`：`string` - 头名称。
- `v`：`string` - 头值。
**示例**：

```javascript
wfc.addHttpHeader("X-Trace", "abc");
```

### onAppResume()

**功能描述**：移动端应用恢复到前台时调用。
**示例**：

```javascript
// 在移动端应用生命周期回调中调用
document.addEventListener('resume', () => {
  wfc.onAppResume();
});
```

### onAppSuspend()

**功能描述**：移动端应用进入后台时调用。
**示例**：

```javascript
// 在移动端应用生命周期回调中调用
document.addEventListener('suspend', () => {
  wfc.onAppSuspend();
});
```

### onForeground()

**功能描述**：小程序切换到前台时调用。
**示例**：

```javascript
// 在小程序生命周期回调中调用
App({
  onShow() {
    wfc.onForeground();
  }
});
```

---

## 推送与设备

### setDeviceToken(pushType, token)

**功能描述**：设置第三方推送设备 token。
**参数**：

- `pushType`：`number` - 推送类型（0-5，移动端使用）。
- `token`：`string` - 推送设备 token。
**示例**：

```javascript
// iOS 推送
wfc.setDeviceToken(0, "apns-token");

// Android 推送
wfc.setDeviceToken(1, "fcm-token");
```

**注意事项**：不同平台的推送类型值不同，请参考 WFC 文档。

---

## 用户信息与显示名

### getUserId()

**功能描述**：获取当前用户 ID。
**返回值**：`string` - 当前用户 ID。
**示例**：

```javascript
const userId = wfc.getUserId();
console.log('当前用户ID:', userId);
```

### getUserInfo(userId, refresh=false, groupId='')

**功能描述**：获取用户信息。
**参数**：

- `userId`：`string` - 用户 ID。
- `refresh`：`boolean` - 是否从服务器刷新数据（默认 false）。
- `groupId`：`string` - 群组 ID（可选，用于获取群内用户信息）。
**返回值**：`Object` - 用户信息对象。
**示例**：

```javascript
const userInfo = wfc.getUserInfo("u1", true, "g1");
console.log('用户信息:', userInfo);
```

### getUserInfoEx(userId, refresh, success, fail)

**功能描述**：异步获取用户信息。
**参数**：

- `userId`：`string` - 用户 ID。
- `refresh`：`boolean` - 是否从服务器刷新数据。
- `success`：`function` - 成功回调函数，参数为用户信息。
- `fail`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getUserInfoEx("u1", true, 
  (userInfo) => {
    console.log('用户信息:', userInfo);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getUserInfos(userIds, groupId)

**功能描述**：批量获取用户信息。
**参数**：

- `userIds`：`Array<string>` - 用户 ID 数组。
- `groupId`：`string` - 群组 ID（可选）。
**返回值**：`Array<Object>` - 用户信息数组。
**示例**：

```javascript
const userInfos = wfc.getUserInfos(["u1","u2"], "g1");
console.log('用户信息列表:', userInfos);
```

### getUserInfosEx(userIds, successCB, failCB)

**功能描述**：批量从服务端拉取用户信息。
**参数**：

- `userIds`：`Array<string>` - 用户 ID 数组。
- `successCB`：`function` - 成功回调函数，参数为用户信息列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getUserInfosEx(["u1","u2"], 
  (userInfos) => {
    console.log('用户信息列表:', userInfos);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getUserDisplayName(userId)

**功能描述**：获取用户显示名。
**参数**：

- `userId`：`string` - 用户 ID。
**返回值**：`string` - 用户显示名。
**示例**：

```javascript
const displayName = wfc.getUserDisplayName("u1");
console.log('用户显示名:', displayName);
```

### getUserDisplayNameEx(userInfo)

**功能描述**：根据用户信息获取显示名。
**参数**：

- `userInfo`：`Object` - 用户信息对象。
**返回值**：`string` - 用户显示名。
**示例**：

```javascript
const userInfo = wfc.getUserInfo("u1");
const displayName = wfc.getUserDisplayNameEx(userInfo);
console.log('用户显示名:', displayName);
```

### getGroupMemberDisplayName(groupId, userId, ignoreFriendAlias=false)

**功能描述**：获取群成员在群内的显示名。
**参数**：

- `groupId`：`string` - 群组 ID。
- `userId`：`string` - 用户 ID。
- `ignoreFriendAlias`：`boolean` - 是否忽略好友别名（默认 false）。
**返回值**：`string` - 群成员显示名。
**示例**：

```javascript
const displayName = wfc.getGroupMemberDisplayName("g1","u1",false);
console.log('群成员显示名:', displayName);
```

### getGroupMemberDisplayNameEx(userInfo, ignoreFriendAlias=false)

**功能描述**：根据用户信息获取群成员显示名。
**参数**：

- `userInfo`：`Object` - 用户信息对象。
- `ignoreFriendAlias`：`boolean` - 是否忽略好友别名（默认 false）。
**返回值**：`string` - 群成员显示名。
**示例**：

```javascript
const userInfo = wfc.getUserInfo("u1", false, "g1");
const displayName = wfc.getGroupMemberDisplayNameEx(userInfo, false);
console.log('群成员显示名:', displayName);
```

---

## 用户搜索与本地搜索

### searchUser(keyword, searchType, page, successCB, failCB)

**功能描述**：搜索用户。
**参数**：

- `keyword`：`string` - 搜索关键词。
- `searchType`：`number` - 搜索类型（具体含义参考 WFC 文档）。
- `page`：`number` - 页码（从 1 开始）。
- `successCB`：`function` - 成功回调函数，参数为关键词和用户列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.searchUser("张三", 0, 1, 
  (keyword, userList) => {
    console.log(`搜索 "${keyword}" 结果:`, userList);
  }, 
  (errorCode) => {
    console.error('搜索失败:', errorCode);
  }
);
```

### searchUserEx(domainId, keyword, searchType, page, successCB, failCB)

**功能描述**：跨域搜索用户。
**参数**：

- `domainId`：`string` - 域 ID。
- `keyword`：`string` - 搜索关键词。
- `searchType`：`number` - 搜索类型。
- `page`：`number` - 页码。
- `successCB`：`function` - 成功回调。
- `failCB`：`function` - 失败回调。
**示例**：

```javascript
wfc.searchUserEx("domain1", "张三", 0, 1, 
  (keyword, userList) => {
    console.log(`跨域搜索结果:`, userList);
  }, 
  (errorCode) => {
    console.error('跨域搜索失败:', errorCode);
  }
);
```

### searchFriends(keyword)

**功能描述**：本地搜索好友。
**参数**：

- `keyword`：`string` - 搜索关键词。
**返回值**：`Array<Object>` - 匹配的好友列表。
**示例**：

```javascript
const friends = wfc.searchFriends("张");
console.log('搜索好友结果:', friends);
```

### searchGroups(keyword)

**功能描述**：本地搜索群组。
**参数**：

- `keyword`：`string` - 搜索关键词。
**返回值**：`Array<Object>` - 匹配的群组列表。
**示例**：

```javascript
const groups = wfc.searchGroups("技术");
console.log('搜索群组结果:', groups);
```

### searchChannel(keyword, fuzzy, successCB, failCB)

**功能描述**：搜索频道。
**参数**：

- `keyword`：`string` - 搜索关键词。
- `fuzzy`：`boolean` - 是否模糊搜索。
- `successCB`：`function` - 成功回调函数，参数为关键词和频道列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.searchChannel("新闻", true, 
  (keyword, channelList) => {
    console.log(`搜索频道结果:`, channelList);
  }, 
  (errorCode) => {
    console.error('搜索频道失败:', errorCode);
  }
);
```

---

## 好友与黑名单

### getIncommingFriendRequest()

**功能描述**：获取收到的好友请求。
**返回值**：`Array<Object>` - 好友请求列表。
**示例**：

```javascript
const requests = wfc.getIncommingFriendRequest();
console.log('收到的好友请求:', requests);
```

### getOutgoingFriendRequest()

**功能描述**：获取发出的好友请求。
**返回值**：`Array<Object>` - 发出的好友请求列表。
**示例**：

```javascript
const requests = wfc.getOutgoingFriendRequest();
console.log('发出的好友请求:', requests);
```

### getOneFriendRequest(userId, incoming=true)

**功能描述**：获取与指定用户的好友请求。
**参数**：

- `userId`：`string` - 用户 ID。
- `incoming`：`boolean` - 是否是收到的请求（默认 true）。
**返回值**：`Object` - 好友请求对象（如果存在）。
**示例**：

```javascript
const request = wfc.getOneFriendRequest("u2", true);
console.log('与 u2 的好友请求:', request);
```

### loadFriendRequestFromRemote()

**功能描述**：从服务器加载好友请求。
**示例**：

```javascript
wfc.loadFriendRequestFromRemote();
```

### getUnreadFriendRequestCount()

**功能描述**：获取未读好友请求数量。
**返回值**：`number` - 未读好友请求数量。
**示例**：

```javascript
const count = wfc.getUnreadFriendRequestCount();
console.log('未读好友请求数量:', count);
```

### clearUnreadFriendRequestStatus()

**功能描述**：清除好友请求的未读状态。
**示例**：

```javascript
wfc.clearUnreadFriendRequestStatus();
```

### clearFriendRequest(direction, beforeTime)

**功能描述**：清除指定方向和时间前的好友请求。
**参数**：

- `direction`：`number` - 方向（1: 收到的，2: 发出的）。
- `beforeTime`：`number` - 时间戳（毫秒）。
**示例**：

```javascript
// 清除所有收到的好友请求
wfc.clearFriendRequest(1, 0);
```

### deleteFriendRequest(userId, direction)

**功能描述**：删除与指定用户的好友请求。
**参数**：

- `userId`：`string` - 用户 ID。
- `direction`：`number` - 方向（1: 收到的，2: 发出的）。
**示例**：

```javascript
// 删除收到的来自 u2 的好友请求
wfc.deleteFriendRequest("u2", 1);
```

### sendFriendRequest(userId, reason, extra, successCB, failCB)

**功能描述**：发送好友请求。
**参数**：

- `userId`：`string` - 目标用户 ID。
- `reason`：`string` - 加好友理由。
- `extra`：`string` - 额外信息（JSON 格式）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.sendFriendRequest("u2","加个好友","{}", 
  () => {
    console.log('好友请求发送成功');
  }, 
  (errorCode) => {
    console.error('好友请求发送失败:', errorCode);
  }
);
```

### handleFriendRequest(userId, accept, extra, successCB, failCB)

**功能描述**：处理好友请求。
**参数**：

- `userId`：`string` - 请求方用户 ID。
- `accept`：`boolean` - 是否接受请求。
- `extra`：`string` - 额外信息（JSON 格式）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 接受好友请求
wfc.handleFriendRequest("u2", true, "{}", 
  () => {
    console.log('已接受好友请求');
  }, 
  (errorCode) => {
    console.error('处理好友请求失败:', errorCode);
  }
);
```

### deleteFriend(userId, successCB, failCB)

**功能描述**：删除好友。
**参数**：

- `userId`：`string` - 好友用户 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.deleteFriend("u2", 
  () => {
    console.log('已删除好友');
  }, 
  (errorCode) => {
    console.error('删除好友失败:', errorCode);
  }
);
```

### getMyFriendList(fresh=false)

**功能描述**：获取我的好友列表（已废弃）。
**参数**：

- `fresh`：`boolean` - 是否从服务器刷新（默认 false）。
**返回值**：`Array<Object>` - 好友列表。
**示例**：

```javascript
const friends = wfc.getMyFriendList(true);
console.log('好友列表:', friends);
```

**注意事项**：此方法已废弃，请使用 `getFriendList`。

### getFriendList(fresh=false)

**功能描述**：获取好友列表。
**参数**：

- `fresh`：`boolean` - 是否从服务器刷新（默认 false）。
**返回值**：`Array<Object>` - 好友列表。
**示例**：

```javascript
const friends = wfc.getFriendList(true);
console.log('好友列表:', friends);
```

### getFriendAlias(userId)

**功能描述**：获取好友别名。
**参数**：

- `userId`：`string` - 好友用户 ID。
**返回值**：`string` - 好友别名（如果设置）。
**示例**：

```javascript
const alias = wfc.getFriendAlias("u2");
console.log('好友别名:', alias);
```

### getFriendExtra(userId)

**功能描述**：获取好友额外信息。
**参数**：

- `userId`：`string` - 好友用户 ID。
**返回值**：`string` - 好友额外信息（JSON 格式）。
**示例**：

```javascript
const extra = wfc.getFriendExtra("u2");
console.log('好友额外信息:', JSON.parse(extra));
```

### setFriendAlias(userId, alias, successCB, failCB)

**功能描述**：设置好友别名。
**参数**：

- `userId`：`string` - 好友用户 ID。
- `alias`：`string` - 别名。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.setFriendAlias("u2","老王", 
  () => {
    console.log('好友别名设置成功');
  }, 
  (errorCode) => {
    console.error('好友别名设置失败:', errorCode);
  }
);
```

### isBlackListed(userId)

**功能描述**：检查用户是否在黑名单中。
**参数**：

- `userId`：`string` - 用户 ID。
**返回值**：`boolean` - 是否在黑名单中。
**示例**：

```javascript
const isBlackListed = wfc.isBlackListed("u2");
console.log('u2 是否在黑名单中:', isBlackListed);
```

### getBlackList()

**功能描述**：获取黑名单列表。
**返回值**：`Array<string>` - 黑名单用户 ID 列表。
**示例**：

```javascript
const blackList = wfc.getBlackList();
console.log('黑名单:', blackList);
```

### setBlackList(userId, block, successCB, failCB)

**功能描述**：将用户添加到黑名单或从黑名单移除。
**参数**：

- `userId`：`string` - 用户 ID。
- `block`：`boolean` - 是否拉黑（true: 拉黑，false: 取消拉黑）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 拉黑用户
wfc.setBlackList("u2", true, 
  () => {
    console.log('已拉黑用户');
  }, 
  (errorCode) => {
    console.error('拉黑失败:', errorCode);
  }
);
```

### getFavUsers()

**功能描述**：获取星标用户列表。
**返回值**：`Array<string>` - 星标用户 ID 列表。
**示例**：

```javascript
const favUsers = wfc.getFavUsers();
console.log('星标用户:', favUsers);
```

### isFavUser(userId)

**功能描述**：检查用户是否为星标用户。
**参数**：

- `userId`：`string` - 用户 ID。
**返回值**：`boolean` - 是否为星标用户。
**示例**：

```javascript
const isFav = wfc.isFavUser("u2");
console.log('u2 是否为星标用户:', isFav);
```

### setFavUser(userId, fav, successCB, failCB)

**功能描述**：设置用户为星标用户或取消星标。
**参数**：

- `userId`：`string` - 用户 ID。
- `fav`：`boolean` - 是否设为星标（true: 设为星标，false: 取消星标）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 设置为星标用户
wfc.setFavUser("u2", true, 
  () => {
    console.log('已设置为星标用户');
  }, 
  (errorCode) => {
    console.error('设置星标失败:', errorCode);
  }
);
```

---

## 群组管理

### getMyGroupList() [deprecated]

**功能描述**：获取我的群组列表（已废弃）。
**返回值**：`Array<Object>` - 群组列表。
**示例**：

```javascript
const groups = wfc.getMyGroupList();
console.log('群组列表:', groups);
```

**注意事项**：此方法已废弃，请使用 `getMyGroups`。

### getFavGroupList()

**功能描述**：获取收藏群组列表。
**返回值**：`Array<Object>` - 收藏群组列表。
**示例**：

```javascript
const favGroups = wfc.getFavGroupList();
console.log('收藏群组:', favGroups);
```

### getFavGroups()

**功能描述**：获取收藏群组 ID 列表。
**返回值**：`Array<string>` - 收藏群组 ID 列表。
**示例**：

```javascript
const favGroupIds = wfc.getFavGroups();
console.log('收藏群组 ID:', favGroupIds);
```

### isFavGroup(groupId)

**功能描述**：检查群组是否为收藏群组。
**参数**：

- `groupId`：`string` - 群组 ID。
**返回值**：`boolean` - 是否为收藏群组。
**示例**：

```javascript
const isFav = wfc.isFavGroup("g1");
console.log('g1 是否为收藏群组:', isFav);
```

### setFavGroup(groupId, fav, successCB, failCB)

**功能描述**：设置群组为收藏群组或取消收藏。
**参数**：

- `groupId`：`string` - 群组 ID。
- `fav`：`boolean` - 是否设为收藏（true: 收藏，false: 取消收藏）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 收藏群组
wfc.setFavGroup("g1", true, 
  () => {
    console.log('已收藏群组');
  }, 
  (errorCode) => {
    console.error('收藏失败:', errorCode);
  }
);
```

### getMyGroups(successCB, failCB)

**功能描述**：获取我的群组 ID 列表。
**参数**：

- `successCB`：`function` - 成功回调函数，参数为群组 ID 列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getMyGroups(
  (groupIds) => {
    console.log('我的群组 ID:', groupIds);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getCommonGroups(userId, successCB, failCB)

**功能描述**：获取与指定用户的共同群组。
**参数**：

- `userId`：`string` - 用户 ID。
- `successCB`：`function` - 成功回调函数，参数为共同群组 ID 列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getCommonGroups("u2", 
  (groupIds) => {
    console.log('与 u2 的共同群组:', groupIds);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### createGroup(groupId, groupType, name, portrait, groupExtra, memberIds, memberExtra, lines, notifyContent, successCB, failCB)

**功能描述**：创建群组。
**参数**：

- `groupId`：`string` - 群组 ID（null 表示由系统生成）。
- `groupType`：`number` - 群组类型（1: 普通群，2: 高级群等）。
- `name`：`string` - 群组名称。
- `portrait`：`string` - 群组头像 URL。
- `groupExtra`：`string` - 群组额外信息（JSON 格式）。
- `memberIds`：`Array<string>` - 成员用户 ID 数组。
- `memberExtra`：`string` - 成员额外信息（JSON 格式）。
- `lines`：`Array<number>` - 产品线数组。
- `notifyContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数，参数为群组 ID。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.createGroup(null, 1, "技术群", "", "", ["u1","u2"], "", [0], null, 
  (groupId) => {
    console.log('群组创建成功，ID:', groupId);
  }, 
  (errorCode) => {
    console.error('群组创建失败:', errorCode);
  }
);
```

### getGroupInfo(groupId, refresh=false)

**功能描述**：获取群组信息。
**参数**：

- `groupId`：`string` - 群组 ID。
- `refresh`：`boolean` - 是否从服务器刷新（默认 false）。
**返回值**：`Object` - 群组信息对象。
**示例**：

```javascript
const groupInfo = wfc.getGroupInfo("g1", true);
console.log('群组信息:', groupInfo);
```

### getGroupInfos(groupIds, refresh=false)

**功能描述**：批量获取群组信息。
**参数**：

- `groupIds`：`Array<string>` - 群组 ID 数组。
- `refresh`：`boolean` - 是否从服务器刷新（默认 false）。
**返回值**：`Array<Object>` - 群组信息数组。
**示例**：

```javascript
const groupInfos = wfc.getGroupInfos(["g1","g2"], true);
console.log('群组信息列表:', groupInfos);
```

### getGroupInfoEx(groupId, refresh, successCB, failCB)

**功能描述**：异步获取群组信息。
**参数**：

- `groupId`：`string` - 群组 ID。
- `refresh`：`boolean` - 是否从服务器刷新。
- `successCB`：`function` - 成功回调函数，参数为群组信息。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getGroupInfoEx("g1", true, 
  (groupInfo) => {
    console.log('群组信息:', groupInfo);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### modifyGroupInfo(groupId, type, newValue, lines, notifyMessageContent, successCB, failCB)

**功能描述**：修改群组信息。
**参数**：

- `groupId`：`string` - 群组 ID。
- `type`：`number` - 修改类型（1: 名称，2: 头像等）。
- `newValue`：`string` - 新值。
- `lines`：`Array<number>` - 产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 修改群组名称
wfc.modifyGroupInfo("g1", 1, "新群名", [0], null, 
  () => {
    console.log('群组名称修改成功');
  }, 
  (errorCode) => {
    console.error('修改失败:', errorCode);
  }
);
```

### setGroupRemark(groupId, remark, successCB, failCB)

**功能描述**：设置群组备注。
**参数**：

- `groupId`：`string` - 群组 ID。
- `remark`：`string` - 群组备注。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.setGroupRemark("g1", "内部群", 
  () => {
    console.log('群组备注设置成功');
  }, 
  (errorCode) => {
    console.error('设置失败:', errorCode);
  }
);
```

### getGroupRemark(groupId)

**功能描述**：获取群组备注。
**参数**：

- `groupId`：`string` - 群组 ID。
**返回值**：`string` - 群组备注（如果设置）。
**示例**：

```javascript
const remark = wfc.getGroupRemark("g1");
console.log('群组备注:', remark);
```

### addGroupMembers(groupId, memberIds, extra, notifyLines, notifyMessageContent, successCB, failCB)

**功能描述**：添加群成员。
**参数**：

- `groupId`：`string` - 群组 ID。
- `memberIds`：`Array<string>` - 要添加的成员用户 ID 数组。
- `extra`：`string` - 额外信息（JSON 格式）。
- `notifyLines`：`Array<number>` - 要通知的产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.addGroupMembers("g1", ["u3"], "", [0], null, 
  () => {
    console.log('成员添加成功');
  }, 
  (errorCode) => {
    console.error('添加失败:', errorCode);
  }
);
```

### getGroupMemberIds(groupId, fresh=false)

**功能描述**：获取群成员 ID 列表。
**参数**：

- `groupId`：`string` - 群组 ID。
- `fresh`：`boolean` - 是否从服务器刷新（默认 false）。
**返回值**：`Array<string>` - 群成员 ID 列表。
**示例**：

```javascript
const memberIds = wfc.getGroupMemberIds("g1", true);
console.log('群成员 ID:', memberIds);
```

### getGroupMembers(groupId, fresh=false)

**功能描述**：获取群成员列表。
**参数**：

- `groupId`：`string` - 群组 ID。
- `fresh`：`boolean` - 是否从服务器刷新（默认 false）。
**返回值**：`Array<Object>` - 群成员信息数组。
**示例**：

```javascript
const members = wfc.getGroupMembers("g1", true);
console.log('群成员列表:', members);
```

### getGroupMembersByType(groupId, memberType)

**功能描述**：按类型获取群成员。
**参数**：

- `groupId`：`string` - 群组 ID。
- `memberType`：`number` - 成员类型（1: 群主，2: 管理员，3: 普通成员）。
**返回值**：`Array<Object>` - 匹配类型的群成员数组。
**示例**：

```javascript
// 获取管理员列表
const admins = wfc.getGroupMembersByType("g1", 2);
console.log('管理员列表:', admins);
```

### getGroupMembersEx(groupId, fresh, successCB, failCB)

**功能描述**：异步获取群成员列表。
**参数**：

- `groupId`：`string` - 群组 ID。
- `fresh`：`boolean` - 是否从服务器刷新。
- `successCB`：`function` - 成功回调函数，参数为群成员列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getGroupMembersEx("g1", true, 
  (members) => {
    console.log('群成员列表:', members);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getGroupMember(groupId, memberId)

**功能描述**：获取指定群成员信息。
**参数**：

- `groupId`：`string` - 群组 ID。
- `memberId`：`string` - 成员用户 ID。
**返回值**：`Object` - 群成员信息对象（如果存在）。
**示例**：

```javascript
const memberInfo = wfc.getGroupMember("g1", "u2");
console.log('群成员信息:', memberInfo);
```

### kickoffGroupMembers(groupId, memberIds, notifyLines, notifyMsg, successCB, failCB)

**功能描述**：移除群成员。
**参数**：

- `groupId`：`string` - 群组 ID。
- `memberIds`：`Array<string>` - 要移除的成员用户 ID 数组。
- `notifyLines`：`Array<number>` - 要通知的产品线数组。
- `notifyMsg`：`string` - 通知消息（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.kickoffGroupMembers("g1", ["u3"], [0], null, 
  () => {
    console.log('成员移除成功');
  }, 
  (errorCode) => {
    console.error('移除失败:', errorCode);
  }
);
```

### muteGroupMembers(groupId, isSet, memberIds=[], notifyLines=[], notifyMsg, successCB, failCB)

**功能描述**：禁言群成员。
**参数**：

- `groupId`：`string` - 群组 ID。
- `isSet`：`boolean` - 是否设置禁言（true: 禁言，false: 取消禁言）。
- `memberIds`：`Array<string>` - 要禁言的成员用户 ID 数组（空数组表示全体禁言）。
- `notifyLines`：`Array<number>` - 要通知的产品线数组。
- `notifyMsg`：`string` - 通知消息（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 禁言特定成员
wfc.muteGroupMembers("g1", true, ["u3"], [0], null, 
  () => {
    console.log('成员禁言成功');
  }, 
  (errorCode) => {
    console.error('禁言失败:', errorCode);
  }
);

// 全体禁言
wfc.muteGroupMembers("g1", true, [], [0], null, 
  () => {
    console.log('全体禁言成功');
  }, 
  (errorCode) => {
    console.error('禁言失败:', errorCode);
  }
);
```

### allowGroupMembers(groupId, isSet, memberIds=[], notifyLines=[], notifyMsg, successCB, failCB)

**功能描述**：设置群成员允许发言（针对全体禁言情况下的例外）。
**参数**：

- `groupId`：`string` - 群组 ID。
- `isSet`：`boolean` - 是否设置允许发言（true: 允许，false: 取消允许）。
- `memberIds`：`Array<string>` - 要允许发言的成员用户 ID 数组。
- `notifyLines`：`Array<number>` - 要通知的产品线数组。
- `notifyMsg`：`string` - 通知消息（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.allowGroupMembers("g1", true, ["u2"], [0], null, 
  () => {
    console.log('成员允许发言设置成功');
  }, 
  (errorCode) => {
    console.error('设置失败:', errorCode);
  }
);
```

### modifyGroupAlias(groupId, alias, lines, notifyMessageContent, successCB, failCB)

**功能描述**：修改自己在群内的别名。
**参数**：

- `groupId`：`string` - 群组 ID。
- `alias`：`string` - 新别名。
- `lines`：`Array<number>` - 产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.modifyGroupAlias("g1","我在群的别名",[0],null, 
  () => {
    console.log('群别名修改成功');
  }, 
  (errorCode) => {
    console.error('修改失败:', errorCode);
  }
);
```

### modifyGroupMemberAlias(groupId, memberId, alias, lines, notifyMessageContent, successCB, failCB)

**功能描述**：修改群成员的别名（仅管理员/群主可操作）。
**参数**：

- `groupId`：`string` - 群组 ID。
- `memberId`：`string` - 成员用户 ID。
- `alias`：`string` - 新别名。
- `lines`：`Array<number>` - 产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.modifyGroupMemberAlias("g1","u2","小王",[0],null, 
  () => {
    console.log('群成员别名修改成功');
  }, 
  (errorCode) => {
    console.error('修改失败:', errorCode);
  }
);
```

### modifyGroupMemberExtra(groupId, memberId, extra, lines, notifyMessageContent, successCB, failCB)

**功能描述**：修改群成员的额外信息（仅管理员/群主可操作）。
**参数**：

- `groupId`：`string` - 群组 ID。
- `memberId`：`string` - 成员用户 ID。
- `extra`：`string` - 额外信息（JSON 格式）。
- `lines`：`Array<number>` - 产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.modifyGroupMemberExtra("g1","u2","{\"title\":\"讲师\"}",[0],null, 
  () => {
    console.log('群成员额外信息修改成功');
  }, 
  (errorCode) => {
    console.error('修改失败:', errorCode);
  }
);
```

### setGroupManager(groupId, isSet, memberIds, lines, notifyContent, successCB, failCB)

**功能描述**：设置群管理员。
**参数**：

- `groupId`：`string` - 群组 ID。
- `isSet`：`boolean` - 是否设置为管理员（true: 设置，false: 取消）。
- `memberIds`：`Array<string>` - 要设置的成员用户 ID 数组。
- `lines`：`Array<number>` - 产品线数组。
- `notifyContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 设置管理员
wfc.setGroupManager("g1", true, ["u2"], [0], null, 
  () => {
    console.log('管理员设置成功');
  }, 
  (errorCode) => {
    console.error('设置失败:', errorCode);
  }
);
```

### transferGroup(groupId, newOwner, lines, notifyMessageContent, successCB, failCB)

**功能描述**：转让群 ownership。
**参数**：

- `groupId`：`string` - 群组 ID。
- `newOwner`：`string` - 新群主用户 ID。
- `lines`：`Array<number>` - 产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.transferGroup("g1", "u2", [0], null, 
  () => {
    console.log('群组转让成功');
  }, 
  (errorCode) => {
    console.error('转让失败:', errorCode);
  }
);
```

### quitGroup(groupId, lines, notifyMessageContent, successCB, failCB)

**功能描述**：退出群组。
**参数**：

- `groupId`：`string` - 群组 ID。
- `lines`：`Array<number>` - 产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.quitGroup("g1", [0], null, 
  () => {
    console.log('已退出群组');
  }, 
  (errorCode) => {
    console.error('退出失败:', errorCode);
  }
);
```

### dismissGroup(groupId, lines, notifyMessageContent, successCB, failCB)

**功能描述**：解散群组（仅群主可操作）。
**参数**：

- `groupId`：`string` - 群组 ID。
- `lines`：`Array<number>` - 产品线数组。
- `notifyMessageContent`：`string` - 通知内容（可选）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.dismissGroup("g1", [0], null, 
  () => {
    console.log('群组已解散');
  }, 
  (errorCode) => {
    console.error('解散失败:', errorCode);
  }
);
```

---

## 频道（Channel）

### createChannel(name, portrait, desc, extra, successCB, failCB)

**功能描述**：创建频道。
**参数**：

- `name`：`string` - 频道名称。
- `portrait`：`string` - 频道头像 URL。
- `desc`：`string` - 频道描述。
- `extra`：`string` - 额外信息（JSON 格式）。
- `successCB`：`function` - 成功回调函数，参数为频道 ID。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.createChannel("资讯", "", "每日资讯", "", 
  (channelId) => {
    console.log('频道创建成功，ID:', channelId);
  }, 
  (errorCode) => {
    console.error('频道创建失败:', errorCode);
  }
);
```

### getChannelInfo(channelId, refresh)

**功能描述**：获取频道信息。
**参数**：

- `channelId`：`string` - 频道 ID。
- `refresh`：`boolean` - 是否从服务器刷新。
**返回值**：`Object` - 频道信息对象。
**示例**：

```javascript
const channelInfo = wfc.getChannelInfo("c1", true);
console.log('频道信息:', channelInfo);
```

### modifyChannelInfo(channelId, type, newValue, successCB, failCB)

**功能描述**：修改频道信息。
**参数**：

- `channelId`：`string` - 频道 ID。
- `type`：`number` - 修改类型（1: 名称，2: 头像等）。
- `newValue`：`string` - 新值。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 修改频道名称
wfc.modifyChannelInfo("c1", 1, "新频道名", 
  () => {
    console.log('频道名称修改成功');
  }, 
  (errorCode) => {
    console.error('修改失败:', errorCode);
  }
);
```

### isListenedChannel(channelId)

**功能描述**：检查是否已订阅频道。
**参数**：

- `channelId`：`string` - 频道 ID。
**返回值**：`boolean` - 是否已订阅。
**示例**：

```javascript
const isListened = wfc.isListenedChannel("c1");
console.log('是否订阅频道:', isListened);
```

### listenChannel(channelId, listen, successCB, failCB)

**功能描述**：订阅或取消订阅频道。
**参数**：

- `channelId`：`string` - 频道 ID。
- `listen`：`boolean` - 是否订阅（true: 订阅，false: 取消订阅）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 订阅频道
wfc.listenChannel("c1", true, 
  () => {
    console.log('频道订阅成功');
  }, 
  (errorCode) => {
    console.error('订阅失败:', errorCode);
  }
);
```

### getMyChannels()

**功能描述**：获取我创建的频道列表。
**返回值**：`Array<Object>` - 频道列表。
**示例**：

```javascript
const myChannels = wfc.getMyChannels();
console.log('我创建的频道:', myChannels);
```

### getListenedChannels() [deprecated]

**功能描述**：获取已订阅的频道列表（已废弃）。
**返回值**：`Array<Object>` - 已订阅的频道列表。
**示例**：

```javascript
const listenedChannels = wfc.getListenedChannels();
console.log('已订阅的频道:', listenedChannels);
```

**注意事项**：此方法已废弃，请使用 `getRemoteListenedChannels`。

### getRemoteListenedChannels(successCB, failCB)

**功能描述**：从服务器获取已订阅的频道列表。
**参数**：

- `successCB`：`function` - 成功回调函数，参数为已订阅的频道列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getRemoteListenedChannels(
  (channels) => {
    console.log('已订阅的频道:', channels);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### destoryChannel(channelId, successCB, failCB)

**功能描述**：销毁频道（仅创建者可操作）。
**参数**：

- `channelId`：`string` - 频道 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.destoryChannel("c1", 
  () => {
    console.log('频道已销毁');
  }, 
  (errorCode) => {
    console.error('销毁失败:', errorCode);
  }
);
```

---

## 聊天室（Chatroom）

### joinChatroom(chatroomId, successCB, failCB)

**功能描述**：加入聊天室。
**参数**：

- `chatroomId`：`string` - 聊天室 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.joinChatroom("room1", 
  () => {
    console.log('已加入聊天室');
  }, 
  (errorCode) => {
    console.error('加入失败:', errorCode);
  }
);
```

### quitChatroom(chatroomId, successCB, failCB)

**功能描述**：退出聊天室。
**参数**：

- `chatroomId`：`string` - 聊天室 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.quitChatroom("room1", 
  () => {
    console.log('已退出聊天室');
  }, 
  (errorCode) => {
    console.error('退出失败:', errorCode);
  }
);
```

### getChatroomInfo(chatroomId, updateDt, successCB, failCB)

**功能描述**：获取聊天室信息。
**参数**：

- `chatroomId`：`string` - 聊天室 ID。
- `updateDt`：`number` - 上次更新时间戳（毫秒）。
- `successCB`：`function` - 成功回调函数，参数为聊天室信息。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getChatroomInfo("room1", Date.now(), 
  (info) => {
    console.log('聊天室信息:', info);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getChatroomMemberInfo(chatroomId, maxCount, successCB, failCB)

**功能描述**：获取聊天室成员信息。
**参数**：

- `chatroomId`：`string` - 聊天室 ID。
- `maxCount`：`number` - 最大获取数量。
- `successCB`：`function` - 成功回调函数，参数为成员列表。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getChatroomMemberInfo("room1", 50, 
  (members) => {
    console.log('聊天室成员:', members);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

---

## 密聊（Secret Chat）

### getSecretChatInfo(targetId)

**功能描述**：获取与指定用户的密聊信息。
**参数**：

- `targetId`：`string` - 目标用户 ID。
**返回值**：`Object` - 密聊信息对象（如果存在）。
**示例**：

```javascript
const secretChatInfo = wfc.getSecretChatInfo("u2");
console.log('密聊信息:', secretChatInfo);
```

### destroySecretChat(targetId, successCB, failCB)

**功能描述**：销毁与指定用户的密聊。
**参数**：

- `targetId`：`string` - 目标用户 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.destroySecretChat("u2", 
  () => {
    console.log('密聊已销毁');
  }, 
  (errorCode) => {
    console.error('销毁失败:', errorCode);
  }
);
```

### encodeSecretChatMediaData(targetId, mediaDataBuffer)

**功能描述**：加密密聊媒体数据。
**参数**：

- `targetId`：`string` - 目标用户 ID。
- `mediaDataBuffer`：`Buffer` - 媒体数据缓冲区。
**返回值**：`Buffer` - 加密后的媒体数据。
**示例**：

```javascript
const encryptedData = wfc.encodeSecretChatMediaData("u2", mediaBuffer);
```

### decodeSecretChatMediaData(targetId, mediaDataBuffer)

**功能描述**：解密密聊媒体数据。
**参数**：

- `targetId`：`string` - 目标用户 ID。
- `mediaDataBuffer`：`Buffer` - 加密的媒体数据缓冲区。
**返回值**：`Buffer` - 解密后的媒体数据。
**示例**：

```javascript
const decryptedData = wfc.decodeSecretChatMediaData("u2", encryptedBuffer);
```

---

## 会话（Conversation）

### getConversation(conversationId)

**功能描述**：获取会话信息。
**参数**：

- `conversationId`：`string` - 会话 ID。
**返回值**：`Object` - 会话信息对象。
**示例**：

```javascript
const conversation = wfc.getConversation("c1");
console.log('会话信息:', conversation);
```

### getConversations()

**功能描述**：获取所有会话列表。
**返回值**：`Array<Object>` - 会话列表。
**示例**：

```javascript
const conversations = wfc.getConversations();
console.log('会话列表:', conversations);
```

### getConversationByUserId(userId)

**功能描述**：获取与指定用户的单聊会话。
**参数**：

- `userId`：`string` - 用户 ID。
**返回值**：`Object` - 会话信息对象（如果存在）。
**示例**：

```javascript
const conversation = wfc.getConversationByUserId("u2");
console.log('与 u2 的会话:', conversation);
```

### getConversationByGroupId(groupId)

**功能描述**：获取群组会话。
**参数**：

- `groupId`：`string` - 群组 ID。
**返回值**：`Object` - 会话信息对象（如果存在）。
**示例**：

```javascript
const conversation = wfc.getConversationByGroupId("g1");
console.log('群组会话:', conversation);
```

### getConversationByChannelId(channelId)

**功能描述**：获取频道会话。
**参数**：

- `channelId`：`string` - 频道 ID。
**返回值**：`Object` - 会话信息对象（如果存在）。
**示例**：

```javascript
const conversation = wfc.getConversationByChannelId("c1");
console.log('频道会话:', conversation);
```

### getConversationByChatroomId(chatroomId)

**功能描述**：获取聊天室会话。
**参数**：

- `chatroomId`：`string` - 聊天室 ID。
**返回值**：`Object` - 会话信息对象（如果存在）。
**示例**：

```javascript
const conversation = wfc.getConversationByChatroomId("room1");
console.log('聊天室会话:', conversation);
```

### getConversationBySecretChatTargetId(targetId)

**功能描述**：获取与指定用户的密聊会话。
**参数**：

- `targetId`：`string` - 目标用户 ID。
**返回值**：`Object` - 会话信息对象（如果存在）。
**示例**：

```javascript
const conversation = wfc.getConversationBySecretChatTargetId("u2");
console.log('与 u2 的密聊会话:', conversation);
```

### setConversationTop(conversationId, isTop, successCB, failCB)

**功能描述**：设置会话置顶。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `isTop`：`boolean` - 是否置顶（true: 置顶，false: 取消置顶）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.setConversationTop("c1", true, 
  () => {
    console.log('会话已置顶');
  }, 
  (errorCode) => {
    console.error('置顶失败:', errorCode);
  }
);
```

### setConversationSilent(conversationId, isSilent, duration, successCB, failCB)

**功能描述**：设置会话免打扰。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `isSilent`：`boolean` - 是否免打扰（true: 开启，false: 关闭）。
- `duration`：`number` - 免打扰时长（毫秒，0 表示一直免打扰）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 开启1小时免打扰
wfc.setConversationSilent("c1", true, 3600000, 
  () => {
    console.log('会话免打扰已开启');
  }, 
  (errorCode) => {
    console.error('设置失败:', errorCode);
  }
);
```

### setConversationExtra(conversationId, extra, successCB, failCB)

**功能描述**：设置会话额外信息。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `extra`：`string` - 额外信息（JSON 格式）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.setConversationExtra("c1", "{\"background\":\"blue\"}", 
  () => {
    console.log('会话额外信息已设置');
  }, 
  (errorCode) => {
    console.error('设置失败:', errorCode);
  }
);
```

### getUnreadCount()

**功能描述**：获取所有会话的未读消息总数。
**返回值**：`number` - 未读消息总数。
**示例**：

```javascript
const unreadCount = wfc.getUnreadCount();
console.log('未读消息总数:', unreadCount);
```

### getConversationUnreadCount(conversationId)

**功能描述**：获取指定会话的未读消息数。
**参数**：

- `conversationId`：`string` - 会话 ID。
**返回值**：`number` - 未读消息数。
**示例**：

```javascript
const unreadCount = wfc.getConversationUnreadCount("c1");
console.log('会话未读消息数:', unreadCount);
```

### clearConversationUnreadCount(conversationId, successCB, failCB)

**功能描述**：清除指定会话的未读消息数。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.clearConversationUnreadCount("c1", 
  () => {
    console.log('会话未读消息已清除');
  }, 
  (errorCode) => {
    console.error('清除失败:', errorCode);
  }
);
```

### removeConversation(conversationId, successCB, failCB)

**功能描述**：删除会话（本地删除，非服务器删除）。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.removeConversation("c1", 
  () => {
    console.log('会话已删除');
  }, 
  (errorCode) => {
    console.error('删除失败:', errorCode);
  }
);
```

---

## 消息（Message）

### sendMessage(conversationId, conversationType, messageType, targetId, content, extra, offlinePushMessage, pushData, successCB, failCB)

**功能描述**：发送消息。
**参数**：

- `conversationId`：`string` - 会话 ID（可以为 null，系统会自动生成）。
- `conversationType`：`number` - 会话类型（1: 单聊，2: 群聊，3: 频道，4: 聊天室，5: 密聊）。
- `messageType`：`number` - 消息类型（1: 文本，2: 图片，3: 语音等）。
- `targetId`：`string` - 目标 ID（用户 ID、群组 ID 等）。
- `content`：`string` - 消息内容。
- `extra`：`string` - 额外信息（JSON 格式）。
- `offlinePushMessage`：`string` - 离线推送消息内容。
- `pushData`：`string` - 推送数据（JSON 格式）。
- `successCB`：`function` - 成功回调函数，参数为消息 ID。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 发送文本消息
wfc.sendMessage(null, 1, 1, "u2", "你好", "", "收到一条消息", "{}", 
  (messageId) => {
    console.log('消息发送成功，ID:', messageId);
  }, 
  (errorCode) => {
    console.error('消息发送失败:', errorCode);
  }
);
```

### sendTextMessage(conversationId, conversationType, targetId, text, extra, offlinePushMessage, successCB, failCB)

**功能描述**：发送文本消息（简化版）。
**参数**：

- `conversationId`：`string` - 会话 ID（可以为 null）。
- `conversationType`：`number` - 会话类型。
- `targetId`：`string` - 目标 ID。
- `text`：`string` - 文本内容。
- `extra`：`string` - 额外信息。
- `offlinePushMessage`：`string` - 离线推送消息。
- `successCB`：`function` - 成功回调。
- `failCB`：`function` - 失败回调。
**示例**：

```javascript
wfc.sendTextMessage(null, 1, "u2", "你好", "", "收到一条消息", 
  (messageId) => {
    console.log('文本消息发送成功');
  }, 
  (errorCode) => {
    console.error('发送失败:', errorCode);
  }
);
```

### recallMessage(conversationId, messageId, successCB, failCB)

**功能描述**：撤回消息。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `messageId`：`string` - 消息 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.recallMessage("c1", "m1", 
  () => {
    console.log('消息已撤回');
  }, 
  (errorCode) => {
    console.error('撤回失败:', errorCode);
  }
);
```

### deleteMessage(conversationId, messageId, successCB, failCB)

**功能描述**：删除消息（本地删除）。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `messageId`：`string` - 消息 ID。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.deleteMessage("c1", "m1", 
  () => {
    console.log('消息已删除');
  }, 
  (errorCode) => {
    console.error('删除失败:', errorCode);
  }
);
```

### getMessage(conversationId, messageId)

**功能描述**：获取单条消息。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `messageId`：`string` - 消息 ID。
**返回值**：`Object` - 消息对象。
**示例**：

```javascript
const message = wfc.getMessage("c1", "m1");
console.log('消息内容:', message);
```

### getMessages(conversationId, startMessageId, count, direction)

**功能描述**：获取消息列表。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `startMessageId`：`string` - 起始消息 ID（null 表示最新消息）。
- `count`：`number` - 获取数量。
- `direction`：`number` - 获取方向（0: 向前获取历史消息，1: 向后获取更新消息）。
**返回值**：`Array<Object>` - 消息列表。
**示例**：

```javascript
// 获取最新的10条消息
const messages = wfc.getMessages("c1", null, 10, 0);
console.log('消息列表:', messages);
```

### forwardMessage(conversationId, conversationType, targetId, message, successCB, failCB)

**功能描述**：转发消息。
**参数**：

- `conversationId`：`string` - 目标会话 ID（可以为 null）。
- `conversationType`：`number` - 目标会话类型。
- `targetId`：`string` - 目标 ID。
- `message`：`Object` - 要转发的消息对象。
- `successCB`：`function` - 成功回调函数，参数为新消息 ID。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
const originalMessage = wfc.getMessage("c1", "m1");
wfc.forwardMessage(null, 1, "u3", originalMessage, 
  (newMessageId) => {
    console.log('消息转发成功，新ID:', newMessageId);
  }, 
  (errorCode) => {
    console.error('转发失败:', errorCode);
  }
);
```

### setMessageRead(conversationId, messageId, successCB, failCB)

**功能描述**：设置消息已读。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `messageId`：`string` - 消息 ID（null 表示所有消息已读）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
// 标记所有消息已读
wfc.setMessageRead("c1", null, 
  () => {
    console.log('消息已标记为已读');
  }, 
  (errorCode) => {
    console.error('标记失败:', errorCode);
  }
);
```

### getGroupMessageReadInfo(groupId, messageId, successCB, failCB)

**功能描述**：获取群消息已读信息。
**参数**：

- `groupId`：`string` - 群组 ID。
- `messageId`：`string` - 消息 ID。
- `successCB`：`function` - 成功回调函数，参数为已读信息。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.getGroupMessageReadInfo("g1", "m1", 
  (readInfo) => {
    console.log('消息已读信息:', readInfo);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

---

## 文件与媒体（File & Media）

### uploadMedia(conversationId, conversationType, targetId, mediaType, filePath, progressCB, successCB, failCB)

**功能描述**：上传媒体文件。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `conversationType`：`number` - 会话类型。
- `targetId`：`string` - 目标 ID。
- `mediaType`：`number` - 媒体类型（2: 图片，3: 语音，4: 视频，5: 文件）。
- `filePath`：`string` - 文件路径。
- `progressCB`：`function` - 进度回调函数，参数为进度值（0-100）。
- `successCB`：`function` - 成功回调函数，参数为媒体信息。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.uploadMedia("c1", 1, "u2", 2, "/path/to/image.jpg", 
  (progress) => {
    console.log(`上传进度: ${progress}%`);
  }, 
  (mediaInfo) => {
    console.log('上传成功，媒体信息:', mediaInfo);
  }, 
  (errorCode) => {
    console.error('上传失败:', errorCode);
  }
);
```

### downloadMedia(message, progressCB, successCB, failCB)

**功能描述**：下载媒体文件。
**参数**：

- `message`：`Object` - 包含媒体信息的消息对象。
- `progressCB`：`function` - 进度回调函数。
- `successCB`：`function` - 成功回调函数，参数为文件路径。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
const message = wfc.getMessage("c1", "m1");
wfc.downloadMedia(message, 
  (progress) => {
    console.log(`下载进度: ${progress}%`);
  }, 
  (filePath) => {
    console.log('下载成功，文件路径:', filePath);
  }, 
  (errorCode) => {
    console.error('下载失败:', errorCode);
  }
);
```

### getImageThumbnail(message, successCB, failCB)

**功能描述**：获取图片缩略图。
**参数**：

- `message`：`Object` - 包含图片信息的消息对象。
- `successCB`：`function` - 成功回调函数，参数为缩略图路径。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
const imageMessage = wfc.getMessage("c1", "m1");
wfc.getImageThumbnail(imageMessage, 
  (thumbnailPath) => {
    console.log('缩略图路径:', thumbnailPath);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getVoiceFilePath(message, successCB, failCB)

**功能描述**：获取语音文件路径。
**参数**：

- `message`：`Object` - 包含语音信息的消息对象。
- `successCB`：`function` - 成功回调函数，参数为文件路径。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
const voiceMessage = wfc.getMessage("c1", "m1");
wfc.getVoiceFilePath(voiceMessage, 
  (filePath) => {
    console.log('语音文件路径:', filePath);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getVideoFilePath(message, successCB, failCB)

**功能描述**：获取视频文件路径。
**参数**：

- `message`：`Object` - 包含视频信息的消息对象。
- `successCB`：`function` - 成功回调函数，参数为文件路径。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
const videoMessage = wfc.getMessage("c1", "m1");
wfc.getVideoFilePath(videoMessage, 
  (filePath) => {
    console.log('视频文件路径:', filePath);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

### getFilePath(message, successCB, failCB)

**功能描述**：获取文件路径。
**参数**：

- `message`：`Object` - 包含文件信息的消息对象。
- `successCB`：`function` - 成功回调函数，参数为文件路径。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
const fileMessage = wfc.getMessage("c1", "m1");
wfc.getFilePath(fileMessage, 
  (filePath) => {
    console.log('文件路径:', filePath);
  }, 
  (errorCode) => {
    console.error('获取失败:', errorCode);
  }
);
```

---

## 设置与偏好（Settings & Preferences）

### setSettings(settings, successCB, failCB)

**功能描述**：设置用户偏好设置。
**参数**：

- `settings`：`Object` - 设置对象。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.setSettings({
  notification: true,
  sound: true,
  vibrate: false
}, 
  () => {
    console.log('设置已保存');
  }, 
  (errorCode) => {
    console.error('保存失败:', errorCode);
  }
);
```

### getSettings()

**功能描述**：获取用户偏好设置。
**返回值**：`Object` - 设置对象。
**示例**：

```javascript
const settings = wfc.getSettings();
console.log('用户设置:', settings);
```

### setNotificationSetting(conversationId, isEnabled, successCB, failCB)

**功能描述**：设置特定会话的通知开关。
**参数**：

- `conversationId`：`string` - 会话 ID。
- `isEnabled`：`boolean` - 是否启用通知（true: 启用，false: 禁用）。
- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.setNotificationSetting("c1", false, 
  () => {
    console.log('会话通知已禁用');
  }, 
  (errorCode) => {
    console.error('设置失败:', errorCode);
  }
);
```

### getNotificationSetting(conversationId)

**功能描述**：获取特定会话的通知设置。
**参数**：

- `conversationId`：`string` - 会话 ID。
**返回值**：`boolean` - 是否启用通知。
**示例**：

```javascript
const isEnabled = wfc.getNotificationSetting("c1");
console.log('会话通知是否启用:', isEnabled);
```

---

## 事件监听（Event Listening）

### on(type, listener)

**功能描述**：注册事件监听器。
**参数**：

- `type`：`string` - 事件类型（如 'onNewMessage', 'onConnectionStatusChanged' 等）。
- `listener`：`function` - 事件回调函数。
**示例**：

```javascript
// 监听新消息事件
wfc.on('onNewMessage', (message) => {
  console.log('收到新消息:', message);
});

// 监听连接状态变化事件
wfc.on('onConnectionStatusChanged', (status) => {
  console.log('连接状态变化:', status);
});
```

### off(type, listener)

**功能描述**：移除事件监听器。
**参数**：

- `type`：`string` - 事件类型。
- `listener`：`function` - 要移除的回调函数。
**示例**：

```javascript
const messageListener = (message) => {
  console.log('收到新消息:', message);
};

// 注册监听器
wfc.on('onNewMessage', messageListener);

// 移除监听器
wfc.off('onNewMessage', messageListener);
```

### once(type, listener)

**功能描述**：注册一次性事件监听器（触发一次后自动移除）。
**参数**：

- `type`：`string` - 事件类型。
- `listener`：`function` - 事件回调函数。
**示例**：

```javascript
// 监听连接成功事件（只触发一次）
wfc.once('onConnected', () => {
  console.log('连接成功！');
});
```

---

## 其他功能（Other Functions）

### getVersion()

**功能描述**：获取 WFC SDK 版本。
**返回值**：`string` - 版本号。
**示例**：

```javascript
const version = wfc.getVersion();
console.log('WFC SDK 版本:', version);
```

### getBuildTime()

**功能描述**：获取构建时间。
**返回值**：`string` - 构建时间字符串。
**示例**：

```javascript
const buildTime = wfc.getBuildTime();
console.log('构建时间:', buildTime);
```

### getLanguage()

**功能描述**：获取当前语言设置。
**返回值**：`string` - 语言代码（如 'zh-CN', 'en-US' 等）。
**示例**：

```javascript
const language = wfc.getLanguage();
console.log('当前语言:', language);
```

### setLanguage(language)

**功能描述**：设置语言。
**参数**：

- `language`：`string` - 语言代码。
**示例**：

```javascript
wfc.setLanguage('zh-CN');
```

### setExternalStorageDir(path)

**功能描述**：设置外部存储目录（移动端）。
**参数**：

- `path`：`string` - 目录路径。
**示例**：

```javascript
wfc.setExternalStorageDir('/sdcard/wfc');
```

### getExternalStorageDir()

**功能描述**：获取外部存储目录（移动端）。
**返回值**：`string` - 目录路径。
**示例**：

```javascript
const storageDir = wfc.getExternalStorageDir();
console.log('外部存储目录:', storageDir);
```

### setTimeOffset(offset)

**功能描述**：设置时间偏移（毫秒）。
**参数**：

- `offset`：`number` - 时间偏移量。
**示例**：

```javascript
wfc.setTimeOffset(3600000); // 设置时区+1小时
```

### getTimeOffset()

**功能描述**：获取时间偏移量。
**返回值**：`number` - 时间偏移量（毫秒）。
**示例**：

```javascript
const offset = wfc.getTimeOffset();
console.log('时间偏移量:', offset);
```

### getSystemTime()

**功能描述**：获取系统时间（考虑偏移量）。
**返回值**：`number` - 时间戳（毫秒）。
**示例**：

```javascript
const systemTime = wfc.getSystemTime();
console.log('系统时间:', new Date(systemTime));
```

### setAppKey(appKey)

**功能描述**：设置应用密钥。
**参数**：

- `appKey`：`string` - 应用密钥。
**示例**：

```javascript
wfc.setAppKey('your-app-key');
```

### getAppKey()

**功能描述**：获取应用密钥。
**返回值**：`string` - 应用密钥。
**示例**：

```javascript
const appKey = wfc.getAppKey();
console.log('应用密钥:', appKey);
```

### setDebugMode(debug)

**功能描述**：设置调试模式。
**参数**：

- `debug`：`boolean` - 是否启用调试模式。
**示例**：

```javascript
wfc.setDebugMode(true);
```

### isDebugMode()

**功能描述**：检查是否启用调试模式。
**返回值**：`boolean` - 是否启用调试模式。
**示例**：

```javascript
const isDebug = wfc.isDebugMode();
console.log('是否启用调试模式:', isDebug);
```

### enableWriteLog(enable)

**功能描述**：启用或禁用日志写入。
**参数**：

- `enable`：`boolean` - 是否启用日志写入。
**示例**：

```javascript
wfc.enableWriteLog(true);
```

### getLogPath()

**功能描述**：获取日志文件路径。
**返回值**：`string` - 日志文件路径。
**示例**：

```javascript
const logPath = wfc.getLogPath();
console.log('日志文件路径:', logPath);
```

### clearLogs()

**功能描述**：清除日志文件。
**示例**：

```javascript
wfc.clearLogs();
```

### getDeviceInfo()

**功能描述**：获取设备信息。
**返回值**：`Object` - 设备信息对象。
**示例**：

```javascript
const deviceInfo = wfc.getDeviceInfo();
console.log('设备信息:', deviceInfo);
```

### setDeviceInfo(info)

**功能描述**：设置设备信息。
**参数**：

- `info`：`Object` - 设备信息对象。
**示例**：

```javascript
wfc.setDeviceInfo({
  model: 'iPhone 13',
  os: 'iOS 16.0'
});
```

### getFileCacheSize()

**功能描述**：获取文件缓存大小（字节）。
**返回值**：`number` - 文件缓存大小。
**示例**：

```javascript
const cacheSize = wfc.getFileCacheSize();
console.log('文件缓存大小:', cacheSize / 1024 / 1024, 'MB');
```

### clearFileCache(successCB, failCB)

**功能描述**：清除文件缓存。
**参数**：

- `successCB`：`function` - 成功回调函数。
- `failCB`：`function` - 失败回调函数，参数为错误代码。
**示例**：

```javascript
wfc.clearFileCache(
  () => {
    console.log('文件缓存已清除');
  }, 
  (errorCode) => {
    console.error('清除失败:', errorCode);
  }
);
```

### enableAutoDownloadThumbnail(enable)

**功能描述**：启用或禁用自动下载缩略图。
**参数**：

- `enable`：`boolean` - 是否启用自动下载。
**示例**：

```javascript
wfc.enableAutoDownloadThumbnail(true);
```

### enableAutoDownloadMedia(enable)

**功能描述**：启用或禁用自动下载媒体文件。
**参数**：

- `enable`：`boolean` - 是否启用自动下载。
**示例**：

```javascript
wfc.enableAutoDownloadMedia(true);
```

### setAutoDownloadMediaSizeLimit(limit)

**功能描述**：设置自动下载媒体文件的大小限制（字节）。
**参数**：

- `limit`：`number` - 大小限制。
**示例**：

```javascript
wfc.setAutoDownloadMediaSizeLimit(1024 * 1024); // 1MB
```

---

## 错误代码（Error Codes）

以下是 WFC 中常见的错误代码及其含义：

- `0`：成功
- `1`：失败
- `1001`：无效参数
- `1002`：用户不存在
- `1003`：群组不存在
- `1004`：频道不存在
- `1005`：聊天室不存在
- `1006`：消息不存在
- `1007`：会话不存在
- `1008`：好友关系不存在
- `1009`：已经是好友
- `1010`：不是好友
- `1011`：权限不足
- `1012`：被拉黑
- `1013`：服务器忙
- `1014`：网络错误
- `1015`：未登录
- `1016`：连接断开
- `1017`：消息发送超时
- `1018`：文件上传失败
- `1019`：文件下载失败
- `1020`：媒体格式不支持
- ...

> 注意：完整的错误代码列表请参考 WFC 官方文档。
