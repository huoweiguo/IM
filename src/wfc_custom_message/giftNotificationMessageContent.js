import GiftMessageContentType from "./giftMessageContentType";
import NotificationMessageContent from "../wfc/messages/notification/notificationMessageContent";

/**
 * 送礼物通知消息内容类
 */
export default class GiftNotificationMessageContent extends NotificationMessageContent {
    senderName;   // 发送者名称
    giftName;     // 礼物名称
    giftCount;    // 礼物数量
    giftIcon;     // 礼物图标URL

    constructor(senderName, giftName, giftCount, giftIcon) {
        super(GiftMessageContentType.MESSAGE_CONTENT_TYPE_GIFT_NOTIFICATION);
        this.senderName = senderName;
        this.giftName = giftName;
        this.giftCount = giftCount;
        this.giftIcon = giftIcon;
    }

    // 会话界面显示通知时，将显示本函数的返回值
    formatNotification() {
        return `${this.senderName} 送了 ${this.giftName} x ${this.giftCount}`;
    }

    digest() {
        return `${this.senderName} 送了 ${this.giftName} x ${this.giftCount}`;
    }

    encode() {
        let payload = super.encode();
        
        // 将礼物通知信息编码为JSON字符串
        let giftInfo = {
            senderName: this.senderName,
            giftName: this.giftName,
            giftCount: this.giftCount,
            giftIcon: this.giftIcon
        };
        
        payload.content = JSON.stringify(giftInfo);
        return payload;
    };

    decode(payload) {
        super.decode(payload);
        
        // 解析礼物通知信息
        if (payload.content) {
            let giftInfo = JSON.parse(payload.content);
            this.senderName = giftInfo.senderName;
            this.giftName = giftInfo.giftName;
            this.giftCount = giftInfo.giftCount;
            this.giftIcon = giftInfo.giftIcon;
        }
    }
}