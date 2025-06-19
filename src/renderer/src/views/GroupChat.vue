<template>
  <div class="contact-container">
    <div class="contact-user">
      <!-- 搜索框 -->
      <div class="search-bar">
        <input type="text" placeholder="搜索" v-model="searchQuery" class="search-input">
      </div>

      <!-- 字母索引 -->
      <!-- <div class="index-bar">
        <span v-for="letter in indexLetters" :key="letter" @click="scrollToLetter(letter)">
          {{ letter }}
        </span>
      </div> -->

      <!-- 联系人列表 -->
      <div class="contact-content">
        <div class="contact-list" ref="contactList">
          <div v-for="(group, letter) in filteredContacts" :key="letter" class="contact-group">
            <div class="group-title" :id="'letter-' + letter">{{ letter }}</div>

            <div v-for="contact in group" :key="contact.id" class="contact-item"
              :class="selectedContacts.includes(contact.id) ? 'activeItem' : ''" @click="toggleSelect(contact.id)">
              <img :src="contact.avatar" class="avatar">
              <div class="info">
                <div class="name">{{ contact.name }}</div>
                <!-- <div class="status">{{ contact.status }}</div> -->
              </div>
              <div class="checkbox"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-selection">
      <div class="selected-nav">
        <h2>选择联系人</h2>
        <span>已选择{{ selectedContacts.length }}个联系人</span>
      </div>
      <div class="selected-contacts">
        <ul>
          <li v-for="contact in selectedUsers" :key="contact.id">
            <img :src="contact.avatar" />
            <span>{{ contact.name }}</span>
            <el-icon @click="removeSelected(contact.id)">
              <Close />
            </el-icon>
          </li>
        </ul>
      </div>
      <!-- 底部操作栏 -->
      <div class="action-bar">
        <button @click="confirmSelection">完成</button>
        <button @click="cancelSelection">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import header1 from '../assets/header1.png'
const selectedUsers = ref([])
// 模拟联系人数据
const contacts = ref([
  { id: 1, name: '张三', status: '在线', avatar: header1, initial: 'Z' },
  { id: 6, name: '张无极', status: '在线', avatar: header1, initial: 'Z' },
  { id: 7, name: '张三丰', status: '在线', avatar: header1, initial: 'Z' },
  { id: 2, name: '李四', status: '离线', avatar: header1, initial: 'L' },
  { id: 8, name: '李蛋', status: '离线', avatar: header1, initial: 'L' },
  { id: 3, name: '王五', status: '在线', avatar: header1, initial: 'W' },
  { id: 4, name: 'Alice', status: '在线', avatar: header1, initial: 'A' },
  { id: 5, name: 'Bob', status: '离线', avatar: header1, initial: 'B' },
  { id: 9, name: 'JSON', status: '离线', avatar: header1, initial: 'J' },
  { id: 10, name: 'Jack', status: '离线', avatar: header1, initial: 'J' },
  { id: 11, name: 'Jack', status: '离线', avatar: header1, initial: 'J' },
  { id: 12, name: 'Maker', status: '离线', avatar: header1, initial: 'M' },
  { id: 13, name: 'March', status: '离线', avatar: header1, initial: 'M' },
  { id: 14, name: 'Math', status: '离线', avatar: header1, initial: 'M' },
  { id: 15, name: '霍霍', status: '离线', avatar: header1, initial: 'H' },
  { id: 16, name: '红海', status: '离线', avatar: header1, initial: 'H' },
  { id: 17, name: '海园', status: '离线', avatar: header1, initial: 'H' },
  { id: 18, name: '活力', status: '离线', avatar: header1, initial: 'H' },
  { id: 19, name: '海子', status: '离线', avatar: header1, initial: 'H' },
  { id: 20, name: '黑子', status: '离线', avatar: header1, initial: 'H' }
  // 更多联系人...
])

// 按字母分组
const groupedContacts = computed(() => {
  const groups = {}
  contacts.value.forEach(contact => {
    const letter = contact.initial.toUpperCase()
    if (!groups[letter]) {
      groups[letter] = []
    }
    groups[letter].push(contact)
  })
  return groups
})

// 字母索引
const indexLetters = computed(() => {
  return Object.keys(groupedContacts.value).sort()
})

