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
import postcsspxtoviewport from 'postcss-px-to-viewport'

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
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度，如果你的设计稿是375就改成375
          unitPrecision: 3, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  }
})
