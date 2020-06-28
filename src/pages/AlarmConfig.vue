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
                    <el-form-item
                        label="采集设备"
                        prop="devicePhyID"
                        :required="true"
                        :show-message="false"
                    >
                        <el-select
                            v-model="confForm.devicePhyID"
                            placeholder="请选择采集设备"
                            :disabled="isEdit"
                        >
                            <el-option
                                v-for="(val, key) in devicePhy"
                                :key="key"
                                :label="val.name"
                                :value="val.devId"
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
                    :key="index"
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
                    <el-button
                        :type="submitType ? 'primary' : 'success'"
                        @click="onSubmit('confForm')"
                        >{{ submitType ? "保 存" : "添 加" }}</el-button
                    >
                    <el-button @click="resetForm('confForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card" style="margin-top: 20px;">
            <div slot="header" class="clearfix">
                <span>配置列表</span>
            </div>
            <phone-config-list
                :configData="configData"
                @confEdit="confEdit"
                @confDelete="confDelete"
            />
        </el-card>
    </div>
</template>

<script>
import PhoneConfigList from "../components/dev/PhoneConfigList.vue";

export default {
    data() {
        return {
            isEdit: false,
            popoverShow: false,
            submitType: 0,
            devicePhy: [],
            configData: [],
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
    created() {
        this.getCollector(); // 获取采集器
        this.getConfigData();
    },
    methods: {
        getCollector() {
            let self = this;
            this.$services
                .devCollector({
                    params: {
                        eventtype: 1,
                    },
                })
                .then((res) => {
                    let { error_code, data } = res;
                    if (error_code === 4000 && Object.keys(data).length > 0) {
                        for (let i in data) {
                            let item = data[i];
                            self.devicePhy.push({
                                devId: parseInt(item.device_phy_id),
                                name: item.name,
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getConfigData() {
            let self = this;
            self.$services
                .devSendConf({
                    params: {
                        eventtype: 2,
                    },
                })
                .then(function(res) {
                    let { error_code, data } = res;
                    if (error_code === 4000 && Object.keys(data).length > 0) {
                        for (let key in data) {
                            let devId = parseInt(key);
                            let item = data[key];
                            self.configData.push({
                                devicePhyID: devId,
                                collector: self.devicePhy.filter(
                                    (item) => item.devId === devId
                                )[0].name,
                                phones: item.phone.map((pItem) => {
                                    return { value: pItem };
                                }),
                                sendTimes: item.send_times,
                                sendInterval: item.send_interval,
                            });
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        onSubmit(formName) {
            let self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("submit!");
                    let formData = self.confForm;
                    self.$services
                        .devSendConf({
                            isHandleError: true, //对该接口进行全局错误提示。
                            method: "post",
                            headers: {
                                "Content-Type":
                                    "application/json; charset=UTF-8",
                            },
                            params: {
                                eventtype: 1,
                                user_id: formData.devicePhyID,
                            },
                            data: {
                                send_times: formData.sendTimes,
                                send_interval: formData.sendInterval,
                                phone: formData.phones.map(
                                    (item) => item.value
                                ),
                            },
                        })
                        .then(function(res) {
                            let errorCode = res.error_code;
                            const errorCodeObj = { 4000: "提交成功！" };
                            const inErrorCodeObj = errorCodeObj[errorCode]
                                ? true
                                : false;
                            self.$message({
                                message: inErrorCodeObj
                                    ? errorCodeObj[errorCode]
                                    : res.error_msg,
                                type: inErrorCodeObj ? "success" : "error",
                                offset: 70,
                            });
                            self.configData = [];
                            self.getConfigData();
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
            this.confForm.phones = [{ values: "" }];
            this.submitType = 0;
            this.isEdit = false;
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
                } else {
                    callback();
                }
            }
        },
        confEdit(param) {
            const newRow = JSON.stringify(param.row);
            this.confForm = JSON.parse(newRow);
            this.submitType = 1;
            this.isEdit = true;
        },
        confDelete(param) {
            let devicePhyID = param.row.devicePhyID;
            let self = this;
            self.$services
                .devSendConf({
                    params: {
                        eventtype: 3,
                        user_id: devicePhyID,
                    },
                })
                .then(function(res) {
                    let isSuccess = res.error_code === 4000;
                    self.$message({
                        message: isSuccess ? "删除成功！" : res.error_msg,
                        type: isSuccess ? "success" : "error",
                        offset: 70,
                    });
                    self.configData = [];
                    self.getConfigData();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    },
    components: {
        PhoneConfigList,
    },
};
</script>
