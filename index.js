const { app, BrowserWindow } = require('electron')
app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:9050')
var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 1030, height: 720, frame: false, webPreferences: { nodeIntegration: true, webSecurity: true, webviewTag: true } })
  mainWindow.loadURL('file://' + require('path').join(__dirname, 'browser.html'))
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
