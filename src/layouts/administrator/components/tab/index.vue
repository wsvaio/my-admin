<script lang="ts" setup>
import irefresh from "~icons/prime/refresh";
const emit = defineEmits(["reload"]);
const { keepAlive, layout, toggleLayout } = $(useMainStore());

function dragstart(event: DragEvent) {
  const el: any = event.target;
  event.dataTransfer?.setData("dragIndex", el?.dataset?.index);
}
function drop(event: DragEvent, dropIndex: number) {
  const dragIndex: any = event.dataTransfer?.getData("dragIndex");

  let temp = keepAlive[dragIndex];

  keepAlive.splice(dragIndex, 1);
  keepAlive.splice(dropIndex, 0, temp);
}
const tabItemRef = $ref<HTMLDivElement>();
const handleMouseWheel = (ev) => {
  if (!tabItemRef) return;
  tabItemRef.scrollTo({ left: tabItemRef.scrollLeft + ev.deltaY, behavior: "smooth" });
};

const route = useRoute();
const router = useRouter();

const handleCommand = (command: string) => {
  const index = keepAlive.findIndex((item) => route.name == item.name);
  if (command == "reload") {
    emit("reload");
  } else if (command == "close") {
    keepAlive.splice(index, 1);
    router.push([...keepAlive].reverse()[0]);
  } else if (command == "close-left") {
    for (let i = 0; i < index; i++) keepAlive.shift();
  } else if (command == "close-right") {
    const length = keepAlive.length;
    for (let i = 0; i < length - index - 1; i++) keepAlive.pop();
  } else if (command == "close-other") {
    handleCommand("close-left");
    handleCommand("close-right");
  }
};
</script>

<template tag="div" class="tab">
  <div class="tab-item" @mousewheel.stop.prevent="handleMouseWheel" ref="tabItemRef">
    <transition-group>
      <el-tag
        v-for="(item, index) in keepAlive"
        :key="item.name || item.path"
        :data-index="index"
        draggable="true"
        cursor="pointer"
        :type="$route.matched.find((route) => route.name == item.name) ? '' : 'info'"
        :closable="keepAlive.length > 1"
        :effect="item.name == $route.name ? 'dark' : 'plain'"
        @dragstart="dragstart"
        @drop="drop($event, index)"
        @dragover.prevent=""
        @click="$router.push(item)"
        @close="
          keepAlive.splice(index, 1),
            item.name == $route.name && $router.push([...keepAlive].reverse()[0])
        "
      >
        {{ item.meta?.title || item.name }}
      </el-tag>
    </transition-group>
  </div>

  <div class="settings" m="l-auto" flex="none ~" pos="sticky right-0">
    <div @click="$emit('reload')">
      <i-prime:refresh />
    </div>
    <el-dropdown trigger="click" @command="handleCommand">
      <div>
        <i-ic:outline-keyboard-arrow-down />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="irefresh" command="reload">重新加载</el-dropdown-item>
          <el-dropdown-item :icon="irefresh" :disabled="keepAlive.length == 1" command="close"
            >关闭标签页</el-dropdown-item
          >
          <el-dropdown-item
            :icon="irefresh"
            :disabled="keepAlive.findIndex((item) => item.name == route.name) == 0"
            command="close-left"
            divided
            >关闭左侧标签页</el-dropdown-item
          >
          <el-dropdown-item
            :icon="irefresh"
            :disabled="
              keepAlive.findIndex((item) => item.name == route.name) == keepAlive.length - 1
            "
            command="close-right"
            >关闭右侧标签页</el-dropdown-item
          >
          <el-dropdown-item
            :icon="irefresh"
            divided
            command="close-other"
            :disabled="keepAlive.length == 1"
            >关闭其它标签页</el-dropdown-item
          >
          <!-- <el-dropdown-item :icon="irefresh" command="close-all">关闭全部标签页</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div @click="toggleLayout('full')">
      <i-octicon:screen-full v-if="layout != 'full'" />
      <i-octicon:screen-normal v-else />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab {
  display: flex;

  .tab-item {
    flex: 1;
    padding: 0 0 0 6px;

    display: flex;
    border-bottom: 1px solid rgb(var(--background-color-invert) / 10%);
    overflow: auto;
    width: 25px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .settings {
    background-color: rgb(var(--background-color-secondary));
    border-bottom: 1px solid rgb(var(--background-color-invert) / 10%);

    div {
      white-space: nowrap;
      border-left: 1px solid rgb(var(--background-color-invert) / 10%);
      width: 36px;
      flex: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: rgb(var(--color) / 50%);
      transition: color 0.2s;

      &:hover {
        color: rgb(var(--color) / 100%);
      }
    }
  }
}

:deep(.el-tag__close) {
  vertical-align: middle;
}

.el-tag {
  margin-right: 6px;
  border-radius: 2px 2px 0 0;
  transition: all 0.333s ease;
  user-select: none;
  border-bottom: none;
  height: 28px;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-leave-active {
  position: absolute;
}
</style>
