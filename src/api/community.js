import { GET, POST } from './request.js';
// 获取某用户的所有社区信息列表
export function communityUserList(userId) {
    return GET(`/api/community/communityUser/list/userId?userId=${userId}`);
}
