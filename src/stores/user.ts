/*
 * @Author: your name
 * @Date: 2022-03-23 15:19:56
 * @LastEditTime: 2022-12-12 13:39:10
 * @LastEditors: liujieqiang 501920078@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-jsx-pinia\src\pinia\index.ts
 */

// import type { UserLoginRes } from "@/api/USER/UserInfo";
import { defineStore } from "pinia";
// import refreshToken from "@/common/js/refreshToken";
//用户
let UserInfo1 = localStorage.getItem("user");
const token1 = localStorage.getItem("token");
let local_OrgData = localStorage.getItem("OrgData");

try {
  local_OrgData = local_OrgData && JSON.parse(local_OrgData);
  UserInfo1 = UserInfo1 && JSON.parse(UserInfo1);
} catch {
  localStorage.clear();
}

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      UserInfo: (UserInfo1 || {}),
      //存储token
      token: token1 || "",
    };
  },
  actions: {
    //存储token值
    change_token(data: string) {
      this.token = data;
      // const { setTokenInTime } = refreshToken();
      // setTokenInTime();
      localStorage.setItem("token", this.token);
    },
    // 添加用户
    addToAdmin(userpost: any) {
      //用户登录添加到vuex
      this.UserInfo = userpost;
      //当更新useradmin之后,把useradmin数组,存储到本地的localStorage中
      localStorage.setItem("user", JSON.stringify(this.UserInfo));
    },
    // 改变用户所有数据
    changeAdminAllData(data: any) {
      this.UserInfo = data;
      localStorage.setItem("user", JSON.stringify(this.UserInfo));
    },
    removeAdmin() {
      this.UserInfo = {};
      this.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  }
});
