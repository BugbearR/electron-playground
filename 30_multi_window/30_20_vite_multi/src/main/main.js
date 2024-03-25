import { app, BrowserWindow } from 'electron';
// import path from 'node:path';

import MainWindow from './main_window';
import Sub1Window from './sub1_window';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow = null;
let sub1Window = null;

const createWindow = () => {
    mainWindow = new MainWindow();
    sub1Window = new Sub1Window();
    mainWindow.createWindow();
    sub1Window.createWindow();
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   });

//   const sub1Window = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'sub1_preload.js'),
//     },
//   });

//   // and load the index.html of the app.
//   if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
//     mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
//   } else {
//     mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
//   }

//   if (SUB1_WINDOW_VITE_DEV_SERVER_URL) {
//     sub1Window.loadURL(SUB1_WINDOW_VITE_DEV_SERVER_URL);
//   } else {
//     sub1Window.loadFile(path.join(__dirname, `../renderer/${SUB1_WINDOW_VITE_NAME}/index.html`));
//   }

  // Open the DevTools.
//   mainWindow.webContents.openDevTools();
//   sub1Window.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
