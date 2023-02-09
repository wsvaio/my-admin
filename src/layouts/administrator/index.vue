<script setup lang="ts">
import MenuLeft from "./components/menu-left/index.vue";

import MenuTop from "./components/menu-top/index.vue";
import fold from "./components/fold/index.vue";
import BreadCrumb from "./components/bread-crumb/index.vue";

import search from "./components/search/index.vue";
import fullScreen from "./components/full-screen/index.vue";
import bell from "./components/bell/index.vue";
import language from "./components/language/index.vue";
import user from "./components/user/index.vue";
import setting from "./components/setting/index.vue";
import tabs from "./components/tabs/index.vue";
import TabRefresh from "./components/tab-refresh/index.vue";
import TabDropdown from "./components/tab-dropdown/index.vue";
import TabFullscreen from "./components/tab-fullscreen/index.vue";

import LogoLeft from "./components/logo-left/index.vue";
import LogoTop from "./components/logo-top/index.vue";

let { layoutHas, collapse } = $(useMainStore());
const windowEvent = useEvent(window);
windowEvent.on(["click"], () => {
  if (!layoutHas("mobile")) return;
  collapse = true;
});
</script>

<template>
  <el-container class="administrator">
    <el-aside
      w="!auto"
      v-if="layoutHas('left', 'mobile')"
      :class="[collapse && 'collapse']"
      @click.stop=""
    >
      <logo-left />
      <menu-left v-if="layoutHas('left', 'mobile')" />
    </el-aside>
    <el-container :class="[collapse && 'collapse', 'content']">
      <el-header v-if="layoutHas('top', 'left', 'mobile')">
        <logo-top v-if="layoutHas('top', 'mobile')" />
        <fold v-if="layoutHas('left', 'mobile')" />
        <bread-crumb v-if="layoutHas('left')" />
        <menu-top v-if="layoutHas('top')" />
        <search />
        <bell />
        <full-screen />
        <language />
        <user />
        <setting />
      </el-header>
      <nav class="tab">
        <tabs />
        <tab-refresh />
        <tab-dropdown />
        <tab-fullscreen />
      </nav>
      <el-main>
        <router-view />
      </el-main>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </el-container>
</template>

<style lang="less">
html:not(.dark) .administrator {
  .el-aside {
    background-color: var(--aside-bg-color, #001529);
  }
}
</style>
<style lang="less">
html.mobile .administrator {
  .el-aside {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    transition: transform 0.3s;

    &.collapse {
      transform: translateX(-100%);
    }
  }

  .el-container.content {
    background: var(--bg-color);
    transition: filter 0.3s;
    // border-left: solid 1px var(--el-menu-border-color);

    &:not(.collapse) {
      filter: brightness(50%);
    }
  }
}
</style>
<style lang="less">
.administrator {
  height: 100vh;
  // overflow: hidden;
  .el-aside {
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    // overflow: hidden;
    position: relative;
    background-color: var(--aside-bg-color, var(--bg-color));
  }

  .el-container.content {
    flex-direction: column;
  }

  .el-header {
    display: flex;
    height: 48px;
    border-bottom: solid 1px var(--el-menu-border-color);
    padding: 0;
    background-color: var(--header-bg-color);

    .hover {
      transition: background-color 0.3s;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 10px;

      &:hover {
        background-color: rgb(var(--theme-color-invert) / 8%);
        cursor: pointer;
      }
    }
  }

  nav.tab {
    padding: 2px 0px 1px;
    border-bottom: solid 1px var(--el-menu-border-color);
    display: flex;

    .setting {
      border-left: solid 1px var(--el-menu-border-color);
      border-bottom: solid 1px var(--el-menu-border-color);
      width: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: rgb(var(--theme-color-invert) / 50%);
      transition: color 0.3s;

      &:hover {
        color: rgb(var(--theme-color-invert) / 100%);
      }
    }
  }

  .el-main {
    background: var(--main-bg-color);
  }
}
</style>
