<template>
    <div>
        <el-card>
            <div slot="header" class="header">
                <span>历史记录</span>
                <el-form
                    ref="searchForm"
                    :model="searchForm"
                    inline
                    label-width="80px"
                >
                    <el-form-item label="日期范围">
                        <el-date-picker
                            v-model="searchForm.dateValue"
                            type="daterange"
                            align="left"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="searchForm.pickerOptions"
                        >
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-input
                            v-model="searchForm.key"
                            placeholder="请输入关键词搜索"
                            style="width: 350px;"
                        >
                            <el-select
                                v-model="searchForm.workWay"
                                slot="prepend"
                                placeholder="不限"
                                style="width: 86px;"
                            >
                                <el-option label="不限" value=""></el-option>
                                <el-option label="充油" value="0"></el-option>
                                <el-option label="排油" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSearch('searchForm')">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                :row-key="getRowKeys"
                :expand-row-keys="expandRowKey"
                @expand-change="expandSelect"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <my-chart
                            ref="myChart"
                            width="100%"
                            :chartId="props.row.devId.toString()"
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
                    prop="workWay"
                    label="工作方式"
                    align="center"
                    :formatter="workWayFormat"
                ></el-table-column>
                <el-table-column
                    prop="liquidValue"
                    label="初始液位"
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
                    label="开始时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="结束时间"
                    align="center"
                ></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import MyChart from "../components/echarts/MyChart.vue";

export default {
    name: "HistoryEvents",
    data() {
        return {
            firstRowKeyExpand: true, // 初始时，第一行是否展开标识
            getRowKeys(row) {
                // 行数据的 Key
                return row.devId;
            },
            expandRowKey: [], // 根据rowKey，设置默认展开的行数组
            searchForm: {
                key: "",
                workWay: "",
                dateValue: "",
                pickerOptions: {
                    shortcuts: [
                        this.setRangeDate("最近一周", 7),
                        this.setRangeDate("最近一个月", 30),
                        this.setRangeDate("最近两个月", 60),
                        this.setRangeDate("最近三个月", 90),
                        this.setRangeDate("最近半年", 183),
                        this.setRangeDate("最近一年", 366),
                    ],
                },
            },
            tableData: [],
            chartOptions: {},
            chartUpdateTime: [],
            chartUpdateValue: [],
        };
    },
    mounted() {
        this.getHistConfData();
        this.getChartOptions();
    },
    methods: {
        onSearch(formName) {
            let self = this;
            self.$refs[formName].validate((valid) => {
              if (valid) {
                  console.log("submit!");
                  let formData = self.searchForm;
                  console.log("onSearch -> formData", formData)
              } else {
                  console.log("error submit!!");
                  return false;
              }
            })
        },
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
        getHistConfData() {
            let self = this;
            self.$services
                .devConfig({
                    params: {
                        eventtype: 4,
                    },
                })
                .then(function(res) {
                    let { error_code, data } = res;
                    if (error_code === 4000 && Object.keys(data).length > 0) {
                      if (self.firstRowKeyExpand) {
                            let devId = data['dev_1'].device_id;
                            self.expandRowKey.push(devId);
                            self.getHistData(devId);
                        }
                        for (let key in data) {
                            let item = data[key];
                            self.tableData.push({
                                devId: item.device_id,
                                devPhyId: item.user_id,
                                devicePhy: self.devicePhy,
                                channel: item.channel,
                                location: item.location,
                                workWay: item.work_type,
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
                    let histdataLen = histdata ? histdata.length : 0;
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
                    text: "历史油位曲线",
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
        workWayFormat(row, column) {
            const workWay = ["充油", "排油"];
            return workWay[row.workWay];
        },
        setRangeDate(title, days) {
            return {
                text: title,
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
                    picker.$emit("pick", [start, end]);
                },
            };
        },
        hasOwnProp(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        }
    },
    components: {
        MyChart,
    },
};
</script>

<style lang="less" scoped>
.el-card {
    .header {
        overflow: hidden;
    }
    .el-form {
        float: right;
        .el-form-item {
            margin-bottom: 0;
        }
    }
}
</style>
