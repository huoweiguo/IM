import ChatList from '../../qzui/views/chat/ChatList.vue'
import ChatHome from '../../qzui/views/chat/ChatHome.vue'

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
