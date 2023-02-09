<script setup lang="ts">
const title = import.meta.env.VITE_DOCUMENT_TITLE;
</script>

<template>
  <div :class="['logo', 'hover']">
    <img w="32px" h="32px" object="cover" src="@/assets/vue.svg" />
    <h3 m="0 l-12px">{{ title }}</h3>
  </div>
</template>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  padding: 4px;
  height: 48px;
  white-space: nowrap;
  flex: none;
}
</style>
