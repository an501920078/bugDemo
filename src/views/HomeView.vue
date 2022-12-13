<!--
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-12-12 12:11:09
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-12 12:20:09
 * @FilePath: \demo3\src\views\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import initHomeView from '@/hooks/initHomeView';
import TheWelcome from '../components/TheWelcome.vue'

const { viewer } = initHomeView()
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
