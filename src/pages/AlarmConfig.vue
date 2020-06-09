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
                    v-model="popoverShow"
                >
                    <el-button
                        slot="reference"
                        @click="addPhone"
                        type="success"
                        size="small"
                        style="float: right;"
                        >添加手机号</el-button
                    >
                </el-popover>
            </div>
            <el-form
                :model="confForm"
                ref="confForm"
                inline
                label-width="100px"
            >
                <div>
                    <el-form-item label="采集设备" prop="devicePhyID">
                        <el-select
                            v-model="confForm.devicePhyID"
                            placeholder="请选择采集设备"
                        >
                            <el-option
                                v-for="(val, key) in devicePhy"
                                :key="key"
                                :label="val.name"
                                :value="val.devID"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发送次数" prop="sendTimes">
                        <el-input-number
                            v-model="confForm.sendTimes"
                            controls-position="right"
                            :min="1"
                            :step="1"
                            style="width: 150px;"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="发送间隔" prop="sendInterval">
                        <el-input-number
                            v-model="confForm.sendInterval"
                            controls-position="right"
                            :min="1"
                            :step="1"
                            style="width: 150px;"
                        ></el-input-number>
                    </el-form-item>
                </div>
                <el-form-item
                    v-for="(phone, index) in confForm.phones"
                    :label="'手机号' + parseInt(index + 1)"
                    :key="phone.key"
                    :prop="'phones.' + index + '.value'"
                    :rules="{
                        required: true,
                        validator: validatePhone,
                        trigger: 'blur',
                    }"
                >
                    <el-input v-model="phone.value">
                        <template slot="append">
                            <i
                                class="el-icon-close"
                                @click.prevent="removeDomain(phone)"
                            ></i>
                        </template>
                    </el-input>
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
            devicePhy: [],
            confForm: {
                phones: [
                    {
                        value: "",
                    },
                ],
                devicePhyID: "",
                sendTimes: "",
                sendInterval: "",
            },
        };
    },
    computed: {
        token() {
            return sessionStorage.getItem("tk");
        },
    },
    created() {
        this.getCollector(); // 获取采集器
        this.getConfForm();
    },
    methods: {
        getCollector() {
            let self = this;
            self.axios
                .get("../api/collector.php", {
                    params: {
                        eventtype: 1,
                        token: self.token,
                    },
                })
                .then(function(response) {
                    let { status, data } = response;
                    let errCode = data.error_code;
                    if (
                        status === 200 &&
                        errCode === 4000 &&
                        Object.keys(data).length > 0
                    ) {
                        for (let i in data) {
                            if (/^user_\d+/.test(i)) {
                                let item = data[i];
                                self.devicePhy.push({
                                    devID: item.device_phy_id,
                                    name: item.name,
                                });
                            }
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getConfForm() {
            let self = this;
            self.axios
                .post(
                    `../api/send_conf.php?eventtype=2&token=${self.token}&user_id=1`
                )
                .then(function(response) {
                    console.log("getConfForm -> response", response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        onSubmit(formName) {
            let self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("submit!");
                    let formData = self.confForm;
                    console.log("onSubmit -> formData", formData)
                    self.axios
                        .post(
                            `../api/send_conf.php?eventtype=1&token=${self.token}&user_id=${formData.devicePhyID}`,
                            {
                                send_times: formData.sendTimes,
                                send_interval: formData.sendInterval,
                                phones: [],
                            }
                        )
                        .then(function(response) {
                            console.log("onSubmit -> response", response);
                            let { status, data } = response;
                            let errCode = data.error_code;
                            if (status === 200) {
                                self.$message({
                                    message:
                                        errCode === 4008
                                            ? "添加成功！"
                                            : "修改成功！",
                                    type: "success",
                                    offset: 70,
                                });
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.confForm.phones.indexOf(item);
            if (index !== -1) {
                this.confForm.phones.splice(index, 1);
            }
        },
        addPhone() {
            if (this.confForm.phones.length < 10) {
                this.confForm.phones.push({
                    value: "",
                    key: Date.now(),
                });
                this.popoverShow = false;
            } else {
                this.popoverShow = !this.popoverShow;
            }
        },
        validatePhone(rule, value, callback) {
            if (value === "") {
                callback(new Error("手机号不能为空！"));
            } else {
                if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
                    callback(new Error("手机号格式不正确！"));
                }
            }
        },
    },
};
</script>
