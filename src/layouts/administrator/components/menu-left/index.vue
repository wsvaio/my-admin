<script setup lang="ts">
import { administratorChildren } from "@/routes";
import MenuItem from "../menu-item/index.vue";
const main = useMainStore();
const route = useRoute();
const defaultActive = computed(() => String(route.name || route.meta.title || route.path));
</script>

<template>
  <el-menu
    class="menu-left"
    :collapse="main.layout == 'left' && main.collapse"
    w="200px"
    router
    :default-active="defaultActive"
  >
    <menu-item poper-class="menu-left" :routes="administratorChildren" />
  </el-menu>
</template>

<style lang="less">
html:not(.dark) .menu-left {
  --el-menu-bg-color: var(--aside-bg-color, #001529);
  --el-menu-text-color: rgb(var(--theme-color) / 50%);
  --el-menu-active-color: rgb(var(--theme-color));
  --el-menu-hover-bg-color: transparent;
  --el-menu-hover-text-color: rgb(var(--theme-color));

  .el-menu-item.is-active,
  .el-menu--popup .el-menu-item.is-active {
    background-color: var(--el-color-primary);
  }

  .el-menu-item:hover,
  .el-sub-menu__title:hover {
    color: var(--el-menu-hover-text-color);
  }
}

.menu-left {
  --el-menu-bg-color: var(--aside-bg-color);
  border-right: none;

  .el-sub-menu.is-active > .el-sub-menu__title {
    color: var(--el-menu-active-color);
  }
}
</style>
