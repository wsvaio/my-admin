import { defineStore } from "pinia";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_main`;
type Layout = "left" | "top" | "full" | "mobile" | "left-mix" | "top-mix";
type Size = "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";
export default defineStore("main", {
  state: () => ({
    theme: "light" as "light" | "dark",
    size: "xxl" as Size,
    layout: "left" as Layout,
    layoutCache: {
      mobile: "left" as Layout,
      full: "left" as Layout,
    },
    isFull: false,
    collapse: false,
    showAside: false,
    leftMixActiveRoute: null as RouteRecordRaw | null,
    showLeftMix: false,
    fixedLeftMix: false,
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
        this.layout = this.layoutCache[name];
      } else {
        this.layoutCache[name] = this.layout;
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
