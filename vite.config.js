import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   proxy: {
  //     // 使用 proxy 实例
  //     '/': {
  //       target: 'http://114.116.11.34:82',
  //       changeOrigin: true,
  //       configure: (proxy, options) => {
  //         // proxy 是 'http-proxy' 的实例
  //       }
  //     },
  //   },
  // },
})
