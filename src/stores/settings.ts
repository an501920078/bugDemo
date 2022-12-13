/*
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-05-16 10:21:04
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-12 13:41:14
 * @FilePath: \pump-station-system\src\pinia\settings.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import settings from "@/config/defaultSettings";
// import { ViewModelEnum } from "@/modules/gis/type/cesium.type";
// import { PipeReadOnlyEnum } from "@/modules/gis/common/PipeConstant";
import { useUserStore } from "./user";

const newSettings = {
  ...settings,
  FlowConfig: {
    YSColor: '#0062FF',
    WSColor: '#E61C1C',
    MAXScale: 5000,
    Alpha: 80,
  },
  ExtendParams: {} as Record<string, any>,
}
export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      ...newSettings,
    };
  },
});
