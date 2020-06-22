<template>
    <el-table
        :data="
            configData.filter(
                (item) => !searchKey || item.collector.includes(searchKey) || item.devicePhyID.toString().includes(searchKey)
            )
        "
        style="width: 100%"
    >
        <el-table-column
            label="采集设备"
            prop="collector"
            width="200"
        ></el-table-column>
        <el-table-column
            label="ID"
            prop="devicePhyID"
            width="100"
        ></el-table-column>
        <el-table-column
            label="发送次数"
            prop="sendTimes"
            width="100"
            align="center"
        >
        </el-table-column>
        <el-table-column
            label="发送间隔"
            prop="sendInterval"
            width="100"
            align="center"
        >
        </el-table-column>
        <el-table-column label="手机号码" prop="phones" align="center">
            <template slot-scope="scope">
                <el-tag
                    effect="plain"
                    v-for="(phone, index) in scope.row.phones"
                    :key="index"
                    style="margin: 5px;"
                >
                    {{ phone.value }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="right" width="220">
            <template slot="header" slot-scope="scope">
                <el-input
                    v-model="searchKey"
                    size="mini"
                    placeholder="输入关键字搜索"
                />
            </template>
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="$emit('confEdit', {index: scope.$index, row: scope.row})"
                    style="margin-right: 5px;">编辑</el-button
                >
                <el-popconfirm
                  title="确定要删除该配置吗？"
                  confirmButtonText='确定'
                  cancelButtonText='取消'
                  icon="el-icon-info"
                  iconColor="#e6a23c"
                  @onConfirm="$emit('confDelete', {index: scope.$index, row: scope.row})"
                >
                  <el-button
                    size="mini"
                    type="danger"
                    slot="reference"
                    >删除</el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: {
        configData: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            searchKey: "",
        };
    }
};
</script>
