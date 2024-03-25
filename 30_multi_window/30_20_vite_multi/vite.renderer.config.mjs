import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config.mjs';
import path from 'node:path';

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'renderer'>} */
  const forgeEnv = env;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  /** @type {import('vite').UserConfig} */
  // console.log("vite.renderer.config.mjs", name, root, mode, forgeConfigSelf);
  return {
    root: path.resolve(root, "src", "renderer", name),
    mode,
    base: './',
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, `src/renderer/${name}/index.html`),
            }
        },
      outDir: path.resolve(root, `.vite/renderer/${name}`),
    },
    plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  };
});
