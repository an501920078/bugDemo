/*
 * @Author: liujieqiang 501920078@qq.com
 * @Date: 2022-05-16 09:46:02
 * @LastEditors: liujieqiang 501920078@qq.com
 * @LastEditTime: 2022-12-12 12:25:16
 * @FilePath: \pump-station-system\src\pinia\page.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
// import { changeStyle } from "@/styles/publicStyle";
//页面相关
let navData_local = localStorage.getItem("nav");
const baseStyle_local = localStorage.getItem("sidebarStatus");
const sidebar_local = localStorage.getItem("baseStyle");
try {
  navData_local = navData_local && JSON.parse(navData_local);
} catch (error) {
  localStorage.clear();
}

// if (baseStyle_local) {
//   changeStyle(baseStyle_local);
// }
export const usePageStore = defineStore("page", {
  state: () => {
    return {
      //侧边栏
      sidebar: {
        opened: sidebar_local ? !!Number(sidebar_local) : true,
        withoutAnimation: false,
      },
      //主题颜色相关
      baseStyle: baseStyle_local,
      StyleFlag: false,
      //菜单数据
      navData: (navData_local || []) as any[],
      //导航栏右侧菜单弹窗
      UserInfoFlag: false,
      PasswordFlag: false,
      //各个方位菜单展开关闭
      rightpanelFlag: false,
    };
  },
  actions: {
    //侧边栏
    TOGGLE_SIDEBAR() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.setItem("sidebarStatus", "1");
      } else {
        localStorage.setItem("sidebarStatus", "0");
      }
    },
    CLOSE_SIDEBAR(withoutAnimation: boolean) {
      localStorage.setItem("sidebarStatus", "0");
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    // 导航栏
    changeNavData(data: any) {
      if (data != "") {
        this.navData = data;
        localStorage.setItem("nav", JSON.stringify(this.navData));
      }
    },
    toggleSideBar() {
      this.TOGGLE_SIDEBAR();
      //触发window事件来触发echarts重置
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 500);
    },
    closeSideBar(withoutAnimation: boolean) {
      this.CLOSE_SIDEBAR(withoutAnimation);
    },
    //用户弹窗
    changeUserInfoFlag(flag: boolean) {
      this.UserInfoFlag = flag;
    },
    changePasswordFlag(flag: boolean) {
      this.PasswordFlag = flag;
    },
    //主题切换
    changeBaseStyle(data: string | null) {
      if (data) {
        this.baseStyle = data;
        localStorage.setItem("baseStyle", data);
        // changeStyle(data);
      }
    },
    changeStyleFlag(flag: boolean) {
      this.StyleFlag = flag;
    },
    //右侧菜单展开关闭
    changeRightpanelFlag(rightpanelFlag: boolean) {
      this.rightpanelFlag = rightpanelFlag;
    },
  },
});
