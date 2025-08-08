import { GET, POST } from './request.js';

// 新的粉丝通知列表
export function getFansNoticeList(userId) {
    return GET(`/follow/getFansNoticeList?userId=${userId}`);
}
