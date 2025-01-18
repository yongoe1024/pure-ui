import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // svg插件
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]'
    }),
    // 组件重新命名插件
    VueSetupExtend(),
    // 自动导入插件
    AutoImport({
      eslintrc: {
        enabled: false
      },
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-import.d.ts',
      dirs: ['src/store/modules']
    }),
    // 组件自动注册插件
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      // ui库解析器，也可以自定义
      resolvers: [AntDesignVueResolver({ importStyle: false })]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `@use "@/styles/variable.scss" as *;`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
