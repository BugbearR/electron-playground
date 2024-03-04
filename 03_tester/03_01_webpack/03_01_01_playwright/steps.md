# Steps

## Install Playwright

Install Playwright to the project.
```
$ cd your-project-dir
$ yarn create playwright
✔ Do you want to use TypeScript or JavaScript? · JavaScript
✔ Where to put your end-to-end tests? · test
✔ Add a GitHub Actions workflow? (y/N) · false
✔ Install Playwright browsers (can be done manually via 'yarn playwright install')? (Y/n) · false
✔ Install Playwright operating system dependencies (requires sudo / root - can be done manually via 'sudo yarn playwright install-deps')? (y/N) · false
```

## Install electron-playwright-helpers

```
yarn add -D electron-playwright-helpers
```

## Configure for Playwright

Comment out config of web browsers.  
playwright.config.js
```
  /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
...
//   ],
```

Add timeout setting.  
playwright.config.js
```
  timeout: 5 * 60 * 1000,
  expect: {
    timeout: 10 * 1000
  }
```

## Add sample-test for electron

test/sample.spec.js
