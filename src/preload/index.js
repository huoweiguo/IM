import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

contextBridge.exposeInMainWorld('electronAPI', {
  openNewWindow: ({ width, height, url, title }) =>
    ipcRenderer.send('open-new-window', { width, height, url, title }),
  openNewSecondWindow: ({ width, height, url, title }) =>
    ipcRenderer.send('open-new-second-window', { width, height, url, title }),
  closeNewWindow: () => ipcRenderer.send('close-new-window'),
  closeNewSecondWindow: () => ipcRenderer.send('close-new-second-window')
})
