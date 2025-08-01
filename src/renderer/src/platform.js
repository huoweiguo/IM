// 平台相关代码，目前主要用来处理electron 和 浏览器之间不同

import electrons from 'electron'

export function isElectron() {
  // Renderer process
  if (
    typeof window !== 'undefined' &&
    typeof window.process === 'object' &&
    window.process.type === 'renderer'
  ) {
    return true
  }

  // Main process
  if (
    typeof process !== 'undefined' &&
    typeof process.versions === 'object' &&
    !!process.versions.electron
  ) {
    return true
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  ) {
    return true
  }

  return false
}

// pc - Electron APIs
export const ipcRenderer = isElectron() ? electrons.ipcRenderer : window.electron?.ipcRenderer
export const shell = isElectron() ? electrons.shell : window.electron?.shell
export const fs = require('file-system').fs

export const remote = isElectron() ? electrons.remote : window.electron?.remote

export const currentWindow = remote.getCurrentWindow()
export const BrowserWindow = {
  new: async (windowOptions) => {
    // ipcRenderer.sendSync('browser-window', 'new', options),
    console.log('create-voip-window', windowOptions)
    let windowId = await ipcRenderer.invoke('create-voip-window', windowOptions)
    return remote.window(windowId)
  },
  getAllWindows: () => ipcRenderer.invoke('browser-window', 'getAllWindows'),
  fromWebContents: () => null // This can be implemented if needed with IPC
}
export const AppPath = ipcRenderer.sendSync('get-app-path')
export const app = {
  getPath: (name) => ipcRenderer.sendSync('app-get-path', name),
  getAppPath: () => AppPath,
  exit: (code) => ipcRenderer.send('app-exit', code),
  setAppUserModelId: (id) => ipcRenderer.send('app-set-user-model-id', id)
}
export const screen = {
  getPrimaryDisplay: () => ipcRenderer.sendSync('screen-sync', 'getPrimaryDisplay'),
  getAllDisplays: () => ipcRenderer.sendSync('screen-sync', 'getAllDisplays'),
  getDisplayNearestPoint: (point) =>
    ipcRenderer.sendSync('screen-sync', 'getDisplayNearestPoint', point),
  getDisplayMatching: (rect) => ipcRenderer.sendSync('screen-sync', 'getDisplayMatching', rect),
  getCursorScreenPoint: () => ipcRenderer.sendSync('screen-sync', 'getCursorScreenPoint')
}
