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

// 评论动态
export function interactionComment(data) {
    return POST(`/api/community/interaction/comment`, data);
}

// 获取动态互动记录
export function interactionList(page_size, start_time, data) {
    return POST(`/api/community/interaction/list?page_size=${page_size}&start_time=${start_time}`, data);
}

// 点赞
export function interactionLike(data) {
    return POST(`/api/community/interaction/like`, data);
}

// 标签分类信息详情
export function classifyDetail(id) {
    return GET(`/api/community/classify/detail/${id}`);
}

// 获取所有标签分类列表(测试问题list)
export function classifyList() {
    return GET(`/api/community/classify/list`);
}

// 获取一级父标签分类列表
export function classifyParentList() {
    return GET(`/api/community/classify/parentList`);
}

// 根据父id获取次级子标签分类列表
export function classifySonLists(parentId) {
    return GET(`/api/community/classify/sonLists/${parentId}`);
}

// 社区信息详情
export function communityDetail(id) {
    return GET(`/api/community/community/detail/${id}`);
}

// 获取所有社区信息列表
export function communityList() {
    return GET(`/api/community/community/list`);
}

// 用户加入社区
export function communityUserAdd(communityId) {
    return POST(`/api/community/communityUser/add`, { communityId });
}

// 用户选择问题分类加入对应社区(分类ID列表参数)(该分类下设置过社区的才会加入)
export function communityUserChooseClassifyList(data) {
    return POST(`/api/community/communityUser/chooseClassifyList`, data);
}

// 用户退出社区
export function communityUserDelete(data) {
    return POST(`/api/community/communityUser/delete`, data);
}

// 获取某社区下的所有用户信息列表
export function communityUserListByCommunityId(communityId) {
    return GET(`/api/community/communityUser/list/${communityId}`);
}

// 用户批量更换社区,退出之前的所有社区加入到新社区列表(社区ID列表参数)
export function communityUserUpdate(data) {
    return POST(`/api/community/communityUser/update`, data);
}
