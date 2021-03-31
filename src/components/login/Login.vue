<!--
 * @Author: xujintai
 * @Date: 2021-03-31 15:44:53
 * @LastEditors: xujintai
 * @LastEditTime: 2021-03-31 16:51:01
 * @Description: file content
 * @FilePath: \music-fontEnd\music-shop\src\components\login\Login.vue
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
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        pass: "",
        mobile: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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
    }
  }
}
</style>