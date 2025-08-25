<template>
  <div class="group-list">
    <div class="tab-title">群组</div>
    <div class="list-container">
      <div v-for="group in groupLists" :key="group.id" class="group">
        <div class="group-header" @click="group.expanded = !group.expanded">
          <span>{{ group.name }}</span>
          <span class="arrow" :class="{ expanded: group.expanded }">▼</span>
        </div>
        <ul v-show="group.expanded">
          <li v-for="user in group.users" :key="user.id" @click="viewUserDetail(user)">
            <img :src="user.portrait" class="avatar" />
            <div class="info">
              <div class="nickname">{{ user.nickname }}</div>
              <div class="account">{{ user.account }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 假设存在获取群组列表的API，此处使用占位符
import { getGroupList } from '@/api/index.js';

const groupLists = ref([]);

const loadGroupList = () => {
  getGroupList().then((res) => {
    if (res.code == 0 && res.data) {
      // 格式化群组数据
      const groups = res.data.map((group) => ({
        id: group.id,
        name: group.name,
        expanded: ref(false),
        users: group.members.map((user) => ({
          id: user.id,
          nickname: user.nickname || user.realName || '',
          account: user.account || user.mobile || '',
          portrait: user.avatar || user.realAvatar || '',
        }))
      }));
      groupLists.value = groups;
    }
  });
};

const viewUserDetail = (user) => {
  console.log('查看用户详情:', user);
};

onMounted(() => {
  loadGroupList();
});
</script>

<style lang="scss" scoped>
.group-list {
  .tab-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }
  .list-container {
    height: calc(100% - 50px);
    overflow-y: auto;
    .group {
      margin-bottom: 15px;
      border-radius: 8px;
      background-color: #f9f9f9;
      .group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 8px 8px 0 0;
        background-color: #f0f0f0;
        .arrow {
          transition: transform 0.3s;
          &.expanded {
            transform: rotate(180deg);
          }
        }
      }
      ul {
        list-style: none;
        padding: 0;
        li {
          display: flex;
          padding: 10px 15px;
          cursor: pointer;
          &:hover {
            background-color: #e9e9e9;
          }
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            margin-right: 12px;
          }
          .info {
            flex: 1;
            .nickname {
              font-weight: 600;
              font-size: 14px;
              color: #333;
            }
            .account {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>