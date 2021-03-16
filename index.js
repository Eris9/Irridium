const { app, BrowserWindow, session } = require('electron') //ES5
const { platform, release } = require('os')

// app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:9050')

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
	
	// session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
	// 	callback({ 
	// 		responseHeaders: Object.assign({
	// 			"Content-Security-Policy": [ "default-src 'self'; script-src 'sha256-Jn5I+BB3vYJLolQ8WAbK5x/634RemOeC63UpaZP8poM='" ]
	// 		  }, details.responseHeaders)	
	// 	})
	// })

	mainWindow = new BrowserWindow({
		width: 1920, 
		height: 1000, 
		frame: false,
		webPreferences: { 
			nodeIntegration: true,
			webSecurity: true,
			webviewTag: true,
			enableRemoteModule: true
		}
	})

	mainWindow.loadFile("browser.html")

	// mainWindow.webContents.openDevTools()
	mainWindow.on('closed', function () {
		mainWindow = null
	})
})
