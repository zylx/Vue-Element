<template>
    <el-table
        :data="
            configData.filter(
                (item) =>
                    !searchKey ||
                    item.collector.includes(searchKey) ||
                    item.devicePhyID.includes(searchKey)
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
            <template slot="header" slot-scope="search">
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
                    @click="confEdit(scope.$index, scope.row)"
                    >编辑</el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="confDelete(scope.$index, scope.row)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: {
        configData: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            searchKey: "",
        };
    },
    methods: {
        confEdit(index, row) {
            this.$emit("confEdit", index, row);
        },
        confDelete(index, row) {
            this.$emit("confDelete", index, row);
        },
    },
};
</script>
