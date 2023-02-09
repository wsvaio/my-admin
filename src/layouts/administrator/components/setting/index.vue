<script setup lang="ts">
let isShow = $ref(false);
const main = useMainStore();
</script>

<template>
  <div class="hover" @click="isShow = !isShow">
    <i-mdi-light:settings />
  </div>

  <el-drawer v-model="isShow" title="项目配置">
    <div text="center">
      <el-divider><span text="16px">主题</span></el-divider>
      <el-switch v-model="main.theme" :active-value="'dark'" :inactive-value="'light'" />
      <el-divider><span text="16px">导航栏模式</span></el-divider>
      <!-- <div flex="~">
        <div>左侧菜单模式</div>
        <div>顶部菜单混合模式</div>
        <div>顶部菜单模式</div>
        <div>左侧菜单混合模式</div>
      </div> -->
      <el-select v-model="main.layout">
        <el-option
          v-for="item in ['left', 'left-mix', 'top', 'top-mix', 'mobile']"
          :label="item"
          :value="item"
          :key="item"
        />
      </el-select>
      <el-divider><span text="16px">系统主题</span></el-divider>
      <el-color-picker v-model="main.cssVars['--primary-color']" />
      <el-divider><span text="16px">顶栏主题</span></el-divider>
      <el-color-picker v-model="main.cssVars['--header-bg-color']" />
      <el-divider><span text="16px">菜单主题</span></el-divider>
      <el-color-picker v-model="main.cssVars['--aside-bg-color']" />
    </div>
  </el-drawer>
</template>
