const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const log4js = require("log4js");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}


const log4jConfigure = {
    appenders: { out : { type: 'console' } },
    categories: {
        default: { appenders: ['out'], level: 'all' },
        main: { appenders: ['out'], level: 'all' },
        renderer: { appenders: ['out'], level: 'all' },
        preload: { appenders: ['out'], level: 'all' }
    }
}
const logCategories = Object.keys(log4jConfigure.categories);

log4js.configure(log4jConfigure);

const loggerMap = logCategories.reduce((acc, category) => {
    if (category === "default") {
        acc[category] = log4js.getLogger();
    } else {
        acc[category] = log4js.getLogger(category);
    }
    return acc;
}, {});

// const logger = log4js.getLogger();
// logger.level = "all";
const logger = loggerMap["main"];

process.on( "uncaughtException", ( error ) => {
    // eslint-disable-next-line no-console
    console.error( error );
    if ( error instanceof Error ) {
        logger.fatal(JSON.stringify( { name: error.name, message: error.message, stack: error.stack } ) );
    } else {
        logger.fatal(JSON.stringify( { name: error.name, message: error.message, stack: error.stack } ) );
    }
    // process.exit( 1 );
} );

process.on( "unhandledRejection", ( reason, promise ) => {
    // eslint-disable-next-line no-console
    console.error( reason );
    if ( reason instanceof Error ) {
        logger.fatal(JSON.stringify( { name: reason.name, message: reason.message, stack: reason.stack } ));
    } else {
        logger.fatal(JSON.stringify( { reason: reason } ));
    }
    // process.exit( 2 );
} );

ipcMain.on( "onError", ( message, source, lineno, colno, error ) => {
    // eslint-disable-next-line no-console
    console.error( `message: ${message}, source: ${source}, lineno: ${lineno}, colno: ${colno}, error: ${error}` );

    loggerMap["renderer"].fatal(JSON.stringify( { message: message, source: source, lineno: lineno, colno: colno,
        name: error.name, errmessage: error.message, stack: error.stack } ));
    // process.exit( 3 );
} );

ipcMain.on( "onUnhandledRejection", ( reason ) => {
    // eslint-disable-next-line no-console
    console.error( `reason: ${reason}` );
    if ( reason instanceof Error ) {
        loggerMap["renderer"].fatal(JSON.stringify( { name: reason.name, message: reason.message, stack: reason.stack } ));
    } else {
        loggerMap["renderer"].fatal(JSON.stringify( { reason: reason } ));
    }
    // process.exit( 4 );
} );



const createWindow = () => {
    logger.trace("Entering cheese testing");
    logger.debug("Got cheese.");
    logger.info("Cheese is Comté.");
    logger.warn("Cheese is quite smelly.");
    logger.error("Cheese is too ripe!");
    logger.fatal("Cheese was breeding ground for listeria.");

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

    ipcMain.on("log", (event, category, level, ...messages) => {
        // logger.debug("Received log message", category, level, messages);
        if (!category) {
            loggerMap["default"][level](...messages);
        } else {
            loggerMap[category][level](...messages);
        }
    });
};

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
