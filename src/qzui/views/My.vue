<template>
    <div class="my-container">
        <div class="my-page" style="overflow: auto">
            <div class="my-page__header">
                <div class="my-page__header__avatar">
                    <img class="avator_img" src="../assets/header1.png" />
                    <div class="my-page__header__info">
                        <div class="my-page__header__info__name">
                            <span>请叫我女王</span>
                            <el-button type="primary" :icon="Edit" size="small" round @click="handleEditUserInfo">编辑资料</el-button>
                        </div>
                        <div class="my-page__header__info__coin"><img src="../assets/coin.png" />剩余300圈币</div>
                    </div>
                </div>
                <div class="my-page__header__coin" @click="handleVoucherCenter"><img src="../assets/coin.png" />圈币充值</div>
            </div>

            <div class="my-page__nav">
                <div class="my-page__nav_title">
                    <h2>邀请好友</h2>
                    <p>邀请好友，看广告、赚圈币</p>
                </div>
                <el-button round>立即邀请</el-button>
            </div>

            <div class="my-page__watch">
                <div class="my-page__watch_switch">
                    观看提醒
                    <el-switch v-model="watchSwitch" size="small" style="margin-left: 5px" active-color="#13ce66" inactive-color="#ffffff" inline-prompt />
                </div>
                <div class="my-page__watch_text">
                    <span><b>1</b>连续观看</span> | <span>观看记录</span>
                </div>
                <div class="get_coin">已获得1圈币</div>
                <ul class="coin_list">
                    <li v-for="(item, index) in coinList" :key="index" :class="{ received: item.received }">
                        +{{ item.num }}
                        <span>第{{ index + 1 }}条</span>
                    </li>
                </ul>
                <div class="my-page__watch_btn">
                    <span>观看领取圈币(1/30)</span>
                </div>
            </div>

            <div class="my-page__item">
                <ul>
                    <li>
                        <img src="../assets/my_item1.png" alt="" />
                        <div>
                            <h2>文件</h2>
                            <span>下载过的文件</span>
                        </div>
                    </li>
                    <li @click="handleCalender">
                        <img src="../assets/my_item2.png" alt="" />
                        <div>
                            <h2>日程</h2>
                            <span>查看日程安排</span>
                        </div>
                    </li>
                    <li @click="handleMyPublish">
                        <img src="../assets/my_item3.png" alt="" />
                        <div>
                            <h2>发圈</h2>
                            <span>我发过的圈</span>
                        </div>
                    </li>
                    <li>
                        <img src="../assets/my_item4.png" alt="" />
                        <div>
                            <h2>点赞</h2>
                            <span>我点过的赞</span>
                        </div>
                    </li>
                </ul>
            </div>

            <ul class="my-page__list">
                <li>
                    <img src="../assets/collection_icon.png" alt="" />
                    互关好友
                </li>
                <li>
                    <img src="../assets/like_icon.png" alt="" />
                    我的关注
                </li>
                <li @click="handleMyFans">
                    <img src="../assets/every_icon.png" alt="" />
                    我的粉丝
                </li>
            </ul>

            <ul class="my-page__list">
                <li>
                    <img src="../assets/star_icon.png" alt="" />
                    收藏
                </li>
            </ul>

            <ul class="my-page__list">
                <li>
                    <img src="../assets/topic_icon.png" alt="" />
                    主题
                </li>
                <li>
                    <img src="../assets/earth_icon.png" alt="" />
                    语言
                </li>
                <li @click="handleSettings">
                    <img src="../assets/setting_icon.png" alt="" />
                    设置
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import { createNewWindow } from '@/qzui/utils/electronHelper';
const watchSwitch = ref(false);
const coinList = ref([
    { id: 1, num: 1, received: true },
    { id: 2, num: 1, received: true },
    { id: 3, num: 1, received: false },
    { id: 4, num: 1, received: false },
    { id: 5, num: 1, received: false },
]);
const handleCalender = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '我的日程',
        url: `#/my/calender`,
    });
};
const handleMyPublish = (id) => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '我的发布',
        url: `#/myPublish?id=${id}`,
    });
};

const handleMyFans = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '我的粉丝',
        url: `#/fans?id=1`,
    });
};

const handleVoucherCenter = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '充值',
        url: `#/my/voucherCenter`,
    });
};
const handleEditUserInfo = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '编辑资料',
        url: `#/my/editUserInfo`,
    });
};
const handleSettings = () => {
    createNewWindow({
        width: 375,
        height: 720,
        title: '设置',
        url: `#/my/settings`,
    });
};
</script>

<style lang="scss" scoped>
.my-container {
    width: 375px;
    margin: 0 auto;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f3f3f3;
}

