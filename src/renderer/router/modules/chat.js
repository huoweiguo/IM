import ChatList from '../../src/views/chat/ChatList.vue'
import ChatHome from '../../src/views/chat/ChatHome.vue'

export const ChatComp = [
  {
    path: '/chatList',
    name: 'chatList',
    component: ChatList,
    meta: {
      requiresAuth: false,
      title: '聊天室列表'
    }
  },
  {
    path: '/chatHome',
    name: 'chatHome',
    component: ChatHome,
    meta: {
      requiresAuth: false,
      title: '聊天室'
    }
  }
]
