import { defineStore } from "pinia";

//页面相关
let PIPE_FIELD_MAPING_local: any = localStorage.getItem("PIPE_FIELD_MAPING");
let QX_ATTR_MAP_local: any = localStorage.getItem("PIPE_FIELD_MAPING");
let layerObj_local: any = localStorage.getItem("PIPE_FIELD_MAPING");
try {
  PIPE_FIELD_MAPING_local =
    PIPE_FIELD_MAPING_local && JSON.parse(PIPE_FIELD_MAPING_local);
  QX_ATTR_MAP_local = QX_ATTR_MAP_local && JSON.parse(QX_ATTR_MAP_local);
  layerObj_local = layerObj_local && JSON.parse(layerObj_local);
} catch (error) {
  localStorage.clear();
}

export const useMapStore = defineStore("map", {
  state: () => {
    return {
      // 地图相关
      ImageryProviderConfig: {},
      //底图是否显示
      isLoadMapFlag: false,
      //地图透明度
      mapAlpha: 100,
      // 底图
      baseMapLayers: [] as any[],
      //图层控制
      selectedLayers: [],
      //cesium页面
      cesiumShow: "allPage",
      cesium2DShow: "",
      //三维相关数据,
      pipesD3TilesUrls: {} as Record<string, string | undefined>,
      //当前启用的功能与状态
      cesiumOnFuns: [] as any[],
      // 获取管网管点和缺陷
      PIPE_FIELD_MAPING: PIPE_FIELD_MAPING_local ?? {},
      QX_ATTR_MAP: QX_ATTR_MAP_local ?? {},
      layerObj: layerObj_local ?? {},
    };
  },
  actions: {
    /**初始化变量开始 */
    change_PIPE_FIELD_MAPING(data: any) {
      if (data != "") {
        this.PIPE_FIELD_MAPING = data;
        localStorage.setItem(
          "PIPE_FIELD_MAPING",
          JSON.stringify(this.PIPE_FIELD_MAPING)
        );
      }
    },
    change_QX_ATTR_MAP(data: any) {
      if (data != "") {
        this.QX_ATTR_MAP = data;
        localStorage.setItem("QX_ATTR_MAP", JSON.stringify(this.QX_ATTR_MAP));
      }
    },
    change_layerObj(data: any) {
      if (data != "") {
        this.layerObj = data;
        localStorage.setItem("layerObj", JSON.stringify(this.layerObj));
      }
    },
    //全局地图透明度
    changeMapAlpha(data: number) {
      this.mapAlpha = data;
    },
    // 地图相关变量
    changeSelectedLayers(Layers: any) {
      if (Layers != "") {
        this.selectedLayers = Layers;
      }
    },
    changeIsLoadMapFlag(data: boolean) {
      this.isLoadMapFlag = data;
    },
    //地图功能注册
    setCesiumOnFuns(data: {
      mode: "add" | "change" | "del" | "clearAll" | string;
      name: string;
      type?: string;
      isOpen?: boolean;
      funState?: string;
    }) {
      //添加注册功能
      if (data.mode === "add") {
        const Flag = this.cesiumOnFuns.some(
          (item: { name: string; isOpen?: boolean }) => {
            if (item.name === data.name) {
              item.isOpen = data.isOpen;
              return true;
            }
          }
        );
        if (!Flag) {
          this.cesiumOnFuns.push(data);
        }
        //功能发生改变是否启用时调用
      } else if (data.mode === "change") {
        this.cesiumOnFuns.forEach(
          (item: {
            name: string;
            type: string | undefined;
            isOpen: boolean | undefined;
            funState: string;
            clearFun: () => void;
          }) => {
            //优先判断当前是不是Hold保留功能，如果不是再判断单个是不是短期功能，是否需要清除,常驻Keep功能开启不会清除其他功能
            const flag =
              data.funState === "Hold" ? true : item.funState === "Short";
            if (item.name === data.name) {
              item.type = data.type;
              item.isOpen = data.isOpen;
              //如果开启功能，关闭其他所有的已开启功能并将功能注册为false
            } else if (item.isOpen && flag) {
              item.clearFun();
              item.isOpen = false;
            }
          }
        );
        //清除所有功能
      } else if (data.mode === "clearAll") {
        this.cesiumOnFuns.forEach(
          (item: {
            funState: string;
            clearFun: () => void;
            isOpen: boolean;
          }) => {
            //除了保存的功能不清除
            if (item.funState !== "Keep") {
              item.clearFun();
              item.isOpen = false;
            }
          }
        );
        //删除单个功能并彻底注销该功能
      } else if (data.mode === "del") {
        this.cesiumOnFuns = this.cesiumOnFuns.filter(
          (item: { name: string; clearFun: () => void }) => {
            if (item.name === data.name) {
              return false;
            } else {
              return true;
            }
          }
        );
      }
    },
    //底图相关改变
    //初始化底图数据
    initBaseMapLayers(layers: any) {
      this.baseMapLayers = layers;
    },
    //传入单个底图名称即可更改底图，或者 显示/隐藏该图层
    changeBaseMapLayers(layerName: any) {
      const baselayer = this.baseMapLayers;
      baselayer.some((item: any) => {
        // 找到改底图
        if (item.name === layerName) {
          baselayer.forEach((item2: any) => {
            //清除3D或者2D所有展示
            if (item.maptype === item2.maptype) {
              item2.show = false;
            }
          });
          //将改底图变成取反
          item.show = !item.show;
          //如果有关联底图，改变成相同显示
          if (item.relevance) {
            item.relevance.forEach((relevanceName: any) => {
              baselayer.some((item2: any) => {
                if (item2.name === relevanceName) {
                  item2.show = item.show;
                  return true;
                }
              });
            });
          }
          return true;
        }
      });
      this.baseMapLayers = baselayer;
    },
    // 切换地图视角
    changeCesiumView(view: "3D视图" | "2D视图" | "联动视图") {
      if (view == "3D视图") {
        this.cesiumShow = "allPage";
        this.cesium2DShow = "";
      } else if (view == "2D视图") {
        this.cesiumShow = "";
        this.cesium2DShow = "allPage";
      } else if (view == "联动视图") {
        this.cesiumShow = "halfPage";
        this.cesium2DShow = "halfPage";
      }
    },
  },
  getters: {
    //表名与图层对应关系，以及点线区分，关键字段，一些查询用到的下拉选项
    layerNameObj(): Record<string, boolean> {
      const obj = {};
      this.selectedLayers.forEach((item: any) => {
        obj[item.layername] = item.select;
      });
      return obj;
    },
  },
});
