<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>手机配置</span>
        <el-popover
        placement="left"
        title="提示"
        trigger="manual"
        content="最多可添加10个手机号码！"
        v-model="popoverShow">
        <el-button slot="reference" @click="addPhone" type="success" size="small" style="float: right;">添加手机号</el-button>
      </el-popover>
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
        popoverShow: false,
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
            console.log(this.confForm.phones);
            console.log(this.$refs[formName]);
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
        if(this.confForm.phones.length < 10){
          this.confForm.phones.push({
            value: '',
            key: Date.now()
          });
          this.popoverShow = false;
        } else {
          this.popoverShow = !this.popoverShow;
        }
      },
      validatePhone(rule, value, callback) {
        if (value === '') {
          callback(new Error('手机号不能为空！'));
        } else {
          if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value))) {
            callback(new Error('手机号格式不正确！'));
          }
        }
      }
    }
  }
</script>