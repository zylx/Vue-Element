<template>
  <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>设备状态</span>
        </div>
        <div>
          <my-chart chartId="chart" :chartOptions="{}" width="500px" height="500px"></my-chart>
          <vchart></vchart>
        </div>
    </el-card>
  </div>
</template>

<script>

import MyChart from '../components/echarts/MyChart.vue'
import Vchart from '../components/echarts/Vchart.vue'

export default {
  name: "DevStatus",
  props: ["a","b"],
  data() {
    return {
      chartOptions: {}
    }
  },
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
  },
  components: {
    MyChart,
    Vchart
  }
};
</script>
