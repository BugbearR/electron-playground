import { BrowserWindow } from 'electron';
import path from 'node:path';

class MainWindow {
    constructor() {
        this.window = null;
    }

    createWindow() {
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'main_preload.js'),
            }
        });

        // and load the index.html of the app.
        console.log("MainWindow __dirname", __dirname);
        console.log("MAIN_WINDOW_VITE_DEV_SERVER_URL", MAIN_WINDOW_VITE_DEV_SERVER_URL);
        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            this.window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            this.window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
        }
        this.window.webContents.openDevTools();
    }

    getWindow() {
        return this.window;
    }
}

export default MainWindow;
