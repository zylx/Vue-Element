<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>设备状态</span>
            </div>
            <el-table
                :data="devData"
                style="width: 100%"
                :row-class-name="rowClassName"
                :row-key="getRowKeys"
                :expand-row-keys="expandRowKey"
                @expand-change="expandSelect"
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
                <el-table-column
                    prop="devId"
                    label="设备ID"
                    width="100"
                ></el-table-column>
                <el-table-column
                    prop="channel"
                    label="通道"
                    width="100"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="location"
                    label="工作地点"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="workStatus"
                    label="工作状态"
                    align="center"
                    :formatter="workStatusFormat"
                ></el-table-column>
                <el-table-column
                    prop="liquidValue"
                    label="实时液位"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="warnDistance"
                    label="提醒液位"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="stopDistance"
                    label="停机液位"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="remainTime"
                    label="预计剩余时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    align="center"
                    width="180"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    fixed="right"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-tooltip
                            class="item"
                            effect="light"
                            :content="
                                scope.row.workStatus === 3 ? '开启' : '停止'
                            "
                            placement="right"
                        >
                            <el-popconfirm
                                icon="el-icon-info"
                                iconColor="#e6a23c"
                                :title="
                                    scope.row.workStatus === 3
                                        ? '确定要开启该设备吗？'
                                        : '确定要停止该设备吗？'
                                "
                                confirmButtonText="确定"
                                cancelButtonText="取消"
                                @onConfirm="devControl(scope.$index, scope.row)"
                            >
                                <el-button
                                    size="mini"
                                    :type="
                                        scope.row.workStatus === 3
                                            ? 'success'
                                            : 'danger'
                                    "
                                    slot="reference"
                                    style="padding: 3px;"
                                >
                                    <i
                                        :class="
                                            scope.row.workStatus === 3
                                                ? 'el-icon-video-play'
                                                : 'el-icon-video-pause'
                                        "
                                        style="font-size: 1.3rem;"
                                    ></i>
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
import MyChart from "../components/echarts/MyChart.vue";

export default {
    name: "DevStatus",
    data() {
        return {
            firstRowKeyExpand: true, // 初始时，第一行是否展开标识
            getRowKeys(row) {
                // 行数据的 Key
                return row.devId;
            },
            expandRowKey: [], // 根据rowKey，设置默认展开的行数组
            devData: [],
            chartOptions: {},
            chartUpdateTime: [],
            chartUpdateValue: [],
        };
    },
    mounted() {
        this.createInterVal(this.getDevData, 10000);
        this.getChartOptions();
    },
    methods: {
        expandSelect(row, expandedRows) {
            var self = this;
            self.firstRowKeyExpand = false;
            if (expandedRows.length) {
                self.expandRowKey = [];
                if (row) {
                    let devId = row.devId;
                    self.expandRowKey.push(devId); // 每次push进去的是每行的ID
                    self.getHistData(devId);
                }
            } else {
                self.expandRowKey = [];
            }
        },
        createInterVal(fn, interval) {
            fn();
            let timer = setInterval(() => {
                fn();
            }, interval);
            this.$once("hook:beforeDestroy", function() {
                clearInterval(timer);
            });
        },
        getDevData() {
            let self = this;
            self.$services
                .devStatusData({
                    params: {
                        eventtype: 4,
                    },
                })
                .then(function(res) {
                    let { error_code, rundata } = res;
                    if (error_code === 4000 && rundata.length > 0) {
                        if (self.firstRowKeyExpand) {
                            let devId = rundata[0].device_id;
                            self.expandRowKey.push(devId);
                            self.getHistData(devId);
                        }
                        self.devData = rundata.map((item) => {
                            return {
                                devId: item.device_id,
                                channel: item.channel,
                                location: item.location,
                                workWay: item.work_type,
                                workStatus: item.youbeng_status,
                                liquidValue: item.liquid_value,
                                warnDistance: item.warn_distance,
                                stopDistance: item.stop_distance,
                                remainTime: item.remain_time,
                                updateTime: item.update_time,
                            };
                        });
                    }
                })
                .catch(function(error) {
                    console.log("getDevData -> error", error);
                });
        },
        getHistData(devId) {
            let self = this;
            self.chartUpdateTime = [];
            self.chartUpdateValue = [];
            self.$services
                .devStatusData({
                    params: {
                        eventtype: 2,
                        device_id: devId,
                        num: 10,
                    },
                })
                .then(function(res) {
                    let { error_code, histdata } = res;
                    let histdataLen = histdata.length;
                    if (error_code === 4000 && histdataLen > 0) {
                        for (let i = 0; i < histdataLen; i++) {
                            if (
                                self.hasOwnProp(histdata[i], "liquid_value") &&
                                self.hasOwnProp(histdata[i], "updatetime")
                            ) {
                                self.chartUpdateTime.push(
                                    histdata[i].updatetime
                                );
                                self.chartUpdateValue.push(
                                    histdata[i].liquid_value
                                );
                            }
                        }
                        self.getChartOptions();
                    }
                })
                .catch(function(error) {
                    console.log("getDevData -> error", error);
                });
        },
        getChartOptions() {
            this.chartOptions = {
                title: {
                    text: "实时油位曲线",
                },
                tooltip: {},
                legend: {
                    data: ["液位值"],
                },
                xAxis: {
                    type: "category",
                    data: this.chartUpdateTime,
                    axisLine: {
                        lineStyle: {
                            color: "#666",
                        },
                    },
                    axisLabel: {
                        interval: 0, //设置坐标X轴分割间隔
                        rotate: 22,
                        textStyle: {
                            fontFamily: "Microsoft YaHei",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "液位值",
                        data: this.chartUpdateValue,
                        type: "line",
                        smooth: true,
                    },
                ],
            };
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
            const workStatus = ["充油中", "排油中", "故障", "停止"];
            return row.workStatus > 1
                ? workStatus[row.workStatus]
                : workStatus[row.workWay];
        },
        devControl(index, row) {
            let self = this;
            let workStatus = row.workStatus === 3 ? 1 : 2;
            self.$services
                .devControl({
                    params: {
                        eventtype: workStatus,
                        device_id: row.devId
                    }
                })
                .then(function(res) {
                    let isSuccess = res.error_code === 4000;
                    self.$message({
                        message: isSuccess ? '操作成功！' : res.error_msg,
                        type: isSuccess ? "success" : "error",
                        offset: 70,
                    });
                })
                .catch(function(error) {
                    console.log("devControl -> error", error);
                })
            row.workStatus = workStatus === 1 ? row.workWay : 3;
        },
        hasOwnProp(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },
    },
    components: {
        MyChart,
    },
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
