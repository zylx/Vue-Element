<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <span>历史记录</span>
        <el-form ref="searchForm" :model="searchForm" inline label-width="80px">
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="searchForm.dateValue"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="searchForm.pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作方式">
            <el-select v-model="searchForm.workWay" placeholder="不限" style="width: 120px;">
              <el-option label="不限" value=""></el-option>
              <el-option label="充油" value="0"></el-option>
              <el-option label="排油" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.key" placeholder="请输入关键词搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="devId"
        :expand-row-keys="['1']"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <my-chart 
              ref="myChart"
              width="100%"
              :chartId="props.row.devId"
              :options="chartOptions"
              :auto-resize="true"
            />
          </template>
        </el-table-column>
        <el-table-column prop="devId" label="设备ID" width="100"></el-table-column>
        <el-table-column prop="channel" label="通道" width="100" align="center"></el-table-column>
        <el-table-column prop="location" label="工作地点" align="center"></el-table-column>
        <el-table-column prop="workWay" label="工作方式" align="center" :formatter="workWayFormat"></el-table-column>
        <el-table-column prop="liquidValue" label="初始液位" align="center"></el-table-column>
        <el-table-column prop="warnDistance" label="提醒液位" align="center"></el-table-column>
        <el-table-column prop="stopDistance" label="停机液位" align="center"></el-table-column>
        <el-table-column prop="remainTime" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="结束时间" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import MyChart from '../components/echarts/MyChart.vue';

export default {
  name: "HIstoryEvents",
  data() {
    return {
      searchForm: {
        key: '',
        woekWay: '',
        dateValue: '',
        pickerOptions: {
          shortcuts: [
            this.setRangeDate('最近一周', 7),
            this.setRangeDate('最近一个月', 30),
            this.setRangeDate('最近两个月', 60),
            this.setRangeDate('最近三个月', 90),
            this.setRangeDate('最近半年', 183),
            this.setRangeDate('最近一年', 366)
          ]
        }
      },
      tableData: [
        {
          devId: '1',
          channel: 1,
          location: '广州',
          workWay: 1,
          liquidValue: 10,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300,
          remainTime: '',
          updateTime: ''
        },
        {
          devId: '2',
          channel: 1,
          location: '深圳',
          workWay: 0,
          liquidValue: 10,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300
        }
      ],
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
          text: "历史油位曲线"
        },
        tooltip: {},
        legend: {
          data: ["液位值"]
        },
        xAxis: {
          type: 'category',
          data: [
            '2020-05-29 12:30:56',
            '2020-05-29 13:31:02',
            '2020-05-29 14:30:23',
            '2020-05-29 15:29:45',
            '2020-05-29 16:31:56',
            '2020-05-29 17:32:54',
            '2020-05-29 18:30:34',
            '2020-05-29 19:29:26',
            '2020-05-29 30:30:42'
          ],
          axisLine: {
              lineStyle: {
                  color: '#666'
              }
          },
          axisLabel: {
              interval: 0, //设置坐标X轴分割间隔
              rotate: 22,
              textStyle: {
                  fontFamily: 'Microsoft YaHei'
              }
          },
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "液位值",
            data: [30.8, 52.3, 81.1, 102.6, 121.1, 142.0, 163.9, 180.2, 200.3, 220.8],
            type: "line",
            smooth: true
          }
        ]
      }
    },
    workWayFormat(row, column) {
      const workWay = ['充油', '排油'];
      return workWay[row.workWay];
    },
    setRangeDate(title, days){
      return {
        text: title,
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
          picker.$emit('pick', [start, end]);
        }
      }
    }
  },
  components: {
    MyChart
  }
};
</script>

<style lang="less" scoped>
.el-card {
  .header {
    overflow: hidden;
  }
  .el-form {
    float: right;
    .el-form-item{
      margin-bottom: 0;
    }
  }
}
</style>