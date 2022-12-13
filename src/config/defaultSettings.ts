/*
 * @Author: 刘杰强
 * @LastEditors: liujieqiang 501920078@qq.com
 * @Date: 2021-09-30 13:44:52
 * @LastEditTime: 2022-12-01 16:14:31
 * @FilePath: \ts_vue3_base_gis\src\config\defaultSettings.ts
 * @Description:
 */
const settings = {
  appid: "3DCDD82B69D54593BAAA372E8962B451",
  systemUrl: {
    //113基础信息平台地址
    USER: "http://113.57.155.51:8001/Org/api/{0}",
    //GISServerWEB地址
    GIS: "http://113.57.155.51:8001/GIS/api/{0}",
    //文件服务WEB地址
    FILE: "http://113.57.155.51:8001/FileService/{0}",
  },
  //GeoServer图层服务
  wmsurl: "http://119.3.219.61:10360/geoserver/XLJ/wms",
  //城市模型地址
  cityTitlestUrl: '',
  //管线模型
  pipesTitlesetUrl: '',

  name: "智慧排水运维监管信息平台", //中仪通用GIS系统

  mapLocation: true, //是否打开地点搜索
  region: "全国", //地点搜索限制位置 不能为空 默认全国

  defaultClickRadius: 2, //设置点选容差半径

  //配置天地图的TK密钥，建议每个项目更换
  TIAN_KEY: "82452b3ba1e201e971316b450c8c7c7c",

  BAIDU_AK: "GlLzfFzlVMTLyu5IyKwDt3yxvQMtLGrS",

  Cesium_Token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NWUxZjNjMi0zODk1LTRiOTItYWJmMi1iNmI4MmVkNWMwMjYiLCJpZCI6MjY5ODUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODg3NDM2OTR9.2NB-YBLjyTBR07s5obj4y3Akl4kSl9u63xq0Y16h4XM",

  //小蓝经开区
  west: 115.81519937884978, //复位坐标范围   小
  south: 28.499038153932954, //复位坐标范围
  east: 115.93312789356526, //复位坐标范围
  north: 28.585401120631154, //复位坐标范围   大
 
  height: 5000, //复位高度
};
 
export default settings;
