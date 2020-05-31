<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>设备配置</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          row-key="devId"
          :expand-row-keys="['#1']"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="dev-table-expand" ref="form" :model="props.row">
                <el-form-item label="工作地点">
                  <el-input placeholder="工作地点" v-model="props.row.location"></el-input>
                </el-form-item>
                <el-form-item label="工作方式">
                  <el-select v-model="props.row.workWay" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form v-for="chItem in props.row.channel" :key="chItem.addr">
                  <el-tag class="channel-tag">通道{{ chItem.addr }}</el-tag>
                  <el-form-item label="实时液位">
                    <el-input-number v-model="chItem.liquidValue" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
                  </el-form-item>
                  <el-form-item label="液面距离">
                    <el-input-number v-model="chItem.jizhunDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
                  </el-form-item>
                  <el-form-item label="对应液位">
                    <el-input-number v-model="chItem.liquidDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
                  </el-form-item>
                  <el-form-item label="提醒液位">
                    <el-input-number v-model="chItem.warnDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
                  </el-form-item>
                  <el-form-item label="停机液位">
                    <el-input-number v-model="chItem.stopDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
                  </el-form-item>
                </el-form>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="devId" label="设备ID" width="100"></el-table-column>
          <el-table-column prop="location" label="工作地点" width="180"></el-table-column>
          <el-table-column prop="workWay" :formatter="workWayFormat" label="工作方式" width="150"></el-table-column>
          <el-table-column prop="liquidValue" label="实时液位" width="200"></el-table-column>
          <el-table-column prop="jizhunDistance" label="液面距离"></el-table-column>
          <el-table-column prop="liquidDistance" label="对应液位"></el-table-column>
          <el-table-column prop="warnDistance" label="提醒液位"></el-table-column>
          <el-table-column prop="stopDistance" label="停机液位"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DevMgt",
  props: ["a", "b"],
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    workWayFormat(row, column) {
      return row.workWay === '0' ? '充油' : '排油'
    },
    onSubmit() {
      console.log(this.$refs);
      let formData = this.$refs.form.model
      console.log(formData.location);
      console.log('submit!');
    }
  },
  data() {
    return {
      value: '0',
      options: [
        {
          value: '0',
          label: '充油'
        },{
          value: '1',
          label: '排油'
        }
      ],
      tableData: [
        {
          devId: '#1',
          location: '广州',
          workWay: '0',
          liquidValue: 10,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300,
          channel: [
            {
              addr: 1,
              liquidValue: 10,
              jizhunDistance: 10,
              liquidDistance: 200,
              warnDistance: 280,
              stopDistance: 300
            },
            {
              addr: 2,
              liquidValue: 11,
              jizhunDistance: 11,
              liquidDistance: 201,
              warnDistance: 281,
              stopDistance: 301
            }
          ]
        },
        {
          devId: '#2',
          location: '深圳',
          workWay: '1',
          liquidValue: 10,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300,
          channel: [
            {
              addr: 1,
              liquidValue: 10,
              jizhunDistance: 10,
              liquidDistance: 200,
              warnDistance: 280,
              stopDistance: 300
            },
            {
              addr: 2,
              liquidValue: 11,
              jizhunDistance: 11,
              liquidDistance: 201,
              warnDistance: 281,
              stopDistance: 301
            }
          ]
        },
        {
          devId: '#3',
          location: '肇庆',
          workWay: '0',
          liquidValue: 30,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300
        },
        {
          devId: '#4',
          location: '中山',
          workWay: '1',
          liquidValue: 40,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    //this 不指向实例 组件还没创建
    next(vm => {
      console.log("vm: ", vm);
      console.log(vm.a, vm.b);
      console.log(typeof vm.a, typeof vm.b);
    });
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
  .dev-table-expand {
    font-size: 0;

    label {
      width: 90px;
      color: #99a9bf;
    }

    .el-form {

      .channel-tag {
        display: block;
        font-size: 14px;
      }

      .el-form-item {
        margin: 10px 0;
        width: 33%;

        .el-input, .el-select {
          width: 180px;
        }
      }
    }

  }
}
</style>
