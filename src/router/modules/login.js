import PasswordLogin from '../../qzui/views/PasswordLogin.vue'
import Forget from '../../qzui/views/Forget.vue'
import Register from '../../qzui/views/Register.vue'
import SelectSex from '../../qzui/views/SelectSex.vue'
import Nickname from '../../qzui/views/Nickname.vue'
import ActualName from '../../qzui/views/ActualName.vue'
import Question from '../../qzui/views/Question.vue'
import HabbyQuestion from '../../qzui/views/HabbyQuestion.vue'
import Login from '../../qzui/views/Login.vue'
import PhoneLogin from '../../qzui/views/PhoneLogin.vue'
export const login = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      title: '登录'
    }
  },
  {
    path: '/phoneLogin',
    name: 'PhoneLogin',
    component: PhoneLogin,
    meta: {
      requiresAuth: false,
      title: '手机号登录'
    }
  },
  {
    path: '/passwordLogin',
    name: 'PasswordLogin',
    component: PasswordLogin,
    meta: {
      requiresAuth: false,
      title: '密码登录'
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget,
    meta: {
      requiresAuth: false,
      title: '忘记密码'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false,
      title: '注册'
    }
  },
  {
    path: '/selectSex',
    name: 'selectSex',
    component: SelectSex,
    meta: {
      requiresAuth: false,
      title: '性别选择'
    }
  },
  {
    path: '/nickname',
    name: 'nickname',
    component: Nickname,
    meta: {
      requiresAuth: false,
      title: '昵称和头像'
    }
  },
  {
    path: '/actualName',
    name: 'actualName',
    component: ActualName,
    meta: {
      requiresAuth: false,
      title: '姓名和头像'
    }
  },
  {
    path: '/question',
    name: 'question',
    component: Question,
    meta: {
      requiresAuth: false,
      title: '问题选择'
    }
  },
  {
    path: '/habbyQuestion',
    name: 'habbyQuestion',
    component: HabbyQuestion,
    meta: {
      requiresAuth: false,
      title: '兴趣爱好问题选择'
    }
  }
]
