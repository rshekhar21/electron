const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');



function createWindow() {
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
}

app.on('ready', createWindow);

autoUpdater.on('update-available', () => {
    console.log('Update available.');
});

autoUpdater.on('error', (err) => {
    console.error('Error in auto-updater:', err);
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


