import { defineStore } from 'pinia'
import wfc from '../wfc/client/wfc'

export const useStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      os: '',
      islogin: false, // 是否登录
      token: '',
      userInfo: {}, // 用户信息
      wfc_userid: '',
      wfc_token: ''
    }
  },
  actions: {
    // 初始化本地数据的方法
    init() {
      this.os = window.electronAPI.platform
      this.token = localStorage.getItem('token') || ''
      this.wfc_userid = localStorage.getItem('wfc_userid') || ''
      this.wfc_token = localStorage.getItem('wfc_token') || ''
      this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}

      if (this.token) {
        this.islogin = true
        // 连接wfc
        this.wfcInit()
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
      this.wfc_userid = userInfo.serviceId
      this.wfc_token = userInfo.serviceToken
      this.islogin = true

      // 将用户信息存储到本地
      localStorage.setItem('token', userInfo.token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      // this.wfc_userid = 'udg1mws2k'
      // this.wfc_token =
      //   '7sl6XOnlDRI+xzaIfl59vJ7vg6OnAabrcmw+JcHiu48kqDEHWGkv0/MvuuX08huLJEtr1d1Az1yGR0oreZCdFePS4T+y29agY01oF7I9wppBuPYNU4onGlroflnvmg8bV5Su7HXaVrumL3+fqSPhBS6id9W7Qgr9mu4nuETo7Bs='
      localStorage.setItem('wfc_userid', this.userInfo.serviceId)
      localStorage.setItem('wfc_token', this.userInfo.serviceToken)

      // 连接wfc
      this.wfcInit()
    },
    wfcInit() {
      // 连接 WebSocket
      // const firstTimeConnect = wfc.connect(res.data.id, res.data.token)
      const firstTimeConnect = wfc.connect(this.wfc_userid, this.wfc_token)
      console.log('WebSocket 连接状态:', this.wfc_userid, this.wfc_token, firstTimeConnect)
      const conversationList = wfc.getConversationList([0, 1, 2, 3], [0, 1])
      console.log('会话列表:', conversationList)
    }
  }
})
