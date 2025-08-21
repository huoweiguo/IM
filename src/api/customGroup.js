import { GET, POST, DELETE } from './request.js';

// 用户自定义人群分组管理
// Custom Person Group Controller

// 添加人员至自定义分组中
export function addPersonInCustomGroup(data) {
    return POST('/customPersonGroup/addPersonInCustomGroup', data);
}

// 新建自定义人群分组
export function createCustomPersonGroup(data) {
    return POST('/customPersonGroup/createCustomPersonGroup', data);
}

// 删除自定义群分组
export function deleteCustomPersonGroup(data) {
    return DELETE('/customPersonGroup/deleteCustomPersonGroup', data);
}

// 获取自定义人群分组
export function getCustomPersonGroupList(data) {
    return GET('/customPersonGroup/getCustomPersonGroupList', data);
}

// 用户自定义聊天分组管理
// Custom Chat Group Controller

// 添加群至自定义分组中
export function addChatInCustomGroup(data) {
    return POST('/customChatGroup/addChatInCustomGroup', data);
}

// 新建自定义群分组
export function createCustomChatGroup(data) {
    return POST('/customChatGroup/createCustomChatGroup', data);
}

// 删除自定义群分组
export function deleteCustomChatGroup(data) {
    return DELETE('/customChatGroup/deleteCustomChatGroup', data);
}

// 获取自定义群分组中群列表(只下发群id和野火群id关联关系)
export function getChatInCustomGroup(data) {
    return GET('/customChatGroup/getChatInCustomGroup', data);
}

// 获取自定义群分组
export function getCustomChatGroupList(data) {
    return GET('/customChatGroup/getCustomChatGroupList', data);
}

// 群聊信息管理
// Group Chat Controller

// 添加群聊信息(已同步野火)
export function addGroupInfo(data) {
    return POST('/api/community/group/add', data);
}

// 添加群聊成员(前端先调用野火SDK后,调用)
export function addGroupMember(data) {
    return POST('/api/community/group/addMember', data);
}

// 删除群聊信息(已同步野火)
export function deleteGroupInfo(data) {
    return POST('/api/community/group/del', data);
}

// 查询群聊信息详情
export function getGroupDetail(id) {
    return GET(`/api/community/group/detail?id=${id}`);
}

// 根据野火群聊ID查询群聊信息详情
export function getGroupDetailByServiceGroupId(serviceGroupId) {
    return GET(`/api/community/group/detail/serviceGroupId?serviceGroupId=${serviceGroupId}`);
}

// 修改群聊信息(已同步野火)
export function editGroupInfo(data) {
    return POST('/api/community/group/edit', data);
}

// 修改群聊成员角色(前端先调用野火SDK后,调用)
export function editGroupMemberRole(data) {
    return POST('/api/community/group/editMember', data);
}

// 查询所有群聊信息列表
export function getGroupList(data) {
    return POST('/api/community/group/list?page_size=100', data);
}

// 查询群聊的所有成员列表
export function getGroupMembers(data) {
    return GET('/api/community/group/members', data);
}

// 移除群聊成员(前端先调用野火SDK后,调用)
export function removeGroupMember(data) {
    return POST('/api/community/group/removeMember', data);
}

// 用户修改所关联群的设置
export function updateGroupMemberSetting(data) {
    return POST('/api/community/group/updateMemberSetting', data);
}
