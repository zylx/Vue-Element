<template>
  <div>
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>

export default {
  name: "Vchart",
  data() {
    return {
      orgOptions: {}
    };
  },
  mounted() {
    this.orgOptions = {
      title: {
        text: "ECharts 入门示例2"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
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
          name: "销量",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }
      ]
    };
  }
};
</script>