// 搜索功能
const searchQuery = ref('')
const filteredContacts = computed(() => {
  if (!searchQuery.value) return groupedContacts.value

  const result = {}
  const query = searchQuery.value.toLowerCase()

  Object.keys(groupedContacts.value).forEach(letter => {
    const filtered = groupedContacts.value[letter].filter(
      contact => contact.name.toLowerCase().includes(query)
    )
    if (filtered.length > 0) {
      result[letter] = filtered
    }
  })

  return result
})

// 选择功能
const selectionMode = ref(true)
const selectedContacts = ref([])

const toggleSelect = (id) => {
  let curIndex = -1
  curIndex = selectedContacts.value.indexOf(id)
  if (curIndex === -1) {
    selectedContacts.value.push(id)
  } else {
    selectedContacts.value.splice(curIndex, 1)
  }
  selectedUsers.value = []
  selectedContacts.value.forEach(id => {
    const contact = contacts.value.find(contact => contact.id === id)
    if (contact) {
      selectedUsers.value.push(contact)
    }
  })
}

const cancelSelection = () => {
  selectedContacts.value = []
  selectedUsers.value = []
}

const confirmSelection = () => {
  console.log('已选择联系人:', selectedContacts.value)
  alert(`已选择 ${selectedContacts.value.length} 个联系人`)
  selectedContacts.value = []
}

const removeSelected = (id) => {
  const index = selectedContacts.value.indexOf(id)
  selectedContacts.value.splice(index, 1)
  selectedUsers.value.splice(index, 1)
}

// 字母索引跳转
const contactList = ref(null)
const scrollToLetter = (letter) => {
  const element = document.getElementById(`letter-${letter}`)
  if (element && contactList.value) {
    contactList.value.scrollTo({
      top: element.offsetTop - 50,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.contact-container {
  width: 604px;
  height: 100vh;
  padding: 0 25px;
  display: flex;
  border-top: 1px solid #eee;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

.search-bar {
  padding: 10px;
  background-color: #f5f5f5;
}

.search-input {
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border: none;
  border-radius: 15px;
  outline: none;
  background-color: #efefef;
}

.index-bar {
  position: fixed;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;
  z-index: 100;
}

.index-bar span {
  padding: 2px 0;
  cursor: pointer;
}

.index-bar span:hover {
  color: #1890ff;
}

.contact-user {
  width: 250px;
  height: 100vh;
  border-right: 1px solid #eee;
  overflow: hidden;
}

.contact-selection {
  width: 350px;
  position: relative;
  overflow: hidden;
}

.selected-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
}

.selected-nav h2 {
  font-size: 16px;
}

.selected-nav span {
  font-size: 12px;
}

.selected-contacts {
  flex: 1;
}

.selected-contacts ul {
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  max-height: 270px;
  padding: 10px 0;
  overflow-y: scroll;
}

.selected-contacts ul li {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 15px;
  width: 60px;
}

.selected-contacts ul li img {
  width: 40px;
  height: 40px;
}

.selected-contacts ul li span {
  display: block;
  width: 100%;
  font-size: 12px;
  color: #888;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.selected-contacts ul li i {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  top: -5px;
  width: 15px;
  height: 15px;
  background-color: #aaa;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.contact-content {
  height: 100vh;
  overflow: hidden;
  padding-bottom: 60px;
}

.contact-list {
  width: 245px;
  height: 100%;
  overflow-y: scroll;
}

.group-title {
  padding: 0 15px;
  background-color: #f5f5f5;
  color: #888;
  font-size: 14px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.contact-item.selected {
  background-color: #f0f7ff;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 10px;
}

.info {
  flex: 1;
}

.name {
  font-size: 16px;
  color: #333;
}

.status {
  font-size: 12px;
  color: #999;
}

.checkbox {
  margin-left: auto;
  width: 20px;
  height: 20px;
  background-image: url(../assets/check.png);
  background-size: 20px 20px;
}

.activeItem .checkbox {
  background-image: url(../assets/check_fill.png);
}

.action-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
}

.action-bar button {
  padding: 8px 35px;
  border: none;
  border-radius: 5px;
  background-color: #07C160;
  color: white;
  cursor: pointer;
}

.action-bar button:last-child {
  background-color: #f0f0f0;
  color: #333;
}
</style>
