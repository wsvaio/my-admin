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
        <img w="48px" h="48px" src="@/assets/vue.svg" />
        <h2 text="white" m="x-12px y-0">My Admin</h2>
      </div>
    </section>

    <section justify="self-end" v-enter="{ translate: '100px, 0' }">
      <el-switch v-model="main.theme" :active-value="'dark'" :inactive-value="'light'" />
      <el-select m="!l-12px" v-model="locale">
        <el-option v-for="item in availableLocales" :label="item" :value="item" :key="item" />
      </el-select>
    </section>
    <!-- <div></div> -->

    <section class="left">
      <img v-enter="{ translate: '-100px, 0', delay: '0.1s' }" w="[50%]" src="@/assets/vue.svg" />
      <h1 v-enter="{ translate: '-100px, 0', delay: '0.2s' }" text="white" font="bold"
        >开箱即用的中后台管理系统</h1
      >
      <p v-enter="{ translate: '-100px, 0', delay: '0.3s' }" text="white"
        >输入您的个人详细信息开始使用！</p
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

    <footer grid="col-span-2" class="self-end text-center">footer</footer>
  </div>
</template>

<style lang="less" scoped>
.login {
  background: url("@/assets/login/bg-left.svg") right 48vw center / cover no-repeat;
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
