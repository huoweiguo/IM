// 平台相关代码，目前主要用来处理electron 和 浏览器之间不同

export function isElectron() {
    // 如果用 electron 加载网页端，本函数要强制返回 false；否则，环境会判断错误，导致无法正常加载网页端。
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

// pc
export const remote = null;
export const ipcRenderer = null;
export const ipcMain = null;
export const fs = null;
export const currentWindow = null;
export const BrowserWindow = null;
export const AppPath = null;
export const desktopCapturer = null;
export const shell = null;
export const screen = null;
export const app = null;
