<!--
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-12-12 12:11:09
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-12 14:06:18
 * @FilePath: \demo3\src\components\HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import initHelloWorld from '@/hooks/initHelloWorld';
const { cesiumContainerRef } = initHelloWorld()
</script>

<template>
  <div class="greetings" ref="cesiumContainerRef">

  </div>
</template>

<style scoped>
.greetings {
  height: 500px;
  width: 500px;
}
</style>
