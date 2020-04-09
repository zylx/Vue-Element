<template>
  <div>
    <div :id="chartId" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>

// 引入基本模板，按需加载
let Echarts = require('echarts/lib/echarts')
//引入柱状图
require('echarts/lib/chart/line')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')

export default {
  name: "MyChart",
  props: {
    chartId: {
      type: String,
      required: true
    },
    width: {
        type: String,
        default: '500px'
    },
    height: {
        type: String,
        default: '500px'
    },
    chartOptions: {
      type: Object,
      required: true
    }
  },
  mounted() {
      this.drawChart()
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let chart = Echarts.init(document.getElementById(this.chartId));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例1"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>
