import { GET, POST, } from './request.js'

// 聊天室信息管理

// 添加聊天室
export function addChatroom(data) {
  return POST('/api/community/chatroom/add', data)
}

// 添加聊天室成员（前端先调用野火SDK后，再调用此接口）
export function addChatroomMember(data) {
  return POST('/api/community/chatroom/add/member', data)
}

// 语聊房上麦（最多9人）
export function addChatroomConnection(data) {
  return POST('/api/community/chatroom/chat/connection/add', data)
}

// 根据语聊房ID查询上麦人员信息
export function queryChatroomConnection(data) {
  return POST('/api/community/chatroom/chat/connection/query', data)
}

// 语聊房下麦
export function removeChatroomConnection(data) {
  return POST('/api/community/chatroom/chat/connection/remove', data)
}

// 删除聊天室
export function deleteChatroom(data) {
  return POST('/api/community/chatroom/del', data)
}

// 移除聊天室成员（前端先调用野火SDK后，再调用此接口）
export function deleteChatroomMember(data) {
  return POST('/api/community/chatroom/del/member', data)
}

// 查询聊天室详情
export function getChatroomDetail(params) {
  return GET('/api/community/chatroom/detail', params)
}

// 修改聊天室
export function editChatroom(data) {
  return POST('/api/community/chatroom/edit', data)
}

// 修改聊天室成员角色（前端先调用野火SDK后，再调用此接口）
export function editChatroomMember(data) {
  return POST('/api/community/chatroom/edit/member', data)
}

// 查询所有聊天室列表（按创建时间）
export function getChatroomList(data) {
  return POST('/api/community/chatroom/list?page_size=100', data)
}

// 按在线人数查询所有聊天室列表
// page_no: 当前分页数, page_size: 每页条数, type: 类型(0-所有,1-聊天房,2-语聊房)
export function getChatroomOnlineList(params) {
  return GET('/api/community/chatroom/online/list', params)
}
