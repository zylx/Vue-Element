<template>
  <div>
    <el-container>
      <el-header>
        <Menu :navTitle="navTitle" />
      </el-header>
      <el-container id="main-content">
        <Aside
          :isCollapse="isCollapse"
          :activeIndex="activeIndex"
          @handle-collapse="isCollapse = !isCollapse"
        />
        <el-container>
          <el-main>
              <Main />
          </el-main>
          <el-footer>
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Aside from "./components/Aside.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  data() {
    return {
      navTitle: "",
      isCollapse: true,
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    Menu,
    Aside,
    Main,
    Footer
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  padding: 0;
}

#main-content {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
