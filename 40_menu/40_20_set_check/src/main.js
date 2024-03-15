const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

function getSubMenuItem(subMenuItems, id) {
    if (!subMenuItems) {
        return null;
    }

    for (let i = 0; i < subMenuItems.length; i++) {
        const subMenuItem = subMenuItems[i];
        if (subMenuItem.id === id) {
            return subMenuItem;
        }
        const found = getSubMenuItem(subMenuItem.submenu.items, id);
        if (found) {
            return found;
        }
    }
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.once("ready-to-show", () => {
        const isMac = process.platform === "darwin";

        const menuTemplate = [
            {
                label: "MyMenu",
                submenu: [
                    {
                        label: "Checkable Item",
                        id: "checkable",
                        type: "checkbox",
                        checked: true,
                        click: (menuItem) => {
                            console.log(menuItem);
                            console.log(menuItem.checked);
                        }
                    },
                    {
                        label: "Check on",
                        click: () => {
                            const menu = Menu.getApplicationMenu();
                            // console.log(menu);
                            // console.log(menu.items[0].submenu);
                            getSubMenuItem(menu.items, "checkable").checked = true;
                        }
                    },
                    {
                        label: "Check off",
                        click: () => {
                            const menu = Menu.getApplicationMenu();
                            // console.log(menu);
                            // console.log(menu.items[0].submenu);
                            getSubMenuItem(menu.items, "checkable").checked = false;
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(menuTemplate);
        Menu.setApplicationMenu(menu);
    });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
