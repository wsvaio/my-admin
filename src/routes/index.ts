import { RouteRecordRaw } from "vue-router";
import Menu from "~icons/ep/menu";

let simpleRouteCount = 0;
const simpleRoute = (name: string) => {
  name = `${name}${++simpleRouteCount}`;
  return {
    path: name,
    name,
    meta: { title: name.toUpperCase(), icon: Menu },
    component: defineComponent({
      name,
      render: () => h("h1", [name.toUpperCase()]),
    }),
  };
};

const deepRoute = (name: string, deep: number) => {
  const result = {
    path: `${name}s${deep}`,
    name: `${name}s${deep}`,
    meta: { title: `${name}s${deep}`, icon: Menu },
    children: [simpleRoute(name), simpleRoute(name), simpleRoute(name)] as any[],
  };
  if (deep >= 1) {
    result.children.push(deepRoute(name, --deep));
  }
  return result;
};

export const administratorChildren = [
  {
    path: "dashboard",
    name: "dashboard",
    meta: { title: "仪表盘", icon: Menu },
    component: () => import("@/views/dashboard/index.vue"),
  },
  {
    path: "bg-map-demo",
    name: "bg-map-demo",
    meta: { title: "背景图片底图demo", icon: Menu },
    component: () => import("@/views/bg-map-demo/index.vue"),
  },

  deepRoute("item", 3),
] as RouteRecordRaw[];

export default [
  {
    path: "/",
    name: "administrator",
    redirect: { name: "dashboard" },
    component: () => import("@/layouts/administrator/index.vue"),
    children: administratorChildren,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
] as RouteRecordRaw[];
