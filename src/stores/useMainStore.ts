import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_main`;
type Layout = "left" | "top" | "full" | "mobile";
export default defineStore("main", {
  state: () => ({
    theme: "light" as "light" | "dark",
    layout: "left" as Layout,
    layoutOld: "left" as Layout,
    collapse: false,
    // 要刷新时调用refresh++，要刷新的页面使用watch监听该属性，触发对应的刷新逻辑
    refresh: 0,
    cssVars: {
      "--primary-color": "",
    },
    // 要缓存的路由 因为要支持tab拖动 所以是个一列表
    keepAlive: [] as RouteLocationNormalized[],
  }),
  actions: {
    addKeepAlive(route: RouteLocationNormalized) {
      const children = route.matched.find((item) => item.name == route.name)?.children || [];
      if (
        this.keepAlive.find((item) => item.name == route.name) || // 已存在
        route.matched[0].name != "administrator" || // 不是admin子路由
        children.length > 0
      )
        return;
      this.keepAlive.push(route);
    },
    toggleLayout(name: "full" | "mobile") {
      if (this.layout == name) {
        this.layout = this.layoutOld;
      } else {
        this.layoutOld = this.layout;
        this.layout = name;
      }
    },
    layoutHas(...names: Layout[]) {
      return names.some((item) => item == this.layout);
    },
  },
  getters: {
    // 要缓存的路由名
    nameList(): string[] {
      return [...this.keepAlive.map((item) => String(item.name))];
    },
  },

  persist: {
    key: storageName,
  },
});
