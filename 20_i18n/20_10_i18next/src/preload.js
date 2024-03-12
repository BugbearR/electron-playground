// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require( "electron" );
// const backend = require("i18next-electron-fs-backend");

// function init() {
//     console.log("in preload.js. i18next.t('ns1:key1'):", i18next.t('ns1:key1'));
//     console.log("in preload.js. i18next.t('ns2:key1'):", i18next.t('ns2:key1'));
// }

// console.log( "process.resourcesPath:", process.resourcesPath );

// contextBridge.exposeInMainWorld(
//     "api1", {
//         i18nextElectronBackend: backend.preloadBindings(ipcRenderer, process),
//     }
// )

// i18next
//     .use(Backend)
//     .init({
//         backend: {
//             loadPath: `${__dirname}/../locales/{{lng}}/{{ns}}.json`
//         },
//         namespace: [ "ns1", "ns2" ],
//         fallbackLng: "en",
//     }, init );

// contextBridge.exposeInMainWorld( "i18next", i18next );
