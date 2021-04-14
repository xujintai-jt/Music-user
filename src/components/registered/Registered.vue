<!--
 * @Author: xujintai
 * @Date: 2021-03-31 15:44:53
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-14 21:12:29
 * @Description: file content
 * @FilePath: \music-shop\src\components\registered\Registered.vue
-->
<template>
  <div id="registered">
    <h1>新用户注册</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="text" v-model="ruleForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/login">去登陆</router-link>
  </div>
</template>

<script>
import { postRegister } from "@/network/login-register.js";

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };

    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 12) {
            callback(new Error("必须年满12岁"));
          } else {
            callback();
          }
        }
      }, 100);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        } else if (value.length < 2) {
          callback(new Error("密码长度不能少于2位!"));
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
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
        checkPass: "",
        age: "",
        mobile: "",
        sex: "1",
        username: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(11111111);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //请求头"Content-Type"设置为"application/x-www-form-urlencoded"
          const res = await postRegister(this.ruleForm);
          const { data, status } = res;
          if (status === 200) {
            return this.$message({
              message: data,
              type: "success",
            });
          }

          this.$message({
            message: data,
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
      .el-form-item__content {
        margin-left: 25px;
      }
    }
  }
}
</style>