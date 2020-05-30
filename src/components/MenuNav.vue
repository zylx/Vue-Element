<template>
  <div id="nav-header">
    <div class="logo">
      <img :src="logo" alt="nav-logo" />
    </div>
    <div class="title">{{ navTitle || "设备监控管理平台" }}</div>
    <div class="login-info"></div>
    <div class="menu">
      <el-menu
        default-active="1-1"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#F0F0F0"
        active-text-color="#1E9FFF"
      >
        <el-submenu index="1">
          <template slot="title">我的工作台</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">消息中心</el-menu-item>
      </el-menu>
    </div>
    <div class="avatar">
      <el-avatar
        shape="circle"
        icon="el-icon-user-solid"
        :size="50"
        fit="contain"
        :src="user"
      ></el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: "MenuNav",
  props: ["navTitle"],
  data() {
    return {
      logo: require("../img/3.png"),
      user: require("../img/1.png"),
      visible: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: '/login' })
        }).catch(() => {});
    },
  },
  components: {
  },
};
</script>

<style lang="less" scoped>
#nav-header {
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 20px;
  color: #f0f0f0;
  background-color: #545c64;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 200px;

    img {
      height: 50px;
    }
  }

  .title {
    flex: 1;
    margin: 0 50px;
    line-height: 60px;
    font-size: 1.8rem;
    color: #e2e2e2;
    letter-spacing: 0.2rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .menu {
    margin: 0 30px;
  }

  .avatar {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .el-avatar {
      margin-right: 20px;
    }

    .el-dropdown-link {
      color: #f0f0f0;
    }

    .el-dropdown-link:hover {
      cursor: pointer;
    }
  }
}
</style>
