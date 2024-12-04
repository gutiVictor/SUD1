// electron-main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Habilitar integración de Node.js en el contexto de renderización
      contextIsolation: false, // Deshabilitar el aislamiento de contexto
      enableRemoteModule: true, // Habilitar el módulo remoto (no recomendado)
      preload: path.join(__dirname, 'preload.js') // Cargar script de preload
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'build', 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
