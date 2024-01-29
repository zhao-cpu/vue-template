import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import removeConsole from 'vite-plugin-remove-console'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      /* options */
      // dts: true
      dts: './src/types/components.d.ts',
      resolvers: [
        IconsResolver({
          customCollections: ['svg']
        })
      ]
    }),
    AutoImport({
      /* options */
      dts: './src/types/auto-imports.d.ts',
      // dts: true, //启用此选项 options.dts 可 auto-imports.d.ts 自动生成文件 ,确保 auto-imports.d.ts 未排除在 tsconfig.json
      imports: [
        // presets 预设
        'vue',
        'vue-router',
        // custom 自定义一些其他
        {
          axios: [
            // default imports
            ['default', 'axios'] // import { default as axios } from 'axios',
          ]
        }
      ],
      // composables
      dirs: ['./src/composables/**', './src/api/**']
    }),
    UnoCSS(),
    removeConsole(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        svg: FileSystemIconLoader('./src/assets/svg-icon')
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false,
    strictPort: false,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
