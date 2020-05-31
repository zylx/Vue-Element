<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>手机配置</span>
        <el-button @click="addPhone" type="success" size="small" style="float: right;">添加手机号</el-button>
      </div>
      <el-form :model="confForm" ref="confForm" inline label-width="100px">
        <div>
          <el-form-item label="发送次数" prop="sendTimes">
            <el-input-number v-model="confForm.sendTimes" controls-position="right" :min="1" :step="1" style="width: 150px;"></el-input-number>
          </el-form-item>
          <el-form-item label="发送间隔" prop="sendInterval">
            <el-input-number v-model="confForm.sendInterval" controls-position="right" :min="1" :step="1" style="width: 150px;"></el-input-number>
          </el-form-item>
        </div>
        <el-form-item
          v-for="(phone, index) in confForm.phones"
          :label="'手机号' + parseInt(index + 1)"
          :key="phone.key"
          :prop="'phones.' + index + '.value'"
          :rules="{
            required: true, validator: validatePhone, trigger: 'blur'
          }"
        >
          <el-input v-model="phone.value">
            <template slot="append">
              <i class="el-icon-close" @click.prevent="removeDomain(phone)"></i>
            </template>
          </el-input>
          <!-- <el-button size="mini" @click.prevent="removeDomain(phone)"></el-button> -->
        </el-form-item>
        <el-form-item style="display: block;text-align: center;">
          <el-button type="primary" @click="onSubmit('confForm')">提交</el-button>
          <el-button @click="resetForm('confForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        confForm: {
          phones: [{
            value: ''
          }]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.confForm.phones.indexOf(item)
        if (index !== -1) {
          this.confForm.phones.splice(index, 1)
        }
      },
      addPhone() {
        this.confForm.phones.push({
          value: '',
          key: Date.now()
        });
      },
      validatePhone(rule, value, callback) {
        console.log("validatePhone -> value", value)
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else {
          // if (this.phones.checkPass !== '') {
          //   this.$refs.ruleForm.validateField('checkPass');
          // }
          callback();
        }
      }
    }
  }
</script>