/*
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-12-12 15:18:23
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-13 10:34:19
 * @FilePath: \demo3\src\http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 2.1导入axios
import axios, { type AxiosRequestConfig, type ResponseType } from "axios";
import router from "@/router";
const DefaultHeader = {
  "Content-Type": "application/json; charset=UTF-8",
};
//管道数据
let GlobalFlag = false;
// 配置默认请求头
axios.defaults.headers.post = DefaultHeader;

/* 请求拦截器 */
axios.interceptors.request.use(
  (config: any) => {
    // 每次请求时会从localStorage中获取token
    if (localStorage.getItem("token")) {
      const data = localStorage.getItem("token");
      if (data) {
        // 把token加入到默认请求参数中
        config.headers.token = data;
        //如果没有管道全局数据，请求该数据
        if (!GlobalFlag) {
          GlobalFlag = true;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const errorTextObj = {
  "Network Error": "接口错误或不存在",
} as const;
let errFlag = false;
const errMessage = (msg: string) => {
  if (errFlag === true) {
    return;
  }
  errFlag = true;
};
//异步请求后，判断token是否过期
axios.interceptors.response.use(
  (response) => {
    //解决vite重复加载 回调拦截器
    if (response.headers) {
      return response.data;
    } else {
      return response;
    }
  },
  (error) => {
    if (error.response) {
      //处理过期请求
      if (error.response.status === 403 || error.response.status === 401) {
        errMessage(error.response.data?.msg);
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        router.push({
          path: "/user/login",
          query: {
            status: error.response.status,
          },
        });
        
      } else {
        const message =
          error.response?.data?.msg ??
          errorTextObj[error.message] ??
          error.message;
        errMessage(message);
      }
    } else {
      errMessage("错误的请求");
    }
    return Promise.reject(error);
  }
);

export default axios
