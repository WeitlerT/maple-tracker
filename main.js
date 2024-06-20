const { app, BrowserWindow } = require('electron');
const path = require('path');

require('electron-reload')(path.join(__dirname, 'index.html'), {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    // If you have other files or directories to watch, you can include them here
    // e.g., `{watch: [path.join(__dirname, 'another-directory')]}`
});

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') // Optional: For security reasons, add a preload script
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
