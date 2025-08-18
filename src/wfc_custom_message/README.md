## 说明

**自定义消息扩展圈子 功能时，请勿直接修改`wfc`目录下的内容，修改之后，会为后续升级带来很大的麻烦**

## 自定义消息步骤

1. 定义消息类型，参考[customMessageContentType](./customMessageContentType.js)，`1000`以下为内部保留，请使用`1000`以上的消息类型
2. 实现自定义消息，普通消息参考[testCustomMessageContent](./testCustomMessageContent.js)，通知消息参考[testCustomNotificationMessageContent](./testCustomNotificationMessageContent.js)
3. 配置自定义消息，参考[customMessageConfig](./customMessageConfig.js)
4. 实现自定义消息对应的 UI，普通类型消息请参考[testCustomMessageContentView](../ui/main/conversation/message/content/TestCustomMessageContentView.vue)；
   普通通知类消息，默认会使用默认通知样式，具体参考[NotificationMessageContentView](../ui/main/conversation/message/NotificationMessageContentView.vue)；
5. 配置自定义消息和自定义消息 UI 的对应关系，普通消息参考[MessageContentContainerView](../ui/main/conversation/message/MessageContentContainerView.vue)；
   需要自定义通知类消息 UI 时，请参考考[MessageItemView](../ui/main/conversation/MessageItemView.vue)

## 送礼物消息

送礼物消息包括两种类型：
1. `GiftMessageContent` - 普通的送礼物消息，用于在聊天中发送礼物
2. `GiftNotificationMessageContent` - 送礼物通知消息，用于在群聊中通知其他成员有礼物发送

实现参考[giftMessageContent.js](./giftMessageContent.js)和[giftNotificationMessageContent.js](./giftNotificationMessageContent.js)
