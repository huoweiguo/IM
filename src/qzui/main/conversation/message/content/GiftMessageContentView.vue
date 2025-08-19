<template>
    <div class="gift-message-container" v-bind:class="{ out: message.direction === 0 }">
        <div class="gift-content">
            <img :src="giftIcon" class="gift-icon" />
            <div class="gift-info">
                <div class="gift-name">{{ giftName }}</div>
                <div class="gift-details">
                    <span class="gift-count">x {{ giftCount }}</span>
                    <span class="gift-price">{{ giftPrice }}圈币</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from '../../../../../wfc/messages/message';

export default {
    name: 'GiftMessageContentView',
    props: {
        message: {
            type: Message,
            required: true,
        },
    },
    data() {
        return {
            giftId: '',
            giftName: '',
            giftCount: 0,
            giftIcon: '',
            giftPrice: 0,
        };
    },
    mounted() {
        // 从消息内容中提取礼物信息
        if (this.message && this.message.messageContent) {
            this.giftId = this.message.messageContent.giftId || '';
            this.giftName = this.message.messageContent.giftName || '';
            this.giftCount = this.message.messageContent.giftCount || 0;
            this.giftIcon = this.message.messageContent.giftIcon || '';
            this.giftPrice = this.message.messageContent.giftPrice || 0;
        }
    },

    computed: {
        // 可以添加一些计算属性来处理显示逻辑
    },
};
</script>

<style lang="scss" scoped>
.gift-message-container {
    margin: 0 10px;
    padding: 10px;
    background-color: white;
    position: relative;
    border-radius: 5px;
    display: flex;
    align-items: center;
    min-width: 300px;

    &::after {
        content: '礼物';
        position: absolute;
        top: 0;
        right: 0;
        font-size: 10px;
        color: white;
        padding: 0 8px;
        border-radius: 0 5px 0 5px;
        background-color: #07c160;
    }
}

.gift-message-container.out {
    background-color: #95ec69;
}

.gift-content {
    display: flex;
    align-items: center;
    width: 100%;
}

.gift-icon {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 10px;
    object-fit: cover;
}

.gift-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.gift-name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.gift-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.gift-count {
    font-size: 12px;
    color: #666;
}

.gift-price {
    font-size: 12px;
    color: #ff9900;
    font-weight: bold;
}
</style>
