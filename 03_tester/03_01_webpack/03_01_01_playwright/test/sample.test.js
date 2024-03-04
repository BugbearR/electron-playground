import { test, expect } from '@playwright/test';
import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers';
import { _electron } from 'playwright';
// See https://github.com/spaceagetv/electron-playwright-example/blob/main/e2e-tests/main.spec.ts

let electronApp;
let mainWindow;

test.beforeAll(async () => {
    console.log("beforeAll start");
    const latestBuild = findLatestBuild();
    const appInfo = parseElectronApp(latestBuild);

    // console.log({
    //     args: [appInfo.main],
    //     executablePath: appInfo.executable
    // });
    electronApp = await _electron.launch({
        args: [appInfo.main],
        executablePath: appInfo.executable
    });
    // console.log("launch ok");
    mainWindow = await electronApp.firstWindow();
    // console.log("got window");
    mainWindow.on('console', console.log);
    mainWindow.on('pageerror', console.error);
    await mainWindow.waitForLoadState("domcontentloaded");
    // await mainWindow.waitForLoadState("networkidle");
    // console.log("beforeAll end");
});

test.afterAll(async () => {
    await electronApp.close();
});

test("Page contains 'Hello, world!'", async () => {
    await expect(mainWindow.locator('text="Hello, world!"')).toBeVisible();
});

test("Take screenshot", async ({}, testInfo) => {
//    await mainWindow.screenshot({ path: `test-results/screenshot.png` });
//    const screenshotImg = await mainWindow.screenshot(testInfo.outputPath("screenshot.png"));
    const screenshotImg = await mainWindow.screenshot();
    await testInfo.attach("screenshot", { body: screenshotImg, contentType: "image/png" });
});
