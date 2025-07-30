import { GET, POST, loginout } from './request.js'

// ## 登录管理
// 账号登录
export function loginAccount(data) {
  return POST('/api/login/account', data)
}

// 退出登录
export function logoutAccount(data) {
  loginout()
  return POST('/api/login/logout', data)
}

// 注册账号
export function registerAccount(data) {
  return POST('/api/login/register', data)
}

// 发送短信验证码
export function sendSmsCode(data) {
  return POST('/api/sms/sendCode', data)
}

// ## 用户管理
// 个人中心
export function getUserCenter(params) {
  return GET('/api/user/center', params)
}

// 修改密码
export function changePassword(data) {
  return POST('/api/user/changePassword', data)
}

// 忘记密码
export function forgotPassword(data) {
  return POST('/api/user/forgotPwd', data)
}

// 个人信息
export function getUserInfo(params) {
  return GET('/api/user/info', params)
}

// 重置密码
export function resetPassword(data) {
  return POST('/api/user/resetPassword', data)
}

// 编辑信息(按单个类型更改)
export function setUserInfo(data) {
  return POST('/api/user/setInfo', data)
}

// 根据用户ID查询他人信息
export function getUserById(params) {
  return GET('/api/user/userId', params)
}
