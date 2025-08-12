'use strict';
const electron = require('electron');
const utils = require('@electron-toolkit/utils');
const path = require('path');
const axios = require('axios');
const icon = path.join(__dirname, '../../resources/icon.png');
const http = axios.create({
  timeout: 1e4,
  // 超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
http.interceptors.request.use(
  (config) => {
    if (electron.app.isPackaged) {
      config.baseURL = 'https://api.yourdomain.com';
    } else {
      config.baseURL = 'http://119.3.154.38:8803';
    }
    console.log(`[主进程请求] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (response) => {
    console.log(`[主进程响应] ${response.config.url}:`, response.status);
    return response.data;
  },
  (error) => {
    console.error('响应错误:', error.message);
    let errorMsg = '网络请求失败';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMsg = '身份验证失败，请重新登录';
          break;
        case 403:
          errorMsg = '没有访问权限';
          break;
        case 404:
          errorMsg = '请求的资源不存在';
          break;
        case 500:
          errorMsg = '服务器内部错误';
          break;
        default:
          errorMsg = `请求错误: ${error.response.status}`;
      }
    } else if (error.request) {
      errorMsg = '无法连接到服务器，请检查网络';
    }
    return Promise.reject(new Error(errorMsg));
  }
);
let newWindow = null;
let secondWindow = null;
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 910,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      // 配置preload脚本路径
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      // 必须开启上下文隔离
      nodeIntegration: false,
      // 禁用节点集成
      sandbox: false,
      devTools: false,
      // 确保开启开发者工具
    },
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: 'deny' };
  });
  if (utils.is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
  mainWindow.webContents.openDevTools({ mode: 'right' });
}
electron.ipcMain.on('open-new-window', (event, { width, height, url, title = '新窗口' }) => {
  if (!newWindow) {
    createNewWindow({ width, height, url, title });
  } else {
    newWindow.close();
    newWindow = null;
    createNewWindow({ width, height, url, title });
  }
});
electron.ipcMain.on('close-new-window', () => {
  if (newWindow) {
    newWindow.close();
    newWindow = null;
  }
});
electron.ipcMain.on('open-new-second-window', (event, { width, height, url, title = '新窗口' }) => {
  if (!secondWindow) {
    createNewSecondWindow({ width, height, url, title });
  } else {
    secondWindow.close();
    secondWindow = null;
    createNewSecondWindow({ width, height, url, title });
  }
});
electron.ipcMain.on('close-new-second-window', () => {
  if (secondWindow) {
    secondWindow.close();
    secondWindow = null;
  }
});
function createNewSecondWindow({ width, height, url, title }) {
  secondWindow = new electron.BrowserWindow({
    width: width || 550,
    height: height || 720,
    title,
    autoHideMenuBar: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });
  secondWindow.webContents.on('page-title-updated', (Event) => {
    Event.preventDefault();
  });
  secondWindow.loadURL(url);
  secondWindow.webContents.openDevTools({ mode: 'detach' });
  secondWindow.on('closed', () => {
    secondWindow = null;
  });
}
function createNewWindow({ width, height, url, title }) {
  newWindow = new electron.BrowserWindow({
    width: width || 550,
    height: height || 720,
    title,
    // 显示菜单栏
    autoHideMenuBar: true,
    // 允许窗口缩放
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });
  newWindow.webContents.on('page-title-updated', (Event) => {
    Event.preventDefault();
  });
  newWindow.loadURL(url);
  newWindow.webContents.openDevTools({ mode: 'detach' });
  newWindow.on('closed', () => {
    newWindow = null;
  });
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId('com.electron');
  createWindow();
  electron.ipcMain.on('ping', () => console.log('pong'));
  electron.ipcMain.handle('http:post', async (event, url, data) => {
    return await http.post(url, data);
  });
  electron.ipcMain.handle('http:get', async (event, url, data) => {
    return await http.get(url, { params: data });
  });
  electron.app.on('browser-window-created', (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.app.on('activate', function () {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});
