// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { hello } from "./common_preload";
console.log(hello("main"));
console.log("main_preload.js loaded");
