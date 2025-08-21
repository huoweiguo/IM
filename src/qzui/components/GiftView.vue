<template>
    <el-dialog v-model="dialogVisible" title="礼物" width="400" :close-on-click-modal="false" @close="close" align-center>
        <div class="gift-list">
            <div v-for="item in giftList" :key="item.id" class="gift-item" :class="{ active: selectedGiftID == item.id }" @click="selectedGiftID = selectedGiftID == item.id ? null : item.id">
                <img class="gift-icon" :src="item.animationUrl || GiftImg" alt="礼物" />
                <div class="gift-name">{{ item.name }}</div>
                <div class="gift-price">{{ item.price }}圈币</div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" round @click="doSendGift"> 送礼物 </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import wfc from '../../wfc/client/wfc';
import { getGiftConfigList, sendGift } from '../../api/gift.js';
import { defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import GiftMessageContent from '../../wfc_custom_message/giftMessageContent';
import GiftImg from '../assets/gift-red.png';

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    conversation: {
        type: Object,
        default: () => {},
    },
});

const emit = defineEmits(['update:open']);
const dialogVisible = ref(props.open);
const selectedGiftID = ref(null);

const close = () => {
    emit('update:open', false);
};

const giftList = ref([]);

const getGiftList = async () => {
    const res = await getGiftConfigList({
        page_size: 50,
        start_time: '',
    });
    if (res.code == 0) {
        giftList.value = res.data;
        console.log(123, giftList.value);
    }
};

const doSendGift = async () => {
    if (selectedGiftID.value) {
        const selectedGift = giftList.value.find((item) => item.id == selectedGiftID.value);
        if (!selectedGift) {
            ElMessage.error('礼物不存在');
            return;
        }

        // 创建礼物消息内容
        const giftMessage = new GiftMessageContent(
            selectedGift.id,
            selectedGift.name,
            1, // 数量固定为1
            selectedGift.animationUrl,
            selectedGift.price
        );

        // 发送礼物消息
        wfc.sendConversationMessage(props.conversation, giftMessage);

        // 关闭对话框
        close();
        return;
        const res = await sendGift({
            giftId: selectedGiftID.value,
            quantity: 1,
            receiverId: props.conversation._target.uid,
            senderId: wfc.getUserId(),
            sourceId: '', //  关联的来源(动态流水号、野火群聊id)
        });
        if (res.code == 0) {
            // 创建礼物消息内容
            const giftMessage = new GiftMessageContent(
                selectedGift.id,
                selectedGift.name,
                1, // 数量固定为1
                selectedGift.animationUrl,
                selectedGift.price
            );

            // 发送礼物消息
            wfc.sendConversationMessage(props.conversation, giftMessage);

            // 关闭对话框
            close();
        } else {
            ElMessage.error(res.msg);
        }
    } else {
        ElMessage.error('请选择礼物');
    }
};

watch(
    () => props.open,
    (newVal) => {
        dialogVisible.value = newVal;
        if (newVal) {
            getGiftList();
        }
    }
);
</script>

<style lang="scss" scoped>
.gift-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .gift-item {
        display: flex;
        width: calc(25% - 10px);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid #fff;
        border-radius: 10px;
        padding: 10px;
        &.active,
        &:hover {
            border: 1px solid #409eff;
        }
        .gift-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 4px;
        }
        .gift-name {
            font-size: 14px;
            font-weight: 500;
        }
        .gift-price {
            font-size: 12px;
        }
    }
}
</style>
