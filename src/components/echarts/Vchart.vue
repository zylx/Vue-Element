<template>
  <div>
    <chart ref="chart" :options="chartOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>
export default {
  name: "MyChart",
  data() {
    return {
      chartOptions: {}
    };
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    getOptions() {
      this.chartOptions = {
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
            data: [820, 902, 931, 943, 1095, 1120, 1013],
            type: "line",
            smooth: true
          }
        ]
      }
    }
  }
}
</script>
