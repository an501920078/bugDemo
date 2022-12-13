/*
 * @Author: 刘杰强
 * @LastEditors: liujieqiang 501920078@qq.com
 * @Date: 2021-10-08 09:12:16
 * @LastEditTime: 2022-12-09 10:23:00
 * @FilePath: \ts_vue3_base_gis\src\config\cesiumSetting.ts
 * @Description: cesium配置文件
 */
import { GeoserverForLayers } from "@/modules/gis/api/OTHER/Geoserver";
import { GetLayersForUser } from "@/api/USER/BaseLayer";
import { useMapStore, useSettingsStore } from "@/pinia";
import { ElMessage } from "element-plus";
import type { Ref } from "vue";
import { onViewerMounted } from "@/modules/gis/cesium/initCesiumPage";
import * as Cesium from "cesium";
export default function initCesiumSetting() {
  //图层初始化方法
  function initSelectLayers(CesiumLoading: Ref<boolean>) {
    const mapStore = useMapStore();
    const selectedLayers = async () => {
      //请求图层和geoserver图层
      const [layersRes, geoLayers] = await Promise.allSettled([GetLayersForUser(), GeoserverForLayers()]);
      //确保接口请求正确，不管geo是否请求到
      if (layersRes.status === "fulfilled" && layersRes.value.data) {
        initSelectedLayer(layersRes.value.data, geoLayers.status === 'fulfilled' ? geoLayers.value.data.layers.layer : undefined); //初始化已选择图层
      } else {
        CesiumLoading.value = false;
        ElMessage({
          message: "初始化图层失败，请刷新后重试",
          type: "warning",
        });
      }
    };

    const initSelectedLayer = (data: { Name: string; Alias: string; }[], geoLayer?: { name: string }[]) => {
      const geoLayerNameArr = geoLayer && geoLayer.map(item => item.name);
      const layers = data.map((item) => {
        //将已发布的图层标记
        const release = geoLayerNameArr ? geoLayerNameArr.includes(item.Name) : true;
        return {
          select: true,
          style: "default",
          layername: item.Name,
          Alias: item.Alias,
          release,
        }
      })
      // 这里很重要，因为走到这里证明Cesium已经初始化完成，其他页面可通过监听selectedLayers的改变去初始化页面
      mapStore.changeSelectedLayers(layers);
      CesiumLoading.value = false;
    };
    selectedLayers();
  }



  /**
 * 城市建筑模型偏移
 */
  const cityOffset = async (cityTileset: Cesium.Cesium3DTileset) => {
    const settingsStore = useSettingsStore();
    if (!settingsStore.ExtendParams?.cityOptions) return;
    await cityTileset.readyPromise
    settingsStore.ExtendParams.cityOptions.maximumScreenSpaceError && (cityTileset.maximumScreenSpaceError = settingsStore.ExtendParams.cityOptions.maximumScreenSpaceError);//显示距离
    let transform = Cesium.Matrix4.IDENTITY;
    if (settingsStore.ExtendParams.cityOptions.offset && settingsStore.ExtendParams.cityOptions.offset.length == 3) {
      const eye = Cesium.Cartesian3.fromDegrees(settingsStore.ExtendParams.cityOptions.offset[0], settingsStore.ExtendParams.cityOptions.offset[1], settingsStore.ExtendParams.cityOptions.offset[2]);//偏移中心位置
      const m = Cesium.Transforms.eastNorthUpToFixedFrame(eye);//获取中心位置转矩阵
      transform = m;
    }
    if (settingsStore.ExtendParams.cityOptions.scale != undefined) {
      const scale1 = Cesium.Matrix4.fromUniformScale(settingsStore.ExtendParams.cityOptions.scale);//获取缩放比例矩阵
      transform = Cesium.Matrix4.multiply(transform, scale1, transform);
    }
    if (!Cesium.Matrix4.equals(transform, Cesium.Matrix4.IDENTITY))
      cityTileset.root.transform = transform;
  }

  onViewerMounted(({ loading, cityTileset }) => {
    initSelectLayers(loading)
    //暂时需要模型偏移的字段，后期可以不需要
    cityTileset && cityOffset(cityTileset)
  });
}
