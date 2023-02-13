<script setup name="bg-map-demo" lang="ts">
let activeItem = $ref<{
  x: number;
  y: number;
  zoom: number;
  draggable: boolean;
  content: string;
}>();
const mapItems = reactive([
  { x: 0, y: 0, zoom: 1, draggable: true, content: "😎" },
  { x: 120, y: 0, zoom: 2, draggable: true, content: "🙄" },
  { x: 0, y: -50, zoom: 3, draggable: true, content: "😃" },
]);
</script>

<template>
  <map-container @click="activeItem = undefined">
    <map-item
      ><img
        @drag.prevent=""
        @dragover.prevent=""
        @dropver.prevent=""
        @dragstart.prevent=""
        src="@/assets/map-bg-test.png"
    /></map-item>

    <map-item v-for="item in mapItems" :state="item" @click.stop="activeItem = item">{{
      item.content
    }}</map-item>

    <div
      @click.stop=""
      transform="translate-z-1"
      bg="[var(--bg-color)]"
      p="12px"
      pos="absolute right-16px top-016px"
      v-if="activeItem"
    >
      <el-divider
        ><h1 m="0">{{ activeItem.content }}</h1></el-divider
      >

      <el-descriptions :column="1" direction="vertical">
        <el-descriptions-item label="x 坐标">
          <el-input-number v-model="activeItem.x" />
        </el-descriptions-item>
        <el-descriptions-item label="y 坐标">
          <el-input-number v-model="activeItem.y" />
        </el-descriptions-item>
        <el-descriptions-item label="缩放">
          <el-input-number v-model="activeItem.zoom" :precision="2" :step="activeItem.zoom / 10" />
        </el-descriptions-item>
        <el-descriptions-item label="拖动">
          <el-switch v-model="activeItem.draggable" />
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </map-container>
</template>

<style lang="less" scoped></style>
