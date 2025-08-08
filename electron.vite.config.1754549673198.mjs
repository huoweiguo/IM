// electron.vite.config.mjs
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "out/preload/",
      // 修改这里从 'dist/preload/' 到 'out/preload/'
      // 确保预加载脚本正确打包
      rollupOptions: {
        input: "src/preload/index.js"
      },
      // 允许CommonJS模块
      commonjsOptions: {
        include: [/wfc/, /node_modules/]
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@wfc": resolve("src/renderer/src/wfc")
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()]
      }),
      Components({
        resolvers: [VantResolver()]
      })
    ]
  }
});
export {
  electron_vite_config_default as default
};
