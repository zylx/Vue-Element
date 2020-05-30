<template>
    <div>
        <el-container>
            <el-header>
                <menu-nav :navTitle="navTitle" />
            </el-header>
            <el-container id="main-content">
                <side-nav
                    :isCollapse="isCollapse"
                    :activeIndex="activeIndex"
                    @handle-collapse="isCollapse = !isCollapse"
                />
                <el-container>
                    <el-main>
                        <router-view />
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
import MenuNav from "../components/MenuNav.vue";
import SideNav from "../components/SideNav.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "App",
    data() {
        return {
            navTitle: "",
            activeIndex: "1",
            isCollapse: true,
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
        },
    },
    components: {
        MenuNav,
        SideNav,
        Footer,
    },
};
</script>

<style lang="less" scoped>
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

    .el-main {
        padding: 10px 20px;
    }
}
</style>
