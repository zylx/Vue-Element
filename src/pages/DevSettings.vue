<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>设备配置</span>
            </div>
            <el-form
                :model="confForm"
                :rules="rules"
                ref="confForm"
                inline
                label-width="80px"
            >
                <el-form-item label="工作地点" prop="location">
                    <el-input
                        placeholder="工作地点"
                        v-model="confForm.location"
                    ></el-input>
                </el-form-item>
                <el-form-item label="设备描述" prop="devDesc">
                    <el-input
                        placeholder="设备描述"
                        v-model="confForm.devDesc"
                    ></el-input>
                </el-form-item>
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
                <el-form-item label="设备通道" prop="channel">
                    <el-select
                        v-model="confForm.channel"
                        placeholder="请选择设备通道"
                    >
                        <el-option
                            v-for="(val, key) in channels"
                            :key="key"
                            :label="val"
                            :value="val"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工作方式" prop="workWay">
                    <el-select
                        v-model="confForm.workWay"
                        placeholder="请选择工作方式"
                    >
                        <el-option
                            v-for="(val, key) in workWays"
                            :key="key"
                            :label="val"
                            :value="key"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实时液位" prop="liquidValue">
                    <el-input-number
                        v-model="confForm.liquidValue"
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        :step="0.1"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="液面距离" prop="jizhunDistance">
                    <el-input-number
                        v-model="confForm.jizhunDistance"
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        :step="0.1"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="对应液位" prop="liquidDistance">
                    <el-input-number
                        v-model="confForm.liquidDistance"
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        :step="0.1"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="提醒液位" prop="warnDistance">
                    <el-input-number
                        v-model="confForm.warnDistance"
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        :step="0.1"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="停机液位" prop="stopDistance">
                    <el-input-number
                        v-model="confForm.stopDistance"
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        :step="0.1"
                    ></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :type="submitType ? 'primary' : 'success'"
                        @click="onSubmit('confForm')"
                        >{{ submitType ? "保 存" : "添 加" }}</el-button
                    >
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
import Management from "../components/dev/Management.vue";

export default {
    name: "DevSettings",
    data() {
        return {
            submitType: 0,
            devicePhy: [],
            channels: [1, 2, 3, 4],
            workWays: ["充油", "排油"],
            confForm: {
                devId: "",
                location: "",
                devDesc: "",
                devicePhyID: "",
                channel: "",
                workWay: "",
                liquidValue: "",
                jizhunDistance: "",
                liquidDistance: "",
                warnDistance: "",
                stopDistance: "",
            },
            rules: {
                location: [
                    {
                        required: true,
                        message: "请输入工作地点",
                        trigger: "blur",
                    },
                ],
                channel: [
                    {
                        required: true,
                        message: "请选择设备通道",
                        trigger: "change",
                    },
                ],
                workWay: [
                    {
                        required: true,
                        message: "请选择工作方式",
                        trigger: "change",
                    },
                ],
                liquidValue: [
                    {
                        required: true,
                        message: "请输入实时液位",
                        trigger: "blur",
                    },
                ],
                jizhunDistance: [
                    {
                        required: true,
                        message: "请输入液面距离",
                        trigger: "blur",
                    },
                ],
                liquidDistance: [
                    {
                        required: true,
                        message: "请输入对应液位",
                        trigger: "blur",
                    },
                ],
                warnDistance: [
                    {
                        required: true,
                        message: "请输入提醒液位",
                        trigger: "blur",
                    },
                ],
                stopDistance: [
                    {
                        required: true,
                        message: "请输入停机液位",
                        trigger: "blur",
                    },
                ],
            },
            confData: [],
        };
    },
    computed: {
        token() {
            return sessionStorage.getItem("tk");
        },
    },
    created() {
        this.getCollector(); // 获取采集器
        this.getCongData(); // 获取已经添加的设备配置信息
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
        getCongData() {
            let self = this;
            self.axios
                .post(
                    `../api/config.php?eventtype=3&channel=0&token=${self.token}`
                )
                .then(function(response) {
                    let { status, data } = response;
                    let errCode = data.error_code;
                    if (
                        status === 200 &&
                        errCode === 4000 &&
                        Object.keys(data).length > 0
                    ) {
                        for (let i in data) {
                            if (/^dev_\d+/.test(i)) {
                                let item = data[i];
                                self.confData.push({
                                    devId: item.device_id,
                                    userId: item.user_id,
                                    channel: item.channel,
                                    location: item.location,
                                    devDesc: item.dev_desc,
                                    workWay: item.work_type,
                                    liquidValue: 10,
                                    jizhunDistance: item.jizhun_distance,
                                    liquidDistance: item.liquid_distance,
                                    warnDistance: item.warn_distance,
                                    stopDistance: item.stop_distance,
                                });
                            }
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
                    let self = this;
                    let formData = self.confForm;
                    self.axios
                        .post(
                            `../api/config.php?eventtype=1&channel=${formData.channel}&token=${self.token}&user_id=${formData.devicePhyID}`,
                            {
                                location: formData.location,
                                dev_desc: formData.devDesc,
                                work_type: formData.workWay,
                                // liquidValue: formData.liquidValue,
                                jizhun_distance: formData.jizhunDistance,
                                liquid_distance: formData.liquidDistance,
                                warn_distance: formData.warnDistance,
                                stop_distance: formData.stopDistance,
                            }
                        )
                        .then(function(response) {
                            // console.log("onSubmit -> response", response);
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
            this.submitType = 0;
        },
        devConfEdit(param) {
            // console.log(param)
            this.confForm = param.row;
            this.submitType = 1;
        },
        devConfDelete(param) {
            // console.log(param.row);
            let self = this;
            let userId = param.row.userId;
            let channel = param.row.channel;
            self.axios
                .post(`../api/config.php?eventtype=2&channel=${channel}&token=${self.token}&user_id=${userId}`)
                .then(function(response) {
                    console.log("onSubmit -> response", response);
                    let { status, data } = response;
                    let errCode = data.error_code;
                    if (status === 200 && errCode === 4000) {
                        self.$message({
                            message: "设备已经删除！",
                            type: "success",
                            offset: 70,
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        hasOwnProp(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },
    },
    components: {
        Management,
    },
};
</script>

<style lang="less" scoped>
.el-form {
    .el-form-item {
        margin: 10px 0;
        width: 25%;

        .el-input,
        .el-select {
            width: 180px;
        }
    }
}
</style>
