<template>
  <div class="friend-container">
    <div>
      <ul>
        <li v-for="item in list" :key="item.id">
          <img class="header-img" :src="item.avatar" />
          <div class="friend-info">
            <div class="friend-name">
              <h2>{{ item.name }}</h2>
              <img :src="downIcon" />
            </div>
            <div class="friend-text">{{ item.content }}</div>
            <div class="friend-imgs" v-if="item.imgs.length > 0">
              <img v-for="(img, index) in item.imgs" :key="index" :src="img" />
            </div>
            <div class="friend-time">{{ item.time }} <img :src="deleteIcon" /></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import deleteIcon from '../assets/delete_icon.png'
import downIcon from '../assets/down-icon.png'
import headerImg from '../assets/header1.png'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
const list = ref([
  {
    id: 1,
    name: '张三',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '01-01 12:00',
    imgs: [img1, img2, img3, img2]
  },
  {
    id: 2,
    name: '李四',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '刚刚',
    imgs: [img1, img2, img3]
  },
  {
    id: 3,
    name: '王五',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑。',
    time: '23小时前',
    imgs: []
  },
  {
    id: 4,
    name: '赵六',
    avatar: headerImg,
    content: '今天天气真好',
    time: '五分钟前',
    imgs: [img1, img2, img3]
  },
  {
    id: 5,
    name: '张三',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '01-01 12:00',
    imgs: [img1, img2, img3]
  },
  {
    id: 6,
    name: '李四',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑',
    time: '刚刚',
    imgs: [img1, img2, img3]
  },
  {
    id: 7,
    name: '王五',
    avatar: headerImg,
    content: '我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑,我是一只小肥羊，每天在草原上快乐的奔跑。',
    time: '23小时前',
    imgs: []
  },
  {
    id: 8,
    name: '赵六',
    avatar: headerImg,
    content: '今天天气真好',
    time: '五分钟前',
    imgs: [img1, img2, img3]
  }
])
</script>

<style lang="scss">
.friend-container {
  background-color: #fff;
  padding: 16px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;

  &>div {
    width: calc(100% + 40px);
    height: 100%;
    overflow-y: auto;
    padding-right: 20px;
  }

  ul {
    padding: 0;

    li {
      display: flex;
      margin-bottom: 32px;

      .header-img {
        width: 43px;
        height: 43px;
        border-radius: 8px;
        margin-right: 8px;
        overflow: hidden;
      }

      .friend-info {
        flex: 1;

        .friend-name {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 21px;
          margin-bottom: 4px;

          h2 {
            font-size: 14px;
            color: rgba(99, 107, 137, 1);
            font-family: Source Han Sans CN-Medium;
            font-weight: 500;
          }

          img {
            width: 16px;
            height: 16px;
          }
        }

        .friend-text {
          font-family: Source Han Sans CN-Regular;
          color: rgba(51, 51, 51, 1);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .friend-imgs {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 8px;

          img {
            width: 105px;
            height: 105px;
            display: block;
            margin-right: 8px;
            margin-bottom: 8px;
          }
        }

        .friend-time {
          display: flex;
          align-items: center;
          font-family: Source Han Sans CN-Regular;
          color: rgba(170, 170, 170, 1);
          font-size: 14px;

          img {
            width: 14px;
            height: 14px;
            cursor: pointer;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
