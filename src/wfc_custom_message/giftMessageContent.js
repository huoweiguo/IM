import GiftMessageContentType from "./giftMessageContentType";
import MessageContent from '../wfc/messages/messageContent'

/**
 * 送礼物消息内容类
 */
export default class GiftMessageContent extends MessageContent {
    giftId;       // 礼物ID
    giftName;     // 礼物名称
    giftCount;    // 礼物数量
    giftIcon;     // 礼物图标URL
    giftPrice;    // 礼物价格

    constructor(giftId, giftName, giftCount, giftIcon, giftPrice) {
        super(GiftMessageContentType.MESSAGE_CONTENT_TYPE_GIFT_MESSAGE);
        this.giftId = giftId;
        this.giftName = giftName;
        this.giftCount = giftCount;
        this.giftIcon = giftIcon;
        this.giftPrice = giftPrice;
    }

    // 会话列表显示对应会话时，会显示会话最后一条消息的摘要信息
    digest() {
        return `[礼物] ${this.giftName} x ${this.giftCount}`;
    }

    // 发送消息时，会进行 encode 操作，实际发送的是 payload
    encode() {
        let payload = super.encode();
        payload.searchableContent = `[礼物] ${this.giftName} x ${this.giftCount}`;
        
        // 将礼物信息编码为JSON字符串
        let giftInfo = {
            giftId: this.giftId,
            giftName: this.giftName,
            giftCount: this.giftCount,
            giftIcon: this.giftIcon,
            giftPrice: this.giftPrice
        };
        
        payload.content = JSON.stringify(giftInfo);
        return payload;
    }

    // 收到消息时，会执行 decode 操作，从 payload 解析到具体的消息内容
    decode(payload) {
        super.decode(payload);
        
        // 解析礼物信息
        if (payload.content) {
            let giftInfo = JSON.parse(payload.content);
            this.giftId = giftInfo.giftId;
            this.giftName = giftInfo.giftName;
            this.giftCount = giftInfo.giftCount;
            this.giftIcon = giftInfo.giftIcon;
            this.giftPrice = giftInfo.giftPrice;
        }
    }
}