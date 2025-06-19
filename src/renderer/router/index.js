import { createRouter, createWebHashHistory } from 'vue-router'
import { ChatComp } from './modules/chat'
import { login } from './modules/login'
import Home from '../src/views/Home.vue'
import Community from '../src/views/Community.vue'
import Chat from '../src/views/Chat.vue'
import Friend from '../src/views/Friend.vue'
import GroupChat from '../src/views/GroupChat.vue'
import PublicSphereList from '../src/views/publicSphere/PublicList.vue'
import NameHeader from '../src/views/publicSphere/NameHeader.vue'
import SearchSphere from '../src/views/publicSphere/Search.vue'
import Auth from '../src/views/publicSphere/Auth.vue'
import AuthorizationSet from '../src/views/publicSphere/AuthorizationSet.vue'
import ScanFocus from '../src/views/publicSphere/ScanFocus.vue'
import Help from '../src/views/Help.vue'
import AllQuestion from '../src/views/AllQuestion.vue'
import Feedback from '../src/views/Feedback.vue'
import TipOff from '../src/views/TipOff.vue'
import TipOffUser from '../src/views/TipOffUser.vue'
import FocusMe from '../src/views/FocusMe.vue'
import Posting from '../src/views/Posting.vue'
import MyPublish from '../src/views/MyPublish.vue'
import Fans from '../src/views/Fans.vue'
import My from '../src/views/My.vue'
import EditUserInfo from '../src/views/my/EditInfo.vue'
import Know from '../src/views/Know.vue'
import UserInfo from '../src/views/UserInfo.vue'
import Calender from '../src/views/my/calender.vue'
import VoucherCenter from '../src/views/my/VoucherCenter.vue'
import Bill from '../src/views/my/Bill.vue'
import GroupSetting from '../src/views/GroupSetting.vue'
import OtherInfo from '../src/views/OtherInfo.vue'
import SchoolAuth from '../src/views/SchoolAuth.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      title: '首页'
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: false,
      title: '聊天'
    }
  },
  {
    path: '/friend',
    name: 'Friend',
    component: Friend,
    meta: {
      requiresAuth: false,
      title: '朋友圈'
    }
  },
  {
    path: '/groupChat',
    name: 'GroupChat',
    component: GroupChat,
    meta: {
      requiresAuth: false,
      title: '发起群聊'
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
    meta: {
      requiresAuth: false,
      title: '社区'
    }
  },
  {
    path: '/publicSphere/list',
    name: 'publicSphere',
    component: PublicSphereList,
    meta: {
      requiresAuth: false,
      title: '公域群'
    }
  },
  {
    path: '/publicSphere/nameHeader',
    name: 'nameHeader',
    component: NameHeader,
    meta: {
      requiresAuth: false,
      title: '名称和头像'
    }
  },
  {
    path: '/publicSphere/search',
    name: 'SearchSphere',
    component: SearchSphere,
    meta: {
      requiresAuth: false,
      title: '找人'
    }
  },
  {
    path: '/publicSphere/auth',
    name: 'publicSphereAuth',
    component: Auth,
    meta: {
      requiresAuth: false,
      title: '实名认证'
    }
  },
  {
    path: '/publicSphere/authorizationSet',
    name: 'authorizationSet',
    component: AuthorizationSet,
    meta: {
      requiresAuth: false,
      title: '实名认证'
    }
  },
  {
    path: '/publicSphere/scanFocus',
    name: 'scanFocus',
    component: ScanFocus,
    meta: {
      requiresAuth: false,
      title: '扫码关注'
    }
  },
  {
    path: '/help',
    name: 'help',
    component: Help,
    meta: {
      requiresAuth: false,
      title: '帮助和反馈'
    }
  },
  {
    path: '/allquestion',
    name: 'allquestion',
    component: AllQuestion,
    meta: {
      requiresAuth: false,
      title: '全部问题'
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: Feedback,
    meta: {
      requiresAuth: false,
      title: '意见反馈'
    }
  },
  {
    path: '/tipoff',
    name: 'tipoff',
    component: TipOff,
    meta: {
      requiresAuth: false,
      title: '举报身份'
    }
  },
  {
    path: '/tipOffUser',
    name: 'TipOffUser',
    component: TipOffUser,
    meta: {
      requiresAuth: false,
      title: '举报用户'
    }
  },
  {
    path: '/focusme',
    name: 'focusme',
    component: FocusMe,
    meta: {
      requiresAuth: false,
      title: '关注我'
    }
  },
  {
    path: '/posting',
    name: 'posting',
    component: Posting,
    meta: {
      requiresAuth: false,
      title: '发帖'
    }
  },
  {
    path: '/myPublish',
    name: 'myPublish',
    component: MyPublish,
    meta: {
      requiresAuth: false,
      title: '我的发布'
    }
  },
  {
    path: '/fans',
    name: 'Fans',
    component: Fans,
    meta: {
      requiresAuth: false,
      title: '我的粉丝'
    }
  },
  {
    path: '/know',
    name: 'know',
    component: Know,
    meta: {
      requiresAuth: false,
      title: '可能认识的人'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: My,
    meta: {
      requiresAuth: false,
      title: '我的'
    }
  },
  {
    path: '/my/calender',
    name: 'Calender',
    component: Calender,
    meta: {
      requiresAuth: false,
      title: '日历'
    }
  },
  {
    path: '/my/editUserInfo',
    name: 'EditUserInfo',
    component: EditUserInfo,
    meta: {
      requiresAuth: false,
      title: '编辑用户信息'
    }
  },
  {
    path: '/my/voucherCenter',
    name: 'VoucherCenter',
    component: VoucherCenter,
    meta: {
      requiresAuth: false,
      title: '充值'
    }
  },

  {
    path: '/my/bill',
    name: 'Bill',
    component: Bill,
    meta: {
      requiresAuth: false,
      title: '账单'
    }
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: UserInfo,
    meta: {
      requiresAuth: false,
      title: '用户信息'
    }
  },
  {
    path: '/otherInfo',
    name: 'OtherInfo',
    component: OtherInfo,
    meta: {
      requiresAuth: false,
      title: '他人信息'
    }
  },
  {
    path: '/groupSetting',
    name: 'GroupSetting',
    component: GroupSetting,
    meta: {
      requiresAuth: false,
      title: '群设置'
    }
  },
  {
    path: '/schoolAuth',
    name: 'SchoolAuth',
    component: SchoolAuth,
    meta: {
      requiresAuth: false,
      title: '学校认证'
    }
  },
  ...login, // 登录
  ...ChatComp // 聊天
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
