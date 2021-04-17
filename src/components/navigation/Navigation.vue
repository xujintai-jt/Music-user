<!--
 * @Author: xujintai
 * @Date: 2021-04-08 16:44:39
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-17 15:35:10
 * @Description: file content
 * @FilePath: \music-user\src\components\navigation\Navigation.vue
-->
<template>
  <div id="navigation">
    <div class="line"></div>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#242424" text-color="#ffd04b">
      <el-menu-item index="1">
        <span @click="push('home')">首页</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span @click="push('play-count-music')">热门音乐</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="push('blog')">音乐评论区首页</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="push('user-info')">个人信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="push('user-like')">个人音乐收藏</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="push('guess-userlike')">猜您喜欢</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="push('music-edu')">音乐教育</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span @click="logout()">注销</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("您确定要退出登录吗", "退出提示", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const { mobile } = JSON.parse(localStorage.getItem("userInfo"));
          window.localStorage.removeItem(`${mobile}playRecord`);
          window.localStorage.removeItem("userInfo");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    push(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style>
</style>
