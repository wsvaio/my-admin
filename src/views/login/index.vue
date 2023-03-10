<script setup lang="ts">
import { sleep } from "@wsvaio/utils";
import { useRequest } from "vue-request";

const main = useMainStore();
const { t } = useI18n();
const payload = reactive<Record<any, any>>({});
const auth = useAuthStore();
const router = useRouter();
const { loading, runAsync: submit } = $(
  useRequest(
    async () => {
      await sleep(1000);
      await auth.login();
      router.push("/");
    },
    {
      manual: true,
    },
  ),
);
</script>

<template tag="div" class="login">
  <article>
    <header
      v-enter="{ translate: '-100px, 0', delay: '0.1s' }"
      grid="col-span-full"
      flex="~"
      p="t-100px"
      text="white"
      font="leading-[1]"
      class="self-start"
    >
      <img src="@/assets/zck_logo.png" w="95px" h="77px" object="cover" />
      <section
        flex="~ col"
        justify="center"
        m="l-24px"
        @click="main.theme = main.theme == 'light' ? 'dark' : 'light'"
      >
        <h1 m="0">智充客充电桩一体化管理平台</h1>
        <h3 m="0 t-16px" class="opacity-50">UNIFIED AUTHENTICATION PLATFORM</h3>
      </section>
    </header>

    <section class="left" v-enter="{ translate: '-100px, 0', delay: '0.2s' }">
      <img transform="translate-x-[-10%]" w="full" src="@/assets/login/left-img.svg" />
      <h1 m="0" text="white center" font="bold">智慧充电 · 美好生活</h1>
    </section>

    <el-form
      class="right"
      :model="payload"
      size="large"
      :disabled="loading"
      w="full
      "
      max="w-404px"
      justify="self-end"
    >
      <h1 v-enter="{ translate: '100px, 0', delay: '0.1s' }">{{ t("login.form.title") }}</h1>
      <el-form-item
        prop="username"
        :rules="[{ required: true, message: t('login.verify.username') }]"
        v-enter="{ translate: '100px, 0', delay: '0.2s' }"
      >
        <el-input
          v-model="payload.username"
          clearable
          :placeholder="t('login.placeholder.username')"
        />
      </el-form-item>

      <el-form-item
        prop="password"
        :rules="[{ required: true, message: t('login.verify.password') }]"
        v-enter="{ translate: '100px, 0', delay: '0.3s' }"
      >
        <el-input
          type="password"
          size="large"
          v-model="payload.password"
          show-password
          clearable
          :placeholder="t('login.placeholder.password')"
        />
      </el-form-item>

      <div flex="~" items="center" v-enter="{ translate: '100px, 0', delay: '0.4s' }">
        <el-checkbox>{{ t("login.form.remembe") }}</el-checkbox>
        <a m="l-auto" cursor="pointer" un:text="[rgba(var(--primary-color))]">{{
          t("login.form.forgot")
        }}</a>
      </div>
      <el-button
        m="t-12px"
        v-enter="{ translate: '100px, 0', delay: '0.4s' }"
        w="full"
        type="primary"
        :loading="loading"
        @click="submit"
        >登录</el-button
      >
    </el-form>

    <footer
      v-enter="{ translate: '-100px, 0', delay: '0.3s' }"
      grid="col-span-full"
      class="self-end pb-24px"
      text="white"
    >
      <a class="opacity-50">浙公网安备 33068102000744</a>
      <a class="opacity-50" m="l-96px">浙ICP备 2021018529 号 -2</a>
    </footer>
  </article>
</template>

<style lang="less" scoped>
.dark .login {
  background: var(--bg-color) !important;
}

.login {
  // background-color: rgb(var(--background-color-secondary));
  // padding: 0 48px;
  --login-max-width: 1440px;
  background: url("@/assets/login/bg.svg") right 38.2vw center / cover no-repeat;
  // linear-gradient(
  //   270deg,
  //   transparent 0%,
  //   transparent calc(38.2vw + 200px),
  //   #1e4dac calc(38.2vw + 200px),
  //   #1e4dac
  // );
  // background-color: #1e4dac;
  overflow-x: hidden;

  & > article {
    max-width: var(--login-max-width);
    margin: 0 auto;
    height: 100vh;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr max-content 1fr;
    gap: 24px;
    justify-content: space-between;
    align-content: space-between;
    // overflow-x: hidden;

    // justify-items: center;
    align-items: center;
  }
}
</style>
<style lang="less" scoped>
.md .login {
  background: url("@/assets/login/bg.svg") right 0vw center / cover no-repeat;

  .left {
    display: none;
  }

  .right {
    @apply shadow-lg;
    grid-column: span 2;
    max-width: 500px;
    justify-self: center;

    background-color: var(--login-form-bg-color, var(--bg-color));
    border-radius: 12px;
    padding: 32px;
    text-align: center;
  }
}
</style>
