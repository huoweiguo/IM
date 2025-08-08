// electron renderer进程 和 main进程之间通信的事件定义
const IpcEventType = {
    // 显示会话消息历史页面
    showConversationMessageHistoryPage: 'show-conversation-message-history-page',
    // 显示消息历史页面
    showMessageHistoryPage: 'show-message-history-page',
    // 显示会话浮动页面
    showConversationFloatPage: 'show-conversation-float-page',
    // 下载文件
    DOWNLOAD_FILE: 'file-download',
    // 启用关闭窗口直接退出功能
    ENABLE_CLOSE_WINDOW_TO_EXIT: 'enable-close-window-to-exit',
    // 点击通知
    CLICK_NOTIFICATION: 'click-notification',
    // 更新徽章（角标）
    UPDATE_BADGE: 'update-badge',
    // 显示文件窗口
    SHOW_FILE_WINDOW: 'show-file-window',
    // 显示多媒体预览窗口
    SHOW_MULTIMEDIA_PREVIEW_WINDOW: 'show-multimedia-preview-window',
    // 登录
    LOGIN: 'login',
    // 登出
    LOGOUT: 'logout',
    // 调整登录窗口大小
    RESIZE_LOGIN_WINDOW: 'resizeLoginWindow',
    // 文件粘贴
    FILE_PASTE: 'file-paste',
    // 文件复制
    FILE_COPY: 'file-copy',
    // 开始截图
    START_SCREEN_SHOT: 'screenshots-start',
    // 打开H5应用窗口
    OPEN_H5_APP_WINDOW: 'open-h5-app-window',
    // 工作区新建标签页网页内容
    WORKSPACE_NEW_TAB_WEB_CONTENT: 'workspace-new-tab-web-content',
    // 工作区添加新标签页
    WORKSPACE_ADD_NEW_TAB: 'workspace-add-new-tab',
    // 显示复合消息窗口
    SHOW_COMPOSITE_MESSAGE_WINDOW: 'show-composite-message-window',
    // 是否暂停
    IS_SUSPEND: 'is-suspend',
    // 开始屏幕共享
    START_SCREEN_SHARE: 'start-screen-share',
    // 停止屏幕共享
    STOP_SCREEN_SHARE: 'stop-screen-share',
    // 获取源
    GET_SOURCE: 'get-source',
};

module.exports = IpcEventType;
