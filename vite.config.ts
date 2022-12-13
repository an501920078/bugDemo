/*
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-12-12 12:11:09
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-12 12:12:41
 * @FilePath: \demo3\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cesium from "vite-plugin-cesium";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), cesium(),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
