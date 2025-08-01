import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      os: '',
      islogin: false, // 是否登录
      token: '',
      userInfo: {} // 用户信息
    }
  },
  actions: {
    // 初始化本地数据的方法
    init() {
      let token = localStorage.getItem('token')
      this.token = token || ''

      if (token) {
        this.token = token
        this.islogin = true
        this.userInfo = localStorage.getItem('userInfo')
      } else {
        this.logout()
      }

      this.os = window.electronAPI.platform
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
