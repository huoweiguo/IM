// 封装Electron API相关操作
import { isElectron, BrowserWindow } from '@/platform.js';
import Config from '@/config';
import { getItem, setItem } from '@/qzui/util/storageHelper';

/**
 * 创建新窗口
 * @returns {Promise<Object>} 新创建的窗口对象
 */

const newWindow = (getItem('newWindow') && JSON.parse(getItem('newWindow') || '')) || {};

export async function createNewWindow(options, isCloseOld = true) {
    if (isElectron()) {
        let hash = window.location.hash;
        let url = window.location.origin;
        if (hash) {
            url = window.location.href.replace(hash, options.url);
        }
        const urlId = url.split('?')[0];

        if (isCloseOld) {
            closeNewWindow(urlId);
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
            newWindow[urlId] = await BrowserWindow.new(windowOptions);
            // 打开开发者工具调试
            // newWindow.webContents.openDevTools({ mode: 'detach' });
            setItem('newWindow', JSON.stringify(newWindow));
            return newWindow[urlId];
        } catch (error) {
            console.error('创建窗口失败:', error);
            return null;
        }
    } else {
        console.warn('Electron API 不可用，可能在浏览器环境中运行');
        return null;
    }
}

export function closeNewWindow(urlId) {
    if (newWindow[urlId]) {
        try {
            newWindow[urlId].close();
        } catch (error) {
            console.error('关闭窗口失败:', error);
        }
        delete newWindow[urlId];
        setItem('newWindow', JSON.stringify(newWindow));
    }
}
