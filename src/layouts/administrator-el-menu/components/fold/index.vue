<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <div @click.stop="main.collapse = !main.collapse" class="hover">
    <i-ant-design:menu-unfold-outlined v-if="main.collapse" />
    <i-ant-design:menu-fold-outlined v-else />
  </div>
</template>
