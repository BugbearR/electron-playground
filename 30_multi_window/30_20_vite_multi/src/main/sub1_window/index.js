import { BrowserWindow } from 'electron';
import path from 'node:path';

class Sub1Window {
    constructor() {
        this.window = null;
    }

    createWindow() {
        console.log("Sub1Window __dirname", __dirname);
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'sub1_preload.js'),
            }
        });

        if (SUB1_WINDOW_VITE_DEV_SERVER_URL) {
            this.window.loadURL(SUB1_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            this.window.loadFile(path.join(__dirname, `../renderer/${SUB1_WINDOW_VITE_NAME}/index.html`));
        }
        this.window.webContents.openDevTools();
    }

    getWindow() {
        return this.window;
    }
}

export default Sub1Window;
