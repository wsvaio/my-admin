<script setup lang="ts">
import logo from "../logo/index.vue";
const main = useMainStore();
</script>

<template>
  <logo :class="[main.layout == 'left' && main.collapse && 'collapse']" />
</template>

<style lang="less" scoped>
.logo {
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--aside-bg-color);

  :deep(h3) {
    // display: none;
    // overflow: hidden;
    width: 0;
  }

  &.collapse {
    justify-content: center;

    :deep(h3) {
      display: none;
    }
  }
}
</style>
