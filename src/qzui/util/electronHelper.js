// 封装Electron API相关操作
import { isElectron, BrowserWindow } from '@/platform.js';
import Config from '@/config';

/**
 * 创建新窗口
 * @returns {Promise<Object>} 新创建的窗口对象
 */
let newWindow = null;
export async function createNewWindow(options, isCloseOld = true) {
    if (isCloseOld) {
        closeNewWindow();
    }
    if (isElectron()) {
        let hash = window.location.hash;
        let url = window.location.origin;
        if (hash) {
            url = window.location.href.replace(hash, options.url);
        }

        const windowOptions = {
            width: options.width || 375,
            height: options.height || 720,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            url: url,
            title: options.title || '圈子',
            resizable: false, // 禁止改变窗口大小
            fullscreenable: false, // 禁止全屏
        };
        try {
            newWindow = await BrowserWindow.new(windowOptions);
            // 打开开发者工具调试
            // newWindow.webContents.openDevTools({ mode: 'detach' });
            return newWindow;
        } catch (error) {
            console.error('创建窗口失败:', error);
            return null;
        }
    } else {
        console.warn('Electron API 不可用，可能在浏览器环境中运行');
        return null;
    }
}

export function closeNewWindow() {
    if (newWindow) {
        newWindow.close();
    }
}
