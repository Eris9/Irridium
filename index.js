const { app, BrowserWindow, session } = require('electron')
app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:9050')
var mainWindow = null

app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit()
	}
})

app.on('ready', function () {

	session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
	
		details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Iridium/1.0.0' 
	
		callback({
			cancel: false,
			requestHeaders: details.requestHeaders
		})

	})
	
	mainWindow = new BrowserWindow({
		width: 1030, 
		height: 720, 
		frame: false, 
		webPreferences: { 
			nodeIntegration: true,
			webSecurity: true,
			webviewTag: true
		}
	})
	mainWindow.loadURL('file://' + require('path').join(__dirname, 'browser.html'))
	mainWindow.webContents.openDevTools()
	mainWindow.on('closed', function () {
		mainWindow = null
	})
})

