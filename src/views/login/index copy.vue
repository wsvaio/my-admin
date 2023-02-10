<script setup lang="ts">
import { sleep } from "@wsvaio/utils";
import { useRequest } from "vue-request";

const { locale, availableLocales, t } = useI18n();
const payload = reactive<Record<any, any>>({});
const auth = useAuthStore();
const main = useMainStore();
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
  <div class="content">
    <section class="logo" v-enter="{ translate: '-100px, 0' }">
      <div flex="~" items="center">
        <img w="95px" h="77px" src="@/assets/zck_logo.png" />

        <div>
          <h1 text="white" m="x-12px y-0">智充客充电桩一体化管理平台</h1>
          <h3 text="white 18px" font="normal tracking-[1px]" m="x-12px y-0" class="opacity-50"
            >UNIFIED AUTHENTICATION PLATFORM</h3
          >
        </div>
      </div>
    </section>

    <section justify="self-end" v-enter="{ translate: '100px, 0' }">
      <!-- <el-switch v-model="main.theme" :active-value="'dark'" :inactive-value="'light'" />
      <el-select m="!l-12px" v-model="locale">
        <el-option v-for="item in availableLocales" :label="item" :value="item" :key="item" />
      </el-select> -->
    </section>
    <!-- <div></div> -->

    <section class="left">
      <img
        v-enter="{ translate: '-100px, 0', delay: '0.1s' }"
        w="[100%]"
        src="@/assets/login/picture01.png"
      />
      <h1 v-enter="{ translate: '-100px, 0', delay: '0.2s' }" m="0" text="white center" font="bold"
        >智慧充电 · 美好生活</h1
      >
    </section>

    <el-form
      class="right"
      :model="payload"
      size="large"
      :disabled="loading"
      max="w-450px"
      w="full"
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

    <footer class="self-end text-right text-white opacity-50">
      <a>浙公网安备33068102000744</a>
      <a m="l-96px">浙ICP备2021018529号-2</a>
    </footer>
  </div>
</template>

<style lang="less" scoped>
.login {
  background: url("@/assets/login/bg-left.svg") right 45vw center / cover no-repeat;
  background-color: rgb(var(--background-color-secondary));
  padding: 0 48px;

  & > div.content {
    margin: 0 auto;
    min-height: 100vh;
    max-width: var(--login-max-width, 1440px);
    padding: 24px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr max-content 1fr;
    justify-content: center;
    gap: 0 48px;
  }
}
</style>

<style lang="less" scoped>
.dark .login {
  background: url("@/assets/login/bg-left-dark.svg") right 48vw center / cover no-repeat;
  background-color: rgb(41, 49, 70);
}
</style>

<style lang="less">
.xl {
  --login-max-width: 1024px;
}

.dark {
  --login-form-bg: transparent;
}

.md .login {
  background: rgb(41, 49, 70) !important;

  h1 {
    font-size: 1.6em;
  }

  h2 {
    font-size: 1.2em;
  }

  .left {
    display: none;
  }

  .right {
    grid-column: span 2;
    justify-self: center;
    background-color: var(--login-form-bg, white);
    border-radius: 12px;
    padding: 32px;
    text-align: center;
  }
}
</style>
