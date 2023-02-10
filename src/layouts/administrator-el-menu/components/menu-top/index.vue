<script setup lang="ts">
import { administratorChildren } from "@/routes";
import MenuItem from "../menu-item/index.vue";
const route = useRoute();
const defaultActive = computed(() => String(route.name || route.meta.title || route.path));
</script>

<template>
  <el-menu
    mode="horizontal"
    class="menu-top"
    flex="1"
    un:border="!none"
    router
    :default-active="defaultActive"
  >
    <template v-for="item in administratorChildren">
      <menu-item poper-class="menu-top" :routes="[item]" />
    </template>
  </el-menu>
</template>

<style lang="less" scoped>
.menu-top {
  --el-bg-color-overlay: transparent;
  background-color: var(--header-bg-color);
}
</style>
