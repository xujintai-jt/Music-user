<!--
 * @Author: xujintai
 * @Date: 2021-03-31 15:44:53
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-16 14:02:10
 * @Description: file content
 * @FilePath: \music-user\src\components\registered-login\Login.vue
-->
<template>
  <div id="registered">
    <h1>登陆</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input type="text" v-model="ruleForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/registered">去注册</router-link>
  </div>
</template>

<script>
import { postLogin } from "@/network/login-register.js";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    const validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        password: "",
        mobile: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //请求头"Content-Type"设置为"application/x-www-form-urlencoded"
          const res = await postLogin(this.ruleForm);
          const { data, status } = res;
          const { result } = data;
          if (status === 200) {
            // 登录成功获取手机号，通过手机号获取完整用户信息
            this.getUserInfo(this.ruleForm.mobile);
            return this.$message({
              message: result,
              type: "success",
            });
          }
          this.$message({
            message: result,
            type: "error",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取用户完整信息
    getUserInfo(mobile) {
      console.log(mobile);
      this.$axios
        .get(`http://localhost:8633/api/user/query?mobile=${mobile}`)
        .then((res) => {
          //将用户完整信息保存在本地
          const data = JSON.stringify(res.data);
          window.localStorage.setItem("userInfo", data);
          //登录成功跳转路由
          this.$router.push("/user-index/home");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scope="scoped" lang="scss">
#registered {
  height: 50vh;
  width: 100vw;

  .el-form {
    div {
      margin: 7px auto;
    }
    .el-form-item {
      width: 30%;
      .el-form-item__label {
        line-height: 61px;
        font-size: 20px;
      }
    }
  }
}
</style>