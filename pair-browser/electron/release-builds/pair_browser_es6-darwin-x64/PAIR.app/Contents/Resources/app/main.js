const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1130, height: 810 });
  mainWindow.loadURL('file://' + __dirname + '/render/browser.html');
  // mainWindow.openDevTools();
});
