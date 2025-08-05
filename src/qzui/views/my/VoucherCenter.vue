<template>
  <div class="voucher-center">
    <!-- 用户信息 -->
    <div class="user-info">
      <img class="avatar" src="../../assets/usr-1.png" alt="头像" />
      <div class="user-detail">
        <div class="nickname">喜羊羊</div>
        <div class="balance"><img src="../../assets/coin.png" />剩余300圈币</div>
      </div>
      <button class="bill-btn" @click="router.push('/my/bill')">账单</button>
    </div>

    <!-- 充值金额 -->
    <div class="section-title">充值金币</div>

    <div class="amount-list">
      <div v-for="(item, idx) in amountOptions" :key="item.value"
        :class="['amount-item', { selected: selectedAmount === idx }]" @click="selectedAmount = idx">
        <div class="coin-label"><img src="../../assets/coin.png" />{{ item.label }}</div>
        <div class="old-price">￥{{ item.oldPrice }}</div>
        <div class="new-price"><span>￥</span>{{ item.newPrice }}</div>
        <div class="save">立省{{ item.save }}元</div>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="section-title">支付方式</div>
    <div class="pay-list">
      <div v-for="(pay, idx) in payOptions" :key="pay.value" :class="['pay-item', { selected: selectedPay === idx }]"
        @click="selectedPay = idx">
        <div>
          <img :src="pay.icon" class="pay-icon" />
          <span>{{ pay.label }}</span>
        </div>
        <img class="pay-check" v-if="selectedPay === idx" src="../../assets/check_fill.png" />
        <img class="pay-check" v-else src="../../assets/check.png" />
      </div>
    </div>

    <!-- 底部悬浮支付栏 -->
    <div class="pay-bar">
      <div class="pay-bar-main">
        <div class="pay-bar-info">
          <span class="pay-bar-amount"><i>支付</i>{{ amountOptions[selectedAmount].newPrice }}<i>元</i>,购买{{
            amountOptions[selectedAmount].value }}金币</span>
          <span class="pay-bar-tip">首次{{ amountOptions[selectedAmount].newPrice }}元，后续每次需{{
            amountOptions[selectedAmount].oldPrice }}元</span>
        </div>
        <button class="pay-bar-btn">去支付</button>
      </div>
      <div class="pay-bar-protocol">
        <input type="checkbox" id="protocol" v-model="checked" />
        <label for="protocol">开通前确认</label>
        <a href="#">《服务协议》</a>
        <a href="#">《隐私政策》</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import wechatIcon from '../../assets/wechat-icon-2.png'
import bankCardIcon from '../../assets/bankcard-icon.png'
import alipayIcon from '../../assets/alipay-icon.png'

const router = useRouter()

const amountOptions = [
  { label: '60圈币', oldPrice: 18, newPrice: 6, save: 12, value: 60 },
  { label: '300圈币', oldPrice: 54, newPrice: 30, save: 24, value: 300 },
  { label: '300圈币', oldPrice: 54, newPrice: 30, save: 24, value: 3001 },
  { label: '300圈币', oldPrice: 54, newPrice: 30, save: 24, value: 3001 }
]
const payOptions = [
  { label: '微信', value: 'wechat', icon: wechatIcon },
  { label: '支付宝', value: 'alipay', icon: bankCardIcon },
  { label: '银行卡', value: 'bank', icon: alipayIcon }
]

const selectedAmount = ref(0)
const selectedPay = ref(1)
const checked = ref(false)
</script>

<style scoped>
.voucher-center {
  width: 375px;
  height: 100vh;
  background: #f7faff;
  padding: 16px;
  padding-bottom: 80px;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
}

.user-detail {
  flex: 1;
}

.nickname {
  font-weight: 500;
  font-size: 14px;
  color: #333;
}

.balance {
  display: flex;
  align-items: center;
  color: #FFBA00;
  font-size: 14px;
}

.balance img {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.coin {
  color: #f7b500;
  font-weight: bold;
}

.bill-btn {
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 15px;
  padding: 3px 16px;
  font-size: 14px;
  cursor: pointer;
}

.section-title {
  font-weight: bold;
  margin: 18px 0 8px 0;
}

.amount-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 18px;
}

.amount-item {
  flex: none;
  width: 100px;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: border 0.2s;
  box-sizing: border-box;
  overflow: hidden;
}

.amount-item.selected {
  border: 2px solid #409eff;
  background: #eaf6ff;
}

.coin-label {
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.coin-label img {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.old-price {
  text-decoration: line-through;
  color: #aaa;
  font-size: 12px;
}

.new-price {
  color: #3478F5;
  font-size: 20px;
  font-weight: bold;
}

.new-price span {
  font-size: 12px;
}

.save {
  color: #777;
  font-size: 12px;
}

.pay-list {
  margin-top: 10px;
}

.pay-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}

.pay-item>div {
  display: flex;
  align-items: center;
}

.pay-check {
  width: 18px;
  height: 18px;
}

.pay-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.check {
  margin-left: auto;
  color: #409eff;
  font-size: 18px;
  font-weight: bold;
}

.pay-bar {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 0;
  width: calc(100% - 32px);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  padding-bottom: 20px;
  z-index: 100;
  font-size: 14px;
  background: #f7faff;
}

.pay-bar-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: #3a4256;
  padding-left: 16px;
  overflow: hidden;
}

.pay-bar-info {
  display: flex;
  flex-direction: column;
  color: #333;
}

.pay-bar-amount {
  font-weight: bold;
  color: #fff;
  border-radius: 4px 0 0 4px;
  padding: 2px 0;
  margin-right: 4px;
}

.pay-bar-amount i {
  color: #f7b500;
  font-style: normal;
  font-weight: bold;
}

.pay-bar-desc {
  color: #fff;
  background: #3a4256;
  border-radius: 0 4px 4px 0;
  padding: 2px 8px;
}

.pay-bar-tip {
  color: #888;
  font-size: 12px;
  margin-top: 2px;
}

.pay-bar-btn {
  background: #3478f5;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  height: 54px;
  width: 86px;
  cursor: pointer;
  margin-left: 16px;
}

.pay-bar-protocol {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  padding: 0 16px;
  font-size: 12px;
  color: #888;
}

.pay-bar-protocol input[type="checkbox"] {
  margin-right: 4px;
}

.pay-bar-protocol a {
  color: #3478f5;
  margin-left: 6px;
  text-decoration: none;
}
</style>
