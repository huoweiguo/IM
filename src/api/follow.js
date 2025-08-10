import { GET, POST } from './request.js';

// 新的粉丝通知列表
export function getFansNoticeList(userId) {
    return GET(`/follow/getFansNoticeList?userId=${userId}`);
}

// 获取社区列表下已关注的列表
export function followInCommunity(userId, communityId) {
    return GET(`/follow/getFollowInCommunity?userId=${userId}&communityId=${communityId}`);
}
