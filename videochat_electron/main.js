const {app, BrowserWindow, Menu, webFrame, ipcMain} = require('electron')
const path = require('path')


let windowApp

function createWindow () {
  windowApp = new BrowserWindow({width: 500, height: 890, frame: true, backgroundColor: '#fff', show: false, resizable: true, transparent: false, autoHideMenuBar: true, icon: path.join(__dirname, 'icon.ico')})

  let isShown = true

  windowApp.loadURL(`file://${__dirname}/sources/index.html`)

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
          { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function () { force_quit= true; app.exit() } }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { label: 'Hide', accelerator: 'CmdOrCtrl+H', click: () => { if (isShown) { windowApp.hide() } else { windowApp.show() } } },
        { label: 'Minimize', accelerator: 'CmdOrCtrl+M', click: () => { windowApp.minimize() } },
        { label: 'Fullscreen', accelerator: 'CmdOrCtrl+Enter', click: () => { windowApp.setFullScreen(windowApp.isFullScreen() ? false : true) } }
      ]
    }
  ]))


  windowApp.on('ready-to-show', function () {
    windowApp.show()
  })

  windowApp.on('hide', function () {
    isShown = false
  })

  windowApp.on('show', function () {
    isShown = true
  })

  windowApp.on('closed', function () {
    windowApp = null
    app.quit()
  })

  windowApp.webContents.openDevTools()

}

ipcMain.on('closing', (event) => {
  windowApp = null
  app.quit()
})

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (windowApp === null) {
    createWindow()
  }
})
