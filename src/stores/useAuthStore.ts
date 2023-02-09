import { router } from "@/modules/router";
import { sleep } from "@wsvaio/utils";
import { defineStore } from "pinia";
// const storageName = `${import.meta.env.VITE_PROJECT_NAME}_main`;

export default defineStore("auth", {
  state: () => ({
    token: "",
    expire: "",
  }),
  actions: {
    async login() {
      await sleep(1000);
      this.token = "token";
      this.expire = String(Date.now() + 3600);
      // const { expire, token } = await postAdminLogin({ admin_account, admin_password });

      // this.token = token;
      // this.expire = expire;
    },

    logout() {
      this.$reset();
      router.push({ name: "login" });
    },
  },
  getters: {
    isLogin(): boolean {
      return new Date(this.expire).getTime() > Date.now();
    },
  },
});
