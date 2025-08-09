// 封装Electron API相关操作
import { isElectron, BrowserWindow } from '@/platform.js';
import Config from '@/config';

/**
 * 创建新窗口
 * @returns {Promise<Object>} 新创建的窗口对象
 */
export async function createNewWindow(options) {
    if (isElectron()) {
        let hash = window.location.hash;
        let url = window.location.origin;
        if (hash) {
            url = window.location.href.replace(hash, options.url);
        }

        const windowOptions = {
            width: options.width || 800,
            height: options.height || 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            url: url,
            frame: true, // 确保显示窗口边框
        };
        try {
            const newWindow = await BrowserWindow.new(windowOptions);
            // 移除菜单
            newWindow.removeMenu();
            // 额外为Windows平台设置，防止菜单显示
            if (Config.getWFCPlatform() === 3) {
                newWindow.setMenu(null);
            }
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