.my-page {
    width: calc(100% + 16px);
    padding: 16px;
    height: 100vh;
    background-image: url('../assets/head-bg.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: contain;

    .my-page__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 13px;

        .my-page__header__avatar {
            display: flex;
            align-items: center;

            .avator_img {
                width: 43px;
                height: 43px;
                border-radius: 8px;
                margin-right: 8px;
            }

            .my-page__header__info {
                .my-page__header__info__name {
                    display: flex;
                    align-items: center;

                    span {
                        margin-right: 10px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        font-size: 14px;
                        color: #333;
                    }
                }

                .my-page__header__info__coin {
                    display: flex;
                    align-items: center;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    font-size: 14px;
                    color: #ffba00;

                    img {
                        width: 16px;
                        height: 16px;
                        margin-right: 4px;
                    }
                }
            }
        }

        .my-page__header__coin {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 92px;
            height: 30px;
            background: #ffebc7;
            border-radius: 19px 19px 19px 19px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            font-size: 12px;
            color: #ffba00;
            cursor: pointer;

            img {
                height: 16px;
                width: 16px;
                margin-right: 5px;
            }
        }
    }

    .my-page__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        border-radius: 12px;
        background-color: #3478f5;
        padding: 12px;
        box-sizing: border-box;
        margin-bottom: 12px;

        h2 {
            font-weight: 800;
            font-size: 16px;
            color: #ffdc66;
            font-family: Source Han Sans CN;
            margin-bottom: 5px;
        }

        p {
            font-weight: 400;
            font-size: 12px;
            color: #f9f9fa;
            font-family: Source Han Sans CN;
        }
    }

    .my-page__watch {
        position: relative;
        height: 255px;
        background: linear-gradient(180deg, #d1e1ff 0%, #fefeff 52%);
        border-radius: 12px 12px 12px 12px;
        overflow: hidden;
        margin-bottom: 20px;

        .my-page__watch_switch {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            background-color: #3478f5;
            color: #fff;
            padding: 0 12px;
            font-size: 12px;
            height: 35px;
            border-radius: 0 0 0 12px;
        }

        .my-page__watch_text {
            padding: 12px;
            padding-bottom: 0;
            font-family: Source Han Sans CN;
            font-weight: 500;
            font-size: 14px;
            color: #333333;

            span {
                font-family: Source Han Sans CN;
                font-weight: 500;
                font-size: 14px;
                color: #333333;

                b {
                    color: #0267ff;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    font-size: 24px;
                    color: #0267ff;
                    margin-right: 3px;
                }
            }
        }

        .get_coin {
            padding: 12px;
            padding-top: 0;
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 12px;
            color: #777777;
        }

        .coin_list {
            display: grid;
            padding: 12px;
            grid-template-columns: repeat(5, 1fr);
            gap: 30px;
            margin-bottom: 25px;

            li {
                position: relative;
                display: flex;
                justify-content: center;
                padding-top: 12px;
                width: 40px;
                height: 72px;
                border-radius: 20px;
                background-image: url('../assets/coin_unreceived.png');
                background-size: 40px 72px;
                background-repeat: no-repeat;
                color: #ca792b;
                font-size: 16px;
                box-sizing: border-box;
                font-family: Source Han Sans CN;
                font-weight: 400;

                &.received {
                    background-image: url('../assets/coin_received.png');
                    color: #7b7b7b;
                }

                span {
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    width: 40px;
                    font-size: 12px;
                    text-align: center;
                    color: #333;
                }
            }
        }

        .my-page__watch_btn {
            display: flex;
            justify-content: center;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 270px;
                height: 49px;
                background: #3478f5;
                border-radius: 25px;
                cursor: pointer;
                color: #fff;
                font-size: 18px;
                font-weight: 500;
            }
        }
    }

    .my-page__item {
        position: relative;
        height: 176px;
        background: linear-gradient(180deg, #d1e1ff 0%, #fefeff 52%);
        border-radius: 12px 12px 12px 12px;
        padding: 12px;
        overflow: hidden;
        margin-bottom: 20px;
        box-sizing: border-box;

        ul {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 0;

            li {
                display: flex;
                align-items: center;
                padding: 16px;
                cursor: pointer;

                img {
                    height: 44px;
                    width: 44px;
                    margin-right: 10px;
                }

                & > div {
                    h2 {
                        font-size: 14px;
                        color: #333;
                        font-family: Source Han Sans CN-Medium;
                        font-weight: 500;
                    }

                    span {
                        font-size: 12px;
                        color: #777;
                        font-family: Source Han Sans CN-Regular;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    .my-page__list {
        padding: 0;
        margin-bottom: 20px;
        background-color: #fff;

        li {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #333;
            font-family: Source Han Sans CN-Medium;
            height: 54px;
            padding: 0 16px;
            border-bottom: 1px solid rgba(170, 170, 170, 0.4);
            background-image: url(../assets/right-arrow.png);
            background-position: right center;
            background-repeat: no-repeat;
            background-size: 12px 12px;

            &:last-child {
                border-bottom: none;
            }

            img {
                width: 16px;
                height: 16px;
                margin-right: 5px;
            }
        }
    }
}
</style>
