/*
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-12-12 12:17:48
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-13 10:34:05
 * @FilePath: \demo3\src\hooks\initHomeView.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { nextTick, onMounted } from "vue";
import { viewer } from "./initHelloWorld";

export default function initHomeView() {
    onMounted(async () => {
        await nextTick()
        
        
        
       //热更新后就取不到值了 
        console.log(viewer)
    })
    return { viewer }
}