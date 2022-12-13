/*
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-12-12 12:13:55
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-13 10:34:00
 * @FilePath: \demo3\src\hooks\initHelloWorld.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post } from "@/api/demo"; //里面的axios 引用了就会引起重复加载http和这个文件
import { useMapStore } from "@/stores";
import { useCounterStore } from "@/stores/counter";
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
export let viewer: Cesium.Viewer;

export default function initHelloWorld() {
    // useMapStore
    // post
    const mapStore=useMapStore()
    const cesiumContainerRef = ref()
    const initCesium = () => {
        const store=useCounterStore()
        viewer = new Cesium.Viewer(cesiumContainerRef.value!, {
            timeline: false,
            fullscreenButton: false,
            shouldAnimate: true,
            geocoder: false,
            sceneModePicker: false,
            baseLayerPicker: false,
            homeButton: false,
            navigationHelpButton: false,
            selectionIndicator: false,
            //skyBox: false,
            infoBox: false,
            // 实现canvas缓存获得canvas图像内容
            contextOptions: {
                webgl: { preserveDrawingBuffer: true },
                requestWebGl2: true,
            },
        });
    }
    onMounted(() => {
        initCesium()
    })
    return {cesiumContainerRef}
}