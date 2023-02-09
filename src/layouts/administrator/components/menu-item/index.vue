<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";
import self from "./index.vue";
defineEmits(["menu-click"]);
const { routes = [] } = defineProps<{
  routes?: RouteRecordRaw[];
  poperClass: string;
}>();
const makeIndex = (route: RouteRecordRaw) => String(route.name || route?.meta?.title || route.path);
</script>

<template>
  <template v-for="item in routes">
    <el-menu-item
      :index="makeIndex(item)"
      :route="item"
      v-if="!item.children"
      @click="$emit('menu-click', item)"
      ><el-icon v-if="item.meta?.icon"><component :is="item.meta?.icon" /></el-icon>
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
    <el-sub-menu :index="makeIndex(item)" :popper-class="poperClass" v-else>
      <template #title>
        <el-icon v-if="item.meta?.icon"><component :is="item.meta?.icon" /></el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <self :routes="item.children" :poper-class="poperClass" @menu-click="$emit('menu-click')" />
    </el-sub-menu>
  </template>
</template>

<style lang="less" scoped></style>
