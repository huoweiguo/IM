<template>
    <div class="chat-container">
        <div class="chat-title">聊天室</div>
        <div class="chat-list">
            <ul>
                <li v-for="item in 3" :key="item">
                    <span>聊天室{{ item }}</span>
                    <div class="chat-list-img">
                        <div>
                            <img src="../assets/el1.png" alt="" />
                            <img src="../assets/el2.png" alt="" />
                            <img src="../assets/el3.png" alt="" />
                        </div>
                        <span>48人在线</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat-container {
    width: 375px;
    padding: 16px;
    height: 100vh;
    box-sizing: border-box;

    .chat-title {
        font-size: 20px;
        font-weight: 500;
        color: #333;
        margin-bottom: 10px;
        text-align: center;
    }

    .chat-list {
        ul {
            padding: 0;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 12px;
                height: 70px;
                background-image: linear-gradient(to right, #d8f3ff, #e3f0ff, #dbebf9);
                border-radius: 16px;
                margin-bottom: 12px;
                cursor: pointer;

                span {
                    font-size: 20px;
                    color: #333;
                }

                .chat-list-img {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 138px;
                    height: 36px;
                    border-radius: 18px;
                    background-color: #fff;

                    span {
                        font-size: 14px;
                        color: #5e97ff;
                        margin-left: 5px;
                    }

                    & > div {
                        display: flex;

                        img {
                            display: block;
                            width: 24px;
                            height: 24px;
                            margin-left: -10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
