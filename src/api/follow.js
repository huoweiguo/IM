import { GET, POST, DELETE } from './request.js';

// 新的粉丝通知列表
export function getFansNoticeList(userId) {
    return GET(`/follow/getFansNoticeList?userId=${userId}`);
}

// 获取社区列表下已关注的列表
export function followInCommunity(userId, communityId) {
    return GET(`/follow/getFollowInCommunity?userId=${userId}&communityId=${communityId}`);
}

// 添加关注用户列表
export function addFollowUserList(data) {
    return POST('/follow/addFollowUserList', data);
}

// 新的粉丝通知-删除全部
export function deleteAllFansNotice(userId) {
    return DELETE(`/follow/deleteAllFansNotice?userId=${userId}`);
}

// 新的粉丝通知-删除单条
export function deleteFansNotice(noticeId) {
    return DELETE(`/follow/deleteFansNotice?noticeId=${noticeId}`);
}

// 取消关注用户
export function deleteFollowUser(userId, targetId) {
    return DELETE(`/follow/deleteFollowUser?userId=${userId}&communityId=${targetId}`);
}

// 获取互关好友列表
export function getBothFollowUserList(userId) {
    return GET(`/follow/getBothFollowUserList?userId=${userId}`);
}

// 获取我的粉丝列表(关注我)
export function getFollowMeList(userId) {
    return GET(`/follow/getFollowMeList?userId=${userId}`);
}

// 获取我的关注列表
export function getMyFollowList(userId) {
    return GET(`/follow/getMyFollowList?userId=${userId}`);
}
