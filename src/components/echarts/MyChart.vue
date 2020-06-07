<template>
  <div>
    <div :id="chartId" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
// 引入基本模板
let Echarts = require("echarts/lib/echarts");
//按需引入需要的组件模块
require("echarts/lib/chart/bar");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/tooltip");

export default {
  name: "MyChart",
  props: {
    chartId: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "300px"
    },
    options: {
      type: Object,
      required: true
    },
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      // 基于准备好的dom，初始化echarts实例
      let chart = Echarts.init(document.getElementById(this.chartId));
      
      // 指定图表的配置项和数据
      chart.setOption(this.options);
    }
  }
}
</script>
