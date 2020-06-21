<template>
  <div>
    <el-table
      :data="confData"
      style="width: 100%"
      :row-class-name="rowClassName">
      <el-table-column prop="devId" label="设备ID" width="100"></el-table-column>
      <el-table-column prop="devPhyId" label="采集器" width="100" :formatter="devPhyFormat" align="center"></el-table-column>
      <el-table-column prop="channel" label="通道" width="50" align="center"></el-table-column>
      <el-table-column prop="location" label="工作地点" width="180" align="center"></el-table-column>
      <el-table-column prop="devDesc" label="设备描述" width="200" :formatter="devDescFormat" align="center"></el-table-column>
      <el-table-column prop="workWay" label="工作方式" width="100" :formatter="workWayFormat" align="center"></el-table-column>
      <!-- <el-table-column prop="liquidValue" label="实时液位" align="center"></el-table-column> -->
      <el-table-column prop="liquidDistance" label="基准液位" align="center"></el-table-column>
      <el-table-column prop="jizhunDistance" label="液面距离" align="center"></el-table-column>
      <el-table-column prop="warnDistance" label="提醒液位" align="center"></el-table-column>
      <el-table-column prop="stopDistance" label="停机液位" align="center"></el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$emit('devConfEdit', {index: scope.$index, row: scope.row})"
            style="margin-right: 5px;">编辑</el-button>
          <el-popconfirm
            title="确定要删除该配置吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="#e6a23c"
            @onConfirm="$emit('devConfDelete', {index: scope.$index, row: scope.row})"
          >
            <el-button
              size="mini"
              type="danger"
              slot="reference"
              >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DevManagement',
  props: {
    confData: {
      type: Array,
      default: []
    }
  },
  methods: {
    rowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    devPhyFormat(row, column) {
      let devicePhyLen = row.devicePhy.length;
      return devicePhyLen > 0 ? row.devicePhy.filter( item => item.devId === row.devPhyId)[0].name : row.devPhyId
    },
    devDescFormat(row, column) {
      return row.devDesc !== '' ? row.devDesc : '暂无'
    },
    workWayFormat(row, column) {
      return row.workWay == 0 ? '充油' : '排油'
    }
  }
}
</script>

<style lang="less">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>