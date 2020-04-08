<template>
  <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>设备状态</span>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DevStatus",
  props: ["a","b"],
  mounted() {
    console.log(this.a, this.b);
  },
  beforeRouteEnter(to, from , next) {
    //this 不指向实例 组件还没创建
    next(vm => {
      console.log('vm: ', vm)
      console.log(vm.a, vm.b)
      console.log(vm.$route)
    });
  }
};
</script>
