<template>
  <div class="beijing">
    <div class="logincontainer">
      <div class="loginTitle"><img src="./标题图.png" alt="" /></div>
      <el-form :rules="rules" ref="loginform" :model="user">
        <el-form-item prop="mobile" label="">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-button
          class="loginButton"
          type="primary"
          @click="onLogin"
          :loading="isLoading"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginRequest } from "@/api/user";
export default {
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
        agree: false, //严重错误将其写成字符串
      },
      isLoading: false,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3|5|7|9]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入正确的验证码",
            trigger: "blur",
          },
        ],
        agree: [
          {
            //自定义校验规则  验证通过callback（）  验证失败：callback(new Error("请同意用户协议"));
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请同意用户协议"));
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      //修改登录状态防止多次点击
      this.isLoading = true;
      //表单验证(valid如果为true则代表表单验证成功,注意validate是异步的)
      this.$refs["loginform"].validate((valid) => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          this.isLoading = false;
          return;
        }
        // 验证通过，请求登录
        loginRequest(this.user).then(
          (res) => {
            //提示登录成功
            this.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
            //将接口返回的用户数据放入本地存储，方便共享
            //因为本地存储的key值是字符串所以要使用JSON.stringify转换为JSON字符串
            window.sessionStorage.setItem("user", JSON.stringify(res.data.data));
            //跳转页面
            this.$router.push({
              name: "home",
            });
          },

          (err) => {
            console.log(err);
            //提示登录失败
            this.$message({
              showClose: true,
              message: "登录失败，请重新登录",
              type: "error",
            });
            this.isLoading = false;
          }
        );
      });
    },
  },
};
</script>

<style >
.beijing {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url(./登录背景图2.jpg) no-repeat;
  /* background-size: 100; */
}
.logincontainer {
  position: absolute;
  padding: 50px;
  min-width: 365px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.loginButton {
  width: 100%;
}
.loginTitle {
  width: 300px;
}
.agreement {
  padding-bottom: 15px;
}
</style>