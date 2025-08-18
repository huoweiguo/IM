import { GET, POST } from './request.js';

// ## 礼物规格配置信息管理
// Gift Config Controller
// 查询礼物规格配置详情
export function getGiftConfigDetail(data) {
    return GET('/api/gift/config/detail', data);
}

// 查询所有礼物规格配置记录
export function getGiftConfigList(data) {
    return GET('/api/gift/config/list', data);
}

// ## 用户送礼记录信息管理
// Gift Log Controller
// 根据礼物ID查询用户送礼记录详情
export function getGiftLogDetail(data) {
    return GET('/api/gift/log/detail', data);
}

// 当前登录用户送礼记录列表(type:0 送礼记录,1 收礼记录)
export function getGiftLogList(data) {
    return GET('/api/gift/log/list/userId', data);
}

// 用户赠送礼物
export function sendGift(data) {
    return POST('/api/gift/log/send', data);
}
