<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#F0F0F0"
      active-text-color="#1E9FFF"
      router
    >
      <el-menu-item class="handle-collapse" @click="$emit('handle-collapse')">
        <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
        <span slot="title">{{ isCollapse ? "展开" : "收起" }}</span>
      </el-menu-item>
      <el-menu-item index="/dev/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">设备设置</span>
      </el-menu-item>
      <el-menu-item index="/dev/status">
        <i class="el-icon-data-line"></i>
        <span slot="title">设备状态</span>
      </el-menu-item>
      <el-menu-item index="/dev/alarmConfig">
        <i class="el-icon-bell"></i>
        <span slot="title">告警配置</span>
      </el-menu-item>
      <el-menu-item index="/dev/historyEvents">
        <i class="el-icon-warning-outline"></i>
        <span slot="title">历史记录</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="4-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="4-4">
          <span slot="title">选项4</span>
          <el-menu-item index="4-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ["activeIndex", "isCollapse"],
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // console.log(JSON.parse(JSON.stringify(keyPath))[0]);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 150px;
  /* min-height: 400px; */
  height: 100%;
}

.el-menu-vertical {
  height: 100%;
  .handle-collapse i {
    color: #f0f0f0;
  }
}

.el-menu-item i,
.el-submenu__title i {
    color: #CCC;
}
</style>
