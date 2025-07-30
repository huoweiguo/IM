import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
      islogin: false, // 是否登录
      token: '',
      userInfo: {} // 用户信息
    }
  },
  actions: {
    // 初始化本地数据的方法
    init() {
      let token = localStorage.getItem('token')
      this.islogin = !!token // 如果token存在，则设置islogin为true
      this.token = token || ''

      if (token) {
        this.token = token
      } else {
        this.logout()
      }
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')

      this.islogin = false
      this.token = ''
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.token = userInfo.token
      this.islogin = true
      // 将用户信息存储到本地
      localStorage.setItem('token', userInfo.token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }
})
