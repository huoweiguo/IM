import { electronAPI } from '@electron-toolkit/preload'
import { EventEmitter } from 'events'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {}

function getOS() {
  const platform = process.platform
  if (platform === 'win32') {
    return 'Windows'
  } else if (platform === 'darwin') {
    return 'macOS'
  } else if (platform === 'linux') {
    return 'Linux'
  } else {
    return 'Unknown'
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // 在隔离模式下通过 contextBridge 暴露 EventEmitter
    contextBridge.exposeInMainWorld('createEventEmitter', () => new EventEmitter())
    contextBridge.exposeInMainWorld('electronAPI', {
      platform: getOS(),
      post: (url, data) => ipcRenderer.invoke('http:post', url, data),
      get: (url, data) => ipcRenderer.invoke('http:get', url, data),
      // 通过 IPC 调用打开新窗口和关闭窗口的函数
      openNewWindow: ({ width, height, url, title }) =>
        ipcRenderer.send('open-new-window', { width, height, url, title }),
      openNewSecondWindow: ({ width, height, url, title }) =>
        ipcRenderer.send('open-new-second-window', { width, height, url, title }),
      closeNewWindow: () => ipcRenderer.send('close-new-window'),
      closeNewSecondWindow: () => ipcRenderer.send('close-new-second-window')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  // 在非隔离模式下直接设置到 window 对象
  window.createEventEmitter = () => new EventEmitter()
  window.electronAPI = {
    platform: getOS(),
    post: (url, data) => ipcRenderer.invoke('http:post', url, data),
    get: (url, data) => ipcRenderer.invoke('http:get', url, data),
    openNewWindow: ({ width, height, url, title }) =>
      ipcRenderer.send('open-new-window', { width, height, url, title }),
    openNewSecondWindow: ({ width, height, url, title }) =>
      ipcRenderer.send('open-new-second-window', { width, height, url, title }),
    closeNewWindow: () => ipcRenderer.send('close-new-window'),
    closeNewSecondWindow: () => ipcRenderer.send('close-new-second-window')
  }
}
