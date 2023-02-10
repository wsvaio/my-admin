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
};
