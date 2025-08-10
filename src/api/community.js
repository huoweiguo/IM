import { GET, POST } from './request.js';
// 获取某用户的所有社区信息列表
export function communityUserList(userId) {
    return GET(`/api/community/communityUser/list/userId?userId=${userId}`);
}

// 根据当前用户Id和社区Id查询所有动态
export function dynamicList(page_size, start_time, data) {
    return POST(`/api/community/dynamic/list?page_size=${page_size}&start_time=${start_time}`, data);
}

// 发布帖子
export function publishDynamic(data) {
    return POST(`/api/community/dynamic/save`, data);
}

// 根据当前用户查询所有动态
export function dynamicListByUserId(page_size, start_time) {
    return GET(`/api/community/dynamic/list/userId?page_size=${page_size}&start_time=${start_time}`);
}
