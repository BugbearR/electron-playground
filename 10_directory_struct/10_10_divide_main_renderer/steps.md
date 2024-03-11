# Steps

## Create main and renderer folders and move files to them.

```
mkdir -p src/main
mkdir -p src/renderer/main_window
mv src/main.js src/main/
mv srv/preload.js src/index.html src/index.css src/renderer.js src/renderer/main_window/
```

## Modify configuration files

forge.config.js
```
...
          entryPoints: [
            {
              html: './src/renderer/main_window/index.html',
              js: './src/renderer/main_window/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/renderer/main_window/preload.js',
              },
            },
          ],
...
```

webpack.main.config.js
```
...
  entry: './src/main/main.js',
...
```
