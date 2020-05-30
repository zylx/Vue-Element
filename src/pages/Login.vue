<template>
  <div>
    <el-container>
      <el-header>自动充排油监控管理中心</el-header>
      <el-main>
        <div class="main">
          <div class="logo-bg">
            <el-image :src="src" fit="fill" alt=""></el-image>
          </div>
          <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
              <span><i class="el-icon-user"></i></span>
            </div>
            <el-form label-position="right" label-width="80px">
              <el-form-item label="用户名">
                <el-input
                  type="text"
                  v-model="user"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密 码">
                <el-input
                  type="password"
                  v-model="pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item class="submit-btn">
                <el-button type="primary" @click="onSubmit">登 录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      src: require("../img/login/logo-bg.jpg"),
      user:"",
      pass: ""
    }
  },
  methods: {
    onSubmit() {
      console.log("onSubmit -> this.user", this.user)
      console.log("onSubmit -> this.pass", this.pass)
    },
  },
};
</script>

<style lang="less">
.el-container {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  .el-header {
    line-height: 60px;
    font-size: 2rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
    letter-spacing: 0.2rem;
    color: #ffffff;
    background-color: #179b16;
  }
  .el-main {
    display: flex;
    justify-content: center;
    // align-items: center;
    .main {
      width: 460px;
      .logo-bg {
        display: flex;
        justify-content: center;
        margin-bottom: 50px;
        .el-image img {
          width: auto;
          height: 220px;
        }
      }
      .el-card {
        width: 100%;
        .el-card__header {
          padding: 15px 20px;
          span > .el-icon-user {
            font-size: 2rem;
            color: #999;
          }
        }
        .el-card__body {
          padding: 30px 80px 0 30px;
        }
        .el-form {
          .el-input.is-active .el-input__inner,
          .el-input__inner:focus {
            border-color: #4abf10;
            outline: 0;
          }
          .submit-btn {
            text-align: center;
            .el-button--primary {
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #efefef;
              background-color: #179b16;
            }
            .el-button--primary:focus,
            .el-button--primary:hover {
              background: #4abf10;
              border-color: #4abf10;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .el-footer {
    background-color: #dcdfe6;
  }
}
</style>
