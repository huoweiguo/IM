<template>
  <div class="public-group">
    <div class="public-list">
      <ul>
        <li v-for="item in publicList" :key="item.id" :class="{ 'activeItem': selectedIds.includes(item.id) }"
          @click="selectedItem(item.id)">
          <img :src="item.img" :alt="item.name" />
          <h2>{{ item.name }}</h2>
          <span></span>
        </li>
      </ul>
    </div>
    <button class="next-btn" @click="router.push('/publicSphere/nameHeader')">新建</button>
    <button class="next-btn" @click="router.push('/publicSphere/search')">搜索</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import gy1 from '../../assets/gy1.png'
import gy2 from '../../assets/gy2.png'
import gy3 from '../../assets/gy3.png'
import gy4 from '../../assets/gy4.png'
import gy5 from '../../assets/gy5.png'
import gy6 from '../../assets/gy6.png'
import gy7 from '../../assets/gy7.png'
const router = useRouter()
const publicList = ref([
  {
    id: 1,
    name: '工作',
    img: gy1
  },
  {
    id: 2,
    name: '学习',
    img: gy2
  },
  {
    id: 3,
    name: '生活',
    img: gy3
  },
  {
    id: 4,
    name: '娱乐',
    img: gy4
  },
  {
    id: 5,
    name: '情感',
    img: gy5
  },
  {
    id: 6,
    name: '商务',
    img: gy6
  },
  {
    id: 7,
    name: '其他',
    img: gy7
  }
])

const selectedIds = ref([])

const selectedItem = (id) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
  } else {
    selectedIds.value.push(id)
  }
}

</script>

<style lang="scss">
.public-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Arial, sans-serif;
  width: 375px;
  padding: 16px;
  height: 100vh;
  background-image: url('../../assets/gybg.png');
  background-size: cover;
  box-sizing: border-box;

  .public-list {
    margin-bottom: 50px;

    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 103px;
        height: 140px;
        background-color: #fff;
        border-radius: 8px;
        box-sizing: border-box;
        cursor: pointer;

        img {
          display: block;
          width: 52px;
          height: 52px;
          margin-bottom: 4px;
        }

        h2 {
          font-size: 16px;
          color: #333;
          line-height: 24px;
          margin-bottom: 12px;
        }

        span {
          display: flex;
          width: 28px;
          height: 16px;
          background-image: url('../../assets/gy-plus.png');
          background-size: 28px 16px;
        }

        &.activeItem {
          span {
            background-image: url('../../assets/gy-check.png');
          }
        }
      }
    }
  }

  .next-btn {
    width: 100%;
    height: 50px;
    background: #3478F5;
    border-radius: 16px 16px 16px 16px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    margin: 10px 0;
    cursor: pointer;
  }
}
</style>
