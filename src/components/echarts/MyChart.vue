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
      default: "500px"
    },
    chartOptions: {
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
      var option = {
        title: {
          text: "一周价格走势"
        },
        tooltip: {},
        legend: {
          data: ["价格"]
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "价格",
            data: [220, 202, 231, 243, 225, 220, 213],
            type: "bar",
            smooth: true
          }
        ]
      }
      chart.setOption(option);
    }
  }
}
</script>
