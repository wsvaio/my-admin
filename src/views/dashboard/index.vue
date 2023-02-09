<script setup name="home" lang="ts">
const main = useMainStore();
</script>

<template tag="div">
  <el-button @click="main.theme = main.theme == 'dark' ? 'light' : 'dark'">hi</el-button>
  <el-select v-model="main.layout">
    <el-option label="top" value="top" />
    <el-option label="left" value="left" />
  </el-select>
</template>

<style lang="less" scoped></style>
