const { app, BrowserWindow } = require('electron');
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

const path = require('path');
const url = require('url');

const config = require('./config');
let port = process.env.PORT || config.dev.port;

let _mainWindow;

let _createWindow = () => {
  _mainWindow = new BrowserWindow({ width: 1000, height: 600 });

  installExtension(VUEJS_DEVTOOLS).then(() => {
    _mainWindow.loadURL(url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: 8080,
    }));

    _mainWindow.webContents.openDevTools();
    _mainWindow.maximize();
  });

  // _mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));

  _mainWindow.on('closed', () => {
    _mainWindow = null;
  })
}

app.on('ready', () => _createWindow());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (_mainWindow === null) {
    _createWindow();
  }
})
