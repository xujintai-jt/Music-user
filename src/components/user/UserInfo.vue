<!--
 * @Author: xujintai
 * @Date: 2021-04-15 14:42:32
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-15 16:56:17
 * @Description: file content
 * @FilePath: \music-user\src\components\user\UserInfo.vue
-->
<template>
  <div id="user-info">
    <!-- 用户信息 -->
    <div class="userInfo">
      <div>
        <span>用户名:</span>
        <span>{{userForm.username}}</span>
      </div>
      <div>
        <span>手机号:</span>
        <span>{{userForm.mobile}}</span>
      </div>
      <div>
        <span>密码:</span>
        <span>{{userForm.password}}</span>
      </div>
      <div>
        <span>年龄:</span>
        <span>{{userForm.age}}</span>
      </div>
      <div>
        <span>性别:</span>
        <span>{{userForm.__v===0?"男":"女"}}</span>
      </div>

      <el-button type="primary" @click="editDialog.show=true">编辑用户信息</el-button>
    </div>

    <!-- 编辑用户信息 -->
    <el-dialog
      :title="editDialog.title"
      :visible.sync="editDialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
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
        <el-form-item label="手机号">
          <span>{{userForm.mobile}}</span>
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
    </el-dialog>
  </div>
</template>

<script>
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
        sex: "",
        username: "",
      },
      userForm: {
        password: "",
        age: "",
        mobile: "",
        sex: "",
        username: "",
      },
      editDialog: {
        title: "编辑用户信息",
        show: false,
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: "blur", required: true },
        ],
        password: [
          { validator: validatePass, trigger: "blur", required: true },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur", required: true },
        ],
        age: [{ validator: checkAge, trigger: "blur", required: true }],
        mobile: [
          { validator: validateMobile, trigger: "blur", required: true },
        ],
      },
    };
  },
  created() {
    //获取用户信息
    const mobile = JSON.parse(localStorage.getItem("userInfo")).mobile;
    this.getUserInfo(mobile);
  },
  methods: {
    getUserInfo(mobile) {
      this.$axios
        .get(`http://localhost:8633/api/user/query?mobile=${mobile}`)
        .then((res) => {
          this.userForm = res.data;
          console.log(this.userForm);
        })
        .catch((err) => console.log(err));
    },
    submitForm(formName) {
      console.log(11111111);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.ruleForm.mobile = this.userForm.mobile;
          //请求头"Content-Type"设置为"application/x-www-form-urlencoded"
          const res = await this.$axios.post(
            "http://localhost:8633/api/user/edit",
            this.ruleForm
          );
          const { data, status } = res;
          if (status === 200) {
            //刷新表单数据,隐藏表单;刷新页面上的用户数据
            this.resetForm("ruleForm");
            this.editDialog.show = false;
            this.getUserInfo(this.userForm.mobile);
            return this.$message({
              message: data.result,
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

<style scoped lang="scss">
.userInfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  background-color: #c20c0c;
  color: white;
  span {
    margin-right: 10px;
  }
}
</style>