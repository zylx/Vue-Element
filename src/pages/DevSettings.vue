<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>设备配置</span>
      </div>
      <el-form :model="confForm" :rules="rules" ref="confForm" inline label-width="80px">
        <el-form-item label="工作地点" prop="location">
          <el-input placeholder="工作地点" v-model="confForm.location"></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop="devDesc">
          <el-input placeholder="设备描述" v-model="confForm.devDesc"></el-input>
        </el-form-item>
        <el-form-item label="设备通道" prop="channel">
          <el-select v-model="confForm.channel" placeholder="请选择设备通道">
            <el-option
              v-for="(val, key) in channels"
              :key="key"
              :label="val"
              :value="val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作方式" prop="workWay">
          <el-select v-model="confForm.workWay" placeholder="请选择工作方式">
            <el-option
              v-for="(val, key) in workWays"
              :key="key"
              :label="val"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实时液位" prop="liquidValue">
          <el-input-number v-model="confForm.liquidValue" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="液面距离" prop="jizhunDistance">
          <el-input-number v-model="confForm.jizhunDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="对应液位" prop="liquidDistance">
          <el-input-number v-model="confForm.liquidDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="提醒液位" prop="warnDistance">
          <el-input-number v-model="confForm.warnDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="停机液位" prop="stopDistance">
          <el-input-number v-model="confForm.stopDistance" controls-position="right" :min="0" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button :type="submitType ? 'primary' : 'success'" @click="onSubmit('confForm')">{{ submitType ? '保 存' : '添 加'}}</el-button>
          <el-button @click="resetForm('confForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span>配置管理</span>
      </div>
      <management 
        @devConfEdit="devConfEdit"
        @devConfDelete="devConfDelete"
        :confData="confData"
      />
    </el-card>
  </div>
</template>

<script>

import Management from '../components/dev/Management.vue'

export default {
  name: "DevSettings",
  data() {
    return {
      submitType: 0,
      channels: [1, 2, 3, 4],
      workWays: ['充油', '排油'],
      confForm: {
        devId: '',
        location: '',
        devDesc: '',
        channel: '',
        workWay: '',
        liquidValue: '',
        jizhunDistance: '',
        liquidDistance: '',
        warnDistance: '',
        stopDistance: ''
      },
      rules: {
          location: [
            { required: true, message: '请输入工作地点', trigger: 'blur' }
          ],
          channel: [
            { required: true, message: '请选择设备通道', trigger: 'change' }
          ],
          workWay: [
            { required: true, message: '请选择工作方式', trigger: 'change' }
          ],
          liquidValue: [
            { required: true, message: '请输入实时液位', trigger: 'blur' }
          ],
          jizhunDistance: [
            { required: true, message: '请输入液面距离', trigger: 'blur' }
          ],
          liquidDistance: [
            { required: true, message: '请输入对应液位', trigger: 'blur' }
          ],
          warnDistance: [
            { required: true, message: '请输入提醒液位', trigger: 'blur' }
          ],
          stopDistance: [
            { required: true, message: '请输入停机液位', trigger: 'blur' }
          ],
      },
      confData: [
        {
          devId: '#1',
          channel: 3,
          location: '广州',
          devDesc: '',
          workWay: 1,
          liquidValue: 10,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300
        },
        {
          devId: '#2',
          channel: 1,
          location: '深圳',
          devDesc: '',
          workWay: 0,
          liquidValue: 10,
          jizhunDistance: 10,
          liquidDistance: 200,
          warnDistance: 280,
          stopDistance: 300
        }
      ]
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          console.log(this.$refs[formName]);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.submitType = 0;
    },
    devConfEdit(param) {
      // console.log(param)
      this.confForm = param.row;
      this.submitType = 1;
    },
    devConfDelete(param) {
      console.log(param)
    }
  },
  components: {
    Management
  }
};
</script>

<style lang="less" scoped>
.el-form {
  .el-form-item {
    margin: 10px 0;
    width: 25%;

    .el-input, .el-select {
      width: 180px;
    }
  }
}
</style>
