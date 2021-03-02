const { BrowserWindow, app } = require('electron')
const path = require('path')
const isDev = !app.isPackaged
const { ipcMain, Notification } = require('electron')

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Nyhed', body: message }).show()
})

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
