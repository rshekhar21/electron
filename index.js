const { app, BrowserWindow, dialog, ipcMain, shell, powerMonitor } = require('electron');
const { autoUpdater } = require('electron-updater');
const electronReload = require('electron-reload')(__dirname);
const sqlite = require("sqlite-electron");

const lock = app.requestSingleInstanceLock(); console.log(lock);
if(!lock) {
    app.quit();
    return
};

const path = require('path');
const log = require('electron-log');
const { createMenu } = require('./menu');

console.log(__dirname);
log.transports.file.resolvePathFn = () => path.join('C:/Users/RAJ/test-projects/electorn-app', 'logs/main.log');

// electronReload(__dirname);
function createWindow() {
    
    createMenu();
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js')
        }
    });
    mainWindow.loadFile('src/index.html');

    // Check for updates
    autoUpdater.checkForUpdatesAndNotify();
    log.info('started');
    log.info('App Verein ' + app.getVersion());
}

app.on('ready', createWindow);

autoUpdater.on('checking-for-update', () => {
    log.info('checking-for-updates...');
})

autoUpdater.on('update-not-available', () => {
    log.info('no updates avaliable');
})

autoUpdater.on('update-available', () => {
    log.info('Update available.');
});

autoUpdater.on('download-progress', (progressObj) => {
    log.info('downloaded ' + Math.round(progressObj.percent) + '%');
    log.info('Total ' + progressObj.transferred + '/' + progressObj.total)
})

autoUpdater.on('error', (err) => {
    log.info('Error in auto-updater:', err);
});


autoUpdater.on('update-downloaded', () => {
    // Prompt user to install the update
    const choice = dialog.showMessageBoxSync({
        type: 'info',
        buttons: ['Update and Restart', 'Later'],
        title: 'Update Available',
        message: 'A new version is available. Would you like to update now?'
    });

    if (choice === 0) {
        autoUpdater.quitAndInstall();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


ipcMain.handle('test', (e) => {
    // console.log(e);
    return 'tst ok';
})

