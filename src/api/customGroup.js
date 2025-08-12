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
