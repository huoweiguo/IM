import axios from 'axios'
import { app } from 'electron'

// 创建axios实例
const http = axios.create({
  timeout: 10000, // 超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可以在这里添加全局请求头，如token
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // 根据环境设置基础URL
    if (app.isPackaged) {
      // 生产环境API地址
      config.baseURL = 'https://api.yourdomain.com'
    } else {
      // 开发环境API地址
      config.baseURL = 'http://119.3.154.38:8803'
    }

    console.log(`[主进程请求] ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    console.log(`[主进程响应] ${response.config.url}:`, response.status)
    // 可以根据后端约定统一处理响应数据
    return response.data
  },
  (error) => {
    console.error('响应错误:', error.message)

    // 统一错误处理
    let errorMsg = '网络请求失败'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMsg = '身份验证失败，请重新登录'
          // 可以在这里触发重新登录逻辑
          break
        case 403:
          errorMsg = '没有访问权限'
          break
        case 404:
          errorMsg = '请求的资源不存在'
          break
        case 500:
          errorMsg = '服务器内部错误'
          break
        default:
          errorMsg = `请求错误: ${error.response.status}`
      }
    } else if (error.request) {
      errorMsg = '无法连接到服务器，请检查网络'
    }

    return Promise.reject(new Error(errorMsg))
  }
)

export default http
