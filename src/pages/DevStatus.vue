<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>设备状态</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowClassName"
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
        <el-table-column prop="workStatus" label="工作状态" align="center" :formatter="workStatusFormat"></el-table-column>
        <el-table-column prop="liquidValue" label="实时液位" align="center"></el-table-column>
        <el-table-column prop="warnDistance" label="提醒液位" align="center"></el-table-column>
        <el-table-column prop="stopDistance" label="停机液位" align="center"></el-table-column>
        <el-table-column prop="remainTime" label="预计剩余时间" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column align="center" label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.workStatus === 3 ? '开启' : '停止'" placement="right">
              <el-popconfirm
                icon="el-icon-info"
                iconColor="#e6a23c"
                :title="scope.row.workStatus === 3 ? '确定要开启该设备吗？' : '确定要停止该设备吗？'"
                confirmButtonText='确定'
                cancelButtonText='取消'
                @onConfirm="devControl(scope.$index, scope.row)"
              >
                <el-button
                  size="mini"
                  :type="scope.row.workStatus === 3 ? 'success' : 'danger'"
                  slot="reference"
                  style="padding: 3px;">
                  <i :class="scope.row.workStatus === 3 ? 'el-icon-video-play' : 'el-icon-video-pause'" style="font-size: 1.3rem;"></i>
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import MyChart from '../components/echarts/MyChart.vue';

export default {
  name: "DevStatus",
  data() {
    return {
      tableData: [
        {
          devId: '1',
          channel: 1,
          location: '广州',
          workWay: 1,
          workStatus: 3,
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
          workStatus: 1,
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
  computed: {
    workStatus(){
      const workStatus = ['充油中', '排油中', '故障', '停止'];
      return workStatus[row.workStatus];
    }
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
    rowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    workStatusFormat(row, column) {
      const workStatus = ['充油中', '排油中', '故障', '停止'];
      return workStatus[row.workStatus];
    },
    devControl(index, row) {
      row.workStatus = (row.workStatus === 3) ? row.workWay : 3;
      console.log(index, row);
    }
  },
  components: {
    MyChart
  }
};
</script>

<style lang="less" scoped>
.el-table {
  .warning-row {
    background: oldlace;
  }
  .success-row {
    background: #f0f9eb;
  }
}
</style>