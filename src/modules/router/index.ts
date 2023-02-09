import { createRouter, createWebHistory } from "vue-router";
import routes from "@/routes";
import { Progress } from "@wsvaio/utils";
import { App } from "vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
});

router.beforeEach(() => Progress.start());
router.beforeEach((to, from, next) => {
  const { addKeepAlive } = $(useMainStore());
  addKeepAlive(to);
  next();
});
router.afterEach(() => Progress.clear());

export default (app: App) => app.use(router);
