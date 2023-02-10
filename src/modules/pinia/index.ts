import { createPersistedState } from "pinia-plugin-persistedstate";
import { App } from "vue";

const pinia = createPinia();
// pinia 持久化
pinia.use(createPersistedState());

export default (app: App) => {
  app.use(pinia);

  const html = document.documentElement;
  const main = useMainStore();
  watchEffect(() => {
    for (const [k, v] of Object.entries(main.cssVars)) {
      html.style.setProperty(k, v);
    }
  });
  watchEffect(() => {
    html.classList.remove("light", "dark");
    html.classList.add(main.theme);
  });
  watchEffect(() => {
    html.classList.remove("left", "top", "full", "mobile", "left-mix", "top-mix");
    html.classList.add(main.layout);
  });

  watchEffect(() => {
    html.classList.remove("xxl", "xl", "lg", "md", "sm", "xs", "xxs");
    for (const item of ["xxl", "xl", "lg", "md", "sm", "xs", "xxs"]) {
      html.classList.add(item);
      if (item === main.size) break;
    }
  });

  const handleResize = () => {
    main.size =
      html.clientWidth >= 1400
        ? "xxl"
        : html.clientWidth >= 1200
        ? "xl"
        : html.clientWidth >= 992
        ? "lg"
        : html.clientWidth >= 768
        ? "md"
        : html.clientWidth >= 576
        ? "sm"
        : html.clientWidth >= 375
        ? "xs"
        : "xxs";
  };
  handleResize();
  window.addEventListener("resize", handleResize);
};
