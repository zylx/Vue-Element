<template>
  <div>
    <el-dialog
      :title="title"
      :modal="modal"
      :show-close="showClose"
      :visible.sync="dialogVisible"
      width="30%"
      align
    >
      <span>{{ content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ cancelBtn }}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{
          confirmBtn
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "提示",
    },
    modal: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    align: {
      type: String,
      default: "left",
    },
    content: {
      type: String,
      default: "提示内容",
    },
    confirmBtn: {
      type: String,
      default: "确定",
    },
    cancelBtn: {
      type: String,
      default: "取消",
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        console.log(val);
        this.$emit("update:visible", val); // dialogVisible改变的时候通知父组件
      },
    },
  },
  // methods: {
  //     handleClick(param) {
  //         console.log("dialogVisible -> param", param);
  //         this.visible = false
  //         this.$emit("update:visible", false); // handleClick改变的时候通知父组件
  //     },
  // },
};
</script>
