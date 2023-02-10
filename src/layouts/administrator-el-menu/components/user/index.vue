<script setup lang="ts">
import ilock from "~icons/material-symbols/lock-outline";
import ishutdown from "~icons/icons8/shutdown";
const handleCommand = (item) => {
  if (item === "lock") {
  } else if (item === "logout") {
  }
};
</script>

<template>
  <el-dropdown class="hover" @command="handleCommand">
    <div flex="~" items="center">
      <img src="@/assets/logo.svg" w="24px" h="24px" object="cover" />
      <span m="l-8px">Vben Admin</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="ilock" command="lock">锁定屏幕</el-dropdown-item>
        <el-dropdown-item :icon="ishutdown" command="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
