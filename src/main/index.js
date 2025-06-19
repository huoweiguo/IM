import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import path from 'path'

let newWindow = null
let secondWindow = null
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 910,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: true // 确保开启开发者工具
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // 打开主进程调试
  // mainWindow.webContents.openDevTools({ mode: 'detach' })
}

ipcMain.on('open-new-window', (event, { width, height, url, title = '新窗口' }) => {
  if (!newWindow) {
    createNewWindow({ width, height, url, title })
  } else {
    // 如果窗口已存在但最小化，则恢复
    // if (newWindow.isMinimized()) newWindow.restore()
    // newWindow.focus()
    // 先关闭旧窗口，再创建新窗口
    newWindow.close()
    newWindow = null
    createNewWindow({ width, height, url, title })
  }
})

ipcMain.on('close-new-window', () => {
  if (newWindow) {
    newWindow.close()
    newWindow = null
  }
})

ipcMain.on('open-new-second-window', (event, { width, height, url, title = '新窗口' }) => {
  if (!secondWindow) {
    createNewSecondWindow({ width, height, url, title })
  } else {
    // 如果窗口已存在但最小化，则恢复
    // if (newWindow.isMinimized()) newWindow.restore()
    // newWindow.focus()
    // 先关闭旧窗口，再创建新窗口
    secondWindow.close()
    secondWindow = null
    createNewSecondWindow({ width, height, url, title })
  }
})

ipcMain.on('close-new-second-window', () => {
  if (secondWindow) {
    secondWindow.close()
    secondWindow = null
  }
})

function createNewSecondWindow({ width, height, url, title }) {
  secondWindow = new BrowserWindow({
    width: width || 550,
    height: height || 720,
    title,
    autoHideMenuBar: true, // 隐藏菜单栏
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })
  secondWindow.webContents.on('page-title-updated', (Event) => {
    Event.preventDefault()
  })
  secondWindow.loadURL(url)
  secondWindow.on('closed', () => {
    secondWindow = null
  })
}

function createNewWindow({ width, height, url, title }) {
  newWindow = new BrowserWindow({
    width: width || 550,
    height: height || 720,
    title,
    autoHideMenuBar: true, // 隐藏菜单栏
    resizable: false,

    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })
  newWindow.webContents.on('page-title-updated', (Event) => {
    Event.preventDefault()
  })
  newWindow.loadURL(url)
  newWindow.on('closed', () => {
    newWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
