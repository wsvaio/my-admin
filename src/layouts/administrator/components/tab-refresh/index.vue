<script lang="ts" setup>
let rotate = $ref(0);
const main = useMainStore();
</script>

<template>
  <div
    class="ml-auto setting"
    :style="{ '--rotate': `${rotate}deg` }"
    @click="(rotate += 360), main.refresh++"
  >
    <i-prime:refresh class="icon" />
  </div>
</template>

<style lang="less" scoped>
.icon {
  transition: all 0.3s;
  transform: rotate(var(--rotate));
}
</style>
