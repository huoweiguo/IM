"use strict";
const preload = require("@electron-toolkit/preload");
const events = require("events");
const electron = require("electron");
const api = {};
function getOS() {
  const platform = process.platform;
  if (platform === "win32") {
    return "Windows";
  } else if (platform === "darwin") {
    return "macOS";
  } else if (platform === "linux") {
    return "Linux";
  } else {
    return "Unknown";
  }
}
if (process.contextIsolated) {
  // 在主进程中执行
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
    electron.contextBridge.exposeInMainWorld("__dirname", __dirname);
    electron.contextBridge.exposeInMainWorld("createEventEmitter", () => new events.EventEmitter());
    electron.contextBridge.exposeInMainWorld("electronAPI", {
      platform: getOS(),
      post: (url, data) => electron.ipcRenderer.invoke("http:post", url, data),
      get: (url, data) => electron.ipcRenderer.invoke("http:get", url, data),
      onWindowDrag: (callback) => electron.ipcRenderer.on("window-drag", callback),
      // 通过 IPC 调用打开新窗口和关闭窗口的函数
      openNewWindow: ({ width, height, url, title }) => electron.ipcRenderer.send("open-new-window", { width, height, url, title }),
      openNewSecondWindow: ({ width, height, url, title }) => electron.ipcRenderer.send("open-new-second-window", { width, height, url, title }),
      closeNewWindow: () => electron.ipcRenderer.send("close-new-window"),
      closeNewSecondWindow: () => electron.ipcRenderer.send("close-new-second-window"),

    });
  } catch (error) {
    console.error(error);
  }
} else {
  // 在渲染进程中执行
  window.__dirname = __dirname;
  window.electron = preload.electronAPI;
  window.api = api;
  window.createEventEmitter = () => new events.EventEmitter();
  window.electronAPI = {
    platform: getOS(),
    post: (url, data) => electron.ipcRenderer.invoke("http:post", url, data),
    get: (url, data) => electron.ipcRenderer.invoke("http:get", url, data),
    onWindowDrag: (callback) => electron.ipcRenderer.on("window-drag", callback),
    openNewWindow: ({ width, height, url, title }) => electron.ipcRenderer.send("open-new-window", { width, height, url, title }),
    openNewSecondWindow: ({ width, height, url, title }) => electron.ipcRenderer.send("open-new-second-window", { width, height, url, title }),
    closeNewWindow: () => electron.ipcRenderer.send("close-new-window"),
    closeNewSecondWindow: () => electron.ipcRenderer.send("close-new-second-window")
  };
}
