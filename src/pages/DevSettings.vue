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
                <el-form-item label="采集设备" prop="devPhyId">
                    <el-select
                        v-model="confForm.devPhyId"
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
                <el-form-item label="设备通道" prop="channel">
                    <el-select
                        v-model="confForm.channel"
                        placeholder="请选择设备通道"
                        :disabled="isEdit"
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
                <!-- <el-form-item label="实时液位" prop="liquidValue">
                    <el-input-number
                        v-model="confForm.liquidValue"
                        controls-position="right"
                        :min="0"
                        :precision="2"
                        :step="0.1"
                    ></el-input-number>
                </el-form-item> -->
                <el-form-item label="基准液位" prop="liquidDistance">
                    <el-input-number
                        v-model="confForm.liquidDistance"
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
            isEdit: false,
            submitType: 0,
            devicePhy: [],
            channels: [1, 2, 3, 4],
            workWays: ["充油", "排油"],
            confForm: {
                devId: "",
                devPhyId: "",
                location: "",
                devDesc: "",
                channel: "",
                workWay: "",
                // liquidValue: "",
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
                devPhyId: [
                    {
                        required: true,
                        message: "请选择采集器",
                        trigger: "change",
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
                // liquidValue: [
                //     {
                //         required: true,
                //         message: "请输入实时液位",
                //         trigger: "blur",
                //     },
                // ],
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
                        message: "请输入基准液位",
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
    created() {
        this.getCollector(); // 获取采集器
        this.getConfData(); // 获取已经添加的设备配置信息
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
                                devId: item.device_phy_id,
                                name: item.name,
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getConfData() {
            let self = this;
            self.$services
                .devConfig({
                    params: {
                        eventtype: 3,
                        channel: 0,
                    },
                })
                .then(function(res) {
                    let { error_code, data } = res;
                    if (error_code === 4000 && Object.keys(data).length > 0) {
                        for (let key in data) {
                            let item = data[key];
                            self.confData.push({
                                devId: item.device_id,
                                devPhyId: item.user_id,
                                devicePhy: self.devicePhy,
                                channel: item.channel,
                                location: item.location,
                                devDesc: item.dev_desc,
                                workWay: item.work_type,
                                // liquidValue: 10,
                                jizhunDistance: item.jizhun_distance,
                                liquidDistance: item.liquid_distance,
                                warnDistance: item.warn_distance,
                                stopDistance: item.stop_distance,
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
                        .devConfig({
                            isHandleError: true,
                            method: "post",
                            headers: {
                                "Content-Type": "application/json; charset=UTF-8",
                            },
                            params: {
                                eventtype: 1,
                                channel: formData.channel,
                                user_id: formData.devPhyId,
                            },
                            data: {
                                location: formData.location,
                                dev_desc: formData.devDesc,
                                work_type: formData.workWay,
                                // liquidValue: formData.liquidValue,
                                jizhun_distance: formData.jizhunDistance,
                                liquid_distance: formData.liquidDistance,
                                warn_distance: formData.warnDistance,
                                stop_distance: formData.stopDistance,
                            },
                        })
                        .then(function(res) {
                            let errorCode = res.error_code;
                            const errorCodeObj = {
                                4008: "添加成功！",
                                4009: "修改成功！",
                            };
                            const inErrorCodeObj = errorCodeObj[errorCode] ? true : false;
                            self.$message({
                                message: inErrorCodeObj ? errorCodeObj[errorCode] : res.error_msg,
                                type: inErrorCodeObj ? "success" : "error",
                                offset: 70,
                            });
                            self.confData = [];
                            self.getConfData();
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
        devConfDelete(param) {
            let self = this;
            let devPhyId = param.row.devPhyId;
            let channel = param.row.channel;
            self.$services
                .devConfig({
                    params: {
                        eventtype: 2,
                        channel: 1,
                        user_id: devPhyId,
                    },
                })
                .then(function(res) {
                    if (res.error_code === 4000) {
                        self.$message({
                            message: "设备已经删除！",
                            type: "success",
                            offset: 70,
                        });
                        self.confData = [];
                        self.getConfData();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.submitType = 0;
            this.isEdit = false;
        },
        devConfEdit(param) {
            //深拷贝，实现点击编辑后，再点击重置不会因为存在引用问题而相互影响
            const newRow = JSON.stringify(param.row);
            this.confForm = JSON.parse(newRow);
            this.submitType = 1;
            this.isEdit = true;
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
