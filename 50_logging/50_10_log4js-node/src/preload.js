// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

function convErrorToString( error ) {
    if ( error instanceof Error ) {
        return JSON.stringify( { name: error.name, message: error.message, stack: error.stack } );
    } else {
        return JSON.stringify( error );
    }
}

window.onerror = ( message, source, lineno, colno, error ) => {
    if ( window.app && window.app.onError ) {
        window.app.onError( message, source, lineno, colno, error );
    }
    console.error( `message: ${message}, source: ${source}, lineno: ${lineno}, colno: ${colno}, error: ${error}` );
};

window.onunhandledrejection = ( event ) => {
    if ( window.app && window.app.onUnhandledRejection ) {
        window.app.onUnhandledRejection( event.reason );
    }
    console.error( `reason: ${event.reason}` );
};

try {
    const getLogger = (category) => {
        return {
            fatal: (...messages) => ipcRenderer.send('log', category, 'fatal', ...messages),
            error: (...messages) => ipcRenderer.send('log', category, 'error', ...messages),
            warn: (...messages) => ipcRenderer.send('log', category, 'warn', ...messages),
            info: (...messages) => ipcRenderer.send('log', category, 'info', ...messages),
            debug: (...messages) => ipcRenderer.send('log', category, 'debug', ...messages),
            trace: (...messages) => ipcRenderer.send('log', category, 'trace', ...messages)
        };
    };

    const logger = getLogger('preload');

    logger.trace("Entering cheese testing");
    logger.debug("Got cheese.");
    logger.info("Cheese is Comté.");
    logger.warn("Cheese is quite smelly.");
    logger.error("Cheese is too ripe!");
    logger.fatal("Cheese was breeding ground for listeria.");

    contextBridge.exposeInMainWorld('log4js', {
        getLogger: getLogger
    });

    contextBridge.exposeInMainWorld( "app", {
        onError: ( message, source, lineno, colno, error ) => {
            ipcRenderer.send( "onError", message, source, lineno, colno, convErrorToString( error ) );
        },

        onUnhandledRejection: ( reason ) => {
            ipcRenderer.send( "onUnhandledRejection", convErrorToString( reason ) );
        }
    } );
} catch ( e ) {
    console.error("Error in preload.js", e);
    throw e;
}
