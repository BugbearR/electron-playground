/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

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
    console.log('👋 This message is being logged by "renderer.js", included via webpack');

    const logger = window.log4js.getLogger('renderer');

    logger.trace("Entering cheese testing");
    logger.debug("Got cheese.");
    logger.info("Cheese is Comté.");
    logger.warn("Cheese is quite smelly.");
    logger.error("Cheese is too ripe!");
    logger.fatal("Cheese was breeding ground for listeria.");

    // throw new Error("Oops!");

} catch ( e ) {
    console.error("Error in renderer.js", e);
    throw e;
}
