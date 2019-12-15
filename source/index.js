const { app, BrowserWindow, session } =  require('electron')
const path = require ('path')

// app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:9050')

let window

require('electron-reload')('./*', {
	electron: './node_modules/.bin/electron',
	hardResetMethod: 'exit'
})

let createWindow = () => {

	let window = new BrowserWindow({
		width: 800,
		height: 600,
		title: 'Iridium'
	 })
	 
	window.maximize()
	
	window.loadURL(`file://${__dirname}/index.html`)

	// window.loadURL('https://duckduckgo.com')
	//window.webContents.openDevTools()

	window.on('close', () => {
		window = null
	})
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if(window === null) {
		createWindow()
	}
})

app.on('ready', () => createWindow())
